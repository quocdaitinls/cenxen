import {
  SchemaId,
  SchemaOptions_Timestamps,
  SchemaTimestamps,
} from "@db/interface";
import {
  DocumentType,
  modelOptions,
  pre,
  prop,
  Ref,
  ReturnModelType,
  Severity,
} from "@typegoose/typegoose";
import {randomBytes, scrypt} from "crypto";
import {Field, Int, ObjectType} from "type-graphql";
import {promisify} from "util";
import validator from "validator";
import {File} from "./File";

const scryptAsync = promisify(scrypt);

/*
User_Auth
*/
@ObjectType()
@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class User_Auth {
  @Field((type) => String, {nullable: true})
  @prop({type: String, default: null, unique: true, index: true})
  username: string;

  @Field((type) => String, {nullable: true})
  @prop({type: String})
  password: string;
}

/* 
User_Profile
 */
@ObjectType()
@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class User_Profile {
  @Field((type) => String)
  @prop({type: String, required: true})
  name: string;

  @Field((type) => String, {nullable: true})
  @prop({ref: () => File, default: null})
  avatar_id: Ref<File>;

  @Field((type) => Int)
  @prop({type: Number, default: -1})
  age: number;

  @Field((type) => String)
  @prop({type: String, default: ""})
  phone: string;

  @Field((type) => String)
  @prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (val: string) => validator.isEmail(val),
  })
  email: string;
}

/* 
User_Setting
 */
@ObjectType()
@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
class User_Setting {
  @Field((type) => String)
  @prop({type: String, default: "en"})
  language: string;
}

/* 
User
 */
@ObjectType({implements: [SchemaId, SchemaTimestamps]})
@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
  schemaOptions: {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.auth;
      },
    },
    timestamps: SchemaOptions_Timestamps,
  },
})
@pre<User>("save", async function (done) {
  if (this.isModified("auth.password")) {
    const hashed = await this.hashPassword();
    this.set("auth.password", hashed);
  }
  done();
})
export class User {
  @Field((type) => Boolean)
  @prop({type: Boolean, default: false})
  active: boolean;

  @Field((type) => User_Auth, {nullable: true})
  @prop({type: () => User_Auth})
  auth: User_Auth;

  @Field((type) => User_Profile, {nullable: true})
  @prop({type: () => User_Profile})
  profile: User_Profile;

  @Field((type) => User_Setting, {nullable: true})
  @prop({type: () => User_Setting, default: () => ({})})
  setting: User_Setting;

  public static async build(
    this: ReturnModelType<typeof User>,
    input: MongooseInput_BuildUser
  ) {
    const {username, password, name, email, phone} = input;
    return this.create({
      auth: {
        username,
        password,
      },
      profile: {
        name,
        email,
        phone,
      },
    });
  }

  public static async findByUsername(
    this: ReturnModelType<typeof User>,
    username: string
  ) {
    const user = await this.findOne({"auth.username": username});
    return user;
  }

  public static async findByEmail(
    this: ReturnModelType<typeof User>,
    email: string
  ) {
    const user = await this.findOne({"profile.email": email});
    return user;
  }

  public async hashPassword(this: DocumentType<User>): Promise<string> {
    const password = this.get("auth.password");
    if (password === "") return password;

    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  public async comparePassword(
    this: DocumentType<User>,
    suppliedPassword: string
  ): Promise<boolean> {
    const storedPassword = this.auth.password;
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }

  public async activate(this: DocumentType<User>) {
    this.active = true;
    return this.save();
  }
}

/* 
Interfaces
 */
export interface MongooseInput_BuildUser {
  email: string;
  name: string;
  username?: string;
  password?: string;
  phone?: string;
}

export interface MongooseInput_UpdateUser {
  auth?: {
    password?: string;
  };
  profile?: {
    name?: string;
    avatar_id?: string;
    age?: number;
    phone?: string;
    email?: string;
  };
}
