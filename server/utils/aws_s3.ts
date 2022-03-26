import {
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteObjectsCommand,
  ListBucketsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
  S3ClientConfig,
} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

export type MyBucketConfig = {
  name: string;
  region: string;
};

export type AdminS3Config = {
  myBucket: MyBucketConfig;
  s3Client: S3ClientConfig;
};

export class AdminS3 {
  private static _admin: AdminS3;
  private _config: AdminS3Config;
  private _client: S3Client;

  private constructor(config: AdminS3Config) {
    this._config = config;
    this._client = new S3Client(this._config.s3Client);
  }

  get config() {
    return this._config;
  }

  get client() {
    return this._client;
  }

  public static admin(config?: AdminS3Config) {
    if (!this._admin && config) {
      this._admin = new AdminS3(config);
    }
    return this._admin;
  }

  async createMyBucket() {
    const bucketName = this.config.myBucket.name;
    const command = new CreateBucketCommand({
      Bucket: bucketName,
    });
    const res = await this.client.send(command);
    return res;
  }

  async getMyBucket() {
    const bucketName = this.config.myBucket.name;
    const listBuckets = await this.fetchListBuckets();
    const myBucket = listBuckets.find((bucket) => bucket.Name === bucketName);
    return myBucket;
  }

  async fetchListBuckets() {
    const command = new ListBucketsCommand({});
    const response = await this.client.send(command);
    return response.Buckets;
  }

  async fetchListObjects(bucketName: string) {
    const command = new ListObjectsV2Command({Bucket: bucketName});
    const res = await this.client.send(command);
    return res.Contents || [];
  }

  async emptyBucket(bucketName: string) {
    const listObjects = await this.fetchListObjects(bucketName);
    if (!listObjects.length) return;
    const listKeysDelete = listObjects.map((obj) => ({Key: obj.Key}));
    const command = new DeleteObjectsCommand({
      Bucket: bucketName,
      Delete: {
        Objects: listKeysDelete,
      },
    });
    await this.client.send(command);
    return;
  }

  async deleteBucket(bucketName: string) {
    await this.emptyBucket(bucketName);
    const command = new DeleteBucketCommand({Bucket: bucketName});
    const res = await this.client.send(command);
    return res;
  }

  async createPutObjectUrl(command: PutObjectCommand) {
    const postUrl = await getSignedUrl(this.client, command, {
      expiresIn: 600,
    });
    return postUrl;
  }

  async deleteAllBuckets() {
    const buckets = await this.fetchListBuckets();
    const res = await Promise.all(
      buckets.map((bucket) => this.deleteBucket(bucket.Name))
    );

    return res;
  }

  generateUrl(filename: string) {
    const {name, region} = this.config.myBucket;
    return `https://${name}.s3.${region}.amazonaws.com/${filename}`;
  }
}
