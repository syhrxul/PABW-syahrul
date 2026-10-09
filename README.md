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

## Pertemuan 5 — Layout modern: Flexbox dan Grid

Halaman P5 melanjutkan halaman P4. Isi tugas, formulir, token, warna,
dan tema tetap dipakai; daftar tugas ditampilkan sebagai kartu agar
galerinya dapat menyesuaikan jumlah kolom.

### A. Kerangka dan pilihan layout

```text
Grid halaman: baris auto / 1fr / auto
+------------------------------------------+
| Kepala halaman                           |
+----------------------+-------------------+
| Sisi (min. 16rem)     | Utama (fleksibel) |
+----------------------+-------------------+
| Kaki halaman                             |
+------------------------------------------+
```

| Bagian | Nilai/pola | Alasan |
|---|---|---|
| Baris halaman | `auto 1fr auto` | Kepala dan kaki mengikuti isi; bagian utama mengisi ruang tersisa. |
| Kolom utama | `minmax(16rem, 1fr) minmax(0, 2fr)` | Formulir menjadi sisi, daftar tugas mendapat ruang lebih lebar. |
| Navbar | Flex arah baris | Anak menu tersusun mendatar dan jaraknya memakai `gap`. |
| Formulir | Flex arah kolom | Label dan input tersusun vertikal. |
| Galeri | Grid `auto-fit` | Kartu membentuk kolom sebanyak ruang yang tersedia. |
| Isi kartu | Flex arah kolom; metadata memakai grid | Konten kartu satu arah, label dan nilainya tersusun dalam dua kolom. |

Pada layar sempit, grid utama berubah menjadi satu kolom dengan daftar
tugas di atas formulir. Galeri tetap memakai satu aturan `auto-fit`,
tanpa media query. Blok `utama` dan `sisi` ditempatkan dengan
`grid-template-areas` bernama.

### Pemeriksaan P5

- Ukuran uji: 360 px dan 1.280 px.
- Lebar dokumen: 360 px pada viewport 360 px, dan 1.280 px pada viewport
  1.280 px; tidak ada luberan horizontal.
- Galeri: satu kolom pada 360 px dan tiga kolom pada 1.280 px.
- Gambar `Tugas#1.jpg` termuat setelah karakter `#` di-encode pada URL.
- Jarak komponen memakai `gap`; tidak ada `float` atau `!important` pada
  berkas CSS P5.

Potongan yang paling sering dipakai:

```css
grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
```

Dipakai pada galeri kartu agar jumlah kolom mengikuti lebar yang tersedia
tanpa membuat kartu meluber ketika ruang lebih sempit dari 16rem.

### Penilaian mandiri P5

| Bagian | Bobot | Nilai saya | Bukti |
|---|---:|---:|---|
| Kerangka halaman | 30 | ___ | Baris halaman dan area isi memakai grid. |
| Flexbox | 25 | ___ | Navbar dan isi komponen memakai flex serta gap. |
| Grid | 30 | ___ | Galeri adaptif dan penempatan area bernama. |
| Kerapian | 15 | ___ | Tidak meluber pada dua lebar uji; tanpa `!important`. |
| **Total** | **100** | **___** | |

### Tiket keluar

- Flex dipakai pada navbar, formulir, dan isi kartu karena anak-anaknya
  tersusun dalam satu arah.
- Grid dipakai pada kerangka halaman dan galeri karena keduanya perlu
  mengatur baris serta kolom.
- Pada 360 px, kolom sidebar tetap 16rem akan menyisakan ruang konten
  terlalu sempit; breakpoint menumpuk area menjadi satu kolom dan uji
  memastikan tidak ada luberan.
 
## Pertemuan 9 — DOM, Event, dan Interaktivitas

Halaman P9 melanjutkan P8. Data `daftarTugas` sekarang dipasang ke
halaman: daftar tugas dirender dari array, bukan ditulis tangan di HTML.

### Batas berkas

