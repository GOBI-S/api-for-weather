import axios, { Axios } from "axios";
import nodemailer from 'nodemailer';
import Mail from "../models/mailmodel.js";
import sendWeatherEmail from "../weatherf/weatherfetch.js";
import sendWeatherEmailredo from "../weatherf/weatherfetchusingdbauto.js";
export const setLocation = (req) => {
    return req.body.address; // Set the location from request body
};
export const setEmail = (req) => {
    return req.body.Email;  // Set the email from request body
  };
export const enterthemail = async (req, res) => {
  setLocation(req);
  setEmail(req);
  const finded=await Mail.findOne({
    Email:req.body.Email
  })
  const newMail = new Mail({
    Email: req.body.Email,
    address: req.body.address,
  });
  if (finded) {
    res.status(409).json({ message: "Your email is already stored" });
  }
  
  else{
    try {
      const mail = await newMail.save();
      await sendWeatherEmail(req,res);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

};
export const getlistmail = async (req, res) => {
  try {
    const Emails = await Mail.find();
    res.json(Emails)
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ message: error.message });
  }
};
export const deletemail = async (req, res) => {
  let mailid = req.params.mail;
  try {
    await Mail.deleteOne({ Email: mailid });
    res.json({ message: "mail deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const runIntervalfotrweatherEmail =()=>{
  setInterval(async()=>{
    try {
      const Emails= await Mail.find();
      const counts = await Mail.countDocuments();
  
      for (let i = 0; i < counts; i++) {
        const email=Emails[i];
        if (email) {
          const recipientEmail=email.Email
          const location=email.address
          await sendWeatherEmailredo({
            Email: recipientEmail,
            Location: location
          });
      }}
      console.log('All emails processed successfully');
      
    } catch (error) {
      console.error('Error processing emails:', error.message);
    }
  },24 * 60 * 60 * 1000);
};
 runIntervalfotrweatherEmail();
