let totalNetIncome = 1000.0;

document.addEventListener("DOMContentLoaded", function() {
    runProgram();
});

function getHTMLElements() {
    const addTaskButton = document.querySelector("#addTask");
    addTaskButton.addEventListener('click', addTaskFromUserInput);
    const orderedList = document.querySelector("#taskList");
} 
 

function createExistingTasks() {
    for (let i = 0; i < taskList.length; i++) {
        let taskText = taskList[i];
        let taskDone = tasksDoneStatus[taskText];
        makeANewTask(taskText, taskDone);
    }
}

function addTaskFromUserInput() {
    let inputBox = document.querySelector("#taskInputBox");
    let newTask = inputBox.value;
    makeANewTask(newTask, "not done");
}

function onCheckBoxChange(parentLi, checkBox) {
    if(checkBox.checked) {
      parentLi.classList.add("cross-out");
    }
    else{
        parentLi.classList.remove("cross-out");
    }
}

function makeANewTask(taskText, taskDone) {
    const orderedList = document.querySelector("#taskList");

    const newLi = document.createElement("li");
    newLi.textContent = taskText;

    const checkBox = document.createElement("input");
    checkBox.setAttribute('type', "checkbox");

    checkBox.addEventListener('change', onCheckBoxChange.bind(null, newLi, checkBox));

    if(taskDone === "done") {
        newLi.classList.add("cross-out");
        checkBox.checked = true;
    }

    newLi.appendChild(checkBox);
    orderedList.appendChild(newLi);
}

function runProgram() {
    getHTMLElements();
    makeANewTask("Add today's activities", "not done");
    createExistingTasks();

    const submitButton = document.querySelector(".submitButton");
    submitButton.addEventListener("click", addItem);
}

function addItem() {
    const itemInputBar = document.querySelector("#itemInput");
    let itemName = itemInputBar.value;
    const amountInputBar = document.querySelector("#amountInput")
    let itemAmount = amountInputBar.value;

    const newItem = document.createElement("li");
    newItem.textContent = `Item: ${itemName}, Amount: $ ${itemAmount}`;
    newItem.classList.add("red");

    const list = document.querySelector("#listOfItems");
    list.appendChild(newItem);

    const expenseOrIncome = document.querySelector("#expenseOrIncome");
    if(expenseOrIncome.value === "income"){
        totalNetIncome = totalNetIncome + Number(itemAmount);
        newItem.classList.add("green");
        newItem.classList.remove("red");
    }
    else{
        totalNetIncome = totalNetIncome - Number(itemAmount);
        newItem.classList.add("red");
        newItem.classList.remove("green");
    }

    const totalSpan = document.querySelector("#total");
    totalSpan.textContent = `$ ${totalNetIncome}`;1

    if(totalNetIncome < 0){
        totalSpan.classList.add("red");
        totalSpan.classList.remove("green");
        totalSpan.classList.remove("yellow");
    }
    else if(totalNetIncome < 100){
        alert("You are running low on funds!");
        totalSpan.classList.add("yellow");
        totalSpan.classList.remove("green");
        totalSpan.classList.remove("red");
    }
    else{
        totalSpan.classList.add("green");
        totalSpan.classList.remove("yellow");
        totalSpan.classList.remove("red");
    }

    itemInputBar.value = "";
    amountInputBar.value = "";
    itemInputBar.focus();
}
