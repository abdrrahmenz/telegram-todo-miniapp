// ========================
// Telegram Web App Init
// ========================
const tg = window.Telegram.WebApp;
try {
  tg.ready();
  tg.expand();
} catch (e) {}

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
// Constants
// ========================
const DEFAULT_PRODUCTS = [
  { id: 1,  name: 'Pulsa Telkomsel 5.000',   cat: 'pulsa',  icon: '📱', price: 6000,   desc: 'Masa aktif 7 hari', badge: 'Populer' },
  { id: 2,  name: 'Pulsa Telkomsel 10.000',  cat: 'pulsa',  icon: '📱', price: 11000,  desc: 'Masa aktif 7 hari', badge: 'Best Seller' },
  { id: 3,  name: 'Pulsa Telkomsel 25.000',  cat: 'pulsa',  icon: '📱', price: 26000,  desc: 'Masa aktif 30 hari', badge: 'Pilihan' },
  { id: 4,  name: 'Pulsa Telkomsel 50.000',  cat: 'pulsa',  icon: '📱', price: 50500,  desc: 'Masa aktif 30 hari', badge: 'Promo' },
  { id: 5,  name: 'Pulsa XL 10.000',         cat: 'pulsa',  icon: '📱', price: 11000,  desc: 'Masa aktif 7 hari', badge: 'Hemat' },
  { id: 6,  name: 'Pulsa XL 25.000',         cat: 'pulsa',  icon: '📱', price: 26000,  desc: 'Masa aktif 30 hari', badge: 'Cepat' },
  { id: 7,  name: 'Pulsa Indosat 10.000',    cat: 'pulsa',  icon: '📱', price: 11000,  desc: 'Masa aktif 7 hari', badge: 'Ringan' },
  { id: 8,  name: 'Pulsa Indosat 25.000',    cat: 'pulsa',  icon: '📱', price: 26000,  desc: 'Masa aktif 30 hari', badge: 'Rekomendasi' },
  { id: 10, name: 'Token PLN 20.000',        cat: 'token',  icon: '⚡', price: 21500,  desc: 'Token listrik prabayar', badge: 'Favorit' },
  { id: 11, name: 'Token PLN 50.000',        cat: 'token',  icon: '⚡', price: 51500,  desc: 'Token listrik prabayar', badge: 'Laris' },
  { id: 12, name: 'Token PLN 100.000',       cat: 'token',  icon: '⚡', price: 101500, desc: 'Token listrik prabayar', badge: 'Premium' },
  { id: 20, name: 'Paket 1GB / 30 Hari',     cat: 'paket',  icon: '📦', price: 15000,  desc: 'Semua operator', badge: 'Mini' },
  { id: 21, name: 'Paket 3GB / 30 Hari',     cat: 'paket',  icon: '📦', price: 30000,  desc: 'Semua operator', badge: 'Rutin' },
  { id: 22, name: 'Paket 5GB / 30 Hari',     cat: 'paket',  icon: '📦', price: 45000,  desc: 'Semua operator', badge: 'Kombo' },
  { id: 23, name: 'Paket 10GB / 30 Hari',    cat: 'paket',  icon: '📦', price: 70000,  desc: 'Semua operator', badge: 'Hot' },
  { id: 30, name: 'Voucher Google Play 50rb',  cat: 'barang', icon: '🎮', price: 52000,  desc: 'Gift card Google Play', badge: 'Gaming' },
  { id: 31, name: 'Voucher Google Play 100rb', cat: 'barang', icon: '🎮', price: 102000, desc: 'Gift card Google Play', badge: 'Top Up' },
  { id: 32, name: 'Voucher Google Play 150rb', cat: 'barang', icon: '🎮', price: 150000, desc: 'Gift card Google Play', badge: 'Voucher' },
  { id: 33, name: 'Saldo GoPay 50.000',      cat: 'barang', icon: '💰', price: 52000,  desc: 'Top up saldo GoPay', badge: 'E-Wallet' },
  { id: 34, name: 'Saldo GoPay 100.000',     cat: 'barang', icon: '💰', price: 102000, desc: 'Top up saldo GoPay', badge: 'Cepat' },
  { id: 35, name: 'Saldo OVO 50.000',        cat: 'barang', icon: '💜', price: 52000,  desc: 'Top up saldo OVO', badge: 'Otomatis' },
  { id: 36, name: 'Saldo OVO 100.000',       cat: 'barang', icon: '💜', price: 102000, desc: 'Top up saldo OVO', badge: 'Pulsa+Cash' },
  { id: 37, name: 'Saldo DANA 50.000',       cat: 'barang', icon: '💙', price: 52000,  desc: 'Top up saldo DANA', badge: 'Terpercaya' },
  { id: 38, name: 'Saldo DANA 100.000',      cat: 'barang', icon: '💙', price: 102000, desc: 'Top up saldo DANA', badge: 'Instant' },
];

