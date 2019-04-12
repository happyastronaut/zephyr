const crypto = require('crypto');
const password = 'd6F3Efeq';

module.exports = {
    encrypt: (text) => {
        const cipher = crypto.createCipher('aes-256-ctr', password);
        let crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },

    decrypt: (text) => {
        const decipher = crypto.createDecipher('aes-256-ctr', password);
        let dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }
};