console.log("test");
let notesArray = [];
let titleArray = [];
showNotesfunction();
let clearNotes = document.getElementById("clearNotes");
clearNotes.addEventListener("click", clearfunction);
let addNotes = document.getElementById("addNotes");
addNotes.addEventListener("click", function() {
    // checking whether input is provided or not
    let test = alertfunction();
    if (test == true) {
        return;
    }
    addNotesfunction();
    showNotesfunction();
    clearfunction();
});


// functions are written here 
// storage function
function storagefunction() {


    notesArray = JSON.parse(notes);
    titleArray = JSON.parse(title);
    // if (notes == null) {
    //     notesArray = [];
    //     titleArray = [];


    // } else {
    //     notesArray = JSON.parse(notes);
    //     titleArray = JSON.parse(title);

    // }


    // console.log("titleArray");



}
// add notes function
function addNotesfunction() {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");

    if (notes == null) {
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
// show notes function 
function showNotesfunction() {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    if (notes == null) {
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
                <div class="card my-2 mx-2 notesCards"  style="width: 16rem;">
                <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">Notes ${index + 1}</h6>
                <h5 class="card-title">${titleArray[index]}</h5>
                <p class="card-text">${notesArray[index]}</p>
                <a href="#" id="${index}" onclick="deleteNotefunction(this.id)" class="card-link btn btn-danger">Delete</a>
                </div>
                </div>
                `;
    }
    let notesHtml = document.getElementById("notes");
    if (notesArray.length == 0) {
        notesHtml.innerHTML = `<span>Nothing to Show!!</span>  <span> Use <strong>"Add Notes"</strong> to add notes.</span> `;
    } else {
        notesHtml.innerHTML = html;
    }

}

// Delete Note function 
function deleteNotefunction(index) {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    if (notes == null) {
        notesArray = [];
        titleArray = [];
    } else {
        notesArray = JSON.parse(notes);
        titleArray = JSON.parse(title);
    }
    notesArray.splice(index, 1);
    titleArray.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    localStorage.setItem("title", JSON.stringify(titleArray));
    showNotesfunction();
}