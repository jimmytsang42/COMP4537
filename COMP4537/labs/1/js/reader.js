// Constant variables for IDs, events, and other reusable values
const DOM_CONTENT_LOADED = "DOMContentLoaded";
const NOTES = "notes";
const BLANK = "";
const READER_HEADER = "readerHeader";
const LAST_RETRIEVED_TIME = "last-retrieved-time";
const BACK_TO_INDEX = "back-to-index";
const NOTES_DISPLAY = "notes-display";
const CLICK = "click";
const INDEX = "index.html";
const TIME_FORMAT = "2-digit";

class NotesReader {
    constructor(displayElement, lastRetrievedElement) {
        this.displayElement = displayElement;
        this.lastRetrievedElement = lastRetrievedElement;
        this.setupAutoUpdate();
    }

    displayNotes() {
        const notes = JSON.parse(localStorage.getItem(NOTES)) || [];
        let notesHTML = BLANK;
        notes.forEach((note) => {
            notesHTML += `<p>${note.content}</p>`;
        });
        this.displayElement.innerHTML = notesHTML;
        this.lastRetrievedElement.textContent = `Updated at: ${new Date().toLocaleTimeString([], { hour: TIME_FORMAT, minute: TIME_FORMAT, second: TIME_FORMAT, hour12: true })}`;
    }

    setupAutoUpdate() {
        this.displayNotes();
        setInterval(() => this.displayNotes(), 2000);
    }
}

// Make sure this runs after the DOM has loaded to ensure the elements exist
document.addEventListener(DOM_CONTENT_LOADED, () => {

    // Initialization
    const notesDisplay = document.getElementById(NOTES_DISPLAY);
    const lastRetrievedTime = document.getElementById(LAST_RETRIEVED_TIME);
    const backToIndex = document.getElementById(BACK_TO_INDEX);

    // Set text content
    document.title = READER_MESSAGES.readerTitle;
    document.getElementById(READER_HEADER).textContent = READER_MESSAGES.readerTitle;
    lastRetrievedTime.textContent = READER_MESSAGES.lastRetrievedTime;
    backToIndex.textContent = READER_MESSAGES.backToIndex;

    // Initialize the NotesReader
    const notesReader = new NotesReader(notesDisplay, lastRetrievedTime);

    // Event listener for back to index button
    backToIndex.addEventListener(CLICK, function () {
        window.location.href = INDEX;
    });
});


/* ChatGPT was used to:
- Provide outline of OOP structure
- Check for coding style and consistency
- Give suggestions for what methods to call
*/
