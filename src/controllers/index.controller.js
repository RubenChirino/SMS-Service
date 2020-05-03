const {sendMessage} = require('../twilio/send-sms');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const SMS = require('../models/sms');
 
const {getSocket} = require('../sockets');

const indexController = async (req, res) => {
    const messages = await SMS.find().sort('-createdAt').lean();
    //console.log(messages);
    res.render('index', {messages});
}

const postMessage = async (req, res) => {
    const {message, phone} = req.body;

    if(!message || !phone) return res.json('Missing message or phone');

    const result = await sendMessage(req.body.message, req.body.phone)
    
    console.log(result.sid);

    await SMS.create({
        Body: req.body.message,
        To: req.body.phone
    }); 

    res.redirect('/');
}

const receiveMessage = async (req, res) => {
   console.log(req.body);

  const savedSMS = await SMS.create({
       Body: req.body.Body,
       From: req.body.From,
       Country: req.body.FromCountry
   });

   getSocket().emit('new message', savedSMS);

   const twiml = new MessagingResponse();

   //twiml.message('This is my response');

   res.send(twiml.toString());
}

module.exports = {
    indexController,
    postMessage,
    receiveMessage
}