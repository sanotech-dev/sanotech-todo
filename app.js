// Sanotech Todo App - جلسه ۲: ویرایش + Drag & Drop + دسته‌بندی + فیلتر
console.log("Sanotech Todo App - جلسه ۲ شروع شد!");

const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let todos = JSON.parse(localStorage.getItem('sanotech-todos-v2')) || [];
let draggedItem = null;

// دسته‌بندی‌ها و رنگ‌ها
const categories = {
  work: { label: "کار", color: "border-l-8 border-l-blue-600" },
  personal: { label: "شخصی", color: "border-l-8 border-l-green-600" },
  shopping: { label: "خرید", color: "border-l-8 border-l-purple-600" }
};
let currentFilter = 'all'; // all, active, completed

// تابع ساخت المان تسک
function createTodoElement(todo, index) {
  const li = document.createElement('li');
  li.className = `flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border-2 ${categories[todo.category].color} mb-3 cursor-move transition-all hover:shadow-md`;
  li.draggable = true;
  li.dataset.index = index;

  // Drag events
  li.addEventListener('dragstart', () => draggedItem = li);
  li.addEventListener('dragover', (e) => e.preventDefault());
  li.addEventListener('drop', handleDrop);
  li.addEventListener('dragend', () => draggedItem = null);

  const leftDiv = document.createElement('div');
  leftDiv.className = 'flex items-center flex-1';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;
  checkbox.className = 'w-5 h-5 rounded mr-4';
  checkbox.addEventListener('change', () => toggleComplete(index));

  const textSpan = document.createElement('span');
  textSpan.textContent = todo.text;
  textSpan.className = `text-lg ${todo.completed ? 'line-through opacity-60' : ''} flex-1`;
  textSpan.addEventListener('dblclick', () => startEdit(textSpan, todo, index));

  const categoryBadge = document.createElement('span');
  categoryBadge.textContent = categories[todo.category].label;
  categoryBadge.className = 'mr-4 px-3 py-1 bg-gray-100 rounded-full text-sm font-medium';

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'حذف';
  deleteBtn.className = 'ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm';

  deleteBtn.addEventListener('click', () => deleteTodo(index));

  leftDiv.append(checkbox, textSpan, categoryBadge);
  li.append(leftDiv, deleteBtn);
  return li;
}

// ویرایش تسک
function startEdit(span, todo, index) {
  const inputEdit = document.createElement('input');
  inputEdit.type = 'text';
  inputEdit.value = todo.text;
  inputEdit.className = 'px-2 py-1 border-2 border-indigo-500 rounded-lg text-lg flex-1';

  inputEdit.addEventListener('blur', () => finishEdit(inputEdit, todo, index, span));
  inputEdit.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') finishEdit(inputEdit, todo, index, span);
  });

  span.replaceWith(inputEdit);
  inputEdit.focus();
  inputEdit.select();
}

function finishEdit(inputEdit, todo, index, originalSpan) {
  todo.text = inputEdit.value.trim() || "بدون عنوان";
  saveAndRender();
  originalSpan.textContent = todo.text;
  inputEdit.replaceWith(originalSpan);
}

// Drag & Drop
function handleDrop(e) {
  e.preventDefault();
  if (!draggedItem) return;

  const afterElement = getDragAfterElement(todoList, e.clientY);
  const draggedIndex = Array.from(todoList.children).indexOf(draggedItem);

  if (afterElement == null) {
    todoList.appendChild(draggedItem);
  } else {
    todoList.insertBefore(draggedItem, afterElement);
  }

  // به‌روزرسانی آرایه todos بر اساس ترتیب جدید DOM
  const newOrder = Array.from(todoList.children).map(li => {
    const idx = li.dataset.index;
    return todos[idx];
  });
  todos = newOrder;
  saveAndRender();
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// اضافه کردن تسک جدید
function addTodo() {
  const text = input.value.trim();
  if (!text) return alert("لطفاً یه کاری بنویس!");

  const category = prompt("دسته‌بندی؟ (work / personal / shopping)", "work") || "work";
  if (!categories[category]) category = "work";

  todos.push({
    text,
    completed: false,
    category
  });

  input.value = '';
  saveAndRender();
}

// سایر توابع
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveAndRender();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem('sanotech-todos-v2', JSON.stringify(todos));
  render();
}

// رندر اصلی
function render() {
  todoList.innerHTML = '';
  const filtered = todos.filter(todo => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

  filtered.forEach((todo, idx) => {
    const realIndex = todos.indexOf(todo);
    todoList.appendChild(createTodoElement(todo, realIndex));
  });

  document.getElementById('remainingCount').textContent = todos.filter(t => !t.completed).length;
}

// رویدادها
addBtn.addEventListener('click', addTodo);
input.addEventListener('keypress', e => e.key === 'Enter' && addTodo());

// وقتی صفحه لود شد
render();
