// Declared some array to store values
let notesArray = []; //Array for storing NOTES
let titleArray = []; //Array for storing Title
let checkBoxArray = []; //Array for storing input for checkbox
// grabbing our input markup for title, notes and important 
let addTitle = document.getElementById("floatingTextTitlearea"); //Grabbing notes Title textarea
let addText = document.getElementById("floatingTextarea"); // Grabbing notes text textarea
let important = document.getElementById("customControlAutosizing"); //grabbing checkbox
showNotesfunction(); // Calling shownotes function to print all previous notes which was stored in local storage for previous sessions
let clearNotes = document.getElementById("clearNotes"); //grabbbing clear notes button markup for clearingnotes
clearNotes.addEventListener("click", clearfunction); // adding event listner for running a function when user clicks on it
let addNotes = document.getElementById("addNotes"); // grabbing add notes button markup
addNotes.addEventListener("click", function() { // adding event listener when user clicks on add notes button
    let test = alertfunction(); // running a;ert function to check whether input all fields
    if (test == true) { // if no input is provided, function will return and rest commands will not be executed
        return;
    }
    addNotesfunction(); //calling actual add notes 
    showNotesfunction(); //calling show notes function to update the notes in webpage
    clearfunction(); // callling clearfunction to clear the input area in webpage
});
//actual add notes function is written here
function addNotesfunction() {
    let notes = localStorage.getItem("notes"); //getting notes item, which was stored in local storage of browser
    let title = localStorage.getItem("title"); // getting tilte item which was stored in local storage of browser
    let importantCheckbox = localStorage.getItem("important"); // getting important item , to store checkbox input
    if (notes == null || notes == "" || notes == undefined) { // if it is runned first time, and not stored in local storage, then we will define
        notes = localStorage.setItem("notes", ""); //defining an empty notes item in local storage
        title = localStorage.setItem("title", ""); // defining an empty title item in local storage
        importantCheckbox = localStorage.setItem("important", ""); // defining an empty checkbox item in local storage
        notesArray = []; // assigning notes array to blank,, actually without this also it will work
        titleArray = []; // assigning title array to blank,, actually without this also it will work
        checkBoxArray = []; // assigning checkbox array to blank,, actually without this also it will work
    } else { //if ther is something stored in local storage of browser then we will grab that item
        notes = localStorage.getItem("notes"); //getting notes item which was stored in local storage
        title = localStorage.getItem("title"); //getting title item which was stored in local storage
        importantCheckbox = localStorage.getItem("important"); //getting checkbox item which was stored in local storage
        notesArray = JSON.parse(notes); //using parse to convert string to array, because in local storage we stored strings (1)
        titleArray = JSON.parse(title); //storing that arrays in variables (2)
        checkBoxArray = JSON.parse(importantCheckbox); // for title, notes and checkboxes(2)
    }

    notesArray.push(addText.value); // pushing new inputed value in the Notes array
    titleArray.push(addTitle.value); // pushing new inputed value in the Title array
    checkBoxArray.push(important.checked); // pushing new inputed value in the Checkbox array
    notes = localStorage.setItem("notes", JSON.stringify(notesArray)); // again updating our Notes items in local storage
    title = localStorage.setItem("title", JSON.stringify(titleArray)); // again updating our Title items in local storage
    importantCheckbox = localStorage.setItem("important", JSON.stringify(checkBoxArray)); // again updating our checkbox items in local storage
}
//Actual clear input area function is written here
function clearfunction() {
    addTitle.value = ""; //setting title input area to blank
    addText.value = ""; //setting title input area to blank
    important.checked = false; //setting Chcekbox input area to False
}
//Actual alert function is written here
function alertfunction() {
    if (addTitle.value == "") { //if no tile is there, we will throw an alert
        alert("Please Input Title"); //alert thrown to input title
        return 1; //and then this will return a value which will be used to stop whole functionality
    } else { // if title is written we we will check for notes area
        if (addText.value == "") { // if notes area is blank, we will throw an alert
            alert("Please Input Notes"); // alert thrown to write notes
            return 1; //and then this will return a value which will be used to stop whole functionality
        } else {
            return 0; // if both is inputted,we will return zero, so that rest of function works
        }
    }
};
//actual show notes function, which is called frequently
function showNotesfunction() {
    let notes = localStorage.getItem("notes"); //getting notes item stored in local storage
    let title = localStorage.getItem("title"); //getting title item stored in local storage
    let importantCheckbox = localStorage.getItem("important"); //getting Checkbox item stored in local storage
    if (notes == null || notes == "" || notes == undefined) { // if , item is empty or not crated, we will set it to blank or create it
        notesArray = []; //setting notes array to blank
        titleArray = []; //setting Title array to blank
        checkBoxArray = []; //setting Checkbox array to blank
    } else {
        notesArray = JSON.parse(notes); //else we will get what is stored in notes item as a array and stopre it in variable
        titleArray = JSON.parse(title); //else we will get what is stored in Title item as a array and stopre it in variable
        checkBoxArray = JSON.parse(importantCheckbox); //else we will get what is stored in Checkbox item as a array and stopre it in variable
    }
    let length = titleArray.length; // we have to run a function, n times , where n is items number stored in array
    let html = ""; // we will set an html to empty
    for (let index = 0; index < length; index++) { // we will run this for all items stored in array
        html += ` 
                <div class="card my-2 mx-2 notesCards"  style="width: 16rem;">
                <div class="card-body d-flex flex-column align-self-stretch " style="height:100%;">
                <div class="container-fluid" style="margin-bottom:25px; height:100%">
                <h6 class="card-subtitle mb-2 text-muted">Notes ${index + 1}`;
        if (checkBoxArray[index] == false || checkBoxArray[index] == null) { // if checkbox is checked, we will adad an important badge
            html += ``
        } else {
            html += `<span class="badge badge-danger" style="color: red;background-color: #f8dbdb; margin-left:20px;">Important!</span>`
        } //rest of the markups for notes element
        html += `</h6>
                <h5 class="card-title">${titleArray[index]}</h5>
                <p class="card-text">${notesArray[index]}</p></div>              
                <div class="container-fluid d-flex flex-row" style="width:100%;">
                <a href="#" id="${index}" onclick="deleteNotefunction(this.id)" class="card-link btn btn-danger deleteAll mx-2" style="inline-block;">Delete</a>
                <button type="button" id="${index*1000}" onclick="updatefunction(this.id)" class="btn btn-primary mx-2 " style="inline-block;" data-toggle="modal" data-target="#exampleModalCenter">Update</button></div> </div></div>`;
    }
    let notesHtml = document.getElementById("notes"); //grabbing notes container, which will stores all notes
    if (notesArray.length == 0) { // if there is nothing is notes, we will show default markup
        notesHtml.innerHTML = `<span>Nothing to Show!! Use <strong>"Add Notes"</strong> to add notes.</span> `;
    } else { //else we will show the html, which is storing all markups for all notes
        notesHtml.innerHTML = html; // putting all markups in inner html of the container
    }
}
//Actual delete notes function is written here
function deleteNotefunction(index) {
    let notes = localStorage.getItem("notes"); // getting notes item stored in local storage
    let title = localStorage.getItem("title"); // getting Title item stored in local storage
    let importantCheckbox = localStorage.getItem("important"); // getting Checkbox item stored in local storage
    notesArray = JSON.parse(notes); // storing that item in variable array by converting it to array
    titleArray = JSON.parse(title);
    checkBoxArray = JSON.parse(importantCheckbox);
    notesArray.splice(index, 1); // deleted item , from the array,, by providing it a starting index, which users click
    titleArray.splice(index, 1);
    checkBoxArray.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArray)); //Again updating the local storage
    localStorage.setItem("title", JSON.stringify(titleArray));
    localStorage.setItem("important", JSON.stringify(checkBoxArray));
    showNotesfunction(); // again calling the Show notes function to referesh the page markup, and show updated notes
}
// search function for search bar 

