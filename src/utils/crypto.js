const crypto = require('crypto');

module.exports = {
    encrypt: (text, password) => {
        const cipher = crypto.createCipher('aes-256-ctr', password);
        let crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },

    decrypt: (text, password) => {
        const decipher = crypto.createDecipher('aes-256-ctr', password);
        let dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    },

    createSha256Hash: () => {
        return crypto.createHash('sha256');
    },
};