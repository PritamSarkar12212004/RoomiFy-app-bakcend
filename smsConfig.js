import dotenv from "dotenv";
import twilio from "twilio";

// Load environment variables
dotenv.config();

const accountSid = process.env.Account_SID;
const authToken = process.env.Auth_Token;

// Create Twilio client
const client = twilio(accountSid, authToken);

// Send an SMS
const sendMessage = async () => {
  try {
    const message = await client.messages.create({
      body: "roomiFy OTP 010586",
      from: "+14439032521",
      to: "+917796419792",
    });
    console.log(`Message sent with SID: ${message.sid}`);
  } catch (error) {
    console.error("Failed to send message:", error.message);
  }
};

// Call the function
sendMessage();