let clearAllNotes = document.getElementById("clearAllButton"); // getting clear All note button
clearAllNotes.addEventListener("click", function() { //adding eventlistener to clear note button and adding function
    let deleteAll = document.getElementsByClassName("deleteAll"); // getting all delete butttons on the page
    Array.from(deleteAll).forEach(function() { // runnning a function for all delete buttons
        deleteNotefunction(); // running delete notes function for all notes     
    })
    showNotesfunction(); //again calling show notes function to update page
    clearfunction(); // calling clear function to clear all inputss from page , if any
})
let inputValue = document.getElementById("search"); // grabbing search input
inputValue.addEventListener("input", searchfunction); // adding an input event listener and calling search function
//Actual search function
function searchfunction() {
    let inputText = inputValue.value.toLocaleLowerCase(); //first converting inputted item to lowercase and storing it in a variable
    let noteCards = document.getElementsByClassName("notesCards"); //getting all notes element, where notes are stored
    Array.from(noteCards).forEach(function(element) { // for all notes card , we will run this function
        let cardText = element.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("p")[0].innerHTML.toLocaleLowerCase(); //grabbing iiner text in paragraph and title and converting them to lowercase
        let cardTitle = element.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("h5")[0].innerHTML.toLocaleLowerCase(); // converting in lower case , will help to become the search , case insensitivie
        if (cardText.includes(inputText)) { // if inputted value is found in notes
            element.style.display = "flex"; // we will show it
        } else if (cardTitle.includes(inputText)) { // here it checks for title
            element.style.display = "flex";
        } else {
            element.style.display = "none"; // if it is not found, then we will hide those cards
        }
    });
}
// function to update notes
function updatefunction(index) { // it is added as attribute in html
    let indexVariable = index / 1000; //getting index to show, multiplication and division was used to make, id for html element unique
    let updateTitle = document.getElementById("UpdatefloatingTextTitlearea"); //gettint update title ,update notes, checkbox Input area
    let updateNotes = document.getElementById("UpdatefloatingTextarea");
    let updateImportant = document.getElementById("UpdatecustomControlAutosizingUpdate");
    updateTitle.value = titleArray[indexVariable]; //setting those values of the notes (1)
    updateNotes.value = notesArray[indexVariable]; // which user has clicked (2)
    updateImportant.checked = checkBoxArray[indexVariable];
    let notesHeading = document.getElementById("UpdateNotesNumber"); //getting heding of notes element to add notes number
    notesHeading.innerHTML = (indexVariable + 1); // showing notes number, which user wants to update
} // saving the updated notes
let saveChanges = document.getElementById("UpdateSaveChanges"); //Getting save changes button
saveChanges.addEventListener("click", function() { //  adding event listener to sdave changes button
    let updateTest = updateAlertfunction(); //if it is input area is empty, except for checkbox, we will throw an error
    if (updateTest == true) { //if alert is thrown, we will return and rest commands will not be executed
        return;
    }
    let notesHeading = document.getElementById("UpdateNotesNumber"); //Getting notes number which is that modal
    let indexVa = notesHeading.innerHTML; // getting the number inside that
    let indexVariable = parseInt(indexVa) - 1; // converting that number string and substracting 1 to get actual index
    let updateTitle = document.getElementById("UpdatefloatingTextTitlearea"); //getting input areas for text for updating values
    let updateNotes = document.getElementById("UpdatefloatingTextarea");
    let updateImportant = document.getElementById("UpdatecustomControlAutosizingUpdate");
    titleArray[indexVariable] = updateTitle.value; // updating that specifics value in array
    notesArray[indexVariable] = updateNotes.value;
    checkBoxArray[indexVariable] = updateImportant.checked;
    localStorage.setItem("title", JSON.stringify(titleArray)); //updating all the changes in local storage
    localStorage.setItem("notes", JSON.stringify(notesArray));
    localStorage.setItem("important", JSON.stringify(checkBoxArray));
    updateTitle.value = ""; // setting the input area blank
    updateNotes.value = "";
    updateImportant.checked = false;
    showNotesfunction(); // refreshing the notes, by again calling the show notes function
});
let UpdateClose = document.getElementById("UpdateCloseButton"); //if close function is clicked in modal
UpdateClose.addEventListener("click", function() { //adding event listener to close button
        let updateTitle = document.getElementById("UpdatefloatingTextTitlearea"); //getting all text areas
        let updateNotes = document.getElementById("UpdatefloatingTextarea");
        let updateImportant = document.getElementById("UpdatecustomControlAutosizingUpdate");
        updateTitle.value = ""; // setting all input areas to blank
        updateNotes.value = "";
        updateImportant.checked = false;
    })
    //actual alert function if inoput area is blank
function updateAlertfunction() {
    let updateTitle = document.getElementById("UpdatefloatingTextTitlearea"); //getting those input areas
    let updateNotes = document.getElementById("UpdatefloatingTextarea");
    if (updateTitle.value == "") { // if title areas is empty , throw an error
        alert("Please Input Title"); // alert shown, to input data
        return 1; // return 1 , will be evaluated to stop running function
    } else { // if title area is not empty, will check for notes area
        if (updateNotes.value == "") { //checking if update  note area is empty
            alert("Please Input Notes"); // showing alert to input notes
            return 1; //returning a value which will be evaluated
        } else {
            return 0; // if all are filled, returning 0, so that all commands of other function, should be executed
        }
    }
};