/*
=================================================
 Code Compare Studio
 Editor Module
 Version : 2.1 Refactored
=================================================
*/


// =========================================
// Editor Constants
// =========================================

const LEFT = "left";

const RIGHT = "right";




// =========================================
// Diff Editor Reference
// =========================================

let diffEditor = null;





// =========================================
// Create Editors
// =========================================

function createEditors() {


    if (typeof monaco === "undefined") {

        throw new Error(
            "Monaco editor is not available."
        );

    }



    createModels();



    App.editor.left = createEditor(

        "editor1",

        App.model.left

    );



    App.editor.right = createEditor(

        "editor2",

        App.model.right

    );



}






// =========================================
// Create Monaco Models
// =========================================

function createModels() {


    App.model.left =

        monaco.editor.createModel(

            "",

            App.state.language

        );



    App.model.right =

        monaco.editor.createModel(

            "",

            App.state.language

        );


}






// =========================================
// Create Editor Instance
// =========================================

function createEditor(

    containerId,

    model

) {


    const container =

        document.getElementById(

            containerId

        );



    if (!container) {

        throw new Error(

            "Editor container not found: "

            +

            containerId

        );

    }




    return monaco.editor.create(

        container,

        {


            model: model,


            theme:

                App.state.theme,



            fontSize:

                App.config.fontSize,



            tabSize:

                App.config.tabSize,



            insertSpaces:

                App.config.insertSpaces,



            automaticLayout: true,



            minimap: {


                enabled: true


            },



            wordWrap: "on",



            scrollBeyondLastLine: false


        }

    );


}

// =========================================
// Register Editor Events
// =========================================

function registerEditorEvents() {


    if (!App.editor.left || !App.editor.right) {

        return;

    }



    App.editor.left.onDidChangeModelContent(

        function () {


            updateStatistics();


        }

    );



    App.editor.right.onDidChangeModelContent(

        function () {


            updateStatistics();


        }

    );




    App.editor.left.onDidChangeCursorPosition(

        function () {


            updateCursorPosition(

                LEFT

            );


        }

    );



    App.editor.right.onDidChangeCursorPosition(

        function () {


            updateCursorPosition(

                RIGHT

            );


        }

    );


}






// =========================================
// Change Language
// =========================================

function setLanguage(language) {


    if (!language) {

        return;

    }



    App.state.language = language;




    if (App.model.left) {


        monaco.editor.setModelLanguage(

            App.model.left,

            language

        );


    }





    if (App.model.right) {


        monaco.editor.setModelLanguage(

            App.model.right,

            language

        );


    }





    const status =

        document.getElementById(

            "languageStatus"

        );



    if (status) {


        status.innerText =

            language;


    }



}






// =========================================
// Change Editor Theme
// =========================================

function setEditorTheme(theme) {


    if (typeof monaco === "undefined") {

        return;

    }



    monaco.editor.setTheme(

        theme

    );



    App.state.theme = theme;


}






// =========================================
// Change Font Size
// =========================================

function setFontSize(size) {


    size = Number(size);



    if (isNaN(size)) {

        return;

    }




    App.config.fontSize = size;




    if (App.editor.left) {


        App.editor.left.updateOptions({

            fontSize: size

        });


    }




    if (App.editor.right) {


        App.editor.right.updateOptions({

            fontSize: size

        });


    }





    if (diffEditor) {


        diffEditor.updateOptions({

            fontSize: size

        });


    }


}






// =========================================
// Layout Editors
// =========================================

function layoutEditors() {



    if (App.editor.left) {


        App.editor.left.layout();


    }



    if (App.editor.right) {


        App.editor.right.layout();


    }



    if (diffEditor) {


        diffEditor.layout();


    }


}






// =========================================
// Update Cursor Position
// =========================================

function updateCursorPosition(side) {


    const editor =

        getEditor(side);



    if (!editor) {

        return;

    }




    const position =

        editor.getPosition();




    if (!position) {

        return;

    }




    const element =

        document.getElementById(

            "cursorPosition"

        );



    if (element) {


        element.innerText =

            "Ln "

            +

            position.lineNumber

            +

            ", Col "

            +

            position.column;


    }


}

// =========================================
// Get Editor By Side
// =========================================

function getEditor(side) {


    if (side === LEFT) {

        return App.editor.left;

    }



    if (side === RIGHT) {

        return App.editor.right;

    }



    return null;

}





// =========================================
// Get Model By Side
// =========================================

function getModel(side) {


    if (side === LEFT) {

        return App.model.left;

    }



    if (side === RIGHT) {

        return App.model.right;

    }



    return null;

}






// =========================================
// Get Code
// =========================================

