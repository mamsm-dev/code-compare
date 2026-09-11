/*
=================================================
 Code Compare
 Statistics Module
 Version : 2.1 Refactored
=================================================
*/

// =========================================
// Initialize Statistics
// =========================================

function initializeStatistics() {

    updateStatistics();

}

// =========================================
// Update All Statistics
// =========================================

function updateStatistics() {

    updateEditorStatistics(

        LEFT

    );

    updateEditorStatistics(

        RIGHT

    );

}

// =========================================
// Update Editor Statistics
// =========================================

function updateEditorStatistics(side) {

    const code = getCode(side);

    const data = {

        lines:

            getLineCount(side),

        words:

            getWordCount(side),

        characters:

            getCharacterCount(side)

    };

    updateStatusBar(

        data

    );

}

// =========================================
// Update Status Bar
// =========================================

function updateStatusBar(data) {

    const lineElement =

        document.getElementById(

            "lineCount"

        );

    const wordElement =

        document.getElementById(

            "wordCount"

        );

    const charElement =

        document.getElementById(

            "charCount"

        );

    if (lineElement) {

        lineElement.innerText =

            "Lines:" + data.lines;

    }

    if (wordElement) {

        wordElement.innerText =

            "Words:" + data.words;

    }

    if (charElement) {

        charElement.innerText =

            "Characters:" + data.characters;

    }

}

// =========================================
// Update Cursor Position
// =========================================

function updateCursorPosition(side) {

    const editor =

        side === LEFT

            ? App.editor.left

            : App.editor.right;

    if (!editor) {

        return;

    }

    const position =

        editor.getPosition();

    if (!position) {

        return;

    }

    const cursor =

        document.getElementById(

            "cursorPosition"

        );

    if (cursor) {

        cursor.innerText =

            "Ln " +

            position.lineNumber +

            ", Col " +

            position.column;

    }

}

// =========================================
// Compare Statistics
// =========================================

function updateCompareStatistics() {

    if (

        typeof getCompareReport !== "function"

    ) {

        return;

    }

    const report =

        getCompareReport();

    const status =

        document.getElementById(

            "statusText"

        );

    if (status) {

        if (report.match) {

            status.innerText =

                "Codes are identical";

        }

        else {

            status.innerText =

                "Codes are different";

        }

    }

}

// =========================================
// Reset Statistics
// =========================================

function resetStatistics() {

    const lineElement =

        document.getElementById(

            "lineCount"

        );

    const wordElement =

        document.getElementById(

            "wordCount"

        );

    const charElement =

        document.getElementById(

            "charCount"

        );

    if (lineElement) {

        lineElement.innerText =

            "Lines:1";

    }

    if (wordElement) {

        wordElement.innerText =

            "Words:0";

    }

    if (charElement) {

        charElement.innerText =

            "Characters:0";

    }

}

// =========================================
// Get Statistics Data
// =========================================

function getStatisticsData() {

    return {

        left: {

            lines:

                getLineCount(LEFT),

            words:

                getWordCount(LEFT),

            characters:

                getCharacterCount(LEFT)

        },

        right: {

            lines:

                getLineCount(RIGHT),

            words:

                getWordCount(RIGHT),

            characters:

                getCharacterCount(RIGHT)

        },

        compare:

            typeof getCompareReport === "function"

                ?

                getCompareReport()

                :

                null

    };

}

// =========================================
// Statistics API
// =========================================

const StatisticsAPI = {

    updateStatistics,

    updateEditorStatistics,

    updateCursorPosition,

    updateCompareStatistics,

    resetStatistics,

    getStatisticsData

};