const CATEGORY_INFO = {
  all: { label: 'Semua', icon: '🏪' },
  pulsa: { label: 'Pulsa', icon: '📱' },
  token: { label: 'Token', icon: '⚡' },
  paket: { label: 'Paket Data', icon: '📦' },
  barang: { label: 'Voucher', icon: '🎮' },
};

// ========================
// State
// ========================
let products = JSON.parse(localStorage.getItem('kedeku_products') || 'null') || structuredClone(DEFAULT_PRODUCTS);
let cart = JSON.parse(localStorage.getItem('kedeku_cart') || '[]');
let orderHistory = JSON.parse(localStorage.getItem('kedeku_history') || '[]');
let currentCat = 'all';
let searchQuery = '';
let currentTab = 'Store';

// ========================
// DOM refs
// ========================
const user = tg.initDataUnsafe?.user;
const userGreetingEl = document.getElementById('userGreeting');
const profileNameEl = document.getElementById('profileName');
const profileIdEl = document.getElementById('profileId');
const profileAvatarEl = document.getElementById('profileAvatar');
const categoryTabs = document.getElementById('categoryTabs');
const productGrid = document.getElementById('productGrid');
const featuredStrip = document.getElementById('featuredStrip');
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
const productCountLabel = document.getElementById('productCountLabel');
const storeStatProducts = document.getElementById('storeStatProducts');
const storeStatCategories = document.getElementById('storeStatCategories');
const storeStatOrders = document.getElementById('storeStatOrders');
const historySummaryCount = document.getElementById('historySummaryCount');
const historySummaryTotal = document.getElementById('historySummaryTotal');
const adminProductList = document.getElementById('adminProductList');
const adminModal = document.getElementById('adminModal');
const adminName = document.getElementById('adminName');
const adminPrice = document.getElementById('adminPrice');
const adminCategory = document.getElementById('adminCategory');
const adminIcon = document.getElementById('adminIcon');
const adminDesc = document.getElementById('adminDesc');
const adminBadge = document.getElementById('adminBadge');
const adminEditId = document.getElementById('adminEditId');

// ========================
// Common helpers
// ========================
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

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = String(text ?? '');
  return div.innerHTML;
}

function formatRp(num) {
  return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
}

function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

function getCategoryLabel(cat) {
  return CATEGORY_INFO[cat]?.label || cat;
}

function getCategoryIcon(cat) {
  return CATEGORY_INFO[cat]?.icon || '🧩';
}

function getUniqueCategories() {
  const cats = [...new Set(products.map(p => p.cat))];
  return ['all', ...cats.filter(cat => cat !== 'all')];
}

function scrollToProducts() {
  document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function saveProducts() {
  localStorage.setItem('kedeku_products', JSON.stringify(products));
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
  return orderHistory.reduce((sum, order) => sum + Number(order.total || 0), 0);
}

function updateBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartBadge.textContent = totalItems;
  cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
  cartCount.textContent = `${totalItems} item`;
}

function setUserProfile() {
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
}

// ========================
// Tabs
// ========================
function switchTab(tabName) {
  currentTab = tabName;
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.tab === tabName));
  document.getElementById(`tab${tabName}`)?.classList.add('active');

  if (tabName === 'History') renderHistory();
  if (tabName === 'Profile') renderProfile();
  if (tabName === 'Store') renderStoreStats();
  haptic('light');
}

// ========================
// Store rendering
// ========================
function renderCategoryTabs() {
  const categories = getUniqueCategories();
  categoryTabs.innerHTML = categories.map(cat => `
    <button class="cat-pill ${currentCat === cat ? 'active' : ''}" data-cat="${cat}" onclick="setCategory('${cat}')">
      <span class="cat-emoji">${getCategoryIcon(cat)}</span>
      ${escapeHtml(getCategoryLabel(cat))}
    </button>
  `).join('');
}

function getFilteredProducts() {
  const query = searchQuery.trim().toLowerCase();
  return products.filter(p => {
    const catMatch = currentCat === 'all' || p.cat === currentCat;
    const searchMatch = !query || p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query) || (p.badge || '').toLowerCase().includes(query);
    return catMatch && searchMatch;
  });
}

