// ========================
// Telegram Web App Init
// ========================
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Set theme colors
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

// User info
const user = tg.initDataUnsafe?.user;
const userInfoEl = document.getElementById('userInfo');
if (user) {
  userInfoEl.textContent = `Halo, ${user.first_name}! 👋`;
} else {
  userInfoEl.textContent = 'Mode preview (buka dari Telegram)';
}

function haptic(style = 'light') {
  try { tg.HapticFeedback.impactOccurred(style); } catch (e) {}
}

// ========================
// Product Data
// ========================
const PRODUCTS = [
  // Pulsa
  { id: 1,  name: 'Pulsa Telkomsel 5.000',  cat: 'pulsa',  icon: '📱', price: 6000,   desc: 'Masa aktif 7 hari' },
  { id: 2,  name: 'Pulsa Telkomsel 10.000', cat: 'pulsa',  icon: '📱', price: 11000,  desc: 'Masa aktif 7 hari' },
  { id: 3,  name: 'Pulsa Telkomsel 25.000', cat: 'pulsa',  icon: '📱', price: 26000,  desc: 'Masa aktif 30 hari' },
  { id: 4,  name: 'Pulsa Telkomsel 50.000', cat: 'pulsa',  icon: '📱', price: 50500,  desc: 'Masa aktif 30 hari' },
  { id: 5,  name: 'Pulsa XL 10.000',        cat: 'pulsa',  icon: '📱', price: 11000,  desc: 'Masa aktif 7 hari' },
  { id: 6,  name: 'Pulsa XL 25.000',        cat: 'pulsa',  icon: '📱', price: 26000,  desc: 'Masa aktif 30 hari' },
  { id: 7,  name: 'Pulsa Indosat 10.000',   cat: 'pulsa',  icon: '📱', price: 11000,  desc: 'Masa aktif 7 hari' },
  { id: 8,  name: 'Pulsa Indosat 25.000',   cat: 'pulsa',  icon: '📱', price: 26000,  desc: 'Masa aktif 30 hari' },
  // Token Listrik
  { id: 10, name: 'Token PLN 20.000',       cat: 'token',  icon: '⚡', price: 21500,  desc: 'Token listrik prabayar' },
  { id: 11, name: 'Token PLN 50.000',       cat: 'token',  icon: '⚡', price: 51500,  desc: 'Token listrik prabayar' },
  { id: 12, name: 'Token PLN 100.000',      cat: 'token',  icon: '⚡', price: 101500, desc: 'Token listrik prabayar' },
  // Paket Data
  { id: 20, name: 'Paket 1GB / 30 Hari',    cat: 'paket',  icon: '📦', price: 15000,  desc: 'Semua operator' },
  { id: 21, name: 'Paket 3GB / 30 Hari',    cat: 'paket',  icon: '📦', price: 30000,  desc: 'Semua operator' },
  { id: 22, name: 'Paket 5GB / 30 Hari',    cat: 'paket',  icon: '📦', price: 45000,  desc: 'Semua operator' },
  { id: 23, name: 'Paket 10GB / 30 Hari',   cat: 'paket',  icon: '📦', price: 70000,  desc: 'Semua operator' },
  // Barang
  { id: 30, name: 'Voucher Google Play 50rb', cat: 'barang', icon: '🎮', price: 52000,  desc: 'Gift card Google Play' },
  { id: 31, name: 'Voucher Google Play 100rb',cat: 'barang', icon: '🎮', price: 102000, desc: 'Gift card Google Play' },
  { id: 32, name: 'Voucher Google Play 150rb',cat: 'barang', icon: '🎮', price: 150000, desc: 'Gift card Google Play' },
  { id: 33, name: 'Saldo GoPay 50.000',     cat: 'barang', icon: '💰', price: 52000,  desc: 'Top up saldo GoPay' },
  { id: 34, name: 'Saldo GoPay 100.000',    cat: 'barang', icon: '💰', price: 102000, desc: 'Top up saldo GoPay' },
  { id: 35, name: 'Saldo OVO 50.000',       cat: 'barang', icon: '💜', price: 52000,  desc: 'Top up saldo OVO' },
  { id: 36, name: 'Saldo OVO 100.000',      cat: 'barang', icon: '💜', price: 102000, desc: 'Top up saldo OVO' },
  { id: 37, name: 'Saldo DANA 50.000',      cat: 'barang', icon: '💙', price: 52000,  desc: 'Top up saldo DANA' },
  { id: 38, name: 'Saldo DANA 100.000',     cat: 'barang', icon: '💙', price: 102000, desc: 'Top up saldo DANA' },
];

