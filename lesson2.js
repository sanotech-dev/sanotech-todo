const input = document.getElementById("todoInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("todoList");
function addNewTask(){
  const text = input.value.trim();
  if(!text) return alert(" لطفاً یه چیزی بنویس !");
  const li = document.createElement("li");
  li.className = "flex items-center justify-between p-4 bg-indigo-50 rounded-xl mb-3";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "w-6 h-6 mr-4";
  const span = document.createElement("span");
  span.textContent = text;
  span.className = "text-lg flex-1";

  checkbox.addEventListener("change", function(){
    if(checkbox.checked){
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    }else{
      span.style.textDecoration = "none";
      span.style.opacity = "1";
    }
  });
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "حذف";
  deleteBtn.className = "bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition";
  deleteBtn.addEventListener("click", () => li.remove());
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  list.appendChild(li);
  input.value = "";
}
button.addEventListener("click", addNewTask);
input.addEventListener("keypress", function(e){
  if (e.key === "Enter"){
    addNewTask();
  }
});