function getCode(side) {


    const editor =

        getEditor(side);



    if (!editor) {

        return "";

    }



    return editor.getValue();


}






// =========================================
// Set Code
// =========================================

function setCode(side, value) {


    const editor =

        getEditor(side);



    if (!editor) {

        return;

    }



    editor.setValue(

        value || ""

    );


}






// =========================================
// Silent Set Value
// =========================================

function setValueSilent(side, value) {


    const model =

        getModel(side);



    if (!model) {

        return;

    }



    model.pushEditOperations(

        [],

        [

            {

                range:

                    model.getFullModelRange(),


                text:

                    value || ""


            }

        ],


        function () {

            return null;

        }

    );


}






// =========================================
// Clear Single Editor
// =========================================

function clearEditor(side) {


    setCode(

        side,

        ""

    );


}






// =========================================
// Clear All Editors
// =========================================

function clearAllEditors() {


    clearEditor(

        LEFT

    );



    clearEditor(

        RIGHT

    );


}






// =========================================
// Undo
// =========================================

function undo(side) {


    const editor =

        getEditor(side);



    if (editor) {


        editor.trigger(

            "keyboard",

            "undo",

            null

        );


    }


}






// =========================================
// Redo
// =========================================

function redo(side) {


    const editor =

        getEditor(side);



    if (editor) {


        editor.trigger(

            "keyboard",

            "redo",

            null

        );


    }


}






// =========================================
// Select All
// =========================================

function selectAll(side) {


    const editor =

        getEditor(side);



    if (editor) {


        editor.trigger(

            "keyboard",

            "editor.action.selectAll",

            null

        );


    }


}






// =========================================
// Copy Selection
// =========================================

function copySelection(side) {


    const editor =

        getEditor(side);



    if (!editor) {

        return;

    }



    editor.trigger(

        "keyboard",

        "editor.action.clipboardCopyAction",

        null

    );


}

// =========================================
// Create Diff Editor
// =========================================

function createDiffEditor() {


    const container =

        document.getElementById(

            "diffContainer"

        );



    if (!container) {

        return;

    }



    if (diffEditor) {

        return;

    }




    diffEditor =

        monaco.editor.createDiffEditor(

            container,

            {


                theme:

                    App.state.theme,



                fontSize:

                    App.config.fontSize,



                automaticLayout: true,



                readOnly: true,



                renderSideBySide: true


            }

        );





    diffEditor.setModel({

        original:

            App.model.right,


        modified:

            App.model.left


    });


}






// =========================================
// Show Diff Editor
// =========================================

function showDiffEditor() {


    const container =

        document.getElementById(

            "diffContainer"

        );



    if (!container) {

        return;

    }




    createDiffEditor();




    container.classList.remove(

        "hidden"

    );




    if (diffEditor) {

        diffEditor.layout();

    }


}






// =========================================
// Hide Diff Editor
// =========================================

function hideDiffEditor() {


    const container =

        document.getElementById(

            "diffContainer"

        );



    if (!container) {

        return;

    }



    container.classList.add(

        "hidden"

    );


}






// =========================================
// Toggle Diff Editor
// =========================================

function toggleDiffEditor() {


    const container =

        document.getElementById(

            "diffContainer"

        );



    if (!container) {

        return;

    }



    if (

        container.classList.contains(

            "hidden"

        )

    ) {


        showDiffEditor();



        App.state.diffMode = true;



    }

    else {


        hideDiffEditor();



        App.state.diffMode = false;


    }


}






// =========================================
// Insert Text
// =========================================

function insertText(side, text) {


    const editor =

        getEditor(side);



    if (!editor) {

        return;

    }



    const selection =

        editor.getSelection();



    editor.executeEdits(

        "insert-text",

        [

            {


                range:

                    selection,


                text:

                    text


            }

        ]

    );


}






// =========================================
// Replace Selection
// =========================================

function replaceSelection(side, text) {


    insertText(

        side,

        text

    );


}






// =========================================
// Set Read Only
// =========================================

function setReadOnly(side, value) {


    const editor =

        getEditor(side);



    if (!editor) {

        return;

    }



    editor.updateOptions({

        readOnly:

            Boolean(value)

    });


}






// =========================================
// Is Read Only
// =========================================

function isReadOnly(side) {


    const editor =

        getEditor(side);



    if (!editor) {

        return false;

    }



    return editor.getOption(

        monaco.editor.EditorOption.readOnly

    );


}






// =========================================
// Dispose Editors
// =========================================

function disposeEditors() {


    if (diffEditor) {


        diffEditor.dispose();


        diffEditor = null;


    }




    if (App.editor.left) {


        App.editor.left.dispose();


        App.editor.left = null;


    }





    if (App.editor.right) {


        App.editor.right.dispose();


        App.editor.right = null;


    }





    if (App.model.left) {


        App.model.left.dispose();


        App.model.left = null;


    }





    if (App.model.right) {


        App.model.right.dispose();


        App.model.right = null;


    }



}

