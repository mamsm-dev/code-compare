/*
=================================================
 Code Compare Studio
 Compare Module
 Version : 2.0
=================================================
*/


// =========================================
// Initialize Compare
// =========================================

function initializeCompare() {

    updateCompareStatus(

        "Ready"

    );

}




// =========================================
// Main Compare Function
// =========================================

function compare() {

    const leftCode = getCode(LEFT);

    const rightCode = getCode(RIGHT);



    if (isBlank(leftCode)) {

        notifyWarning(

            "Your code editor is empty."

        );

        return false;

    }



    if (isBlank(rightCode)) {

        notifyWarning(

            "Reference code editor is empty."

        );

        return false;

    }



    const result = compareCodes();



    updateCompareStatistics();



    if (result) {

        notifySuccess(

            "Codes are identical."

        );

    }

    else {

        notifyError(

            "Codes are different."

        );

    }



    return result;

}




// =========================================
// Compare Codes
// =========================================

function compareCodes() {

    const left = normalizeText(

        getCode(LEFT)

    );



    const right = normalizeText(

        getCode(RIGHT)

    );



    return left === right;

}




// =========================================
// Get Difference Percentage
// =========================================

function getSimilarity() {

    const left = normalizeText(

        getCode(LEFT)

    );



    const right = normalizeText(

        getCode(RIGHT)

    );



    if (

        left === right

    ) {

        return 100;

    }



    const maxLength = Math.max(

        left.length,

        right.length

    );



    if (maxLength === 0) {

        return 100;

    }



    let sameCharacters = 0;



    for (

        let i = 0;

        i < maxLength;

        i++

    ) {

        if (

            left[i] === right[i]

        ) {

            sameCharacters++;

        }

    }



    return Math.round(

        (

            sameCharacters /

            maxLength

        )

        *

        100

    );

}




// =========================================
// Compare Report
// =========================================

function getCompareReport() {

    return {

        match: compareCodes(),

        similarity: getSimilarity(),

        leftLines: getLineCount(LEFT),

        rightLines: getLineCount(RIGHT),

        differences: getDifferenceCount()

    };

}




// =========================================
// Difference Count
// =========================================

function getDifferenceCount() {

    const leftLines = normalizeText(

        getCode(LEFT)

    )

        .split("\n");



    const rightLines = normalizeText(

        getCode(RIGHT)

    )

        .split("\n");



    const maxLines = Math.max(

        leftLines.length,

        rightLines.length

    );



    let differences = 0;



    for (

        let i = 0;

        i < maxLines;

        i++

    ) {

        if (

            leftLines[i] !== rightLines[i]

        ) {

            differences++;

        }

    }



    return differences;

}




// =========================================
// Update Compare Statistics
// =========================================

function updateCompareStatistics() {

    if (

        typeof updateCompareInfo === "function"

    ) {

        updateCompareInfo(

            getCompareReport()

        );

    }

}




// =========================================
// Show Diff
// =========================================

function showDiff() {

    if (

        isBlank(getCode(LEFT))

        ||

        isBlank(getCode(RIGHT))

    ) {

        notifyWarning(

            "Both editors need code."

        );

        return;

    }



    showDiffEditor();

}




// =========================================
// Hide Diff
// =========================================

function hideDiff() {

    hideDiffEditor();

}




// =========================================
// Toggle Diff
// =========================================

function toggleDiffMode() {

    toggleDiffEditor();

}




// =========================================
// Debug Report
// =========================================

function printCompareReport() {

    console.table(

        getCompareReport()

    );

}