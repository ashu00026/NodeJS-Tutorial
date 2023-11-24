const path = require("path");
const {StatusCodes}=require("http-status-codes")
const CustomError = require("../errors");

const uploadProductImage = async (req, res) => {
  console.log(req.files);
  if(!req.files){
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const image = req.files.image;


  if(!image.mimetype.startsWith('image')){
    throw new CustomError.BadRequestError('please upload an image');
  }
  const maxSize=1000*1024;
  if(image.size>maxSize){
    throw new CustomError.BadRequestError('please upload an image of size < 1Mb');

  }
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
