const originalToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQW5vbnltb3VzIiwiZW1haWwiOiJhbm9ueW1vdXNAc2VjdXJpdHktdHJhaW5pbmcucGwiLCJpYXQiOjE1MTYyMzkwMjIsImlzQWRtaW4iOmZhbHNlfQ.OaaJF5Umm5nmfbSC2yONNI-vjg5PhbvfObrzpYABFHM';

var header = {
    "alg": "HS256",
    "typ": "JWT"
};

var payload = {
    "name": "Anonymous",
    "email": "anonymous@security-training.pl",
    "iat": 1516239022,
    "isAdmin": true
};

const toBase64 = obj => {
    // converts the obj to a string
    const str = JSON.stringify (obj);
    // returns string converted to base64
    return Buffer.from(str).toString ('base64');
};

const replaceSpecialChars = b64string => {
// create a regex to match any of the characters =,+ or / and replace them with their // substitutes
    return b64string.replace (/[=+/]/g, charToBeReplaced => {
        switch (charToBeReplaced) {
            case '=':
                return '';
            case '+':
                return '-';
            case '/':
                return '_';
        }
    });
};

const b64Header = toBase64 (header);
const jwtB64Header = replaceSpecialChars(b64Header);
console.log ("the header is: ",jwtB64Header);

const b64Payload = toBase64 (payload);
const jwtB64Payload = replaceSpecialChars (b64Payload);
console.log ("the payload is: ",jwtB64Payload);

// bring in the crypto module
const crypto = require ('crypto');
const createSignature =(jwtB64Header,jwtB64Payload,secret)=>{
// create a HMAC(hash based message authentication code) using sha256 hashing alg
    let signature = crypto.createHmac ('sha256', secret);

// use the update method to hash a string formed from our jwtB64Header a period and
//jwtB64Payload
    signature.update (jwtB64Header + '.' + jwtB64Payload);

//signature needs to be converted to base64 to make it usable
    signature = signature.digest ('base64');

//of course we need to clean the base64 string of URL special characters
    signature = replaceSpecialChars (signature);
    return signature
}
// create your secret to sign the token
const secret = 'partyallthetime';
const signature= createSignature(jwtB64Header,jwtB64Payload,secret);
console.log ("the signature is: ",signature);

//we now combine the results of the header,payload and signatue
const jsonWebToken = jwtB64Header + '.' + jwtB64Payload + '.' + signature;
console.log ("the JWT is :",jsonWebToken);
