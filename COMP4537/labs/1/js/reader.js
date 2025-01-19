class NotesReader {
    constructor(displayElement, lastRetrievedElement) {
        this.displayElement = displayElement;
        this.lastRetrievedElement = lastRetrievedElement;
        this.setupAutoUpdate();
    }

    displayNotes() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        let notesHTML = "";
        notes.forEach((note) => {
            notesHTML += `<p>${note.content}</p>`; // Append each note's HTML
        });
        this.displayElement.innerHTML = notesHTML;
        this.lastRetrievedElement.textContent = `Updated at: ${new Date().toLocaleTimeString()}`;
    }

    setupAutoUpdate() {
        this.displayNotes();
        setInterval(() => this.displayNotes(), 2000);
    }
}

const notesDisplay = document.getElementById("notes-display");
const lastRetrievedTime = document.getElementById("last-retrieved-time");

const notesReader = new NotesReader(notesDisplay, lastRetrievedTime);
