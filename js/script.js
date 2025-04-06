document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');
  const totalTasks = document.getElementById('totalTasks');
  const completedTasks = document.getElementById('completedTasks');

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
  });

  function addTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const desc = document.getElementById('taskDescription').value.trim();
    const priority = document.getElementById('taskPriority').value;
    const dueDate = document.getElementById('taskDueDate').value;

    if (!title || !dueDate) {
      alert("Please fill in all required fields.");
      return;
    }

    const col = document.createElement('div');
    col.className = 'col-md-6';

    const card = document.createElement('div');
    card.className = `card task-card shadow-sm p-3 priority-${priority}`;

    const cardBody = document.createElement('div');
    cardBody.className = 'd-flex justify-content-between align-items-start';

    const left = document.createElement('div');

    const titleEl = document.createElement('h5');
    titleEl.textContent = title;
    titleEl.className = 'mb-1';

    const descEl = document.createElement('p');
    descEl.textContent = desc;
    descEl.className = 'mb-1 text-muted small';

    const badgeGroup = document.createElement('div');
    badgeGroup.innerHTML = `
      <span class="badge bg-${priority === 'High' ? 'danger' : priority === 'Medium' ? 'warning' : 'success'}">${priority}</span>
      <span class="badge bg-secondary">Due: ${dueDate}</span>
    `;

    const btnGroup = document.createElement('div');

    const completeBtn = createButton('✓', 'btn-outline-success', () => {
      card.classList.toggle('completed');
      updateCounters();
    });

    const editBtn = createButton('✎', 'btn-outline-primary', () => {
      const newTitle = prompt('Edit title:', titleEl.textContent);
      if (newTitle) titleEl.textContent = newTitle.trim();
    });

    const deleteBtn = createButton('🗑', 'btn-outline-danger', () => {
      taskList.removeChild(col);
      updateCounters();
    });

    btnGroup.append(completeBtn, editBtn, deleteBtn);

    left.append(titleEl, desc ? descEl : '', badgeGroup);
    cardBody.append(left, btnGroup);
    card.append(cardBody);
    col.append(card);
    taskList.appendChild(col);

    taskForm.reset();
    updateCounters();
  }

  function createButton(icon, className, onClick) {
    const btn = document.createElement('button');
    btn.className = `btn btn-sm ${className} ms-2`;
    btn.innerHTML = icon;
    btn.addEventListener('click', onClick);
    return btn;
  }

  function updateCounters() {
    const total = taskList.querySelectorAll('.task-card').length;
    const completed = taskList.querySelectorAll('.task-card.completed').length;

    totalTasks.textContent = `Total: ${total}`;
    completedTasks.textContent = `Completed: ${completed}`;
  }
});
