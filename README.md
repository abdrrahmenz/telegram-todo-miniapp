# Todo Mini App - Telegram

Mini App Todo List untuk Telegram bot 📝

## Fitur
- ✅ Tambah / centang / hapus todo
- 🎨 Tema otomatis mengikuti Telegram (light/dark)
- 💾 Data tersimpan di localStorage
- 📱 Responsive untuk mobile
- 🎯 Haptic feedback
- 🔄 Filter: Semua / Aktif / Selesai

## Struktur File
```
todo-app/
├── index.html    ← Halaman utama mini app
├── style.css     ← Styling (auto-theme dari Telegram)
├── app.js        ← Logic todo + Telegram SDK
└── bot.py        ← Bot Telegram (Python)
```

## Cara Menjalankan

### 1. Deploy Web App
Upload folder ini (index.html, style.css, app.js) ke:
- **Vercel** → `npx vercel`
- **Netlify** → drag & drop folder
- **GitHub Pages** → push ke repo, aktifkan Pages

> ⚠️ Domain **wajib HTTPS**!

### 2. Setup Bot
```bash
# Install dependency
pip install python-telegram-bot

# Edit bot.py — masukkan token & URL
# BOT_TOKEN = "token dari @BotFather"
# MINI_APP_URL = "https://url-deploy-kamu.com"

# Jalankan bot
python bot.py
```

### 3. Atau lewat BotFather (tanpa bot.py)
1. Buka @BotFather
2. `/newbot` → buat bot baru
3. `/myapps` → Create New App
4. Masukkan URL web app yang sudah di-deploy
5. Selesai! Bot otomatis punya tombol Mini App

## Cara Dapat Bot Token
1. Buka [@BotFather](https://t.me/BotFather) di Telegram
2. Kirim `/newbot`
3. Ikuti instruksi, beri nama bot
4. Copy token yang diberikan
