let taskId = 0;

/* Add Task */
function addTask() {
  const input = document.getElementById('taskInput');
  const value = input.value.trim();

  if (value === "") {
    alert("Enter a task!");
    return;
  }

  const task = createTask(value);
  document.getElementById('todo').appendChild(task);

  input.value = "";
}

/* Create Task */
function createTask(text) {
  const task = document.createElement('div');
  task.className = 'task';
  task.draggable = true;
  task.id = 'task-' + taskId++;
  task.innerText = text;

  task.addEventListener('dragstart', drag);
  task.addEventListener('dblclick', () => task.remove());

  return task;
}

/* Drag */
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

/* Allow Drop */
function allowDrop(ev) {
  ev.preventDefault();
}

/* Drop */
function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const task = document.getElementById(data);
  ev.target.closest('.column').appendChild(task);
}

/* Apply Drag Events to Columns */
document.querySelectorAll(".column").forEach(col => {
  col.addEventListener("dragover", allowDrop);
  col.addEventListener("drop", drop);
});
