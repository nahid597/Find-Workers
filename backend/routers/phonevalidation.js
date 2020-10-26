// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'AC4f2ac03f27a550f8681fbb2be3f93861';
const authToken = 'f90f40fef10d47c8d74645fa934c3286';
const client = require('twilio')(accountSid, authToken);
const twilioNumber = '+16505294869';
const express = require('express');
const router = express.Router();

router.post('/phone', function(req,res, next){
    let randomNumberMessage = Math.floor(Math.random() * (100000 - 999999) + 100000);
    randomNumberMessage = randomNumberMessage < 0 ? -1 * randomNumberMessage : randomNumberMessage;  
    client.messages
    .create({
        body: randomNumberMessage,
        from: twilioNumber,
        to:  req.body.Phone
    })
    .then(message => res.send(message));
    console.log(req.body.Phone);
});

module.exports = router;
