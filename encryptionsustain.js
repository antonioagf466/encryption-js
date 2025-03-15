const fs = require('fs');
const path = require('path');

function main() {
    const filepath = path.join("D:/coding JS/encryption", "encryption_keys.json");//make sure to update the path for yourself
    let encryption = [];
    for (let i = 0; i < 10; i++) {
        encryption = encryptionKey(encryption);
    }
    saveEncryption(filepath, encryption);
}

function saveEncryption(filepath, encryption) {
    const data = {
        encryption: encryption
    };
    fs.writeFileSync(filepath, JSON.stringify(data, null, 4));
}

function encryptionKey(encryption) {
    let key = " " + "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" + "0123456789" + "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    key = key.split('');
    shuffleArray(key);
    const number = encryption.length + 1;
    encryption.push({ key: key, number: number });
    return encryption;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

main();