| Berkas | Isi |
|---|---|
| `js/app.js` | Data dan fungsi murni. Ditambah `export` pada `profil`, `judulHalaman`, `daftarTugas`, `buatPerkenalan`, `formatKeahlian`. Tidak menyentuh halaman. |
| `js/dom.js` | Satu-satunya berkas yang menyentuh halaman: membuat kartu, render, filter, validasi form. |

### Elemen yang diisi (lembar A.3)

| Bagian halaman | Pemilih | Diisi apa | Variabel |
|---|---|---|---|
| Daftar tugas | `#daftar` | Kartu tugas dari `daftarTugas` | `wadah` |
| Baris tombol filter | `#filter` | Induk tempat satu pendengar dipasang | `barisFilter` |
| Pesan daftar kosong | `#pesan-kosong` | Dihidden/ditampilkan saat render | `pesanKosong` |
| Form tambah tugas | `#form-tugas` + tiap `input` | Validasi per kolom | `form`, `kolom` |
| Tombol kirim | `#tombol-simpan` | `disabled` sampai seluruh kolom layak | `tombolKirim` |

### Yang dikerjakan

- `profil.html`: daftar tugas ditulis tangan diganti dengan
  `<ul id="daftar"></ul>`; ditambah `<div id="filter">` dengan lima
  `<button data-kategori>`, dan `<p id="pesan-kosong" hidden>`.
- Filter memakai **satu pendengar di induk** (`#filter`). Klik diambil
  lewat `event.target.closest("button")`; `data-kategori` dicocokkan
  dengan `tugas.mataKuliah`. Kategori "Sains Data" sengaja dibuat kosong
  untuk menunjukkan keadaan kosong.
- `render(daftar)` mengosongkan wadah di baris pertama
  (`wadah.textContent = ""`), memeriksa `daftar.length === 0`, baru
  mengisi ulang. Pendengar dipasang di luar render, sekali saja.
- Validasi form: `preventDefault` di baris pertama, `input.value.trim()`
  per kolom, pesan galat per kolom lewat kelas `.tidak-sah`,
  `aria-invalid` untuk pembaca layar, `tombol.disabled` sampai semua
  kolom layak, dan `focus()` ke kolom pertama yang bermasalah. Form
  memakai `novalidate` agar pesan galatnya milik kita, bukan pesan
  bawaan peramban.
- Seluruh isi kartu diisi dengan `textContent`, bukan `innerHTML`.
- CSS baru di `komponen.css`: `#filter` (flex), `#filter button.aktif`
  (outline), `ul.galeri` (reset list), `button:disabled`,
  `.form-kolom.tidak-sah .pesan-galat`.

### Tiga kasus sulit (lembar E.3)

| Yang muncul | Sebabnya | Yang dilakukan |
|---|---|---|
| Pemilih menghasilkan `null` | Nama id/kelas berbeda atau elemen belum ada | Uji pemilih di Console; urutan `<script>` app.js baru dom.js |
| Pendengar ganda setelah render ulang | Pendengar dipasang di dalam `render` | Pendengar dipasang sekali di induk, di luar `render` |
| Isi daftar kosong | Penyaringan tidak menghasilkan isi | `pesan-kosong` ditampilkan di dalam `render` |

### Pemeriksaan B.3 — Bandingkan hasil kerja

| Yang diperiksa | Hasil yang benar | Hasil yang saya dapat |
|---|---|---|
| Jumlah kartu di halaman | Sama dengan panjang `daftarTugas` | 3 — sama dengan `daftarTugas.length` |
| Satu kartu paling atas | Judulnya sama dengan data pertama | `Tugas#1` — sama dengan `daftarTugas[0].judul` |
| Teks di dalam kartu | Tampil sebagai teks, bukan tag yang terurai | Tampil sebagai teks; kartu diisi dengan `textContent` |

Cek di Console:

```js
document.querySelectorAll("#daftar .kartu").length   // 3
document.querySelector("#daftar .kartu h3").textContent // "Tugas#1"
```

### Pemeriksaan C.2 — Empat keadaan filter

