/*
=================================================
 Code Compare Studio
 Utilities Module
 Version : 1.0
=================================================
*/


// =========================================
// Notification Types
// =========================================

const NOTIFICATION = {

    SUCCESS: "success",

    ERROR: "error",

    WARNING: "warning",

    INFO: "info"

};




// =========================================
// Show Notification
// =========================================

function showNotification(

    message,

    type = NOTIFICATION.INFO,

    duration = 3000

) {

    const container = document.getElementById(

        "notificationContainer"

    );



    if (!container) {

        console.warn(

            "Notification container not found."

        );

        return;

    }



    const notification = document.createElement(

        "div"

    );



    notification.className =

        "notification " + type;



    notification.innerHTML =

        "<span class='notification-icon'>"

        +

        getNotificationIcon(type)

        +

        "</span>"

        +

        "<span class='notification-message'>"

        +

        escapeHtml(message)

        +

        "</span>";



    container.appendChild(

        notification

    );



    requestAnimationFrame(function () {

        notification.classList.add(

            "show"

        );

    });



    setTimeout(function () {

        hideNotification(

            notification

        );

    }, duration);

}



function updateCompareStatus(message) {

    const status =
        document.getElementById(
            "statusText"
        );


    if (status) {

        status.innerText = message;

    }

}




// =========================================
// Hide Notification
// =========================================

function hideNotification(notification) {

    if (!notification) {

        return;

    }



    notification.classList.remove(

        "show"

    );



    notification.classList.add(

        "hide"

    );



    setTimeout(function () {

        if (notification.parentNode) {

            notification.parentNode.removeChild(

                notification

            );

        }

    }, 300);

}




// =========================================
// Clear Notifications
// =========================================

function clearNotifications() {

    const container = document.getElementById(

        "notificationContainer"

    );



    if (!container) {

        return;

    }



    container.innerHTML = "";

}




// =========================================
// Notification Icon
// =========================================

function getNotificationIcon(type) {

    switch (type) {

        case NOTIFICATION.SUCCESS:

            return "✅";



        case NOTIFICATION.ERROR:

            return "❌";



        case NOTIFICATION.WARNING:

            return "⚠️";



        default:

            return "ℹ️";

    }

}




// =========================================
// Confirm Dialog
// =========================================

function showConfirm(message, onConfirm, onCancel = null) {

    const overlay = document.createElement("div");

    overlay.className = "confirm-overlay";



    const box = document.createElement("div");

    box.className = "confirm-box";



    box.innerHTML = `

        <div class="confirm-message">

            ${escapeHtml(message)}

        </div>


        <div class="confirm-actions">

            <button class="confirm-ok">

                Confirm

            </button>


            <button class="confirm-cancel">

                Cancel

            </button>

        </div>

    `;



    overlay.appendChild(box);



    document.body.appendChild(overlay);



    const confirmButton = box.querySelector(

        ".confirm-ok"

    );



    const cancelButton = box.querySelector(

        ".confirm-cancel"

    );




    function close() {

        overlay.classList.add(

            "hide"

        );


        setTimeout(function () {

            if (overlay.parentNode) {

                overlay.parentNode.removeChild(

                    overlay

                );

            }

        }, 200);

    }




    confirmButton.addEventListener(

        "click",

        function () {

            close();


            if (typeof onConfirm === "function") {

                onConfirm();

            }

        }

    );




    cancelButton.addEventListener(

        "click",

        function () {

            close();


            if (typeof onCancel === "function") {

                onCancel();

            }

        }

    );



    requestAnimationFrame(function () {

        overlay.classList.add(

            "show"

        );

    });

}



// =========================================
// Success Message
// =========================================

function notifySuccess(message) {

    showNotification(

        message,

        NOTIFICATION.SUCCESS

    );

}




// =========================================
// Error Message
// =========================================

function notifyError(message) {

    showNotification(

        message,

        NOTIFICATION.ERROR

    );

}




// =========================================
// Warning Message
// =========================================

function notifyWarning(message) {

    showNotification(

        message,

        NOTIFICATION.WARNING

    );

}




