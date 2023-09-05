// Select elements & assign values to local variables
const newTask = document.querySelector('#new-task');
const from = document.querySelector('form');
const todoUl = document.querySelector("#items");
const completeUl = document.querySelector(".complete-list ul");

let dv = document.createElement('div');
let lii = document.createElement('li');

lii.setAttribute('class', 'lii');

dv.appendChild(lii);

console.log("->", dv.innerHTML);



console.log(document.querySelector(".complete-list > ul"));

let createTask = function(task){
    let listItem = document.createElement('li');
    let checkbox = document.createElement('input');
    let label = document.createElement('label');

    label.textContent = task;
    checkbox.type = 'checkbox';

    listItem.appendChild(checkbox);
    listItem.appendChild(label);

    return listItem;
}

let addTask = function(event){
    event.preventDefault();
    let listItem = createTask(newTask.value);
    todoUl.appendChild(listItem);
    newTask.value = "";
    //bind the new task to the incomplete list
    bindIncompleteItems(listItem, completeTask);
}

let completeTask = function() {
    let listItem = this.parentNode;
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.className = 'delete';
    console.log("BTN ", this.parentNode);
    console.log("BTN ", deleteBtn);
    listItem.appendChild(deleteBtn);
    
    let checkbox = listItem.querySelector(
        'input[type="checkbox"]');
    checkbox.remove();

    completeUl.appendChild(listItem)
    bindCompleteItems(listItem, deleteTask);
}

let deleteTask = function() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}

let bindCompleteItems = function (taskItem, 
    deleteButtonClick) {
  let deleteButton = taskItem.querySelector('.delete');
  deleteButton.onclick = deleteButtonClick;
};


let bindIncompleteItems = function(taskItem, 
    checkBoxClick) {
    let checkBox = taskItem.querySelector(
        'input[type="checkbox"]');
    checkBox.onchange = checkBoxClick;
    
}


for (let i = 0; i < todoUl.children.length; i++) {
  bindIncompleteItems(todoUl.children[i], 
    completeTask);
}

for (let i = 0; i < completeUl.children.length; i++) {
  bindCompleteItems(completeUl.children[i], 
    deleteTask);
}

from.addEventListener('submit', addTask);