import multer from "multer";
// import multerS3 from "multer-s3";
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
    // metadata: function(req, file, cb) {
    //   cb(null, { fieldName: file.fieldname });
    // },
    // key: function(req, file, cb) {
    //   cb(null, Date.now().toString());
    // },
    shouldTransform: function(req, file, cb) {
      cb(null, /^image/i.test(file.mimetype));
    },
    transforms: [
      {
        id: "original",
        key: function(req, file, cb) {
          cb(null, "image-original.png");
        },
        transform: function(req, file, cb) {
          cb(null, sharp().png());
        },
      },
      {
        id: "thumbnail",
        key: function(req, file, cb) {
          cb(null, "image-thumbnail.png");
        },
        transform: function(req, file, cb) {
          cb(
            null,
            sharp()
              .resize(100, 100)
              .png()
          );
        },
      },
    ],
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
