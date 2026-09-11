/*
=================================================
 Code Compare
 Smart Code Normalization Module
 Version : 1.0
=================================================

This module provides a language-aware "smart normalization"
layer that is used ONLY for logical code comparison.

It deliberately does NOT modify the original code shown in
the Monaco editors. Monaco continues to display and diff the
original values (see getCode / App.model).

The normalization below is intentionally conservative. It only
removes formatting that can never change the meaning of code:

  - mixed line endings
  - trailing whitespace (spaces/tabs at the end of a line)
  - empty / whitespace-only lines (blank lines)

It never strips leading indentation and never collapses internal
whitespace, because both can be meaningful (Python, YAML,
Makefile, string literals, template literals, regular
expressions, HTML content, CSS values).
*/

// =========================================
// Comparison Modes
//
// Structured so additional comparison
// strategies can be added later without
// rewriting the pipeline.
// =========================================

const COMPARE_MODE = {

    STRICT: "strict",
    SMART: "smart",
    SEMANTIC: "semantic"

};

// =========================================
// Current Comparison Mode
// =========================================

let currentCompareMode = COMPARE_MODE.SMART;

// =========================================
// Whitespace-Sensitive Languages
//
// These languages use leading indentation
// as part of their syntax, so indentation
// must always be preserved.
// =========================================

const WHITESPACE_SENSITIVE_LANGUAGES = {

    python: true,
    yaml: true,
    makefile: true

};

// =========================================
// Is Whitespace Sensitive
// =========================================

function isWhitespaceSensitive(language) {

    return WHITESPACE_SENSITIVE_LANGUAGES[
        language
    ] === true;

}

// =========================================
// Normalize Line Endings
//
// Convert \r\n and \r to \n so that
// different platforms produce identical
// logical output.
// =========================================

function normalizeLineEndings(text) {

    return text

        .replace(/\r\n/g, "\n")

        .replace(/\r/g, "\n");

}

// =========================================
// Trim Trailing Whitespace
//
// Remove spaces/tabs at the end of a line.
// Trailing whitespace never affects logic.
// =========================================

function trimTrailingWhitespace(line) {

    return line.replace(/[ \t]+$/, "");

}

// =========================================
// Smart Normalize Code
//
// Entry point for the logical comparison
// pipeline:
//
//   normalizeCode(code, language)
//
// 1. Normalize line endings.
// 2. Trim trailing whitespace on each line.
// 3. Drop empty / whitespace-only lines so
//    blank-line differences are ignored.
// 4. Keep every non-blank line intact,
//    including its leading indentation.
// =========================================

function normalizeCode(code, language) {

    if (
        typeof code !== "string"
    ) {
        return "";
    }

    const normalizedLines = [];

    const lines = normalizeLineEndings(code)

        .split("\n");

    for (let i = 0; i < lines.length; i++) {

        const line = trimTrailingWhitespace(
            lines[i]
        );

        // Skip empty / whitespace-only lines.
        // These carry no meaning and would
        // otherwise shift every following line.
        if (line.trim() === "") {
            continue;
        }

        // Preserve leading indentation here.
        // For whitespace-sensitive languages
        // (Python, YAML, Makefile) it is
        // meaningful and must not be removed.
        normalizedLines.push(line);

    }

    return normalizedLines.join("\n");

}

// =========================================
// Normalize Code By Mode
//
// Routes to the correct normalization
// strategy for the current comparison mode.
// Extensible for future SEMANTIC mode.
// =========================================

function normalizeCodeByMode(code, language) {

    if (
        currentCompareMode === COMPARE_MODE.STRICT
    ) {
        // Strict: only unify line endings,
        // keep everything else exactly as-is.
        return normalizeLineEndings(code);
    }

    // SMART (and, for now, SEMANTIC) mode:
    // ignore irrelevant formatting.
    return normalizeCode(code, language);

}

// =========================================
// Set Comparison Mode
// =========================================

function setCompareMode(mode) {

    if (
        mode === COMPARE_MODE.STRICT ||
        mode === COMPARE_MODE.SMART ||
        mode === COMPARE_MODE.SEMANTIC
    ) {
        currentCompareMode = mode;
    }

}

// =========================================
// Get Comparison Mode
// =========================================

function getCompareMode() {

    return currentCompareMode;

}

// =========================================
// Normalization API
// =========================================

const Normalizer = {

    normalizeCode,
    normalizeCodeByMode,
    isWhitespaceSensitive,
    setCompareMode,
    getCompareMode,
    MODE: COMPARE_MODE

};
