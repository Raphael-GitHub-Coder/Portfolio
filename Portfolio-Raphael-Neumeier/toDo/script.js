document.addEventListener("DOMContentLoaded", function() {
    var taskInput = document.getElementById("taskInput");
    var prioritySelect = document.getElementById("prioritySelect");
    var unwichtigList = document.getElementById("unwichtigList");
    var wichtigList = document.getElementById("wichtigList");
    var sehrWichtigList = document.getElementById("sehrWichtigList");
    var navbarMenu = document.getElementById("menuItems");
    var deletedTasksList = document.getElementById("deletedTasksList");
    var calendar = document.getElementById("calendar");
    var deletedTasks = [];

    loadTasks();

    document.getElementById("addTaskBtn").addEventListener("click", function() {
        addTask();
    });

    document.querySelector('.menu-toggle-btn').addEventListener('click', function() {
        toggleMenu();
    });

    document.getElementById("showCalendarBtn").addEventListener("click", function() {
        showCalendar();
    });

    document.getElementById("hideCalendarBtn").addEventListener("click", function() {
        hideCalendar();
    });

    document.getElementById("showDeletedTasksBtn").addEventListener("click", function() {
        toggleDeletedTasks();
    });

    function addTask() {
        var task = taskInput.value.trim();
        if (task === '') {
            alert("Bitte eine Aufgabe eingeben!");
            return;
        }
        var priority = prioritySelect.value;
        var li = document.createElement("li");
        li.textContent = task;
        li.setAttribute("data-priority", priority);
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Erledigt";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = function() {
            removeTask(li);
        };
        var restoreButton = document.createElement("button");
        restoreButton.textContent = "Wiederherstellen";
        restoreButton.className = "restore-btn";
        restoreButton.onclick = function() {
            restoreTask(li);
        };
        var deletePermanentlyButton = document.createElement("button");
        deletePermanentlyButton.textContent = "Löschen";
        deletePermanentlyButton.className = "delete-permanently-btn";
        deletePermanentlyButton.onclick = function() {
            deleteTaskPermanently(li);
        };
        li.appendChild(deleteButton);
        li.appendChild(restoreButton);
        li.appendChild(deletePermanentlyButton);

        switch (priority) {
            case "unwichtig":
                unwichtigList.appendChild(li);
                break;
            case "wichtig":
                wichtigList.appendChild(li);
                break;
            case "sehr-wichtig":
                sehrWichtigList.appendChild(li);
                break;
            default:
                unwichtigList.appendChild(li);
                break;
        }

        taskInput.value = "";
        saveTask(task, priority);
    }

    function saveTask(task, priority) {
        var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ content: task, priority: priority, deleted: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(function(task) {
            if (task.deleted) {
                deletedTasks.push(task);
            }
        });
    }

    function removeTask(task) {
        task.style.textDecoration = "line-through";
        var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        var taskContent = task.textContent;
        tasks.forEach(function(task) {
            if (task.content === taskContent) {
                task.deleted = true;
                deletedTasks.push(task);
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function restoreTask(task) {
        task.style.textDecoration = "none";
        var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        var taskContent = task.textContent;
        tasks.forEach(function(task) {
            if (task.content === taskContent) {
                task.deleted = false;
                var index = deletedTasks.findIndex(function(item) {
                    return item.content === taskContent;
                });
                if (index !== -1) {
                    deletedTasks.splice(index, 1);
                }
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function deleteTaskPermanently(task) {
        task.remove();
        var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        var taskContent = task.textContent;
        tasks = tasks.filter(function(task) {
            return task.content !== taskContent;
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        var index = deletedTasks.findIndex(function(item) {
            return item.content === taskContent;
        });
        if (index !== -1) {
            deletedTasks.splice(index, 1);
        }
    }

    function toggleMenu() {
        navbarMenu.classList.toggle('active');
    }

    function showCalendar() {
        calendar.style.display = "block";
    }

    function hideCalendar() {
        calendar.style.display = "none";
    }

    function toggleDeletedTasks() {
        deletedTasksList.style.display = (deletedTasksList.style.display === "block") ? "none" : "block";
        if (deletedTasksList.style.display === "block") {
            showDeletedTasksList();
        }
    }

    function showDeletedTasksList() {
        var deletedTasksUl = document.createElement('ul');
        deletedTasksUl.className = 'deleted-tasks-ul';

        deletedTasks.forEach(function(task) {
            var deletedTaskLi = document.createElement('li');
            deletedTaskLi.textContent = task.content;
            deletedTasksUl.appendChild(deletedTaskLi);
        });

        deletedTasksList.innerHTML = '';
        deletedTasksList.appendChild(deletedTasksUl);
    }

    var darkModeToggle = document.getElementById("darkModeToggle");
    
    darkModeToggle.addEventListener("change", function() {
        toggleDarkMode();
    });
    
    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
    }

    var darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("change", function() {
        if (this.checked) {
            enableDarkMode();
        } else {
            enableLightMode();
        }
    });

    var darkModeEnabled = localStorage.getItem("darkModeEnabled");
    if (darkModeEnabled === "true") {
        darkModeToggle.checked = true;
        enableDarkMode();
    }

    function enableDarkMode() {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkModeEnabled", "true");
    }

    function enableLightMode() {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkModeEnabled", "false");
    }

    var darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("change", function() {
        if (this.checked) {
            enableDarkMode();
        } else {
            enableLightMode();
        }
    });

    function enableDarkMode() {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkModeEnabled", "true");
    }

    function enableLightMode() {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkModeEnabled", "false");
    }

    var darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("change", function() {
        if (this.checked) {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-mode");
        } else {
            document.body.classList.remove("dark-mode");
            document.body.classList.add("light-mode");
        }
    });

    var toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    var currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            toggleSwitch.checked = false;
        } else if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }

    toggleSwitch.addEventListener('change', switchTheme, false);

    var modeSwitch = document.getElementById('modeSwitch');

    modeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    });
});