function renderFeaturedProducts() {
  const source = currentCat === 'all' ? products : products.filter(p => p.cat === currentCat);
  const featured = source.slice(0, 5);
  featuredStrip.innerHTML = featured.map(item => `
    <div class="featured-card">
      <div class="feature-title">${escapeHtml(item.badge || 'Unggulan')}</div>
      <div class="featured-main">
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <div class="featured-price">${formatRp(item.price)}</div>
        </div>
        <div class="featured-icon">${escapeHtml(item.icon || '🛍️')}</div>
      </div>
    </div>
  `).join('');
}

function renderProducts() {
  const filtered = getFilteredProducts();
  productCountLabel.textContent = `${filtered.length} produk`;

  if (!filtered.length) {
    productGrid.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  productGrid.style.display = 'grid';
  emptyState.style.display = 'none';

  productGrid.innerHTML = filtered.map(item => {
    const inCart = cart.find(c => c.id === item.id);
    return `
      <div class="product-card">
        <span class="product-badge">${escapeHtml(item.badge || 'Pilihan')}</span>
        <div class="product-icon-wrap">
          <div class="product-icon">${escapeHtml(item.icon || '🛍️')}</div>
        </div>
        <div class="product-name">${escapeHtml(item.name)}</div>
        <div class="product-desc">${escapeHtml(item.desc)}</div>
        <div class="product-meta">
          <span class="product-chip">${escapeHtml(getCategoryLabel(item.cat))}</span>
          <span class="product-chip">Ready</span>
        </div>
        <div class="product-bottom">
          <div>
            <span class="product-price-label">Harga mulai</span>
            <div class="product-price">${formatRp(item.price)}</div>
          </div>
          <button class="add-btn ${inCart ? 'added' : ''}" onclick="addToCart(${item.id})" aria-label="Tambah produk">
            ${inCart ? '✓' : '+'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderStoreStats() {
  storeStatProducts.textContent = String(products.length);
  storeStatCategories.textContent = String(getUniqueCategories().length - 1);
  storeStatOrders.textContent = String(orderHistory.length);
}

function refreshStore() {
  renderCategoryTabs();
  renderFeaturedProducts();
  renderProducts();
  renderStoreStats();
}

function setCategory(cat) {
  currentCat = cat;
  renderCategoryTabs();
  renderFeaturedProducts();
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
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });

  saveCart();
  renderProducts();
  renderCart();
  haptic('light');
}

function syncCartWithProducts() {
  cart = cart.map(item => {
    const latest = products.find(p => p.id === item.id);
    return latest ? { ...latest, qty: item.qty } : item;
  }).filter(item => products.some(p => p.id === item.id));
  saveCart();
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
  if (item.qty <= 0) cart = cart.filter(c => c.id !== productId);
  saveCart();
  renderProducts();
  renderCart();
  haptic('light');
}

function clearCart() {
  if (!cart.length) {
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

  if (!cart.length) {
    cartItems.innerHTML = '';
    cartEmpty.style.display = 'flex';
    cartFooter.style.display = 'none';
    return;
  }

  cartEmpty.style.display = 'none';
  cartFooter.style.display = 'block';
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span class="cart-item-icon">${escapeHtml(item.icon)}</span>
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
// Checkout and History
// ========================
function checkout() {
  if (!cart.length) return;
  toggleCart();

  const summary = cart.map(item => `
    <div class="summary-item">
      <span>${escapeHtml(item.icon)} ${escapeHtml(item.name)} x${item.qty}</span>
      <span>${formatRp(item.price * item.qty)}</span>
    </div>
  `).join('');

  document.getElementById('orderSummary').innerHTML = summary + `
    <div class="summary-total">
      <span>Total</span>
      <span>${formatRp(getCartTotal())}</span>
    </div>`;

  document.getElementById('nomorInput').value = '';
  document.getElementById('orderModal').style.display = 'flex';
  haptic('light');
  setTimeout(() => document.getElementById('nomorInput').focus(), 180);
}

function closeModal() {
  document.getElementById('orderModal').style.display = 'none';
}

function confirmOrder() {
  const nomorInput = document.getElementById('nomorInput');
  const nomor = nomorInput.value.trim();
  if (!nomor) {
    nomorInput.style.borderColor = '#ff6b6b';
    haptic('error');
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

  try { tg.sendData(message); } catch (e) { console.warn('Preview mode:', e); }

  cart = [];
  saveCart();
  renderCart();
  renderProducts();
  renderHistory();
  renderProfile();
  renderStoreStats();
  document.getElementById('successModal').style.display = 'flex';
  haptic('success');
}

function closeSuccess() {
  document.getElementById('successModal').style.display = 'none';
}

function renderHistory() {
  historySummaryCount.textContent = String(orderHistory.length);
  historySummaryTotal.textContent = formatRp(getTotalSpent());

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
        <span class="history-order-id">${escapeHtml(order.id)}</span>
        <span class="history-status ${escapeHtml(order.status)}">${order.status === 'pending' ? 'Diproses' : 'Selesai'}</span>
      </div>
      <div class="history-items">
        ${order.items.map(item => `
          <div class="history-item-row">
            <span>${escapeHtml(item.icon)} ${escapeHtml(item.name)} x${item.qty}</span>
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
    renderStoreStats();
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
// Admin Panel
// ========================
function openAdminPanel() {
  renderAdminList();
  adminModal.style.display = 'flex';
  document.body.classList.add('no-scroll');
  haptic('light');
}

function closeAdminPanel() {
  adminModal.style.display = 'none';
  document.body.classList.remove('no-scroll');
}

function resetAdminForm() {
  adminEditId.value = '';
  adminName.value = '';
  adminPrice.value = '';
  adminCategory.value = 'pulsa';
  adminIcon.value = '';
  adminDesc.value = '';
  adminBadge.value = '';
}

function getNextProductId() {
  return products.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
}

function saveAdminProduct() {
  const name = adminName.value.trim();
  const price = Number(adminPrice.value);
  const cat = adminCategory.value;
  const icon = adminIcon.value.trim() || getCategoryIcon(cat);
  const desc = adminDesc.value.trim() || 'Produk custom dari admin';
  const badge = adminBadge.value.trim() || 'Custom';
  const editId = adminEditId.value.trim();

  if (!name || !price || price <= 0) {
    notify('Nama produk dan harga wajib diisi.');
    return;
  }

  if (editId) {
    products = products.map(item => item.id === Number(editId)
      ? { ...item, name, price, cat, icon, desc, badge }
      : item
    );
  } else {
    products.unshift({
      id: getNextProductId(),
      name,
      price,
      cat,
      icon,
      desc,
      badge,
    });
  }

  saveProducts();
  syncCartWithProducts();
  resetAdminForm();
  refreshStore();
  renderAdminList();
  haptic('success');
  notify('Produk berhasil disimpan.');
}

function editAdminProduct(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;
  adminEditId.value = item.id;
  adminName.value = item.name;
  adminPrice.value = item.price;
  adminCategory.value = item.cat;
  adminIcon.value = item.icon || '';
  adminDesc.value = item.desc || '';
  adminBadge.value = item.badge || '';
  haptic('light');
}

function deleteAdminProduct(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;

  confirmDialog(`Hapus produk ${item.name}?`, ok => {
    if (!ok) return;
    products = products.filter(p => p.id !== productId);
    saveProducts();
    syncCartWithProducts();
    if (currentCat !== 'all' && !products.some(p => p.cat === currentCat)) currentCat = 'all';
    refreshStore();
    renderAdminList();
    haptic('medium');
    notify('Produk berhasil dihapus.');
  });
}

function resetProductsToDefault() {
  confirmDialog('Reset semua produk ke daftar default?', ok => {
    if (!ok) return;
    products = structuredClone(DEFAULT_PRODUCTS);
    saveProducts();
    syncCartWithProducts();
    resetAdminForm();
    currentCat = 'all';
    refreshStore();
    renderAdminList();
    haptic('success');
    notify('Produk berhasil direset ke default.');
  });
}

function renderAdminList() {
  adminProductList.innerHTML = products.map(item => `
    <div class="admin-product-item">
      <div class="admin-item-main">
        <div class="admin-item-left">
          <div class="admin-item-icon">${escapeHtml(item.icon || '🛍️')}</div>
          <div class="admin-item-text">
            <strong>${escapeHtml(item.name)}</strong>
            <p>${escapeHtml(item.desc || '-')}</p>
          </div>
        </div>
        <strong>${formatRp(item.price)}</strong>
      </div>
      <div class="admin-item-meta">
        <span class="admin-meta-chip">${escapeHtml(getCategoryLabel(item.cat))}</span>
        <span class="admin-meta-chip">${escapeHtml(item.badge || 'Custom')}</span>
        <span class="admin-meta-chip">ID ${item.id}</span>
      </div>
      <div class="admin-item-actions">
        <button class="admin-action-btn" onclick="editAdminProduct(${item.id})">Edit</button>
        <button class="admin-action-btn danger" onclick="deleteAdminProduct(${item.id})">Hapus</button>
      </div>
    </div>
  `).join('');
}

// ========================
// Init
// ========================
setUserProfile();
updateBadge();
resetAdminForm();
syncCartWithProducts();
refreshStore();
renderCart();
renderHistory();
renderProfile();
switchTab(currentTab);
