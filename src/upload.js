import multer from "multer";
// import multerS3 from "multer-s3";
import aws from "aws-sdk";
import s3Storage from "multer-sharp-s3";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-1",
});

const upload = multer({
  storage: s3Storage({
    s3,
    acl: "public-read",
    bucket: "coco-for-dogs",
    multiple: true,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
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
