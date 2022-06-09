const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

const sendEmailEthereal = async (req, res) => {
	let testAccount = await nodemailer.createTestAccount();
	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		auth: {
			user: "sebastian.herman45@ethereal.email",
			pass: "P8MCEn8B7PDe5gGhBt",
		},
	});
	let info = await transporter.sendMail({
		from: '"Luka Košćak" <lkoscak@gmail.com>', // sender address
		to: "luka.koscak96@gmail.com", // list of receivers
		subject: "Hello", // Subject line
		//text: "Hello world?", // plain text body
		html: "<b>Hello world?</b>", // html body
	});
	res.json(info);
};

const sendEmail = async (req, res) => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: "lkoscak1996@gmail.com", // Change to your recipient
		from: "luka.koscak96@gmail.com", // Change to your verified sender
		subject: "Sending emails with node",
		//text: "and easy to do anywhere, even with Node.js",
		html: "<strong>Sending emails with node</strong>",
	};
	const info = await sgMail.send(msg);
	res.json(info);
};

module.exports = sendEmail;
