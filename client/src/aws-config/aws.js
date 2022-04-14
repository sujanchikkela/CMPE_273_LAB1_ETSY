import aws from 'aws-sdk'

const config = {
    "bucketName":"etsy-lab1",
    "region": "us-east-1",
    "accessKeyId": "",
    "secretAccessKey": "",
    "signatureVersion": "v4"
}

export const bucketName = config.bucketName

export const s3 = new aws.S3({
    region: config.region,
    signatureVersion: config.signatureVersion,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    Bucket: config.Bucket,
})




