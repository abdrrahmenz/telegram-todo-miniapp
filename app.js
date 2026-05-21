// ========================
// Telegram Web App Init
// ========================
const tg = window.Telegram.WebApp;
try {
  tg.ready();
  tg.expand();
} catch (e) {}

// Theme mapping
const root = document.documentElement;
if (tg.themeParams) {
  const map = {
    bg_color: '--tg-theme-bg-color',
    text_color: '--tg-theme-text-color',
    hint_color: '--tg-theme-hint-color',
    button_color: '--tg-theme-button-color',
    button_text_color: '--tg-theme-button-text-color',
    secondary_bg_color: '--tg-theme-secondary-bg-color',
  };
  for (const [key, varName] of Object.entries(map)) {
    if (tg.themeParams[key]) root.style.setProperty(varName, tg.themeParams[key]);
  }
}

// ========================
// User info
// ========================
const user = tg.initDataUnsafe?.user;
const userGreetingEl = document.getElementById('userGreeting');
const profileNameEl = document.getElementById('profileName');
const profileIdEl = document.getElementById('profileId');
const profileAvatarEl = document.getElementById('profileAvatar');

if (user) {
  userGreetingEl.textContent = `Halo, ${user.first_name}! 👋`;
  profileNameEl.textContent = `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}`;
  profileIdEl.textContent = `Telegram ID: ${user.id}`;
  profileAvatarEl.textContent = user.first_name?.charAt(0)?.toUpperCase() || '👤';
} else {
  userGreetingEl.textContent = 'Mode preview (buka dari Telegram)';
  profileNameEl.textContent = 'Preview User';
  profileIdEl.textContent = 'Telegram ID: -';
  profileAvatarEl.textContent = 'P';
}

function haptic(style = 'light') {
  try { tg.HapticFeedback.impactOccurred(style); } catch (e) {}
}

function notify(message) {
  try { tg.showAlert(message); } catch (e) { alert(message); }
}

function confirmDialog(message, cb) {
  try {
    tg.showConfirm(message, cb);
  } catch (e) {
    cb(window.confirm(message));
  }
}

// ========================
// Product Data
// ========================
const PRODUCTS = [
  { id: 1,  name: 'Pulsa Telkomsel 5.000',   cat: 'pulsa',  icon: '📱', price: 6000,   desc: 'Masa aktif 7 hari' },
  { id: 2,  name: 'Pulsa Telkomsel 10.000',  cat: 'pulsa',  icon: '📱', price: 11000,  desc: 'Masa aktif 7 hari' },
  { id: 3,  name: 'Pulsa Telkomsel 25.000',  cat: 'pulsa',  icon: '📱', price: 26000,  desc: 'Masa aktif 30 hari' },
  { id: 4,  name: 'Pulsa Telkomsel 50.000',  cat: 'pulsa',  icon: '📱', price: 50500,  desc: 'Masa aktif 30 hari' },
  { id: 5,  name: 'Pulsa XL 10.000',         cat: 'pulsa',  icon: '📱', price: 11000,  desc: 'Masa aktif 7 hari' },
  { id: 6,  name: 'Pulsa XL 25.000',         cat: 'pulsa',  icon: '📱', price: 26000,  desc: 'Masa aktif 30 hari' },
  { id: 7,  name: 'Pulsa Indosat 10.000',    cat: 'pulsa',  icon: '📱', price: 11000,  desc: 'Masa aktif 7 hari' },
  { id: 8,  name: 'Pulsa Indosat 25.000',    cat: 'pulsa',  icon: '📱', price: 26000,  desc: 'Masa aktif 30 hari' },
  { id: 10, name: 'Token PLN 20.000',        cat: 'token',  icon: '⚡', price: 21500,  desc: 'Token listrik prabayar' },
  { id: 11, name: 'Token PLN 50.000',        cat: 'token',  icon: '⚡', price: 51500,  desc: 'Token listrik prabayar' },
  { id: 12, name: 'Token PLN 100.000',       cat: 'token',  icon: '⚡', price: 101500, desc: 'Token listrik prabayar' },
  { id: 20, name: 'Paket 1GB / 30 Hari',     cat: 'paket',  icon: '📦', price: 15000,  desc: 'Semua operator' },
  { id: 21, name: 'Paket 3GB / 30 Hari',     cat: 'paket',  icon: '📦', price: 30000,  desc: 'Semua operator' },
  { id: 22, name: 'Paket 5GB / 30 Hari',     cat: 'paket',  icon: '📦', price: 45000,  desc: 'Semua operator' },
  { id: 23, name: 'Paket 10GB / 30 Hari',    cat: 'paket',  icon: '📦', price: 70000,  desc: 'Semua operator' },
  { id: 30, name: 'Voucher Google Play 50rb',  cat: 'barang', icon: '🎮', price: 52000,  desc: 'Gift card Google Play' },
  { id: 31, name: 'Voucher Google Play 100rb', cat: 'barang', icon: '🎮', price: 102000, desc: 'Gift card Google Play' },
  { id: 32, name: 'Voucher Google Play 150rb', cat: 'barang', icon: '🎮', price: 150000, desc: 'Gift card Google Play' },
  { id: 33, name: 'Saldo GoPay 50.000',      cat: 'barang', icon: '💰', price: 52000,  desc: 'Top up saldo GoPay' },
  { id: 34, name: 'Saldo GoPay 100.000',     cat: 'barang', icon: '💰', price: 102000, desc: 'Top up saldo GoPay' },
  { id: 35, name: 'Saldo OVO 50.000',        cat: 'barang', icon: '💜', price: 52000,  desc: 'Top up saldo OVO' },
  { id: 36, name: 'Saldo OVO 100.000',       cat: 'barang', icon: '💜', price: 102000, desc: 'Top up saldo OVO' },
  { id: 37, name: 'Saldo DANA 50.000',       cat: 'barang', icon: '💙', price: 52000,  desc: 'Top up saldo DANA' },
  { id: 38, name: 'Saldo DANA 100.000',      cat: 'barang', icon: '💙', price: 102000, desc: 'Top up saldo DANA' },
];

