# Worksheet P12 — Daftar Tugas Kuliah

Proyek Vue 3 + Vite yang memindahkan halaman **Daftar Tugas Kuliah**
dari P10 ke bentuk komponen. Tampilan, token, dan enam berkas CSS
P04–P06 dipakai apa adanya.

## Versi perkakas

| Perkakas | Versi |
|---|---|
| Node.js | v26.4.0 |
| npm | 11.17.0 |
| Vue | 3.5.x |
| Vite | 8.3.4 |

Vite 8 menuntut Node.js 20.19 ke atas atau 22.12 ke atas; versi yang
terpasang di mesin ini sudah memenuhi syarat tersebut.

## Perintah

```bash
npm install
npm run dev       # server pengembangan, http://localhost:5173
npm run build     # menghasilkan dist/
npm run preview   # menjalankan isi dist/
```

## Struktur

| Berkas | Isi |
|---|---|
| `src/App.vue` | Komposisi halaman, `onMounted`, `watch`, dan pemuatan API |
| `src/components/KepalaProfil.vue` | Header dan identitas; menerima props `profil` |
| `src/components/TombolFilter.vue` | Tombol kategori dan tombol atur ulang |
| `src/components/DaftarProyek.vue` | Daftar kartu, keadaan kosong, API, dan gambar |
| `src/components/FormKontak.vue` | Form tambah tugas dengan validasi |
| `src/state.js` | `reactive()` bersama: daftar tugas, kategori, data API |
| `src/simpanan.js` | `simpan()`, `muat()`, `aturUlang()`, `KUNCI`, `VERSI` |
| `src/data.js` | Profil, tugas (dengan `id` unik), dan kategori |
| `src/api.js` | Lapisan data P10, tidak diubah; satu-satunya pemanggil `fetch` |

`id` unik ditambahkan pada setiap tugas agar `v-for` memakai `:key`
yang stabil. Data dari API sudah memiliki `id` dari layanan.

## Keadaan dan simpanan

- Kategori aktif disimpan di `localStorage` dengan kunci `pabw-p11`,
  versi `1`, sesuai lembar E worksheet.
- `onMounted` membaca simpanan satu kali; `watch` menulis setiap kali
  kategori berubah.
- Tombol **Atur ulang** mengembalikan kategori ke `semua` dan menulis
  nilai bawaan ke simpanan (bukan mengosongkannya).
- JSON yang rusak atau versi lama dibuang, lalu nilai bawaan dipakai.

## API

`src/api.js` tetap memanggil `https://jsonplaceholder.typicode.com/todos`.
Sepuluh tugas pertama ditampilkan di bagian **Tugas dari API** beserta
status memuat, berhasil, kosong, atau gagal.

## Hasil build

| Berkas | Ukuran | Gzip |
|---|---:|---:|
| `dist/index.html` | 0.46 kB | 0.30 kB |
| `dist/assets/index-*.css` | 5.75 kB | 1.65 kB |
| `dist/assets/index-*.js` | 72.35 kB | 28.37 kB |

Seluruh `dist/` sekitar 280 kB karena menyertakan gambar
`Tugas-1.jpg` (167.6 kB). Sebelum build, peramban memuat modul sumber
dan enam berkas CSS terpisah; sesudah build, JavaScript dan CSS
digabung menjadi satu berkas ber-hash.

Catatan: gambar asli P10 bernama `Tugas#1.jpg`. Di `public/` namanya
disesuaikan menjadi `Tugas-1.jpg` agar karakter `#` tidak membuat
server pratinjau mengembalikan `index.html`; isi gambarnya sama.

## Pemeriksaan

- `npm run build` berhasil.
- `npm run preview` dan `npm run dev` diuji dengan Chrome headless:
  tiga kartu awal tampil, filter PABW menghasilkan satu kartu,
  kategori kosong menampilkan pesan, formulir menambah kartu tanpa
  memuat ulang halaman, kategori bertahan setelah reload, tombol
  atur ulang mengembalikan `semua`, gambar termuat, dan Console bersih.

## Deklarasi AI

Pemindahan kode P10 ke komponen Vue, penulisan state/simpanan, dan
dokumentasi ini dibantu AI (OpenCode). Data profil, topik, isi tugas,
gambar, dan desain berasal dari pekerjaan P10 milik mahasiswa.
