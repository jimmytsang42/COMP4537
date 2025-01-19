class Note {
    constructor(content = "") {
        this.content = content;
    }

    // Creates and returns a DOM element for this note
    createElement(index, onRemove, onUpdate) {
        const div = document.createElement("div");
        div.classList.add("note");

        const textarea = document.createElement("textarea");
        textarea.value = this.content;
        textarea.addEventListener("input", (e) => {
            this.content = e.target.value;
            onUpdate();
        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => onRemove(index));

        div.appendChild(textarea);
        div.appendChild(removeButton);
        return div;
    }
}

class NotesManager {
    constructor(container, lastSavedTimeElement) {
        this.container = container;
        this.lastSavedTimeElement = lastSavedTimeElement;
        let notesData = JSON.parse(localStorage.getItem("notes")) || [];
        this.notes = [];
        notesData.forEach((n) => {
            this.notes.push(new Note(n.content));
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
        localStorage.setItem("notes", JSON.stringify(this.notes));
        this.lastSavedTimeElement.textContent = `Stored at: ${new Date().toLocaleTimeString()}`;
    }

    renderNotes() {
        this.container.innerHTML = "";
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

const notesContainer = document.getElementById("notes-container");
const addNoteButton = document.getElementById("add-note");
const lastSavedTime = document.getElementById("last-saved-time");

const notesManager = new NotesManager(notesContainer, lastSavedTime);

addNoteButton.addEventListener("click", () => notesManager.addNote());
