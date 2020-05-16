# Managing files in AWS S3 using Node.js

click [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html) for aws-sdk documents.

## Functions Included

- Upload image
- List all files in the bucket
- Delete a single file
- Delete multiple files

## Getting Started with S3

1. Create a bucket in AWS S3
2. Crate a new access key in IAM
   ![create new access key](https://claudia-github-img.s3-ap-southeast-2.amazonaws.com/S3-Nodejs/create-new-access-key.png)
3. Download key file
   ![Download key file](https://claudia-github-img.s3-ap-southeast-2.amazonaws.com/S3-Nodejs/download-access-key.png)
4. Copy Access Key ID and Secret Access Key to file services/config.json

## Installing

```sh
npm install
```

## Built With

- AWS SDK for JS - [Class AWS.S3](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)
