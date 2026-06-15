<?php
// 1. Target link jo strictly define ho chuka hai
$targetIDLink = "https://muhammadtaqi512q-oss.github.io/MASTER-AI-2/1";

// 2. URL parameters se API key nikalna ($_GET['api'])
$userAPI = isset($_GET['api']) ? trim($_GET['api']) : '';

// Defualt variables status text aur class ke liye
$statusText = "VERIFYING...";
$statusClass = "king-text";
$isSuccess = false;

// 3. API Validation Rules Function
function validateAPI($api) {
    if (empty($api)) {
        return false;
    }

    // Rule A: Total length exactly 10 characters honi chahiye
    if (strlen($api) !== 10) {
        return false;
    }

    // Rule B: 'mt' se start hona zaroori hai
    if (strpos($api, 'mt') !== 0) {
        return false;
    }

    // Rule C: Allowed chunks checklist (Regex pattern)
    // PHP mein regex ke liye delimiters /.../ ka use hota hai
    $pattern = '/^(mt|tm|zf|mh|az|5|12|14|72|786)+$/';
    if (preg_match($pattern, $api)) {
        return true;
    }

    return false;
}

// Validation run karein agar parameter pass hua hai
if (!empty($userAPI)) {
    if (validateAPI($userAPI)) {
        // Agar API correct hai tou yeh text screen par dikhe ga
        $statusText = "MUHAMMAD TAQI KING";
        $statusClass = "king-text";
        $isSuccess = true;
    } else {
        // Agar API key sahi na ho
        $statusText = "INVALID API KEY ACCESS DENIED";
        $statusClass = "error";
    }
}
?>
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

    <!-- PHP ke zariye dynamic classes aur text print ho raha hai -->
    <div id="status" class="<?php echo $statusClass; ?>">
        <?php echo $statusText; ?>
    </div>

    <?php if ($isSuccess): ?>
    <script>
        // Web 1 (Parent window) ko secure target link bhej rahe hain fetch aur frame karne ke liye
        // Yeh script tabhi generate hogi jab PHP server se validation pass ho chuki hogi
        if (window.parent !== window) {
            window.parent.postMessage({ 
                status: 'success', 
                url: "<?php echo $targetIDLink; ?>" 
            }, '*');
        }
    </script>
    <?php endif; ?>

</body>
</html>
