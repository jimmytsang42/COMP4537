class Note {
    constructor(content = "") {
        this.content = content;
    }
}

const notesContainer = document.getElementById("notes-container");
const addNoteButton = document.getElementById("add-note");
const lastSavedTime = document.getElementById("last-saved-time");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

const updateLocalStorage = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
    lastSavedTime.textContent = `Last Saved: ${new Date().toLocaleTimeString()}`;
};

const createNoteElement = (noteContent, index) => {
    const div = document.createElement("div");
    div.classList.add("note");

    const textarea = document.createElement("textarea");
    textarea.value = noteContent;
    textarea.addEventListener("input", (e) => {
        notes[index].content = e.target.value;
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
        notes.splice(index, 1);
        updateLocalStorage();
        renderNotes();
    });

    div.appendChild(textarea);
    div.appendChild(removeButton);
    return div;
};

const renderNotes = () => {
    notesContainer.innerHTML = "";
    notes.forEach((note, index) => {
        notesContainer.appendChild(createNoteElement(note.content, index));
    });
};

addNoteButton.addEventListener("click", () => {
    notes.push(new Note());
    renderNotes();
});

setInterval(() => {
    updateLocalStorage();
}, 2000);

renderNotes();
