const nodemailer = require("nodemailer");
const RegistrationEmail = require("./RegistrationEmail");
const dotenv=require('dotenv');
const DentalAppointmentEmail = require("./DentalAppointmentEmail");
dotenv.config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS, 
  },
});

const appointmentSendMail=async({
  date,
      time,
      bookingFor,
      appointmentBookerName,
      personName,
      personEmail,
      personPhone,
  clinicName ,phoneNumber})=>{
try {
  const info = await transporter.sendMail({
      from: `"Clinic" <${process.env.EMAIL_USER}>`,
      to: personEmail,
      // to: [email,"ankushyadav8437@gmail.com"],
      subject: `Dental Tourism India,Appointment Confirmation`,
      html: DentalAppointmentEmail({date,
      time,
      bookingFor,
      appointmentBookerName,
      personName,
      personEmail,
      personPhone,clinicName,phoneNumber}),
    });
    console.log("Message sent: %s", info.messageId);
} catch (error) {
    console.error("Error sending email:", error);
  }
}


const sendmail = async ({
  email,
  name,
  phoneNumber,
  Registration,
  centerName,
  labName,
  OwnerName,
  brandName,
}) => {
  try {
    const info = await transporter.sendMail({
      from: `"Clinic" <${process.env.EMAIL_USER}>`,
      to: email,
      // to: [email,"ankushyadav8437@gmail.com"],
      subject: `Dental Tourism India, ${Registration} Registration Confirmation`,
      html: RegistrationEmail({
        email,
        name,
        phoneNumber,
        centerName,
        labName,
        OwnerName,
        brandName,
      }),
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {sendmail,appointmentSendMail};
