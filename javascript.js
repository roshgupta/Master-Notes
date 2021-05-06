let notesArray = [];
let titleArray = [];
showNotesfunction();
let clearNotes = document.getElementById("clearNotes");
clearNotes.addEventListener("click", clearfunction);
let addNotes = document.getElementById("addNotes");
addNotes.addEventListener("click", function() {
    let test = alertfunction();
    if (test == true) {
        return;
    }
    addNotesfunction();
    showNotesfunction();
    clearfunction();
});

function addNotesfunction() {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    if (notes == null || notes == "" || notes == undefined) {
        notes = localStorage.setItem("notes", "");
        title = localStorage.setItem("title", "");
        notesArray = [];
        titleArray = [];
    } else {
        notes = localStorage.getItem("notes");
        title = localStorage.getItem("title");
        notesArray = JSON.parse(notes);
        titleArray = JSON.parse(title);
    }
    let addTitle = document.getElementById("floatingTextTitlearea");
    let addText = document.getElementById("floatingTextarea");
    notesArray.push(addText.value);
    titleArray.push(addTitle.value);
    notes = localStorage.setItem("notes", JSON.stringify(notesArray));
    title = localStorage.setItem("title", JSON.stringify(titleArray));
}
// clear function is written here 
function clearfunction() {
    let addTitle = document.getElementById("floatingTextTitlearea");
    let addText = document.getElementById("floatingTextarea");
    addTitle.value = "";
    addText.value = "";
}
// alert function is written here
function alertfunction() {
    let addTitle = document.getElementById("floatingTextTitlearea");
    let addText = document.getElementById("floatingTextarea");
    if (addTitle.value == "") {
        alert("Please Input Title");
        return 1;
    } else {
        if (addText.value == "") {
            alert("Please Input Notes");
            return 1;
        }
    }
};

function showNotesfunction() {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    if (notes == null || notes == "" || notes == undefined) {
        notesArray = [];
        titleArray = [];
    } else {
        notesArray = JSON.parse(notes);
        titleArray = JSON.parse(title);
    }
    let length = titleArray.length;
    let html = "";
    for (let index = 0; index < length; index++) {
        html += `
                <div class="card my-2 mx-2 notesCards d-flex"  style="width: 16rem;">
                <div class="card-body d-flex flex-column align-self-stretch " style="height:100%;">
                <div class="container-fluid" style="margin-bottom:25px; height:100%">
                <h6 class="card-subtitle mb-2 text-muted">Notes ${index + 1}</h6>
                <h5 class="card-title">${titleArray[index]}</h5>
                <p class="card-text">${notesArray[index]}</p></div>              
                <div class="container" >
                <a href="#" id="${index}" onclick="deleteNotefunction(this.id)" class="card-link btn btn-danger deleteAll">Delete</a>
                </div> </div></div>`;
    }
    let notesHtml = document.getElementById("notes");
    if (notesArray.length == 0) {
        notesHtml.innerHTML = `<span>Nothing to Show!!</span>  <span> Use <strong>"Add Notes"</strong> to add notes.</span> `;
    } else {
        notesHtml.innerHTML = html;
    }
}

function deleteNotefunction(index) {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    notesArray = JSON.parse(notes);
    titleArray = JSON.parse(title);
    notesArray.splice(index, 1);
    titleArray.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    localStorage.setItem("title", JSON.stringify(titleArray));
    showNotesfunction();
}
// search function for search bar 
let inputValue = document.getElementById("search");
inputValue.addEventListener("input", searchfunction)
let clearAllNotes = document.getElementById("clearAllButton");
clearAllNotes.addEventListener("click", function() {
    let deleteAll = document.getElementsByClassName("deleteAll");
    Array.from(deleteAll).forEach(function() {
        deleteNotefunction();
    })
})

function searchfunction() {
    let inputText = inputValue.value.toLocaleLowerCase();
    let notecard = document.getElementsByClassName("notesCards");
    Array.from(notecard).forEach(function(element) {
        let cardText = element.getElementsByTagName("p")[0].innerHTML.toLocaleLowerCase();
        let cardTitle = element.getElementsByTagName("h5")[0].innerHTML.toLocaleLowerCase();
        if (cardText.includes(inputText)) {
            element.style.display = "flex";
        } else if (cardTitle.includes(inputText)) {
            element.style.display = "flex";
        } else {
            element.style.display = "none";
        }
    });
}