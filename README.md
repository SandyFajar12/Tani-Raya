# TaniRaya ERP — Prototype Tampilan (Static HTML)

Prototype ini murni HTML/CSS/JS statis, **belum ada backend/database**. Tujuannya untuk demo
alur & tampilan ke user, dan bisa langsung di-deploy ke Cloudflare Pages (drag & drop folder ini,
tanpa build step).

## Struktur file

```
taniraya-erp/
├── index.html              → Halaman Login (tombol "Masuk" langsung ke dashboard.html)
├── dashboard.html           → Dashboard utama: ringkasan + menu grid
├── preorder.html             → Pre-Order (daftar & form pengajuan + simulasi approve/reject)
├── pemakaian.html            → Pemakaian sparepart (riwayat & form catat pemakaian)
├── pembelian.html            → Pembelian (riwayat & form catat pembelian)
├── update-stok.html          → Update/penyesuaian stok (stok terkini & form opname)
├── master-sparepart.html     → Master data sparepart (daftar & form tambah)
├── master-user.html          → Master user & role (daftar & form tambah)
├── css/style.css             → Semua styling & design token (warna, radius, dsb.)
└── js/main.js                → Jam header, switch tab list/form, toast simulasi simpan
```

## Cara jalan/demo

- Buka `index.html` langsung di browser, atau deploy folder ini ke Cloudflare Pages.
- Semua tombol "Simpan / Ajukan / Setujui / Tolak" hanya menampilkan notifikasi (toast) dan
  tidak menyimpan data apa pun — murni simulasi alur untuk demo ke user.
- Setiap halaman modul (Pre-Order, Pemakaian, Pembelian, Update Stok, Master Sparepart,
  Master User) punya 2 tampilan yang di-switch dengan tab di bagian atas: **Daftar/Riwayat**
  dan **Form Tambah**.

## Catatan untuk konversi ke Laravel

- Tiap file `.html` di atas kira-kira mewakili 1 Blade view / 1 route:
  - `index.html` → `resources/views/auth/login.blade.php`
  - `dashboard.html` → `resources/views/dashboard.blade.php`
  - `preorder.html`, `pemakaian.html`, `pembelian.html`, `update-stok.html`,
    `master-sparepart.html`, `master-user.html` → masing-masing modul dengan controller
    & route sendiri (list + form bisa dipecah jadi `index` & `create` method, atau tetap
    1 view dengan tab seperti sekarang).
- `css/style.css` dan `js/main.js` bisa langsung dipindah ke `public/css` dan `public/js`,
  atau dikompilasi lewat Vite sesuai struktur Laravel kamu.
- Bagian role/privilege di `master-user.html` masih dropdown statis — nanti ini yang perlu
  dihubungkan ke tabel `roles` & `permissions` (misalnya pakai package `spatie/laravel-permission`)
  supaya hak akses per-menu bisa diatur granular sesuai rencana awal.
- Badge status Pre-Order (Menunggu/Disetujui/Ditolak) dan tombol Setujui/Tolak di
  `preorder.html` adalah tempat paling jelas untuk dipasangi logic approval flow nyata.
