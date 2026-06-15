const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

// 1. Base HTML Template
const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web 2 - Security Logic</title>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            background-color: #000; 
            color: #fff; 
            font-family: 'Arial', sans-serif; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            overflow: hidden; 
        }
        .king-text { 
            font-size: 3rem; 
            font-weight: bold; 
            letter-spacing: 2px; 
            text-transform: uppercase; 
        }
        .error { 
            color: #ff4d4d; 
            font-size: 1.5rem; 
        }
    </style>
</head>
<body>
    <div id="status" class="king-text">VERIFYING...</div>
    <script>js_placeholder</script>
</body>
</html>
`;

// 2. JavaScript Security Logic Generator
function generateJS(startsWith, targetLink) {
    return `
        (function() {
            const targetIDLink = "${targetLink}";
            
            function getQueryParam(param) {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get(param);
            }
            
            function validateAPI(api) {
                if (!api) return false;
                if (api.length !== 10) return false;
                if (!api.startsWith('${startsWith}')) return false;
                
                const pattern = /^(mt|tm|zf|mh|az|5|12|14|72|786)+$/;
                return pattern.test(api);
            }
            
            const userAPI = getQueryParam('api');
            const statusDiv = document.getElementById('status');
            
            if (validateAPI(userAPI)) {
                statusDiv.textContent = "MUHAMMAD TAQI KING";
                statusDiv.className = "king-text";
                if (window.parent !== window) {
                    window.parent.postMessage({ status: 'success', url: targetIDLink }, '*');
                }
            } else {
                statusDiv.textContent = "INVALID API KEY ACCESS DENIED";
                statusDiv.className = "error";
            }
        })();
    `;
}

// 3. Automation Core Logic
try {
    const dataPath = path.join(__dirname, 'data.json');
    if (!fs.existsSync(dataPath)) {
        console.error("Error: data.json file nahi mili!");
        process.exit(1);
    }
    
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const distPath = path.join(__dirname, 'dist');
    
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath);
    }
    
    data.forEach(item => {
        const rawJS = generateJS(item.startsWith, item.target);
        
        // High-level Obfuscation Configurations
        const obfuscatedJS = JavaScriptObfuscator.obfuscate(rawJS, {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1.0,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 0.4,
            stringArray: true,
            stringArrayThreshold: 1.0,
            stringArrayEncoding: ['rc4', 'base64'],
            splitStrings: true,
            unicodeEscapeSequence: true
        }).getObfuscatedCode();
        
        const finalHTML = htmlTemplate.replace('js_placeholder', obfuscatedJS);
        
        fs.writeFileSync(path.join(distPath, item.outputFile), finalHTML);
        console.log("Successfully generated secure file: " + item.outputFile);
    });
    
    console.log("All files compiled and obfuscated successfully!");
} catch (error) {
    console.error("Compilation failed with error: ", error);
    process.exit(1);
}
