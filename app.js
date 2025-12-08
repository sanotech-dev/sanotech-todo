// Sanotech Todo App - Full Professional Version
// Author: Sajjad Norouzi | Sanotech 2024
// Features: Add/Edit/Delete/Drag & Drop/Filter/Category/LocalStorage

const input = document.getElementById('todoInput');
const button = document.getElementById('addBtn');
const list = document.getElementById('todoList');

let todos = []; // Main array of tasks
let currentFilter = 'all'; // Filter state: all/active/completed

// Load tasks from localStorage on page load
function loadTodos() {
  const saved = localStorage.getItem('sanotech-todos');
  if (saved) {
    todos = JSON.parse(saved);
  }
  renderTodos();
}

// Save tasks to localStorage
function saveTodos() {
  localStorage.setItem('sanotech-todos', JSON.stringify(todos));
}

// Category colors
const categoryColors = {
  work: 'border-l-8 border-l-blue-600',
  personal: 'border-l-8 border-l-green-600',
  shopping: 'border-l-8 border-l-purple-600',
};

// Render all tasks (with filter)
function renderTodos() {
  list.innerHTML = '';
  const filteredTodos = todos.filter(todo => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });
  filteredTodos.forEach(todo => { // No index needed here
    const li = document.createElement('li');
    li.className = `flex flex-col sm:flex-row gap-4 sm:gap-0 items-start sm:items-center justify-between p-6 bg-white rounded-2xl mb-4 ${
      categoryColors[todo.category]
    } shadow-lg`;
    li.draggable = true;
    li.addEventListener('dragstart', handleDragStart);
    li.addEventListener('dragover', handleDragOver);
    li.addEventListener('drop', handleDrop);
    li.addEventListener('dragend', handleDragEnd);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.className = 'w-6 h-6 mr-4';
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const span = document.createElement('span');
    span.textContent = todo.text;
    span.className = 'text-lg flex-1 cursor-pointer';
    if (todo.completed) {
      span.style.textDecoration = 'line-through';
      span.style.opacity = '0.6';
    }

    // Edit on double-click
    span.addEventListener('dblclick', () => {
      const inputEdit = document.createElement('input');
      inputEdit.type = 'text';
      inputEdit.value = todo.text;
      inputEdit.className = 'text-lg flex-1 px-2 py-1 border-2 border-indigo-500 rounded';
      inputEdit.addEventListener('blur', () => saveEdit(inputEdit, todo));
      inputEdit.addEventListener('keypress', e => e.key === 'Enter' && saveEdit(inputEdit, todo));
      function saveEdit(editInput, task) {
        const newText = editInput.value.trim();
        if (newText) {
          task.text = newText;
          saveTodos();
          renderTodos();
        }
      }
      span.replaceWith(inputEdit);
      inputEdit.focus();
      inputEdit.select();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition';
    deleteBtn.addEventListener('click', () => {
      const realIndex = todos.indexOf(todo);
      todos.splice(realIndex, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  // Update counter (total remaining, not filtered)
  document.getElementById('counter').textContent = todos.filter(t => !t.completed).length;
}

// Drag & Drop functions
let draggedItem = null;
function handleDragStart(e) {
  draggedItem = this;
  setTimeout(() => this.style.opacity = '0.5', 0);
}
function handleDragOver(e) {
  e.preventDefault();
}
function handleDrop(e) {
  e.preventDefault();
  if (draggedItem !== this) {
    const allItems = [...list.querySelectorAll('li')];
    const draggedIndex = allItems.indexOf(draggedItem);
    const targetIndex = allItems.indexOf(this);
    [todos[draggedIndex], todos[targetIndex]] = [todos[targetIndex], todos[draggedIndex]]; // Swap
    saveTodos();
    renderTodos();
  }
}
function handleDragEnd() {
  this.style.opacity = '1';
  draggedItem = null;
}

// Add new task with category
function addNewTask() {
  const text = input.value.trim();
  if (!text) return alert('Please add some text!');
  const category = prompt('Category? (work/personal/shopping)', 'work') || 'work';
  todos.push({
    text,
    completed: false,
    category
  });
  input.value = '';
  saveTodos();
  renderTodos();
}

// Event listeners
button.addEventListener('click', addNewTask);
input.addEventListener('keypress', e => e.key === 'Enter' && addNewTask());

// Filter buttons
document.getElementById('filter-all').addEventListener('click', () => {
  currentFilter = 'all';
  renderTodos();
});
document.getElementById('filter-active').addEventListener('click', () => {
  currentFilter = 'active';
  renderTodos();
});
document.getElementById('filter-completed').addEventListener('click', () => {
  currentFilter = 'completed';
  renderTodos();
});

// Init
loadTodos();
