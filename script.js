const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || '';
    attachDeleteListeners();
    attachEditListeners();
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

function attachDeleteListeners() {
    const deleteButtons = document.querySelectorAll(".input-box img");
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            this.parentElement.remove();
            updateStorage();
        });
    });
}

function attachEditListeners() {
    const notes = document.querySelectorAll(".input-box");
    notes.forEach(note => {
        note.addEventListener("input", updateStorage);
    });
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    attachDeleteListeners();
    attachEditListeners();
    updateStorage();
});

window.addEventListener("beforeunload", updateStorage);

document.addEventListener("keydown", event => {
    if(event.key === "Enter" && document.activeElement.isContentEditable) {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
