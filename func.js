document.addEventListener("DOMContentLoaded", () => {
    const notes = document.querySelectorAll(".note");
    notes.forEach(note => {
        note.addEventListener("mouseover", () => {
            note.innerHTML = "Hello"
        });
    });
});
