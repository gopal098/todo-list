<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="todo2.css">
</head>
<body>
    <div class="container">
        <h1>To-Do List</h1>
        <div class="input-container">
            <input type="text" id="new-task" placeholder="Add a new task...">
            <button id="add-task-btn">Add Task</button>
        </div>
        <div class="filter-container">
            <button class="filter-btn" data-filter="all">All</button>
            <button class="filter-btn" data-filter="pending">Pending</button>
            <button class="filter-btn" data-filter="completed">Completed</button>
        </div>
        <ul id="task-list"></ul>
    </div>
    <script src="todo3.js"></script>
</body>
</html>


/* styles.css */
body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-image: url('https://lunaf.com/img/moon/l-phase-5.webp');
}

.container {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

h1 {
    text-align: center;
    color: #333;
}

.input-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

#new-task {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: box-shadow 0.3s ease-in-out;
}

#new-task:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
    border-color: #28a745;
}

#add-task-btn {
    margin-left: 10px;
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out, background-color 0.3s;
}

#add-task-btn:hover {
    transform: scale(1.05);
    background-color: #218838;
}

#task-list {
    list-style-type: none;
    padding: 0;
}

/* Fade-in animation for new tasks */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.task-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    animation: fadeIn 0.5s ease-in;
}

.completed {
    text-decoration: line-through;
    color: #777;
    transition: color 0.3s ease-in, text-decoration 0.3s ease-in;
}

/* Fade-out animation for deleted tasks */
@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

.task-item.deleting {
    animation: fadeOut 0.5s ease-out forwards;
}

button {
    cursor: pointer;
    transition: transform 0.2s ease-in-out, background-color 0.3s;
}

button:hover {
    transform: scale(1.05);
    background-color: #218838;
}

/* General transition for all elements */
* {
    transition: all 0.3s ease-in-out;
}


// script.js

// Selectors
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');

// Functions

const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <button class="complete-btn">Complete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
        taskInput.value = '';
    }
};

const deleteTask = (taskItem) => {
    taskItem.remove();
};

const editTask = (taskItem) => {
    const taskSpan = taskItem.querySelector('span');
    const newText = prompt('Edit your task:', taskSpan.textContent);
    if (newText !== null) {
        taskSpan.textContent = newText.trim();
    }
};

const completeTask = (taskItem) => {
    taskItem.classList.toggle('completed');
};

const filterTasks = (filter) => {
    const tasks = taskList.querySelectorAll('.task-item');
    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'pending':
                if (task.classList.contains('completed')) {
                    task.style.display = 'none';
                } else {
                    task.style.display = 'flex';
                }
                break;
            case 'completed':
                if (task.classList.contains('completed')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
        }
    });
};

// Event Listeners

addTaskBtn.addEventListener('click', addTask);

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        deleteTask(e.target.closest('.task-item'));
    } else if (e.target.classList.contains('edit-btn')) {
        editTask(e.target.closest('.task-item'));
    } else if (e.target.classList.contains('complete-btn')) {
        completeTask(e.target.closest('.task-item'));
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterTasks(btn.getAttribute('data-filter'));
    });
});


