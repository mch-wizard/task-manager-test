/*

MCH Management Systems

*/

// Global variables:
let $taskInput;  // field where the user enters the task content
let $alertInfo;  // info about no tasks / need to add text
let $addButton;  // ADD button - adds new items to the list
let $listBox;  // our tasks list, tags <ul></ul>
let $newTask;  // newly added LI, new task
let $taskPopup;  // downloaded popup
let $taskPopupInfo;  // alert in the 'popup' when you add blank text
let $editedTask;  // edited Task
let $taskPopupInput;  // the text entered in the 'input' in the 'popup'
let $addTaskPopupButton;  // 'approve' button in 'popup'
let $closeTaskPopupButton;  // button to close the 'popup'
let $idNumber = 0;  // It is used to mark the id number.
let $allTasks;

// TEST RegExp:
let $regExp = /\s/;


// OPTIMIZATION. Main function that runs the declared functions after the page has loaded.
const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};

// We download our elements:
const prepareDOMElements = () => {
    $taskInput = document.querySelector('.tasksapp-header__input');
    $alertInfo = document.querySelector('.tasksapp-list__alert-info');
    $addButton = document.querySelector('.tasksapp-header__addbutton');
    $listBox = document.querySelector('.tasks-list-box');
    $taskPopup = document.querySelector('.task-popup');
    $taskPopupInfo = document.querySelector('.task-popup-tools__info');
    $taskPopupInput = document.querySelector('.task-popup-tools__input');
    $addTaskPopupButton = document.querySelector('.accept');
    $closeTaskPopupButton = document.querySelector('.cancel');
    $allTasks = $listBox.getElementsByTagName('li');   // pobieramy z listy wszystkie elementy LI (żywa kolekcja)
};

// We declare listeners:
const prepareDOMEvents = () => {
    $addButton.addEventListener('click', addNewTask);
    $listBox.addEventListener('click', checkClick);
    $closeTaskPopupButton.addEventListener('click', closeTaskPopup);
    $addTaskPopupButton.addEventListener('click', changeTask);
    $taskInput.addEventListener('keyup', enterCheck);
};

// We add a new item to the list:
const addNewTask = () => {
    if ($taskInput.value !== '' && $taskInput.value !== '     ') {   // zablokować dodawanie samych spacji !
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $taskInput.value;
        $newTask.setAttribute('id', `task-${$idNumber}`);
        $newTask.classList.add('tasks-list-box__item');
        $listBox.appendChild($newTask);

        $taskInput.value = '';   // po dodaniu nowego zadania usuwa treść zadania z INPUTa
        $alertInfo.innerText = '';   // po dodaniu zadania usuwa treść alertu z info 'Enter the task text!'

        createToolsArea();  // wywołujemy funkcję, która tworzy 'toolsPanel'
    } else {
        $alertInfo.innerText = 'Enter the task text!';
    };
};

const enterCheck = () => {
    if (event.keyCode === 13) {   // POPRAWIĆ na - KeyboardEvent: key='Enter' | code='Enter'
        addNewTask();
    };
};

// We create 'edit', 'delete' and 'done' buttons:
const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tasks-tools');
    $newTask.appendChild(toolsPanel);

    const completeButton = document.createElement('button');
    completeButton.classList.add('tasks-tools__complete');
    completeButton.classList.add('tasks-tools__button');
    completeButton.innerHTML = '<i class="far fa-check-square"></i>';

    const editButton = document.createElement('button');
    editButton.classList.add('tasks-tools__edit');
    editButton.classList.add('tasks-tools__button');
    editButton.innerText = 'EDIT';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('tasks-tools__delete');
    deleteButton.classList.add('tasks-tools__button');
    deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';

    toolsPanel.appendChild(completeButton);
    toolsPanel.appendChild(editButton);
    toolsPanel.appendChild(deleteButton);
};

// Button click management:
const checkClick = (e) => {
    if (e.target.closest('button').classList.contains('tasks-tools__complete')) {
        
        e.target.closest('li').classList.toggle('task-tools-completed');
        e.target.closest('button').classList.toggle('task-tools-completed');

        // Do dodania zablokowanie możliwości edycji po spełnieniu tego warunku !

    } else if (e.target.closest('button').classList.contains('tasks-tools__edit')) {

        editTask(e);

    } else if (e.target.closest('button').classList.contains('tasks-tools__delete')) {

        deleteTask(e);
    };
};

// Editing a task (popup):
const editTask = (e) => {
    const oldTask = e.target.closest('li').id;  // pobieramy id w zależności w jaki element klikniemy, dzięki e.target
    $editedTask = document.getElementById(oldTask);  // pobieramy cały element po id
    $taskPopupInput.value = $editedTask.firstChild.textContent;  // pobieramy tekst w input dzięki odwołaniu się do pierwszego dziecka elementu

    $taskPopup.style.display = 'flex';
};

// Change the value of a task:
const changeTask = () => {
    if ($taskPopupInput.value !== '' && $taskPopupInput.value !== '       ') {   // dodać różne od spacji (ogólnie od kilku) !!!!
        $editedTask.firstChild.textContent = $taskPopupInput.value;
        $taskPopup.style.display = 'none';
        $taskPopupInfo.innerText = '';
    } else {
        $taskPopupInfo.innerText = 'You must enter the task content!';
    };
};

// Closing the popup:
const closeTaskPopup = () => {
    $taskPopup.style.display = 'none';
    $taskPopupInfo.innerText = '';
};

// Deleting task:
const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if ($allTasks.length === 0) {
        $alertInfo.innerText = 'There are no tasks in the list.';
    };
};




document.addEventListener('DOMContentLoaded', main);   // po wczytaniu strony, funkcja 'main' uruchomi zadeklarowane funkcje ! (OPTYMALIZACJA)