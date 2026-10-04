/**
 * js/crypto.js
 * Core Cryptography Algorithms for the Encryption Project
 */

const CryptoCore = {
    /**
     * Caesar Cipher Implementation
     * @param {string} text - The input string
     * @param {number} key - The numeric shift (0-25)
     * @param {string} mode - 'encrypt' or 'decrypt'
     * @returns {string} The transformed string
     */
    caesar: function(text, key, mode) {
        let result = '';
        // Ensure key is an integer. Decryption is just a negative shift.
        const shift = mode === 'encrypt' ? parseInt(key, 10) : -parseInt(key, 10);

        if (isNaN(shift)) return '';

        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            
            // Check if character is a letter
            if (char.match(/[a-z]/i)) {
                // Determine ASCII base (65 for Uppercase, 97 for Lowercase)
                const asciiBase = char === char.toLowerCase() ? 97 : 65;
                const charCode = char.charCodeAt(0);
                
                // Calculate new character code with JS modulo fix for negative numbers
                let shiftedCode = ((charCode - asciiBase + shift) % 26 + 26) % 26;
                result += String.fromCharCode(shiftedCode + asciiBase);
            } else {
                // Append spaces and special characters unchanged
                result += char;
            }
        }
        return result;
    },

    /**
     * Vigenère Card Implementation
     * @param {string} text - The input string
     * @param {string} keyword - The alphabetical keyword
     * @param {string} mode - 'encrypt' or 'decrypt'
     * @returns {string} The transformed string
     */
    vigenere: function(text, keyword, mode) {
        let result = '';
        // Clean the keyword: uppercase only, remove spaces/numbers
        keyword = keyword.toUpperCase().replace(/[^A-Z]/g, '');
        
        if (!keyword) return ''; // Fallback if no valid keyword

        let keywordIndex = 0;

        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            
            if (char.match(/[a-z]/i)) {
                const asciiBase = char === char.toLowerCase() ? 97 : 65;
                const charCode = char.charCodeAt(0);
                
                // Get the current shift from the repeating keyword
                const keyChar = keyword[keywordIndex % keyword.length];
                const keyShift = keyChar.charCodeAt(0) - 65; // A=0, B=1, ... Z=25
                
                // Apply shift (add for encrypt, subtract for decrypt)
                const shift = mode === 'encrypt' ? keyShift : -keyShift;
                
                let shiftedCode = ((charCode - asciiBase + shift) % 26 + 26) % 26;
                result += String.fromCharCode(shiftedCode + asciiBase);
                
                // Only increment the keyword index if an alphabetic character was processed
                keywordIndex++; 
            } else {
                // Append spaces and special characters unchanged
                result += char;
            }
        }
        return result;
    }
};