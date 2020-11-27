import multer from "multer";
// import multerS3 from "multer-s3";
import * as s3Storage from "multer-sharp-s3";
import aws from "aws-sdk";

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_KEY,
  region: "ap-northeast-1",
});

const s3 = new aws.S3();

const upload = multer({
  storage: s3Storage({
    s3,
    bucket: "coco-for-dogs",
    acl: "public-read",
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    },
    multiple: true,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    resize: {
      width: 600,
    },
  }),
});

export const uploadMiddleware = upload.array("file");

export const uploadController = (req, res) => {
  const { files } = req;
  console.log(req);
  let locations = [];
  for (const file of files) {
    locations.push(file.location);
  }
  res.json({ locations });
};
