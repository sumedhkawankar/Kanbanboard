let taskId = 0;

/* Add New Task */
function addTask() {
  const input = document.getElementById("taskInput");
  const value = input.value.trim();

  if (value === "") {
    alert("Please enter a task");
    return;
  }

  const task = createTaskElement(value);
  document.getElementById("todo").appendChild(task);

  input.value = "";
}

/* Create Task Element */
function createTaskElement(text) {
  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;
  task.id = "task-" + taskId++;
  task.innerText = text;

  /* Drag Events */
  task.addEventListener("dragstart", dragStart);
  task.addEventListener("dragend", dragEnd);

  /* Optional: Double click to delete */
  task.addEventListener("dblclick", () => {
    task.remove();
  });

  return task;
}

/* Drag Start */
function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  setTimeout(() => {
    e.target.style.display = "none";
  }, 0);
}

/* Drag End */
function dragEnd(e) {
  e.target.style.display = "block";
}

/* Allow Drop */
function allowDrop(e) {
  e.preventDefault();
}

/* Drop Task */
function drop(e) {
  e.preventDefault();
  const taskId = e.dataTransfer.getData("text/plain");
  const task = document.getElementById(taskId);

  const column = e.target.closest(".column");
  column.appendChild(task);
}

/* Enable Drop on Columns */
document.querySelectorAll(".column").forEach(column => {
  column.addEventListener("dragover", allowDrop);
  column.addEventListener("drop", drop);
});
