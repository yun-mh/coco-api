import multer from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3-transform";
import sharp from "sharp";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-1",
});

const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "coco-for-dogs",
    shouldTransform: function(req, file, cb) {
      cb(null, /^image/i.test(file.mimetype));
    },
    transforms: [
      {
        id: "uploaded",
        key: function(req, file, cb) {
          cb(null, `${file.fieldname}-` + Date.now().toString());
        },
        transform: function(req, file, cb) {
          cb(
            null,
            sharp()
              .resize(600)
              .withMetadata()
          );
        },
      },
    ],
  }),
});

export const uploadMiddleware = upload.array("file");

export const uploadController = (req, res) => {
  const { files } = req;
  let locations = [];
  for (const file of files) {
    locations.push(file.transforms[0].location);
  }
  res.json({ locations });
};
