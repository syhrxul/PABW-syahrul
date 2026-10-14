// js/api.js — lapisan data. Satu-satunya berkas yang memanggil fetch.
// app.js dan dom.js tidak boleh memanggil fetch sendiri.

const ALAMAT = 'https://jsonplaceholder.typicode.com/todos';

// JSON.stringify dipakai saat nilai JavaScript perlu menjadi teks JSON,
// misalnya bila tugas nanti dikirim ke API atau disimpan di localStorage.
export function ubahTugasKeJSON(tugas) {
  return JSON.stringify(tugas);
}

/**
 * Mengambil daftar tugas dari API.
 * Mengembalikan larik objek tugas.
 */
export async function ambilTugas() {
  try {
    const respons = await fetch(ALAMAT);
    console.log('status', respons.status, 'ok', respons.ok);

    if (!respons.ok) {
      throw new Error('status ' + respons.status);
    }

    const data = await respons.json();
    return data;
  } catch (galat) {
    console.error('gagal memuat', galat.message);
    throw galat;
  }
}
