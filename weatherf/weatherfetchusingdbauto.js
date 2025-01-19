import axios from "axios";
import nodemailer from 'nodemailer';
//import { setredoEmail, setredoLocation } from "../controllers/controlmail.js";
const apikey = "483575444fe2414da0f44753241609";
const sendWeatherEmailredo= async ({Email,Location},req,res) => {
  try {
    console.log("email set to:", Email);
    console.log("address:",Location);
    const url = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${   Location}`;
    // Fetch weather data
    const response = await axios.get(url);
    const currentTemp = response.data.current.temp_c;  // temperature in Celsius

    const weatherMessage = `The current temperature in ${Location} is ${currentTemp}°C.`;
    // Setup Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail', // Use Gmail service
      auth: {
        user: "jsemail756@gmail.com",
        pass: "jizdgvamhsgnsqqk",
      },
    });

    // Email options
    let mailOptions = {
      from: "jsemail756@gmail.com",
      to: Email,
      subject: `Weather Update for ${Location}`,
      text: weatherMessage,
    };

    // Send email
    const mailInfo = await transporter.sendMail(mailOptions);
    console.log(`Email content: ${weatherMessage}`);

    // Send response back to client
    return res.status(201).json({ message: 'Email sent successfully'});
  } catch (error) {
    
    //console.error('Error:', error);
    //return res.status(400).json({ message: error.message });
  }
}
export default sendWeatherEmailredo;