showNotes();
let addNotes = document.getElementById("addNotes");
addNotes.addEventListener("click", function(element) {
    // checking whether input is provided or not
    let test = alertfunction();
    if (test == true) {
        return;
    }
    let notes = localStorage.setItem("notes", JSON.stringify(notesArray));
    let title = localStorage.setItem("title", JSON.stringify(titleArray));
    if (notes == null) {
        let notesArray = [];
        let titleArray = [];


    } else {
        notesArray = JSON.parse(notes);
        titleArray = JSON.parse(title);

    }
    let addTitle = document.getElementById("floatingTextTitlearea");
    let addText = document.getElementById("floatingTextarea");
    notesArray.push(addText.value);
    titleArray.push(addTitle.value);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    localStorage.setItem("title", JSON.stringify(titleArray));
    showNotes();
    clearfunction();
});
let clearNotes = document.getElementById("clearNotes");
clearNotes.addEventListener("click", clearfunction);
let deleteNotes = document.getElementById("deleteNotes");
// deleteNotes.addEventListener("click", deleteNote(this.id));


// Delete Note function 
function deleteNote(index) {
    console.log("test");
    let notes = localStorage.setItem("notes", JSON.stringify(notesArray));
    let title = localStorage.setItem("title", JSON.stringify(titleArray));
    if (notes == null) {
        let notesArray = [];
        let titleArray = [];


    } else {
        notesArray = JSON.parse(notes);
        titleArray = JSON.parse(title);

    }
    notesArray.splice(index, 1);
    titleArray.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    localStorage.setItem("title", JSON.stringify(titleArray));
    showNotes();
}

function clearfunction() {
    let addTitle = document.getElementById("floatingTextTitlearea");
    let addText = document.getElementById("floatingTextarea");
    addTitle.value = "";
    addText.value = "";
}
// show notes in form of html
function showNotes() {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    if (notes == null) {
        let notesArray = [];
        let titleArray = [];


    } else {
        notesArray = JSON.parse(notes);
        titleArray = JSON.parse(title);

    }
    let html = "";
    for (let index = 0; index < titleArray.length; index++) {
        html += `
        <div class="card my-2 mx-2 notesCards" id="${index}" style="width: 16rem;">
        <div class="card-body">
        <h6 class="card-subtitle mb-2 text-muted">Notes ${index + 1}</h6>
        <h5 class="card-title">${titleArray[index]}</h5>
        <p class="card-text">${notesArray[index]}</p>
        <a href="#" id="deleteNotes" onclick="deleteNote(this.id)" class="card-link btn btn-danger">Delete</a>
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
//alert function
// function to check whether input is provided or not
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
/*
// search function for search bar 
 let inputvalue = document.getElementById("search");
inputvalue.addEventListener("input", searchfunction);
let searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", searchfunction);

function searchfunction() {
    let inputvalue = document.getElementById("search");
    let notecard = document.getElementsByClassName("notesCards");
    Array.from(notecard).forEach(function(element) {
        let cardText = element.getElementsByTagName("p")[0].innerHTML;
        let cardTitle = element.getElementsByTagName("h5")[0].innerHTML;
        if (cardText.includes(inputvalue)) {
            element.style.display = "flex";
        } else if (cardTitle.includes(inputvalue)) {
            element.style.display = "flex";
        } else {
            element.style.display = "none";
        }

    });
    let markup = document.getElementsByTagName
}
*/