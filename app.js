console.log('Sanotech Todo App - شروع واقعی با استاد واقعی');

document.getElementById('addBtn').addEventListener('click', () => {
  const input = document.getElementById('todoInput');
  if (input.value.trim() === '') {
    alert('لطفاً یه چیزی بنویس!');
    return;
  }
  alert('عالی! فردا همینجا تسک رو به لیست اضافه می‌کنیم.');
  input.value = '';
});
