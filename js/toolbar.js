/*
=================================================
 Code Compare Studio
 Toolbar Module
 Version : 2.0
=================================================
*/


// =========================================
// Initialize Toolbar
// =========================================

function initializeToolbar() {

    bindToolbarEvents();

}




// =========================================
// Bind All Toolbar Events
// =========================================

function bindToolbarEvents() {

    bindButton(

        "compareBtn",

        compare

    );



    bindButton(

        "diffBtn",

        toggleDiffMode

    );



    bindButton(

        "copyBtn",

        function () {

            copyEditor(LEFT);

        }

    );



    bindButton(

        "downloadBtn",

        function () {

            downloadEditor(LEFT);

        }

    );



    bindButton(

        "resetBtn",

        resetProject

    );



    bindLanguageChange();

    bindThemeChange();

}




// =========================================
// Generic Button Binder
// =========================================

function bindButton(id, callback) {

    const button = document.getElementById(id);



    if (!button) {

        console.warn(

            "Toolbar button not found:",

            id

        );

        return;

    }



    button.addEventListener(

        "click",

        callback

    );

}




// =========================================
// Reset Project
// =========================================

function resetProject() {

    showConfirm(

        "Clear all editors?",

        function () {

            clearAllEditors();



            resetStatistics();



            notifySuccess(

                "Editors cleared."

            );

        }

    );

}




// =========================================
// Language Change
// =========================================

function bindLanguageChange() {

    const select = document.getElementById(

        "language"

    );



    if (!select) {

        return;

    }



    select.addEventListener(

        "change",

        function () {

            setLanguage(

                this.value

            );

        }

    );

}




// =========================================
// Theme Change
// =========================================

function bindThemeChange() {

    const select = document.getElementById(

        "theme"

    );



    if (!select) {

        return;

    }



    select.addEventListener(

        "change",

        function () {

            setTheme(

                this.value

            );

        }

    );

}




// =========================================
// Enable Toolbar
// =========================================

function enableToolbar() {

    document

        .querySelectorAll(

            ".toolbar button"

        )

        .forEach(function (button) {

            button.disabled = false;

        });

}




// =========================================
// Disable Toolbar
// =========================================

function disableToolbar() {

    document

        .querySelectorAll(

            ".toolbar button"

        )

        .forEach(function (button) {

            button.disabled = true;

        });

}




// =========================================
// Toolbar State
// =========================================

function setToolbarState(enabled) {

    if (enabled) {

        enableToolbar();

    }

    else {

        disableToolbar();

    }

}




// =========================================
// Add Shortcut Support
// =========================================

function initializeShortcuts() {

    document.addEventListener(

        "keydown",

        function (event) {


            // Ctrl + Enter => Compare

            if (

                event.ctrlKey &&

                event.key === "Enter"

            ) {

                event.preventDefault();

                compare();

            }



            // Ctrl + D => Diff

            if (

                event.ctrlKey &&

                event.key.toLowerCase() === "d"

            ) {

                event.preventDefault();

                toggleDiffMode();

            }



            // Ctrl + Shift + C => Copy

            if (

                event.ctrlKey &&

                event.shiftKey &&

                event.key.toLowerCase() === "c"

            ) {

                event.preventDefault();

                copyEditor(LEFT);

            }
        }
    );
}