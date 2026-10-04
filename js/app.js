/**
 * js/app.js
 * UI Controller and State Management for Encryption Project
 */

const app = {
    state: {
        method: null, // 'caesar' or 'vigenere'
        operation: null // 'encrypt' or 'decrypt'
    },

    // Cache DOM Elements for performance
    elements: {
        views: {
            method: document.getElementById('view-method-selection'),
            operation: document.getElementById('view-operation-selection'),
            cipher: document.getElementById('view-cipher')
        },
        navSteps: [
            document.getElementById('nav-step-1'),
            document.getElementById('nav-step-2'),
            document.getElementById('nav-step-3'),
            document.getElementById('nav-step-4')
        ],
        // Operation Selection dynamic texts
        opMethodName: document.getElementById('op-method-name'),
        opKeyType: document.getElementById('op-key-type'),
        opSubtitle: document.getElementById('op-subtitle'),
        
        // Cipher Workspace dynamic elements
        cipherMainTitle: document.getElementById('cipher-main-title'),
        cipherBackText: document.getElementById('cipher-back-text'),
        inputMeta: document.getElementById('input-meta'),
        inputLabel: document.getElementById('input-label'),
        keyConstraints: document.getElementById('key-constraints'),
        keyIconDisplay: document.getElementById('key-icon-display'),
        transformLabel: document.getElementById('transform-label'),
        outputLabel: document.getElementById('output-label'),
        actionBtnText: document.getElementById('action-btn-text'),
        directionArrow: document.getElementById('direction-arrow'),
        
        // Inputs & Outputs
        textInput: document.getElementById('text-input'),
        keyInput: document.getElementById('key-input'),
        textOutput: document.getElementById('text-output'),
        inputCount: document.getElementById('input-count'),
        outputCount: document.getElementById('output-count'),
        lastRunTime: document.getElementById('last-run-time'),
        footerKeystream: document.getElementById('footer-keystream'),
        
        // Theming targets
        outputPanel: document.querySelector('.output-panel'),
        arrowCircle: document.querySelector('.arrow-circle')
    },

    init: function() {
        this.updateTimestamp();
        this.bindEvents();
    },

    bindEvents: function() {
        // Live character counting for input
        this.elements.textInput.addEventListener('input', (e) => {
            this.elements.inputCount.textContent = e.target.value.length;
        });

        // Live validation formatting for key
        this.elements.keyInput.addEventListener('input', (e) => {
            if (this.state.method === 'caesar') {
                // Allow only numbers
                e.target.value = e.target.value.replace(/[^0-9-]/g, '');
            } else {
                // Allow only letters, auto uppercase
                e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
            }
        });
    },

    showView: function(viewName) {
        // Hide all views
        Object.values(this.elements.views).forEach(v => {
            v.classList.remove('active');
            v.classList.add('hidden');
        });
        
        // Show target view
        const targetView = this.elements.views[viewName];
        targetView.classList.remove('hidden');
        targetView.classList.add('active');

        // Update Sidebar Navigation Progress
        this.elements.navSteps.forEach((step, index) => step.classList.remove('active'));
        this.elements.navSteps[0].classList.add('active'); // Method always active

        if (viewName === 'operation') {
            this.elements.navSteps[1].classList.add('active');
        } else if (viewName === 'cipher') {
            this.elements.navSteps[1].classList.add('active');
            this.elements.navSteps[2].classList.add('active');
            this.elements.navSteps[3].classList.add('active');
        }
    },

    goBack: function(toView) {
        this.showView(toView);
    },

    selectMethod: function(method) {
        this.state.method = method;
        
        // Setup Operation view context based on chosen method
        if (method === 'caesar') {
            this.elements.opMethodName.textContent = 'CAESAR CIPHER';
            this.elements.opMethodName.className = 'red-text';
            this.elements.opKeyType.textContent = 'NUMERIC KEY · 0-25';
            this.elements.opSubtitle.textContent = 'Transform readable text into shifted ciphertext, or reverse an existing Caesar Cipher message.';
        } else {
            this.elements.opMethodName.textContent = 'VIGENÈRE Cipher';
            this.elements.opMethodName.className = 'cyan-text';
            this.elements.opKeyType.textContent = 'KEYWORD · A-Z';
            this.elements.opSubtitle.textContent = 'Use a repeating keyword to encode a message, or recover the original text from Vigenère Cipher ciphertext.';
        }

        this.showView('operation');
    },

    selectOperation: function(operation) {
        this.state.operation = operation;
        this.setupWorkspace();
        this.showView('cipher');
    },

    setupWorkspace: function() {
        const isEncrypt = this.state.operation === 'encrypt';
        const isCaesar = this.state.method === 'caesar';

        // 1. Theme Variables
        const themeColor = isCaesar ? 'var(--accent-red)' : 'var(--accent-cyan)';
        
        this.elements.outputPanel.style.borderColor = themeColor;
        this.elements.textOutput.style.color = themeColor;
        this.elements.arrowCircle.style.color = themeColor;
        this.elements.arrowCircle.style.borderColor = themeColor;

        // 2. Titles and Breadcrumbs
        const methodTitle = isCaesar ? 'Caesar Cipher' : 'Vigenère Cipher';
        const opTitle = isEncrypt ? 'Encryption' : 'Decryption';
        
        this.elements.cipherMainTitle.textContent = `${methodTitle} — ${opTitle}`;
        this.elements.cipherBackText.textContent = `${methodTitle} modes`;
        
        // 3. Labels & Icons
        this.elements.inputMeta.textContent = isCaesar ? 'CAESAR / SHIFT' : 'VIGENÈRE / KEYWORD';
        this.elements.inputLabel.textContent = isEncrypt ? 'Plain text' : 'Encrypted text';
        this.elements.outputLabel.textContent = isEncrypt ? 'Encrypted text' : 'Plain text';
        this.elements.actionBtnText.textContent = isEncrypt ? 'Encrypt' : 'Decrypt';
        this.elements.transformLabel.textContent = isEncrypt ? 'ENCRYPT' : 'DECRYPT';
        
        // Directional arrow toggle
        this.elements.directionArrow.innerHTML = isEncrypt 
            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>'
            : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>';

        // 4. Key Input configurations
        if (isCaesar) {
            this.elements.keyConstraints.textContent = 'NUMBER / 0-25';
            this.elements.keyIconDisplay.innerHTML = '#';
            this.elements.footerKeystream.textContent = 'SHIFT KEY / -';
            this.elements.keyInput.placeholder = 'Enter numeric shift';
        } else {
            this.elements.keyConstraints.textContent = 'KEYWORD / A-Z';
            this.elements.keyIconDisplay.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012-2h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a2 2 0 01-2-2zM9 11a4 4 0 100-8 4 4 0 000 8z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 14l-4 4v4h4l1-1v-2h2l1-1v-2h2l2-2"></path></svg>';
            this.elements.footerKeystream.textContent = 'KEYSTREAM / - / REPEATING';
            this.elements.keyInput.placeholder = 'Enter alphabet keyword';
        }

        // Clear existing input states
        this.resetWorkspace();
    },

    executeCipher: function() {
        const text = this.elements.textInput.value;
        const key = this.elements.keyInput.value;
        
        if (!text || !key) return; // Basic validation guard

        let resultText = '';

        if (this.state.method === 'caesar') {
            resultText = CryptoCore.caesar(text, key, this.state.operation);
            this.elements.footerKeystream.textContent = `SHIFT KEY / ${key}`;
        } else {
            resultText = CryptoCore.vigenere(text, key, this.state.operation);
            this.elements.footerKeystream.textContent = `KEYSTREAM / ${key.toUpperCase()} · REPEATING`;
        }

        // Output Result
        this.elements.textOutput.textContent = resultText;
        this.elements.outputCount.textContent = resultText.length;
        
        this.updateTimestamp();
    },

    copyOutput: function() {
        const output = this.elements.textOutput.textContent;
        if (output) {
            navigator.clipboard.writeText(output).then(() => {
                alert('Copied to clipboard!');
            });
        }
    },

    clearOutput: function() {
        this.elements.textOutput.textContent = '';
        this.elements.outputCount.textContent = '0';
    },

    resetWorkspace: function() {
        this.elements.textInput.value = '';
        this.elements.keyInput.value = '';
        this.elements.inputCount.textContent = '0';
        this.clearOutput();
        
        if (this.state.method === 'caesar') {
            this.elements.footerKeystream.textContent = 'SHIFT KEY / -';
        } else {
            this.elements.footerKeystream.textContent = 'KEYSTREAM / - / REPEATING';
        }
    },

    updateTimestamp: function() {
        const now = new Date();
        const timeString = now.toISOString().split('T')[1].split('.')[0];
        this.elements.lastRunTime.textContent = `${timeString} UTC`;
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});