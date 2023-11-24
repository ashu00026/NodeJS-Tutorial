const path = require("path");
const {StatusCodes}=require("http-status-codes")

const uploadProductImage = async (req, res) => {
  // console.log(req.files);
  const image = req.files.image;
  // console.log("path:  "+path);
  // console.log("dir:  "+__dirname);
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${image.name}`
  );
  await image.mv(imagePath);
  return res.status(StatusCodes.OK).json({image:{src:`/uploads/${image.name}`}})
};

module.exports = {
  uploadProductImage,
};
