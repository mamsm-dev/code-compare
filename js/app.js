/*
=================================================
 Code Compare Studio
 Application Core
 Version : 2.1 Refactored
=================================================
*/


// =========================================
// Global App Object
// =========================================

const App = {


    state: {

        language: "javascript",

        theme: "vs-dark",

        diffMode: false,

        ready: false

    },


    config: {

        fontSize: 14,

        tabSize: 4,

        insertSpaces: true

    },


    editor: {

        left: null,

        right: null

    },


    model: {

        left: null,

        right: null

    }


};




// =========================================
// Application Start
// =========================================

document.addEventListener(

    "DOMContentLoaded",

    function () {

        startApplication();

    }

);




// =========================================
// Start Application
// =========================================

function startApplication() {


    loadMonaco()

        .then(function () {


            initializeApp();


        })

        .catch(function (error) {


            console.error(

                "Monaco loading error:",

                error

            );


            notifyError(

                "Monaco editor failed to load."

            );


        });


}






// =========================================
// Load Monaco Offline
// =========================================

function loadMonaco() {


    return new Promise(function (resolve, reject) {



        if (

            typeof monaco !== "undefined"

        ) {

            resolve();

            return;

        }



        if (

            typeof require === "undefined"

        ) {

            reject(

                new Error(

                    "Monaco loader not found."

                )

            );

            return;

        }



        require.config({

            paths: {

                vs:

                    "monaco/min/vs"

            }

        });



        require(

            [

                "vs/editor/editor.main"

            ],


            function () {


                resolve();


            },


            function (error) {


                reject(error);


            }

        );


    });


}







// =========================================
// Initialize Application
// =========================================

function initializeApp() {


    try {


        initializeConfig();



        createEditors();



        registerEditorEvents();



        initializeTheme();



        initializeToolbar();



        initializeShortcuts();



        initializeStatistics();



        initializeCompare();



        registerGlobalEvents();



        layoutEditors();



        App.state.ready = true;



        notifySuccess(

            "Application ready."

        );


    }


    catch (error) {



        console.error(

            "Application initialization error:",

            error

        );



        notifyError(

            error.message

        );


    }


}






// =========================================
// Initialize Config
// =========================================

function initializeConfig() {


    const savedFontSize =

        localStorage.getItem(

            "editorFontSize"

        );



    if (savedFontSize) {


        App.config.fontSize =

            Number(savedFontSize);


    }



}






// =========================================
// Save Config
// =========================================

function saveConfig() {


    localStorage.setItem(

        "editorFontSize",

        App.config.fontSize

    );


}






// =========================================
// Global Events
// =========================================

function registerGlobalEvents() {



    window.addEventListener(

        "resize",

        function () {


            layoutEditors();


        }

    );




    window.addEventListener(

        "beforeunload",

        function () {


            saveConfig();


        }

    );


}






// =========================================
// Change Font Size
// =========================================

function changeFontSize(size) {



    size = Number(size);



    if (

        isNaN(size)

    ) {

        return;

    }



    App.config.fontSize = size;



    setFontSize(size);



    saveConfig();


}






// =========================================
// Change Language
// =========================================

function changeLanguage(language) {


    App.state.language = language;



    setLanguage(

        language

    );


}






// =========================================
// Change Theme
// =========================================

function changeTheme(theme) {


    setAppTheme(

        theme

    );


}






// =========================================
// Application Status
// =========================================

function isAppReady() {


    return App.state.ready;


}






// =========================================
// Destroy Application
// =========================================

function destroyApp() {


    disposeEditors();



    App.editor.left = null;

    App.editor.right = null;



    App.model.left = null;

    App.model.right = null;



    App.state.ready = false;


}






// =========================================
// Debug Info
// =========================================

function getAppInfo() {


    return {


        ready:

            App.state.ready,


        language:

            App.state.language,


        theme:

            App.state.theme,


        editors:

        {

            left:

                !!App.editor.left,


            right:

                !!App.editor.right

        }


    };


}






// =========================================
// Application API
// =========================================

const AppAPI = {


    initializeApp,

    destroyApp,

    changeLanguage,

    changeTheme,

    changeFontSize,

    isAppReady,

    getAppInfo

};