// =========================================
// Info Message
// =========================================

function notifyInfo(message) {

    showNotification(

        message,

        NOTIFICATION.INFO

    );

}


// =========================================
// Copy Text
// =========================================

async function copyText(text) {

    try {

        await navigator.clipboard.writeText(text);

        notifySuccess("Copied to clipboard.");

        return true;

    }

    catch (error) {

        console.error(error);

        notifyError("Failed to copy text.");

        return false;

    }

}




// =========================================
// Download Text File
// =========================================

function downloadText(fileName, content) {

    const blob = new Blob(

        [content],

        {

            type: "text/plain;charset=utf-8"

        }

    );



    const url = URL.createObjectURL(blob);



    const link = document.createElement("a");



    link.href = url;

    link.download = fileName;



    document.body.appendChild(link);



    link.click();



    document.body.removeChild(link);



    URL.revokeObjectURL(url);

}




// =========================================
// Download Code
// =========================================

function downloadCode(fileName, code) {

    downloadText(

        fileName,

        code

    );



    notifySuccess(

        "File downloaded."

    );

}




// =========================================
// Normalize Text
// =========================================

function normalizeText(text) {

    return text

        .replace(/\r\n/g, "\n")

        .replace(/\r/g, "\n")

        .trim();

}




// =========================================
// Normalize Code
// =========================================

function normalizeCode(text) {

    return normalizeText(text);

}




// =========================================
// File Extension
// =========================================

function getFileExtension(language) {

    switch (language) {

        case "javascript":

            return "js";



        case "typescript":

            return "ts";



        case "html":

            return "html";



        case "css":

            return "css";



        case "json":

            return "json";



        case "xml":

            return "xml";



        case "php":

            return "php";



        case "python":

            return "py";



        case "cpp":

            return "cpp";



        case "c":

            return "c";



        case "java":

            return "java";



        case "sql":

            return "sql";



        default:

            return "txt";

    }

}




// =========================================
// Build File Name
// =========================================

function buildFileName(

    language,

    name = "code"

) {

    return (

        name

        +

        "."

        +

        getFileExtension(language)

    );

}




// =========================================
// Format File Size
// =========================================

function formatFileSize(bytes) {

    if (bytes < 1024) {

        return bytes + " B";

    }



    if (bytes < 1024 * 1024) {

        return (

            bytes / 1024

        ).toFixed(2)

            +

            " KB";

    }



    return (

        bytes /

        (1024 * 1024)

    ).toFixed(2)

        +

        " MB";

}




// =========================================
// Get Text Size
// =========================================

function getTextSize(text) {

    return new Blob(

        [text]

    ).size;

}




// =========================================
// Get Formatted Text Size
// =========================================

function getFormattedTextSize(text) {

    return formatFileSize(

        getTextSize(text)

    );

}


// =========================================
// Debounce
// =========================================

function debounce(callback, delay = 300) {

    let timer = null;

    return function (...args) {

        clearTimeout(timer);

        timer = setTimeout(function () {

            callback.apply(this, args);

        }, delay);

    };

}




// =========================================
// Throttle
// =========================================

function throttle(callback, delay = 300) {

    let waiting = false;

    return function (...args) {

        if (waiting) {

            return;

        }

        callback.apply(this, args);

        waiting = true;

        setTimeout(function () {

            waiting = false;

        }, delay);

    };

}




// =========================================
// Sleep
// =========================================

function sleep(milliseconds) {

    return new Promise(function (resolve) {

        setTimeout(resolve, milliseconds);

    });

}




// =========================================
// Generate UUID
// =========================================

function generateUUID() {

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"

        .replace(/[xy]/g, function (character) {

            const random = Math.random() * 16 | 0;

            const value = character === "x"

                ? random

                : (random & 0x3 | 0x8);

            return value.toString(16);

        });

}




// =========================================
// Random ID
// =========================================

function randomId(prefix = "id") {

    return (

        prefix

        +

        "_"

        +

        Math.random()

            .toString(36)

            .substring(2, 10)

    );

}