| Keadaan | Yang harus terjadi | Hasil yang saya dapat |
|---|---|---|
| Halaman baru dibuka | Semua tugas tampil, tombol "Semua" bertanda aktif | 3 kartu; tombol `data-kategori="semua"` sudah berkelas `aktif` dari HTML |
| Klik satu kategori | Hanya tugas mata kuliah itu yang tampil | Klik "PABW" → 1 kartu (`Tugas#1`); tombol PABW yang aktif |
| Klik kategori kosong | Wadah kosong dan pesannya muncul, bukan halaman kosong | Klik "Sains Data" → 0 kartu, `#pesan-kosong` terlihat |
| Klik dua kali cepat | Jumlah kartu tidak berlipat | Klik "PABW" 2× cepat → tetap 1 kartu |

Cek di Console setelah klik:

```js
document.querySelectorAll("#daftar .kartu").length          // lihat baris tabel
document.querySelector("#pesan-kosong").hidden              // false = pesan terlihat
document.querySelector("#filter button.aktif").dataset.kategori
```

Panel Elements → tab **Event Listeners** pada `#filter`: harus satu `click` saja.

### Pemeriksaan D.3 — Validasi form

| Yang diperiksa | Hasil yang benar | Hasil yang saya dapat |
|---|---|---|
| Kirim form kosong | Halaman tidak dimuat ulang; pesan galat muncul | Tidak reload; 3 kolom berkelas `tidak-sah`, fokus ke `#nama-tugas` |
| Perbaiki satu kolom | Pesannya hilang begitu isinya layak | Ketik di "Nama Tugas" → pesan di kolom itu hilang, 2 sisanya tetap |
| Isi hanya spasi | Masih dinyatakan tidak sah | Ketik spasi saja → tetap `tidak-sah`, karena dipakai `value.trim()` |
| Tombol kirim | Menunggu sampai seluruh kolom layak | `disabled` sampai ketiga kolom terisi; baru aktif |

### Penilaian mandiri P9

| Bagian | Bobot | Nilai saya | Bukti |
|---|---:|---:|---|
| Pemilihan dan pengisian elemen | 20 | ___ | `dom.js` baris pemilihan; `textContent` di `buatKartuTugas` |
| Render dari data | 25 | ___ | `render(daftar)` mengosongkan wadah lebih dulu; 3 kartu |
| Event dan event delegation | 25 | ___ | Satu `addEventListener` di `#filter`; `closest("button")` |
| Validasi form | 20 | ___ | `preventDefault`, `.tidak-sah` per kolom, `disabled` |
| Kebersihan kode, deklarasi AI, dan bukti | 10 | ___ | Batas `app.js`/`dom.js` jelas; README terisi |
| **Total** | **100** | **___** | |

### Tiket keluar

1. `#daftar`, pemilih `document.querySelector("#daftar")`, variabel `wadah`.
2. `querySelector` mengembalikan satu elemen atau `null`;
   `querySelectorAll` mengembalikan `NodeList`. `NodeList` punya
   `forEach` tetapi tidak punya `map` dan `filter`, jadi harus diubah
   dulu dengan `Array.from`.
3. Pendengar di induk tetap bekerja untuk tombol yang dibuat kemudian,
   dan jumlah pendengar tidak bertambah. Yang membuktikan: filter
   memakai satu `addEventListener("click")` di `#filter`, dan tombol
   "Simpan" (yang baru ditambahkan) tidak butuh pendengar sendiri.
4. Daftar berlipat setiap kali render dipanggil, karena isi lama tidak
   dibuang. Baris `wadah.textContent = ""` di baris pertama `render`
   mencegahnya.
5. `innerHTML` membaca teks sebagai HTML, jadi input pengguna yang
   berisi `<img onerror=...>` akan dijalankan. Penggantinya:
   `textContent` untuk seluruh isi yang berasal dari pengguna.

## Catatan penggunaan AI

Struktur HTML dan seluruh berkas CSS (tokens.css, base.css,
layout.css, komponen.css, tema.css) diketik sendiri mengikuti
instruksi worksheet. AI (Claude) membantu: warna yang cocok dipilih dan cara penggunaannya.
