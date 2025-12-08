const input = document.getElementById('todoInput');
const button = document.getElementById('addBtn');
const list = document.getElementById('todoList');

let todos = []; // آرایه اصلی تسک‌ها

// ۱. وقتی صفحه لود شد، تسک‌ها رو از حافظه بخون
function loadTodos() {
  const saved = localStorage.getItem('sanotech-todos');
  if (saved) {
    todos = JSON.parse(saved);
  }
  renderTodos();
}

// ۲. تابع ذخیره در حافظه
function saveTodos() {
  localStorage.setItem('sanotech-todos', JSON.stringify(todos));
}



const categoryColors = {
  work: "border-l-8 border-l-blue-600",
  personal: "border-l-8 border-l-green-600",
  shopping: "border-l-8 border-l-purple-600"
};

// ۳. نمایش همه تسک‌ها
function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = `flex items-center justify-between p-4 bg-white rounded-xl mb-3 ${categoryColors[todo.category]} shadow-sm cursor-move select-none`;
    li.draggable = true;
    li.addEventListener('dragstart', handleDragStart);
    li.addEventListener('dragover', handleDragOver);
    li.addEventListener('drop', handleDrop);
    li.addEventListener('dragend', handleDragEnd);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.className = 'w-6 h-6 mr-4';

    const span = document.createElement('span');
    span.textContent = todo.text;
    span.className = 'text-lg flex-1 cursor-pointer';
    if (todo.completed) {
      span.style.textDecoration = 'line-through';
      span.style.opacity = '0.6';
    }

    span.addEventListener('dblclick', function () {
      const inputEdit = document.createElement('input');
      inputEdit.type = 'text';
      inputEdit.value = todo.text;
      inputEdit.className = 'text-lg flex-1 px-2 py-1 border-2 border-indigo-500 rounded';

      inputEdit.addEventListener('blur', saveEdit);
      inputEdit.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          saveEdit();
        }
      });
      function saveEdit() {
        const newText = inputEdit.value.trim();
        if (newText) {
          todo.text = newText;
          saveTodos();
          renderTodos();
        }
      }
      span.replaceWith(inputEdit);
      inputEdit.focus();
      inputEdit.select();
    });
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'حذف';
    deleteBtn.className = 'bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition';
    deleteBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
  document.getElementById("counter").textContent = todos.filter(t => !t.completed).length;
}

let draggedItem = null;
function handleDragStart(e) {
  draggedItem = this;
  setTimeout(() => (this.style.opacity = '0.5'), 0);
}

function handleDragOver(e) {
  e.preventDefault();
}
function handleDrop(e) {
  e.preventDefault();
  if (draggedItem !== this) {
    let allItems = [...list.querySelectorAll('li')];
    let draggedIndex = allItems.indexOf(draggedItem);
    let targetIndex = allItems.indexOf(this);

    let temp = todos[draggedIndex];
    todos[draggedIndex] = todos[targetIndex];
    todos[targetIndex] = temp;

    saveTodos();
    renderTodos();
  }
}

function handleDragEnd() {
  this.style.opacity = '1';
  draggedItem = null;
}
// ۴. اضافه کردن تسک جدید
function addNewTask() {
  const text = input.value.trim();
   if (!text) return alert("لطفاً یه چیزی بنویس!");
  const category = prompt("دسته‌بندی؟ (work / personal / shopping)", "work") || "work";

  todos.push({
    text: text,
    completed: false,
    category: category
  });

  input.value = "";
  saveTodos();
  renderTodos();
}
// رویدادها
button.addEventListener('click', addNewTask);
input.addEventListener('keypress', (e) => e.key === 'Enter' && addNewTask());

// شروع برنامه
loadTodos();
