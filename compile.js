const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

// HTML Ka Base Template
const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web 2 - Security Logic</title>
    <style>
        body { margin: 0; padding: 0; background-color: #000; color: #fff; font-family: 'Arial', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden; }
        .king-text { font-size: 3rem; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; }
        .error { color: #ff4d4d; font-size: 1.5rem; }
    </style>
</head>
<body>
    <div id="status" class="king-text">VERIFYING...</div>
    <script>js_placeholder</script>
</body>
</html>
`;

// Raw JavaScript Logic Jo Chhupani Hai
function generateJS(startsWith, targetLink) {
    return `
        (function() {
            const targetIDLink = "${targetLink}";
            function getQueryParam(param) {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get(param);
            }
            function validateAPI(api) {
                if (!api || api.length !== 10) return false;
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

// Data read karke obfuscated HTML files generate karna
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

// 'dist' folder jahan public files jayengi
if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');

data.forEach(item => {
    const rawJS = generateJS(item.startsWith, item.target);
    
    // JS ko encrypt/obfuscate karna taake koi parh na sake
    const obfuscatedJS = JavaScriptObfuscator.obfuscate(rawJS, {
        compact: true,
        controlFlowFlattening: true,
        stringArray: true,
        stringArrayThreshold: 1.0
    }).getObfuscatedCode();

    // Template mein fit karna
    const finalHTML = htmlTemplate.replace('js_placeholder', obfuscatedJS);
    
    // File save karna
    fs.writeFileSync(path.join('./dist', item.outputFile), finalHTML);
    console.log(\`Generated obfuscated file: \${item.outputFile}\`);
});
