// Define UI Variables
const form      = document.querySelector('.task-form'),
      taskList  = document.querySelector('.collection'),
      clearBtn  = document.querySelector('.clear-tasks'),
      filter    = document.querySelector('#filer'),
      taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear tasks event
    clearBtn.addEventListener('click', clearTasks);
    // Filter Tasks event
    filter.addEventListener('keyup', filterTasks)
}

/*============ Get Tasks from Local Storage  =============*/
function getTasks() {
    const localStorageTasks = JSON.parse(localStorage.getItem('tasks'));
    localStorageTasks.forEach(task => {
        createTask(task)
    })
}

/*============ Add Task  =============*/
function addTask(e) {
    if(taskInput.value === '')
        alert('Add a task');

    createTask(taskInput.value);

    // Store Tasks in Local Storage
    storeTasks(taskInput.value);

    // Clear input
    taskInput.value = '';

    e.preventDefault()
}

// Create a task
function createTask(task) {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Add Task input value li's text content
    li.textContent = task;

    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove" aria-hidden="true"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
}

/*============ Store Tasks in Local Storage  =============*/
// localStorage - stores data with no expiration date.
// sessionStorage - stores data for one session (data is lost when the browser or tab is closed)

function storeTasks(task) {
    // Convert data to an Array and Retrieve it from Local Storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);

    // Convert data to a string Store it in Local Storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/*============ Remove task  =============*/
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item'))
        if(confirm('Are you sure?'))
            e.target.parentElement.parentElement.remove();
            // Remove this task from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

// Remove task from Local Storage
function removeTaskFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/*============ Clear tasks =============*/
function clearTasks(e) {
    // taskList.innerHTML = '';

    // Faster - http://jsperf.com/innerhtml-vs-removechild
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear tasks from Local Storage
    localStorage.clear();

    e.preventDefault()
}

/*============ Filter Tasks =============*/
function filterTasks(e) {
    // text value of filter input
    const text = e.target.value.toLowerCase();

    const allTasks = document.querySelectorAll('.collection-item');
    allTasks.forEach(task => {
        const item = task.firstChild.textContent.toLowerCase();
        item.indexOf(text) !== -1 ? task.style.display = 'block' : task.style.display = 'none';
    });
}