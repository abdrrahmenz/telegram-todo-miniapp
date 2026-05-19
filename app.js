// ========================
// Telegram Web App Init
// ========================
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Set theme colors dari Telegram
const root = document.documentElement;
if (tg.themeParams) {
  if (tg.themeParams.bg_color) root.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color);
  if (tg.themeParams.text_color) root.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color);
  if (tg.themeParams.hint_color) root.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color);
  if (tg.themeParams.button_color) root.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color);
  if (tg.themeParams.button_text_color) root.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color);
  if (tg.themeParams.secondary_bg_color) root.style.setProperty('--tg-theme-secondary-bg-color', tg.themeParams.secondary_bg_color);
}

// Tampilkan info user
const user = tg.initDataUnsafe?.user;
const userInfoEl = document.getElementById('userInfo');
if (user) {
  userInfoEl.textContent = `Halo, ${user.first_name}! 👋`;
} else {
  userInfoEl.textContent = 'Mode preview (buka dari Telegram)';
}

// ========================
// Todo App Logic
// ========================
let todos = JSON.parse(localStorage.getItem('todos') || '[]');
let currentFilter = 'all';

const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const counter = document.getElementById('counter');

// Haptic feedback saat ada aksi
function haptic(style = 'light') {
  try { tg.HapticFeedback.impactOccurred(style); } catch (e) {}
}

// Tambah todo
function addTodo() {
  const text = todoInput.value.trim();
  if (!text) {
    haptic('error');
    todoInput.focus();
    return;
  }

  todos.push({
    id: Date.now(),
    text: text,
    done: false,
    createdAt: new Date().toISOString()
  });

  todoInput.value = '';
  haptic('light');
  saveTodos();
  renderTodos();
}

// Toggle todo
function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.done = !todo.done;
    haptic('light');
    saveTodos();
    renderTodos();
  }
}

// Hapus todo
function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  haptic('medium');
  saveTodos();
  renderTodos();
}

// Set filter
function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.filter === filter);
  });
  renderTodos();
}

// Save ke localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Render todo list
function renderTodos() {
  const filtered = todos.filter(t => {
    if (currentFilter === 'active') return !t.done;
    if (currentFilter === 'done') return t.done;
    return true;
  });

  todoList.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    filtered.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.done ? 'done' : ''}`;
      li.innerHTML = `
        <div class="checkbox" onclick="toggleTodo(${todo.id})"></div>
        <span class="text">${escapeHtml(todo.text)}</span>
        <button class="delete-btn" onclick="deleteTodo(${todo.id})">🗑</button>
      `;
      todoList.appendChild(li);
    });
  }

  // Update counter
  const active = todos.filter(t => !t.done).length;
  const done = todos.filter(t => t.done).length;
  counter.textContent = `${active} aktif · ${done} selesai · ${todos.length} total`;
}

// Escape HTML untuk mencegah XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Enter key untuk tambah todo
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

// Initial render
renderTodos();
