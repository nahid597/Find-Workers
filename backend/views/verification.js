const readline = require('readline');
var TeleSignSDK = require('telesignsdk');
const customerId = "77CA2E0F-783F-498C-8356-D35617429249";
const apiKey = "pqojgbRoU1KnvZ44c5ZMCWIVvlzMHD2kmi+CIcZr5vGYS4VIrJ0DfibSolKrWHY22xYM26XmI61J7L9oCYEMow==";
const rest_endpoint = "https://rest-api.telesign.com";
const timeout = 10*1000; // 10 secs

const client = new TeleSignSDK( customerId,
    apiKey,
    rest_endpoint,
    timeout // optional
    // userAgent
);

const phoneNumber = "+8801409796969";
const messageType = "ARN";
const verifyCode = "32658";
const message = "Your code is " + verifyCode;

console.log("## MessagingClient.message ##");

function messageCallback(error, responseBody) {
    if (error === null) {
        console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
            ` => code: ${responseBody['status']['code']}` +
            `, description: ${responseBody['status']['description']}`);
        prompt('Enter the verification code received:\n', function (input) {
            if (input === verifyCode) {
                console.log('Your code is correct.');
            } else {
                console.log('Your code is incorrect. input: ' + input + ", code: " + verifyCode);
            }
            process.exit();
        });

    } else {
        console.error("Unable to send message. " + error);
    }
}
client.sms.message(messageCallback, phoneNumber, message, messageType);

function prompt(question, callback) {
    const stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question);

    stdin.once('data', function (data) {
        callback(data.toString().trim());
    });
}
