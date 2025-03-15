// Load encryption keys from JSON file
async function loadEncryption(filepath) {
    try {
        const response = await fetch(filepath);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("File not found or invalid JSON:", error);
        return null;
    }
}

// Get encryption key by number
function getListByNumber(data, pickedNumber) {
    const encryptionList = data.encryption || [];
    const item = encryptionList.find((item) => item.number === pickedNumber);
    return item ? item.key : null;
}

// Encrypt a message
function encrypt(chars, key, text) {
    let encryptedText = "";
    for (let letter of text) {
        const index = chars.indexOf(letter);
        encryptedText += key[index];
    }
    return encryptedText;
}

// Decrypt a message
function decrypt(chars, key, text) {
    let decryptedText = "";
    for (let letter of text) {
        const index = key.indexOf(letter);
        decryptedText += chars[index];
    }
    return decryptedText;
}

// Main function
async function main() {
    const chars = " " + "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" + "0123456789" + "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const filepath = "encryption_keys.json";

    const encryptionNumberInput = document.getElementById("encryption-number");
    const randomizedNumberDisplay = document.getElementById("randomized-number");
    const messageInput = document.getElementById("message");
    const resultDisplay = document.getElementById("result");

    // Randomize encryption number if input is invalid
    document.getElementById("randomize").addEventListener("click", () => {
        const pickedNumber = Math.floor(Math.random() * 10) + 1;
        randomizedNumberDisplay.textContent = `Randomized number: ${pickedNumber}`;
        encryptionNumberInput.value = pickedNumber;
    });

    // Handle encryption/decryption
    document.getElementById("submit").addEventListener("click", async () => {
        let pickedNumber = parseInt(encryptionNumberInput.value); 

        const data = await loadEncryption(filepath);
        if (!data) {
            resultDisplay.textContent = "Failed to load encryption keys.";
            return;
        }

        const key = getListByNumber(data, pickedNumber);
        if (!key) {
            resultDisplay.textContent = "Invalid encryption number.";
            return;
        }

        const text = messageInput.value.trim();
        if (!text) {
            resultDisplay.textContent = "Please enter a message.";
            return;
        }

        if (document.getElementById("encrypt").classList.contains("active")) {
            const encryptedText = encrypt(chars, key, text);
            resultDisplay.textContent = `Encrypted Message: ${encryptedText}`;
        } else if (document.getElementById("decrypt").classList.contains("active")) {
            const decryptedText = decrypt(chars, key, text);
            resultDisplay.textContent = `Decrypted Message: ${decryptedText}`;
        }
    });

    // Toggle between encrypt and decrypt modes
    document.getElementById("encrypt").addEventListener("click", () => {
        document.getElementById("encrypt").classList.add("active");
        document.getElementById("decrypt").classList.remove("active");
    });

    document.getElementById("decrypt").addEventListener("click", () => {
        document.getElementById("decrypt").classList.add("active");
        document.getElementById("encrypt").classList.remove("active");
    });
}

window.onload = main;