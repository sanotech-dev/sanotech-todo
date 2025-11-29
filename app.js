// Sanotech Todo App - درس ۱: CRUD پایه + localStorage
console.log('Sanotech Todo App - درس ۱ شروع شد!');

const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let todos = JSON.parse(localStorage.getItem('sanotech-todos')) || [];

// تابع ساخت المان تسک (li)
function createTodoElement(todo) {
  const li = document.createElement('li');
  li.className =
    'flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;
  checkbox.className = 'w-5 h-5 rounded mr-3';
  checkbox.addEventListener('change', () => toggleTodo(todo));

  const text = document.createElement('span');
  text.textContent = todo.text;
  text.className = 'flex-1 text-lg font-medium';
  if (todo.completed) {
    text.style.textDecoration = 'line-through';
    text.style.opacity = '0.6';
  }

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.className = 'ml-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition';
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteTodo(todo);
  });

  li.append(checkbox, text, deleteBtn);
  todoList.appendChild(li);
}

// تابع اضافه کردن تسک
function addTodo() {
  const value = input.value.trim();
  if (!value) {
    alert('لطفاً یه کاری بنویس!');
    return;
  }

  const newTodo = { text: value, completed: false };
  todos.push(newTodo);
  localStorage.setItem('sanotech-todos', JSON.stringify(todos));

  createTodoElement(newTodo);
  input.value = '';
}

// تابع حذف تسک
function deleteTodo(todo) {
  todos = todos.filter((t) => t !== todo);
  localStorage.setItem('sanotech-todos', JSON.stringify(todos));
  todoList.innerHTML = ''; // پاک کردن لیست
  todos.forEach(createTodoElement); // بازسازی
}

// تابع تیک زدن/خط کشیدن
function toggleTodo(todo) {
  todo.completed = !todo.completed;
  localStorage.setItem('sanotech-todos', JSON.stringify(todos));
  todoList.innerHTML = ''; // پاک کردن
  todos.forEach(createTodoElement); // بازسازی
}

// رویدادها
addBtn.addEventListener('click', addTodo);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

// لود تسک‌های قبلی
todos.forEach(createTodoElement);
