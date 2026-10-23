let tasks = JSON.parse(localStorage.getItem("lab_tasks")) || [
  { id: 1, text: "Explore DOM manipulation in JavaScript", completed: false },
  { id: 2, text: "Style UI with modern Bootstrap components", completed: true }
];
let currentFilter = "all";

function saveAndRender() {
  localStorage.setItem("lab_tasks", JSON.stringify(tasks));
  renderTasks();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) {
    alert("Please enter a task description!");
    return;
  }

  tasks.push({ id: Date.now(), text, completed: false });
  input.value = "";
  saveAndRender();
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  saveAndRender();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveAndRender();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveAndRender();
}

function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.innerText.toLowerCase() === (filter === "completed" ? "done" : filter));
  });
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const filteredTasks = tasks.filter(t => {
    if (currentFilter === "active") return !t.completed;
    if (currentFilter === "completed") return t.completed;
    return true;
  });

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = `list-group-item d-flex justify-content-between align-items-center task-item mb-2 rounded ${task.completed ? "completed" : ""}`;
    li.innerHTML = `
      <div class="form-check mb-0">
        <input class="form-check-input me-2" type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${task.id})">
        <span>${task.text}</span>
      </div>
      <button class="btn btn-outline-danger btn-sm py-0 px-2" onclick="deleteTask(${task.id})">&times;</button>
    `;
    list.appendChild(li);
  });

  const remaining = tasks.filter(t => !t.completed).length;
  document.getElementById("taskCount").innerText = `${remaining} task${remaining === 1 ? "" : "s"} left`;
}

// Support Enter key inside input
document.getElementById("taskInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Initial render
renderTasks();
