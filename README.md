# PABW — Syahrul Imtikhan Ahmad — NIM25523064
 
Repo ini memuat pekerjaan mata kuliah Pengembangan Aplikasi
Berbasis Web, satu folder untuk setiap pertemuan.
 
## Pertemuan 3 — Halaman profil saya
 
Topik halaman saya: Daftar tugas dan prioritas
 
- Judul halaman: Daftar Tugas Kuliah
- Deskripsi: Halaman ini menampilkan Tugas Kuliah dan Tenggatnya
- Tautan navigasi: Beranda, Daftar Tugas, Kontak
- Dua bagian utama: Daftar Tugas saya, Tambah Tugas
- Kolom tabel: Nama Tugas, Tenggat, Mata Kuliah, Prioritas
- Kolom form: Nama Tugas, Tenggat, Nama mata kuliah
- Gambar: Tugas#1.jpeg

## Pertemuan 4 — Design token halaman profil

- Berkas gaya yang dibuat: tokens.css, base.css, layout.css,
  komponen.css, tema.css
- Warna utama: #1E3A8A (biru navy), dipilih karena klasik, mudah
  dipasangkan, dan kontrasnya terhadap putih cukup tinggi (10.36:1)
- Tema gelap: mengikuti `prefers-color-scheme`, bisa ditimpa lewat
  tombol pengalih (checkbox + `:has()`, tanpa JavaScript)

### Token yang saya tetapkan

| Token | Nilai | Untuk apa |
|---|---|---|
| --color-primary | #1E3A8A | tombol, tautan, penanda |
| --color-fg | #0F172A | warna teks utama |
| --color-bg | #F8FAFC | latar halaman |
| --color-surface | #FFFFFF | latar kartu dan panel |
| --color-border | #7C8CA0 | garis pemisah dan tepi |
| --color-focus | #3B82F6 | garis fokus papan ketik |
| --color-danger | #B00020 | isian tidak sah |
| --radius-md | 0.5rem | sudut tombol dan kartu |
| --space-4 | 1rem | jarak standar antar elemen |

Kriteria selesai saya: mengubah `--blue-700` (atau `--color-primary`)
di satu baris harus mengubah warna tombol, tautan, judul, dan garis
fokus.
 
## Catatan penggunaan AI

Struktur HTML dan seluruh berkas CSS (tokens.css, base.css,
layout.css, komponen.css, tema.css) diketik sendiri mengikuti
instruksi worksheet. AI (Claude) membantu: warna yang cocok dipilih dan cara penggunaannya
