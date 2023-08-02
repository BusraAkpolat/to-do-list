// Görevleri yerel depolama üzerinde tutmak için bir dizi oluşturuyoruz.
let tasks = [];

// Sayfa yüklendiğinde, kaydedilmiş görevleri yüklemek için bu fonksiyonu çağırıyoruz.
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    tasks.forEach(task => {
      addTaskToList(task.text, task.completed);
    });
  }
}

// Sayfa yüklendiğinde kaydedilmiş görevleri yüklüyoruz.
window.onload = loadTasks;

// Görevi listeye eklemek için bu fonksiyonu kullanıyoruz.
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Lütfen bir görev girin!');
    return;
  }

  addTaskToList(taskText, false);
  taskInput.value = '';
}

// Görevi listeye ekleyen yardımcı fonksiyon.
function addTaskToList(text, completed) {
  const taskList = document.getElementById('taskList');

  const task = document.createElement('li');
  task.textContent = text;

  if (completed) {
    task.classList.add('completed');
  }

  task.addEventListener('click', function () {
    task.classList.toggle('completed');
    updateTasksInLocalStorage();
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Sil';
  deleteButton.onclick = function () {
    task.remove();
    updateTasksInLocalStorage();
  };

  task.appendChild(deleteButton);
  taskList.appendChild(task);

  tasks.push({ text, completed });
  updateTasksInLocalStorage();
}

// Tamamlanan görevleri temizlemek için bu fonksiyonu kullanıyoruz.
function clearCompleted() {
  const completedTasks = document.querySelectorAll('.completed');
  completedTasks.forEach(task => task.remove());

  tasks = tasks.filter(task => !task.completed);
  updateTasksInLocalStorage();
}

// Görevleri yerel depolama üzerinde güncellemek için bu fonksiyonu kullanıyoruz.
function updateTasksInLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
