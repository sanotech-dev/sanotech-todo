// Sanotech Todo App - درس ۵: ذخیره کامل با localStorage
const input = document.getElementById("todoInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("todoList");

let todos = []; // آرایه اصلی تسک‌ها

// ۱. وقتی صفحه لود شد، تسک‌ها رو از حافظه بخون
function loadTodos() {
  const saved = localStorage.getItem("sanotech-todos");
  if (saved) {
    todos = JSON.parse(saved);
  }
  renderTodos();
}

// ۲. تابع ذخیره در حافظه
function saveTodos() {
  localStorage.setItem("sanotech-todos", JSON.stringify(todos));
}

// ۳. نمایش همه تسک‌ها
function renderTodos() {
  list.innerHTML = ""; // لیست رو پاک کن
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "flex items-center justify-between p-4 bg-indigo-50 rounded-xl mb-3";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.className = "w-6 h-6 mr-4";

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.className = "text-lg flex-1";
    if (todo.completed) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    }

    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "حذف";
    deleteBtn.className = "bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition";
    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// ۴. اضافه کردن تسک جدید
function addNewTask() {
  const text = input.value.trim();
  if (!text) return alert("لطفاً یه چیزی بنویس!");

  todos.push({
    text: text,
    completed: false
  });

  input.value = "";
  saveTodos();
  renderTodos();
}

// رویدادها
button.addEventListener("click", addNewTask);
input.addEventListener("keypress", e => e.key === "Enter" && addNewTask());

// شروع برنامه
loadTodos();
