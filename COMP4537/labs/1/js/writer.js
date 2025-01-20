// Constant variables for IDs, events, and other reusable values
const DOM_CONTENT_LOADED = "DOMContentLoaded";
const NOTE = "note";
const DIV = "div";
const NOTES = "notes";
const INPUT = "input";
const TEXT_AREA = "textarea";
const BUTTON = "button";
const BLANK = "";
const WRITER_HEADER = "writerHeader";
const LAST_SAVED_TIME = "last-saved-time";
const BACK_TO_INDEX = "back-to-index";
const ADD_NOTE = "add-note";
const CLICK = "click";
const INDEX = "index.html";
const TIME_FORMAT = "2-digit";
const NOTES_CONTAINER = "notes-container";

class Note {
    constructor(content = BLANK) {
        this.content = content;
    }

    // Creates and returns a DOM element for this note
    createElement(index, onRemove, onUpdate) {
        const div = document.createElement(DIV);
        div.classList.add(NOTE);

        const textarea = document.createElement(TEXT_AREA);
        textarea.value = this.content;
        textarea.addEventListener(INPUT, (inputEventObject) => {
            this.content = inputEventObject.target.value;
            onUpdate();
        });

        const removeButton = document.createElement(BUTTON);
        removeButton.textContent = WRITER_MESSAGES.removeButton
        removeButton.addEventListener(CLICK, () => onRemove(index));

        div.appendChild(textarea);
        div.appendChild(removeButton);
        return div;
    }
}

class NotesManager {
    constructor(container, lastSavedTimeElement) {
        this.container = container;
        this.lastSavedTimeElement = lastSavedTimeElement;
        let notesData = JSON.parse(localStorage.getItem(NOTES)) || [];
        this.notes = [];
        notesData.forEach((note) => {
            this.notes.push(new Note(note.content));
        });
        this.renderNotes();
        this.setupAutoSave();
    }

    addNote() {
        this.notes.push(new Note());
        this.renderNotes();
    }

    removeNote(index) {
        this.notes.splice(index, 1);
        this.saveToLocalStorage();
        this.renderNotes();
    }

    saveToLocalStorage() {
        localStorage.setItem(NOTES, JSON.stringify(this.notes));
        this.lastSavedTimeElement.textContent = `Stored at: ${new Date().toLocaleTimeString([], { hour: TIME_FORMAT, minute: TIME_FORMAT, second: TIME_FORMAT, hour12: true })}`;
    }

    renderNotes() {
        this.container.innerHTML = BLANK;
        this.notes.forEach((note, index) => {
            const noteElement = note.createElement(
                index,
                this.removeNote.bind(this),
                this.saveToLocalStorage.bind(this)
            );
            this.container.appendChild(noteElement);
        });
    }

    setupAutoSave() {
        setInterval(() => this.saveToLocalStorage(), 2000);
    }
}

// Make sure this runs after the DOM has loaded to ensure the elements exist
document.addEventListener(DOM_CONTENT_LOADED, () => {

    // Initialization
    const lastSavedTimeElement = document.getElementById(LAST_SAVED_TIME);
    const addNoteButton = document.getElementById(ADD_NOTE);
    const backToIndexButton = document.getElementById(BACK_TO_INDEX);

    // Set text content
    document.title = WRITER_MESSAGES.writerTitle;
    document.getElementById(WRITER_HEADER).textContent = WRITER_MESSAGES.writerTitle;
    lastSavedTimeElement.textContent = WRITER_MESSAGES.lastSavedTime;
    addNoteButton.textContent = WRITER_MESSAGES.addNote;
    backToIndexButton.textContent = WRITER_MESSAGES.backToIndex;

    // NotesManager setup
    const notesContainer = document.getElementById(NOTES_CONTAINER);

    const notesManager = new NotesManager(notesContainer, lastSavedTimeElement);

    // Attach event listeners
    addNoteButton.addEventListener(CLICK, () => notesManager.addNote());
    backToIndexButton.addEventListener(CLICK, () => {
        window.location.href = INDEX;
    });
});

/* ChatGPT was used to:
- Provide outline of OOP structure
- Check for coding style and consistency
- Give suggestions for what methods to call
*/
