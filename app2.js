const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');


loadAllEvents();

function loadAllEvents() {

    document.addEventListener('DOMContentLoaded', getTasks)
    form.addEventListener('submit', addTask);

    taskList.addEventListener('click', removeTask);

    clearBtn.addEventListener('click', clearAllTasks);

    filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));

        tasks.forEach(function (taskText) {
            const task = document.createElement('li');
            task.className = 'collection-item';
            task.appendChild(document.createTextNode(taskText));

            const icon = document.createElement('a');
            icon.className = 'delete-item secondary-content';
            icon.innerHTML = `<i class="fa fa-remove"></i>`

            task.appendChild(icon);

            taskList.appendChild(task);

        })
    }

}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Please Enter a task');
    }

    const task = document.createElement('li');
    task.className = 'collection-item';
    task.appendChild(document.createTextNode(taskInput.value));

    const icon = document.createElement('a');
    icon.className = 'delete-item secondary-content';
    icon.innerHTML = `<i class="fa fa-remove"></i>`

    task.appendChild(icon);

    taskList.appendChild(task);
    storeInLocalStorage(taskInput.value);
    taskInput.value = '';



    e.preventDefault();
}

function storeInLocalStorage(text) {
    let tasks;

    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        tasks = [];
    }

    tasks.push(text);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        romoveTaskfromLocalStorage(e.target.parentElement.parentElement);
    }
    e.preventDefault();

}

function romoveTaskfromLocalStorage(rmElement){
    let tasks;

    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(function(item,index){
            if(rmElement.textContent === item){
                tasks.splice(index,1);
                localStorage.setItem('tasks',JSON.stringify(tasks));
            }
        })
    } 

}

function clearAllTasks(e) {
    const tasks = document.querySelectorAll('li');
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.textContent;
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block';

        } else {
            task.style.display = 'none';
        }

        console.log('text content', item);
    })

}