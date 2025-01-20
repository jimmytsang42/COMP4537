// Constant variables for IDs, events, and other reusable values
const HEADER1 = "header1";
const HEADER2 = "header2";
const DOM_CONTENT_LOADED = "DOMContentLoaded";
const WRITER_LINK = "writer-link";
const READER_LINK = "reader-link";

// Make sure this runs after the DOM has loaded to ensure the elements exist
document.addEventListener(DOM_CONTENT_LOADED, () => {
    document.title = MESSAGES.title;
    document.getElementById(HEADER1).textContent = MESSAGES.title;
    document.getElementById(HEADER2).textContent = MESSAGES.author;
    document.getElementById(WRITER_LINK).textContent = MESSAGES.writerLinkText;
    document.getElementById(READER_LINK).textContent = MESSAGES.readerLinkText;
});

/* ChatGPT was used to:
- Provide outline of OOP structure
- Check for coding style and consistency
- Give suggestions for what methods to call
*/
