let notesArray = [];
let titleArray = [];
let checkBoxArray = [];
let addTitle = document.getElementById("floatingTextTitlearea");
let addText = document.getElementById("floatingTextarea");
let important = document.getElementById("customControlAutosizing");
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
    window.location.href = "#endOfThePage";
});

function addNotesfunction() {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    let importantCheckbox = localStorage.getItem("important");
    if (notes == null || notes == "" || notes == undefined) {
        notes = localStorage.setItem("notes", "");
        title = localStorage.setItem("title", "");
        importantCheckbox = localStorage.setItem("important", "");
        notesArray = [];
        titleArray = [];
        checkBoxArray = [];
    } else {
        notes = localStorage.getItem("notes");
        title = localStorage.getItem("title");
        importantCheckbox = localStorage.getItem("important");
        notesArray = JSON.parse(notes);
        titleArray = JSON.parse(title);
        checkBoxArray = JSON.parse(importantCheckbox);
    }

    notesArray.push(addText.value);
    titleArray.push(addTitle.value);
    checkBoxArray.push(important.checked);
    notes = localStorage.setItem("notes", JSON.stringify(notesArray));
    title = localStorage.setItem("title", JSON.stringify(titleArray));
    importantCheckbox = localStorage.setItem("important", JSON.stringify(checkBoxArray));
}

function clearfunction() {
    addTitle.value = "";
    addText.value = "";
    important.checked = false;
}

function alertfunction() {
    if (addTitle.value == "") {
        alert("Please Input Title");
        return 1;
    } else {
        if (addText.value == "") {
            alert("Please Input Notes");
            return 1;
        } else {
            return 0;
        }
    }
};

function showNotesfunction() {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    let importantCheckbox = localStorage.getItem("important");
    if (notes == null || notes == "" || notes == undefined) {
        notesArray = [];
        titleArray = [];
        checkBoxArray = [];
    } else {
        notesArray = JSON.parse(notes);
        titleArray = JSON.parse(title);
        checkBoxArray = JSON.parse(importantCheckbox);
    }
    let length = titleArray.length;
    let html = "";
    for (let index = 0; index < length; index++) {
        html += `
                <div class="card my-2 mx-2 notesCards"  style="width: 16rem;">
                <div class="card-body d-flex flex-column align-self-stretch " style="height:100%;">
                <div class="container-fluid" style="margin-bottom:25px; height:100%">
                <h6 class="card-subtitle mb-2 text-muted">Notes ${index + 1}`;
        if (checkBoxArray[index] == false || checkBoxArray[index] == null) {
            html += ``
        } else {
            html += `<span class="badge badge-danger" style="color: red;background-color: #f8dbdb; margin-left:20px;">Important!</span>`
        }
        html += `</h6>
                <h5 class="card-title">${titleArray[index]}</h5>
                <p class="card-text">${notesArray[index]}</p></div>              
                <div class="container-fluid d-flex flex-row" style="width:100%;">
                <a href="#" id="${index}" onclick="deleteNotefunction(this.id)" class="card-link btn btn-danger deleteAll mx-2" style="inline-block;">Delete</a>
                <button type="button" id="${index*1000}" onclick="updatefunction(this.id)" class="btn btn-primary mx-2 " style="inline-block;" data-toggle="modal" data-target="#exampleModalCenter">Update</button></div> </div></div>`;
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
    let importantCheckbox = localStorage.getItem("important");
    notesArray = JSON.parse(notes);
    titleArray = JSON.parse(title);
    checkBoxArray = JSON.parse(importantCheckbox);
    notesArray.splice(index, 1);
    titleArray.splice(index, 1);
    checkBoxArray.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    localStorage.setItem("title", JSON.stringify(titleArray));
    localStorage.setItem("important", JSON.stringify(checkBoxArray));
    showNotesfunction();
}
// search function for search bar 

let clearAllNotes = document.getElementById("clearAllButton");
clearAllNotes.addEventListener("click", function() {
    let deleteAll = document.getElementsByClassName("deleteAll");
    Array.from(deleteAll).forEach(function() {
        deleteNotefunction();
        clearfunction();
    })
    showNotesfunction();
    clearfunction();
})
let inputValue = document.getElementById("search");
inputValue.addEventListener("input", searchfunction);

function searchfunction() {
    let inputText = inputValue.value.toLocaleLowerCase();
    let noteCards = document.getElementsByClassName("notesCards");
    Array.from(noteCards).forEach(function(element) {
        let cardText = element.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("p")[0].innerHTML.toLocaleLowerCase();
        let cardTitle = element.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("h5")[0].innerHTML.toLocaleLowerCase();
        if (cardText.includes(inputText)) {
            element.style.display = "flex";
        } else if (cardTitle.includes(inputText)) {
            element.style.display = "flex";
        } else {
            element.style.display = "none";
        }

    });
}

function updatefunction(index) {
    let indexVariable = index / 1000;
    let updateTitle = document.getElementById("UpdatefloatingTextTitlearea");
    let updateNotes = document.getElementById("UpdatefloatingTextarea");
    let updateImportant = document.getElementById("UpdatecustomControlAutosizingUpdate");
    updateTitle.value = titleArray[indexVariable];
    updateNotes.value = notesArray[indexVariable];
    updateImportant.checked = checkBoxArray[indexVariable];
    let notesHeading = document.getElementById("UpdateNotesNumber");
    notesHeading.innerHTML = (indexVariable + 1);
}
let saveChanges = document.getElementById("UpdateSaveChanges");
saveChanges.addEventListener("click", function() {
    let updateTest = updateAlertfunction();
    if (updateTest == true) {
        return;
    }
    let notesHeading = document.getElementById("UpdateNotesNumber");
    let indexVa = notesHeading.innerHTML;
    let indexVariable = parseInt(indexVa) - 1;
    let updateTitle = document.getElementById("UpdatefloatingTextTitlearea");
    let updateNotes = document.getElementById("UpdatefloatingTextarea");
    let updateImportant = document.getElementById("UpdatecustomControlAutosizingUpdate");
    titleArray[indexVariable] = updateTitle.value;
    notesArray[indexVariable] = updateNotes.value;
    checkBoxArray[indexVariable] = updateImportant.checked;
    localStorage.setItem("title", JSON.stringify(titleArray));
    localStorage.setItem("notes", JSON.stringify(notesArray));
    localStorage.setItem("important", JSON.stringify(checkBoxArray));
    updateTitle.value = "";
    updateNotes.value = "";
    updateImportant.checked = false;
    showNotesfunction();
});
let UpdateClose = document.getElementById("UpdateCloseButton");
UpdateClose.addEventListener("click", function() {
    let updateTitle = document.getElementById("UpdatefloatingTextTitlearea");
    let updateNotes = document.getElementById("UpdatefloatingTextarea");
    let updateImportant = document.getElementById("UpdatecustomControlAutosizingUpdate");
    updateTitle.value = "";
    updateNotes.value = "";
    updateImportant.checked = false;
})

function updateAlertfunction() {
    let updateTitle = document.getElementById("UpdatefloatingTextTitlearea");
    let updateNotes = document.getElementById("UpdatefloatingTextarea");
    if (updateTitle.value == "") {
        alert("Please Input Title");
        return 1;
    } else {
        if (updateNotes.value == "") {
            alert("Please Input Notes");
            return 1;
        } else {
            return 0;
        }
    }
};