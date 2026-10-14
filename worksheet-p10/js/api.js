// js/api.js — lapisan data. Satu-satunya berkas yang memanggil fetch.

const ALAMAT = "https://jsonplaceholder.typicode.com/todos";

// Nilai JavaScript menjadi teks JSON untuk dikirim atau disimpan.
export function ubahTugasKeJSON(tugas) {
  return JSON.stringify(tugas);
}

// Menerima alamat agar kasus 404 dan badan non-JSON dapat diuji.
export async function ambilTugasDari(alamat) {
  try {
    const respons = await fetch(alamat);
    console.log("status", respons.status, "ok", respons.ok);

    // fetch tidak otomatis gagal untuk 404/500.
    if (!respons.ok) {
      throw new Error("status " + respons.status);
    }

    // Bila isi respons bukan JSON, json() menolak Promise dan masuk catch.
    return await respons.json();
  } catch (galat) {
    console.error("gagal memuat", galat.message);
    throw galat;
  }
}

// Fungsi yang dipakai tampilan; alamat API hanya ditulis satu kali di atas.
export function ambilTugas() {
  return ambilTugasDari(ALAMAT);
}