// ========================
// State
// ========================
let cart = JSON.parse(localStorage.getItem('kedeku_cart') || '[]');
let currentCat = 'all';
let searchQuery = '';

const productGrid = document.getElementById('productGrid');
const emptyState = document.getElementById('emptyState');
const cartBadge = document.getElementById('cartBadge');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const totalPrice = document.getElementById('totalPrice');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');

// ========================
// Format Rupiah
// ========================
function formatRp(num) {
  return 'Rp ' + num.toLocaleString('id-ID');
}

// ========================
// Render Products
// ========================
function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    const catMatch = currentCat === 'all' || p.cat === currentCat;
    const searchMatch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
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
        <div class="product-price">${formatRp(p.price)}</div>
        <button class="add-btn ${inCart ? 'added' : ''}" onclick="addToCart(${p.id})">
          ${inCart ? '✓ Ditambahkan' : '🛒 Tambah'}
        </button>
      </div>
    `;
  }).join('');
}

// ========================
// Category & Search
// ========================
function setCategory(cat) {
  currentCat = cat;
  document.querySelectorAll('.tab').forEach(t => {
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
// Cart Functions
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

function saveCart() {
  localStorage.setItem('kedeku_cart', JSON.stringify(cart));
  updateBadge();
}

function updateBadge() {
  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  cartBadge.textContent = totalItems;
  cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
}

function getCartTotal() {
  return cart.reduce((s, c) => s + c.price * c.qty, 0);
}

// ========================
// Render Cart
// ========================
function renderCart() {
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

// ========================
// Cart Sidebar Toggle
// ========================
function toggleCart() {
  const isOpen = cartSidebar.classList.contains('open');
  if (isOpen) {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
  } else {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    renderCart();
  }
  haptic('light');
}

// ========================
// Checkout Flow
// ========================
function checkout() {
  if (cart.length === 0) return;

  toggleCart();

  // Build order summary
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

  setTimeout(() => document.getElementById('nomorInput').focus(), 300);
}

function closeModal() {
  document.getElementById('orderModal').style.display = 'none';
}

function confirmOrder() {
  const nomor = document.getElementById('nomorInput').value.trim();
  if (!nomor) {
    haptic('error');
    document.getElementById('nomorInput').style.borderColor = '#ff4757';
    setTimeout(() => document.getElementById('nomorInput').style.borderColor = '', 1500);
    return;
  }

  closeModal();

  // Build pesan untuk admin
  const items = cart.map(i => `${i.icon} ${i.name} x${i.qty} = ${formatRp(i.price * i.qty)}`).join('\n');
  const total = formatRp(getCartTotal());
  const userName = user ? user.first_name : 'Unknown';
  const userId = user ? user.id : '-';

  const message =
    `🛒 *PESANAN BARU*\n\n` +
    `👤 Nama: ${userName}\n` +
    `🆔 User ID: ${userId}\n` +
    `📱 Nomor: ${nomor}\n\n` +
    `📦 Detail Pesanan:\n${items}\n\n` +
    `💰 *Total: ${total}*\n\n` +
    `⏰ ${new Date().toLocaleString('id-ID')}`;

  // Kirim ke Telegram via Web App
  tg.sendData(message);

  // Clear cart
  cart = [];
  saveCart();
  renderProducts();

  // Show success
  document.getElementById('successModal').style.display = 'flex';
  haptic('success');
}

function closeSuccess() {
  document.getElementById('successModal').style.display = 'none';
}

// ========================
// Utility
// ========================
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ========================
// Init
// ========================
updateBadge();
renderProducts();
