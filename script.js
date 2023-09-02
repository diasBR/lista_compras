
document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.querySelector('ul');
    const taskInput = document.querySelector('#taskName');
    const resetButton = document.querySelector('#resetButton');
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];



    function addTaskToList(taskName, completed) {
        const listItem = document.createElement('li');
        const taskLink = document.createElement('a');
        taskLink.href = '#';
        taskLink.textContent = taskName;

        if (completed) {
            taskLink.classList.add('selected');
        }

        listItem.appendChild(taskLink);
        taskList.appendChild(listItem);
    }



    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }



    function resetTasks() {
        taskList.innerHTML = '';
        savedTasks = [];
        saveTasksToLocalStorage();
    }




    resetButton.addEventListener('click', resetTasks);


    

    taskList.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            e.target.classList.toggle('selected');
            const taskIndex = Array.from(taskList.children).indexOf(e.target.parentElement);
            savedTasks[taskIndex].completed = !savedTasks[taskIndex].completed;
            saveTasksToLocalStorage();
        }
    });
    



    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        const taskName = taskInput.value;
        addTaskToList(taskName, false);
        savedTasks.push({ name: taskName, completed: false });
        saveTasksToLocalStorage();
        taskInput.value = '';
    });




    savedTasks.forEach(function (task) {
        addTaskToList(task.name, task.completed);
    });



});
