const config = require('../config');
const client = require('twilio')(config.accountSid , config.authToken);

/**
 * Send a SMS message 
 * @param {string} body - The sms message  
 * @param {string} phone  - Phone number
 */

async function sendMessage(body, phone){
    try {
        const message = await client.messages.create({
            to: phone,
            from: '+13343445296', //twilio number
            body
        })
        return message;
    } catch (error) {
        console.log(error);
    }
}

//sendMessage();

module.exports = {sendMessage};