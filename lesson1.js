const todoList = document.getElementById("todoList");

const newItem = document.createElement("li");

newItem.textContent = "این اولین تسک منه که خودم ساختم";

newItem.className = "bg-blue-100 p-4 rounded m-2 text-lg";

todoList.appendChild(newItem);


const learnDom = document.createElement("li");

learnDom.textContent = "من در حال یادگیری DOM هستم!!";

learnDom.className = "bg-red-200 p-4 rounded m-2 text-lg";

todoList.appendChild(learnDom);

const IcanDo = document.createElement("li");

IcanDo.textContent = "قراره تا فروردین ۱۴۰۵ اولین پروژه پولساز مو بگیرم و عشق کنم";

IcanDo.className = "bg-green-300 p-4 rounded m-2 text-lg";

todoList.appendChild(IcanDo);

console.log("تسک جدید اضافه شد !");
