const notesDisplay = document.getElementById("notes-display");
const lastRetrievedTime = document.getElementById("last-retrieved-time");

const displayNotes = () => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesDisplay.innerHTML = notes.map((note) => `<p>${note.content}</p>`).join("");
    lastRetrievedTime.textContent = `Last Retrieved: ${new Date().toLocaleTimeString()}`;
};

setInterval(() => {
    displayNotes();
}, 2000);

displayNotes();
