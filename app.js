// ۱. یه آرایه می‌سازیم که همه تسک‌ها رو نگه داره
let todos = [];

// ۲. وقتی صفحه لود شد، از localStorage بخونیم
function loadTodos() {
  const saved = localStorage.getItem("sanotech-todos");
  if (saved) {
    todos = JSON.parse(saved);  // از متن به آرایه تبدیل می‌کنه
  }
  renderTodos(); // همه تسک‌ها رو نشون بده
}

// ۳. تابع ذخیره کردن
function saveTodos() {
  localStorage.setItem("sanotech-todos", JSON.stringify(todos));
}

// ۴. تابع نمایش تسک‌ها (render)
function renderTodos() {
  list.innerHTML = ""; // اول لیست رو پاک کن
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
      renderTodos(); // دوباره بساز که خط بیاد
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "حذف";
    deleteBtn.className = "bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition";
    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1); // از آرایه حذف کن
      saveTodos();
      renderTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// ۵. تابع اضافه کردن تسک (به‌روز شده)
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

// ۶. رویدادها
button.addEventListener("click", addNewTask);
input.addEventListener("keypress", e => e.key === "Enter" && addNewTask());

// ۷. وقتی صفحه لود شد، تسک‌ها رو نشون بده
loadTodos();
