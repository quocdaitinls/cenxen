import {FileModel} from "@db";
import {modelOptions, prop, Ref, ReturnModelType} from "@typegoose/typegoose";
import {Field, Int, ObjectType} from "type-graphql";
import {User} from "./User";
import {v4 as uuidv4} from "uuid";
import {ObjectCannedACL, PutObjectCommand} from "@aws-sdk/client-s3";
import {AdminS3} from "@utils/aws_s3";
import {
  SchemaId,
  SchemaOptions_Timestamps,
  SchemaTimestamps,
} from "@db/interface";

@ObjectType({implements: [SchemaId, SchemaTimestamps]})
@modelOptions({
  schemaOptions: {
    timestamps: SchemaOptions_Timestamps,
  },
})
export class File {
  private static objectACL: ObjectCannedACL = "public-read";

  @Field((type) => String, {nullable: true})
  @prop({type: String, default: null, immutable: true})
  sync_id: string;

  @Field((type) => String)
  @prop({type: String, required: true})
  name: string;

  @Field((type) => String)
  @prop({type: String, required: true})
  ext: string;

  @Field((type) => String)
  @prop({type: String, default: ""})
  url: string;

  @Field((type) => String)
  @prop({type: String})
  put_url: string;

  @Field((type) => Int)
  @prop({type: Number, required: true})
  size: number;

  @Field((type) => String)
  @prop({ref: () => User, required: true, immutable: true})
  creator_id: Ref<User>;

  @Field((type) => Boolean)
  @prop({type: Boolean, default: false})
  is_uploaded: boolean;

  @Field((type) => Boolean, {nullable: true})
  @prop({type: Boolean, default: null})
  is_deleted: boolean;

  // always return array
  public static async build(
    this: ReturnModelType<typeof File>,
    inputFiles: MongooseInput_BuildFile[]
  ) {
    const admin = AdminS3.admin();

    inputFiles = inputFiles.map((input) => ({...input, name: uuidv4()}));

    const arrPostUrl = await Promise.all(
      inputFiles.map((input) => {
        const command = new PutObjectCommand({
          Bucket: admin.config.myBucket.name,
          Key: input.name,
          ACL: File.objectACL,
        });
        return admin.createPutObjectUrl(command);
      })
    );

    inputFiles = inputFiles.map((input, index) => ({
      ...input,
      url: admin.generateUrl(input.name),
      put_url: arrPostUrl[index],
    }));

    const files = await FileModel.create(inputFiles);
    return files;
  }
}

export interface MongooseInput_BuildFile {
  sync_id?: string;
  name: string;
  ext: string;
  size: number;
  creator_id: string;
}