// =========================================
// Get Editor State
// =========================================

function getEditorState(side) {


    const editor =

        getEditor(side);



    if (!editor) {

        return null;

    }



    const model =

        getModel(side);



    return {


        value:

            editor.getValue(),



        language:

            model

                ?

                model.getLanguageId()

                :

                null,



        lineCount:

            model

                ?

                model.getLineCount()

                :

                0,



        position:

            editor.getPosition(),



        readOnly:

            isReadOnly(side)


    };


}






// =========================================
// Get Editor Actions
// =========================================

function getEditorActions(side) {


    const editor =

        getEditor(side);



    if (!editor) {

        return [];

    }



    return editor.getSupportedActions()

        .map(function (action) {


            return {


                id:

                    action.id,



                label:

                    action.label


            };


        });


}






// =========================================
// Get Current Editor
// =========================================

function getCurrentEditor() {


    if (

        App.editor.left &&

        App.editor.left.hasTextFocus()

    ) {

        return LEFT;

    }



    if (

        App.editor.right &&

        App.editor.right.hasTextFocus()

    ) {

        return RIGHT;

    }



    return LEFT;


}






// =========================================
// Focus Editor
// =========================================

function focusEditor(side) {


    const editor =

        getEditor(side);



    if (editor) {


        editor.focus();


    }


}






// =========================================
// Enable Editor
// =========================================

function enableEditor(side) {


    setReadOnly(

        side,

        false

    );


}






// =========================================
// Disable Editor
// =========================================

function disableEditor(side) {


    setReadOnly(

        side,

        true

    );


}






// =========================================
// Get Editor Line Count
// =========================================

function getEditorLineCount(side) {


    const model =

        getModel(side);



    if (!model) {

        return 0;

    }



    return model.getLineCount();


}






// =========================================
// Get Editor Language
// =========================================

function getEditorLanguage(side) {


    const model =

        getModel(side);



    if (!model) {

        return null;

    }



    return model.getLanguageId();


}






// =========================================
// Editor Statistics Helpers
// =========================================

function getLineCount(side) {


    const model =

        getModel(side);



    if (!model) {

        return 0;

    }



    return model.getLineCount();


}





function getWordCount(side) {


    const code =

        getCode(side);



    if (!code.trim()) {

        return 0;

    }



    return code

        .trim()

        .split(/\s+/)

        .length;


}






function getCharacterCount(side) {


    const code =

        getCode(side);



    return code.length;


}






function getFormattedTextSize(text) {


    if (!text) {

        return "0 B";

    }



    const bytes =

        new Blob(

            [text]

        ).size;



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
// Copy Editor Content
// =========================================

async function copyEditor(side) {


    const text =

        getCode(side);



    if (!text) {


        if (typeof notifyWarning === "function") {

            notifyWarning(

                "Editor is empty."

            );

        }


        return;

    }



    try {


        await navigator.clipboard.writeText(

            text

        );



        if (typeof notifySuccess === "function") {


            notifySuccess(

                "Code copied."

            );


        }



    }


    catch (error) {


        console.error(

            "Copy failed:",

            error

        );


    }


}






// =========================================
// Download Editor Content
// =========================================

function downloadEditor(side) {


    const text =

        getCode(side);



    if (!text) {

        if (typeof notifyWarning === "function") {

            notifyWarning(

                "Editor is empty."

            );

        }


        return;

    }



    const blob =

        new Blob(

            [

                text

            ],

            {

                type:

                    "text/plain"

            }

        );



    const url =

        URL.createObjectURL(

            blob

        );



    const link =

        document.createElement(

            "a"

        );



    link.href = url;



    link.download =

        "code.txt";



    link.click();



    URL.revokeObjectURL(

        url

    );


}






// =========================================
// Editor API
// =========================================

const EditorAPI = {


    createEditors,


    registerEditorEvents,


    getEditor,


    getModel,


    getCode,


    setCode,


    setValueSilent,


    clearEditor,


    clearAllEditors,


    setLanguage,


    setEditorTheme,


    setFontSize,


    layoutEditors,


    updateCursorPosition,


    createDiffEditor,


    showDiffEditor,


    hideDiffEditor,


    toggleDiffEditor,


    insertText,


    replaceSelection,


    undo,


    redo,


    selectAll,


    copySelection,


    setReadOnly,


    isReadOnly,


    getEditorState,


    getEditorActions,


    getCurrentEditor,


    focusEditor,


    enableEditor,


    disableEditor,


    disposeEditors


};