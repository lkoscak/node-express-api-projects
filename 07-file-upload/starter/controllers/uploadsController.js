const path = require("path");
const { StatusCodes } = require("http-status-codes");
const Error = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadProductImageLocal = async (req, res) => {
	if (!req.files) {
		throw new Error.BadRequestError("No file uploaded");
	}
	const productImage = req.files.image;
	if (!productImage.mimetype.startsWith("image")) {
		throw new Error.BadRequestError(
			"Unsuported file type. Please upload image"
		);
	}
	if (productImage.size > 1000 * 1024) {
		throw new Error.BadRequestError("Please upload image smaller than 1MB");
	}

	const imagePath = path.join(
		__dirname,
		"../public/uploads/",
		productImage.name
	);
	await productImage.mv(imagePath);
	return res
		.status(StatusCodes.OK)
		.json({ image: { src: `/uploads/${productImage.name}` } });
};
const uploadProductImage = async (req, res) => {
	if (!req.files) {
		throw new Error.BadRequestError("No file uploaded");
	}
	const productImage = req.files.image;
	if (!productImage.mimetype.startsWith("image")) {
		throw new Error.BadRequestError(
			"Unsuported file type. Please upload image"
		);
	}
	if (productImage.size > 1000 * 1024) {
		throw new Error.BadRequestError("Please upload image smaller than 1MB");
	}

	const result = await cloudinary.uploader.upload(
		req.files.image.tempFilePath,
		{
			use_filename: true,
			folder: "file-upload-project",
		}
	);
	fs.unlinkSync(req.files.image.tempFilePath);

	return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = { uploadProductImage };