// ========================
// State
// ========================
let cart = JSON.parse(localStorage.getItem('kedeku_cart') || '[]');
let orderHistory = JSON.parse(localStorage.getItem('kedeku_history') || '[]');
let currentCat = 'all';
let searchQuery = '';
let currentTab = 'Store';

const productGrid = document.getElementById('productGrid');
const emptyState = document.getElementById('emptyState');
const cartBadge = document.getElementById('cartBadge');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const totalPrice = document.getElementById('totalPrice');
const cartOverlay = document.getElementById('cartOverlay');
const cartSheet = document.getElementById('cartSheet');
const cartCount = document.getElementById('cartCount');
const historyList = document.getElementById('historyList');
const historyEmpty = document.getElementById('historyEmpty');
const statOrders = document.getElementById('statOrders');
const statSpent = document.getElementById('statSpent');

// ========================
// Helpers
// ========================
function formatRp(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function saveCart() {
  localStorage.setItem('kedeku_cart', JSON.stringify(cart));
  updateBadge();
}

function saveHistory() {
  localStorage.setItem('kedeku_history', JSON.stringify(orderHistory));
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getTotalSpent() {
  return orderHistory.reduce((sum, order) => sum + order.total, 0);
}

function updateBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartBadge.textContent = totalItems;
  cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
  cartCount.textContent = `${totalItems} item`;
}

// ========================
// Tabs
// ========================
function switchTab(tabName) {
  currentTab = tabName;

  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tabName);
  });

  const target = document.getElementById(`tab${tabName}`);
  if (target) target.classList.add('active');

  if (tabName === 'History') renderHistory();
  if (tabName === 'Profile') renderProfile();

  haptic('light');
}

// ========================
// Product rendering
// ========================
function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    const catMatch = currentCat === 'all' || p.cat === currentCat;
    const query = searchQuery.trim().toLowerCase();
    const searchMatch = !query || p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
    return catMatch && searchMatch;
  });
}

