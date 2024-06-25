const { contactUsEmail} = require("../Mail/template/ContactUs")
const {adminEmailResEmail}=require('../Mail/template/AdminRes')
const mailSender = require("../Utils/MailSender")
exports.contactUsController = async (req, res) => {
    const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
    console.log(req.body)
    try {
      // Send email to user
      const userEmailRes = await mailSender(
        email,
        "Your Data send successfully",
        contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
      )
    //   console.log("Email Res ", userEmailRes)
  
      // Send email to admin
      const adminEmail = "badgujjar9991@gmail.com" // Replace with admin's email address
      const adminEmailRes = await mailSender(
        adminEmail,
        "New Contact Us Request",
        adminEmailResEmail(email, firstname, lastname, message, phoneNo, countrycode)
      )
      console.log("Admin Email Res ", adminEmailRes)
  
      return res.json({
        success: true, 
        message: "Email send successfully",
      })
    } catch (error) {
      console.log("Error", error)
      console.log("Error message :", error.message)
      return res.json({
        success: false,
        message: "Something went wrong...",
      })
    }
  }