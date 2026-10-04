# 🔐 Encryption Project: Classical Ciphers Workspace

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

A highly interactive, Single Page Application (SPA) designed to demonstrate classical cryptography algorithms in an academic workspace environment. This project allows users to encrypt and decrypt messages locally using the **Caesar Cipher** and the **Vigenère Card**[cite: 7, 10]. 

Built as part of the KFS-H.I.E.T Computing Lab / 04, this tool prioritizes data privacy (zero data retention)[cite: 3] and delivers a pixel-perfect, modern terminal-inspired UI[cite: 1, 6].

## 🔗 Live Demo
> **[Insert your Netlify/GitHub Pages Live Link Here]**

---

## ✨ Key Features

* **Dual Cryptographic Algorithms:**
  * **Caesar Cipher:** Shifts every letter by a fixed numeric key across the alphabet (0-25)[cite: 4, 7].
  * **Vigenère Card:** Applies a repeating alphabetical keyword to create a polyalphabetic substitution[cite: 7, 9].
* **Bi-directional Operations:** Seamlessly switch between Plaintext → Ciphertext (Encryption) and Ciphertext → Plaintext (Decryption).
* **100% Client-Side Processing:** "Data never leaves this device." All algorithms are executed locally in the browser via JavaScript[cite: 3, 4, 8, 9].
* **Intelligent Text Handling:** Mathematically wraps around the A-Z alphabet while leaving spaces, numbers, and punctuation entirely unchanged.
* **Dynamic UI/UX Theming:** Context-aware styling that shifts accents based on the selected method (Red for Caesar, Cyan for Vigenère)[cite: 4, 5, 8, 10].

---

## 🛠️ Tech Stack & Architecture

This project is built from scratch with zero external dependencies to ensure maximum performance and structural control:

* **HTML5:** Semantic structure for a scalable Single Page Application (SPA).
* **CSS3:** Custom CSS variables, Flexbox/Grid layouts, and dynamic state styling (no frameworks used).
* **Vanilla JavaScript (ES6+):** Modular DOM manipulation, event listening, and pure algorithmic logic.

### 📂 File Structure
```text
encryption-app/
│
├── index.html          # Main SPA interface
├── css/
│   └── style.css       # Layouts, UI themes, and custom styling
├── js/
│   ├── app.js          # DOM manipulation, state management, and navigation
│   └── crypto.js       # Core mathematical logic for Caesar & Vigenère
└── images/
    ├── el_walii_logo.jpg    # Operator Avatar[cite: 2]
    └── institute_logo.png   # KFS-H.I.E.T Logo[cite: 2]