function renderProducts() {
  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    productGrid.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  productGrid.style.display = 'grid';
  emptyState.style.display = 'none';

  productGrid.innerHTML = filtered.map(p => {
    const inCart = cart.find(c => c.id === p.id);
    return `
      <div class="product-card">
        <div class="product-icon">${p.icon}</div>
        <div class="product-name">${escapeHtml(p.name)}</div>
        <div class="product-desc">${escapeHtml(p.desc)}</div>
        <div class="product-bottom">
          <div class="product-price">${formatRp(p.price)}</div>
          <button class="add-btn ${inCart ? 'added' : ''}" onclick="addToCart(${p.id})" aria-label="Tambah produk">
            ${inCart ? '✓' : '+'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function setCategory(cat) {
  currentCat = cat;
  document.querySelectorAll('.cat-pill').forEach(t => {
    t.classList.toggle('active', t.dataset.cat === cat);
  });
  renderProducts();
  haptic('light');
}

function filterProducts() {
  searchQuery = document.getElementById('searchInput').value;
  renderProducts();
}

// ========================
// Cart
// ========================
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  renderProducts();
  renderCart();
  haptic('light');
}

function removeFromCart(productId) {
  cart = cart.filter(c => c.id !== productId);
  saveCart();
  renderProducts();
  renderCart();
  haptic('medium');
}

function changeQty(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.id !== productId);
  }

  saveCart();
  renderProducts();
  renderCart();
  haptic('light');
}

function clearCart() {
  if (cart.length === 0) {
    notify('Keranjang sudah kosong.');
    return;
  }

  confirmDialog('Kosongkan semua isi keranjang?', ok => {
    if (!ok) return;
    cart = [];
    saveCart();
    renderProducts();
    renderCart();
    haptic('medium');
    notify('Keranjang berhasil dikosongkan.');
  });
}

function renderCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = `${totalItems} item`;

  if (cart.length === 0) {
    cartItems.innerHTML = '';
    cartEmpty.style.display = 'flex';
    cartFooter.style.display = 'none';
    return;
  }

  cartEmpty.style.display = 'none';
  cartFooter.style.display = 'block';

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span class="cart-item-icon">${item.icon}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${escapeHtml(item.name)}</div>
        <div class="cart-item-price">${formatRp(item.price * item.qty)}</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">🗑</button>
    </div>
  `).join('');

  totalPrice.textContent = formatRp(getCartTotal());
}

function toggleCart() {
  const isOpen = cartSheet.classList.contains('open');
  if (isOpen) {
    cartSheet.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
  } else {
    cartSheet.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.classList.add('no-scroll');
    renderCart();
  }
  haptic('light');
}

// ========================
// Checkout & history
// ========================
function checkout() {
  if (cart.length === 0) return;

  toggleCart();

  const summary = cart.map(item =>
    `<div class="summary-item">
      <span>${item.icon} ${escapeHtml(item.name)} x${item.qty}</span>
      <span>${formatRp(item.price * item.qty)}</span>
    </div>`
  ).join('');

  document.getElementById('orderSummary').innerHTML =
    summary +
    `<div class="summary-total">
      <span>Total</span>
      <span>${formatRp(getCartTotal())}</span>
    </div>`;

  document.getElementById('nomorInput').value = '';
  document.getElementById('orderModal').style.display = 'flex';
  haptic('light');

  setTimeout(() => document.getElementById('nomorInput').focus(), 200);
}

function closeModal() {
  document.getElementById('orderModal').style.display = 'none';
}

function confirmOrder() {
  const nomorInput = document.getElementById('nomorInput');
  const nomor = nomorInput.value.trim();

  if (!nomor) {
    haptic('error');
    nomorInput.style.borderColor = '#ff6b6b';
    setTimeout(() => { nomorInput.style.borderColor = ''; }, 1200);
    return;
  }

  const total = getCartTotal();
  const now = new Date();
  const orderId = `ORD-${now.getTime().toString().slice(-6)}`;

  const order = {
    id: orderId,
    nomor,
    total,
    date: now.toISOString(),
    status: 'pending',
    items: cart.map(item => ({
      id: item.id,
      name: item.name,
      icon: item.icon,
      qty: item.qty,
      price: item.price,
    }))
  };

  orderHistory.unshift(order);
  saveHistory();

  closeModal();

  const items = cart.map(i => `${i.icon} ${i.name} x${i.qty} = ${formatRp(i.price * i.qty)}`).join('\n');
  const userName = user ? `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}` : 'Unknown';
  const userId = user ? user.id : '-';

  const message =
    `🛒 *PESANAN BARU*\n\n` +
    `🆔 Order ID: ${orderId}\n` +
    `👤 Nama: ${userName}\n` +
    `🆔 User ID: ${userId}\n` +
    `📱 Nomor: ${nomor}\n\n` +
    `📦 Detail Pesanan:\n${items}\n\n` +
    `💰 *Total: ${formatRp(total)}*\n\n` +
    `⏰ ${now.toLocaleString('id-ID')}`;

  try {
    tg.sendData(message);
  } catch (e) {
    console.warn('tg.sendData failed in preview mode', e);
  }

  cart = [];
  saveCart();
  renderProducts();
  renderCart();
  renderHistory();
  renderProfile();

  document.getElementById('successModal').style.display = 'flex';
  haptic('success');
}

function closeSuccess() {
  document.getElementById('successModal').style.display = 'none';
}

function renderHistory() {
  if (!orderHistory.length) {
    historyList.style.display = 'none';
    historyEmpty.style.display = 'block';
    return;
  }

  historyList.style.display = 'flex';
  historyEmpty.style.display = 'none';

  historyList.innerHTML = orderHistory.map(order => `
    <div class="history-card">
      <div class="history-card-header">
        <span class="history-order-id">${order.id}</span>
        <span class="history-status ${order.status}">${order.status === 'pending' ? 'Diproses' : 'Selesai'}</span>
      </div>
      <div class="history-items">
        ${order.items.map(item => `
          <div class="history-item-row">
            <span>${item.icon} ${escapeHtml(item.name)} x${item.qty}</span>
            <span>${formatRp(item.price * item.qty)}</span>
          </div>
        `).join('')}
      </div>
      <div class="history-footer">
        <div class="history-date">${formatDateTime(order.date)}</div>
        <div class="history-total">${formatRp(order.total)}</div>
      </div>
    </div>
  `).join('');
}

function clearHistory() {
  if (!orderHistory.length) {
    notify('Riwayat masih kosong.');
    return;
  }

  confirmDialog('Hapus semua riwayat pesanan?', ok => {
    if (!ok) return;
    orderHistory = [];
    saveHistory();
    renderHistory();
    renderProfile();
    haptic('medium');
    notify('Riwayat berhasil dihapus.');
  });
}

function renderProfile() {
  statOrders.textContent = String(orderHistory.length);
  statSpent.textContent = formatRp(getTotalSpent());
}

function showAbout() {
  document.getElementById('aboutModal').style.display = 'flex';
  haptic('light');
}

// ========================
// Init
// ========================
updateBadge();
renderProducts();
renderCart();
renderHistory();
renderProfile();
switchTab(currentTab);