// =========================================
// Current Timestamp
// =========================================

function getTimestamp() {

    return Date.now();

}




// =========================================
// Current Time
// =========================================

function getCurrentTime() {

    return new Date()

        .toLocaleTimeString();

}




// =========================================
// Current Date
// =========================================

function getCurrentDate() {

    return new Date()

        .toLocaleDateString();

}




// =========================================
// Format Date Time
// =========================================

function formatDateTime(date = new Date()) {

    return (

        date.toLocaleDateString()

        +

        " "

        +

        date.toLocaleTimeString()

    );

}




// =========================================
// Is Empty
// =========================================

function isEmpty(value) {

    return (

        value === null ||

        value === undefined ||

        value === ""

    );

}




// =========================================
// Is Blank
// =========================================

function isBlank(text) {

    return text.trim() === "";

}




// =========================================
// Clamp Number
// =========================================

function clamp(value, min, max) {

    return Math.min(

        Math.max(value, min),

        max

    );

}




// =========================================
// Round Number
// =========================================

function round(value, digits = 2) {

    return Number(

        value.toFixed(digits)

    );

}




// =========================================
// Random Integer
// =========================================

function randomInt(min, max) {

    return Math.floor(

        Math.random() *

        (max - min + 1)

    ) + min;

}




// =========================================
// Capitalize
// =========================================

function capitalize(text) {

    if (isEmpty(text)) {

        return "";

    }

    return (

        text.charAt(0)

            .toUpperCase()

        +

        text.slice(1)

    );

}


// =========================================
// Escape HTML
// =========================================

function escapeHtml(text) {

    if (text === null || text === undefined) {

        return "";

    }

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}




// =========================================
// Unescape HTML
// =========================================

function unescapeHtml(text) {

    const textarea = document.createElement("textarea");

    textarea.innerHTML = text;

    return textarea.value;

}




// =========================================
// Remove Extra Spaces
// =========================================

function removeExtraSpaces(text) {

    return text

        .replace(/[ \t]+/g, " ")

        .trim();

}




// =========================================
// Remove Empty Lines
// =========================================

function removeEmptyLines(text) {

    return text

        .split("\n")

        .filter(function (line) {

            return line.trim() !== "";

        })

        .join("\n");

}




// =========================================
// Normalize Line Endings
// =========================================

function normalizeLineEndings(text) {

    return text

        .replace(/\r\n/g, "\n")

        .replace(/\r/g, "\n");

}




// =========================================
// Compare Text
// =========================================

function compareText(text1, text2) {

    return normalizeText(text1) === normalizeText(text2);

}




// =========================================
// Deep Clone
// =========================================

function deepClone(object) {

    return JSON.parse(

        JSON.stringify(object)

    );

}




// =========================================
// Merge Objects
// =========================================

function mergeObjects(target, source) {

    return Object.assign(

        {},

        target,

        source

    );

}




// =========================================
// Safe JSON Parse
// =========================================

function safeJsonParse(text) {

    try {

        return JSON.parse(text);

    }

    catch (error) {

        return null;

    }

}




// =========================================
// Safe JSON Stringify
// =========================================

function safeJsonStringify(object) {

    try {

        return JSON.stringify(

            object,

            null,

            4

        );

    }

    catch (error) {

        return "";

    }

}




// =========================================
// Logger
// =========================================

function log() {

    console.log(

        "[Code Compare]",

        ...arguments

    );

}




// =========================================
// Warning Logger
// =========================================

function warn() {

    console.warn(

        "[Code Compare]",

        ...arguments

    );

}




// =========================================
// Error Logger
// =========================================

function error() {

    console.error(

        "[Code Compare]",

        ...arguments

    );

}




// =========================================
// Version
// =========================================

function getVersion() {

    return "1.0.0";

}




// =========================================
// About
// =========================================

function about() {

    console.table({

        Name: "Code Compare Studio",

        Version: getVersion(),

        Author: "Developer",

        Engine: "Monaco Editor"

    });

}