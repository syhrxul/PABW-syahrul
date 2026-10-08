// dom.js: satu-satunya berkas yang menyentuh halaman.
// Data dan fungsi murni diimpor dari app.js.

import {
  profil,
  judulHalaman,
  daftarTugas,
  buatPerkenalan,
  formatKeahlian,
} from "./app.js";

// --- Pemilihan elemen (lembar A) ------------------------------------

const wadah = document.querySelector("#daftar");
const pesanKosong = document.querySelector("#pesan-kosong");
const barisFilter = document.querySelector("#filter");
const form = document.querySelector("#form-tugas");
const tombolKirim = document.querySelector("#tombol-simpan");

// --- Membuat elemen (lembar B) --------------------------------------

function buatKartuTugas(tugas) {
  const kartu = document.createElement("li");
  kartu.className = "kartu";

  const judul = document.createElement("h3");
  judul.className = "kartu__judul";
  judul.textContent = tugas.judul;
  kartu.append(judul);

  const isi = document.createElement("dl");
  isi.className = "kartu__isi";
  for (const [label, nilai] of [
    ["Tenggat", tugas.tenggat],
    ["Mata Kuliah", tugas.mataKuliah],
  ]) {
    const istilah = document.createElement("dt");
    istilah.textContent = label;
    const detail = document.createElement("dd");
    detail.textContent = nilai;
    isi.append(istilah, detail);
  }
  kartu.append(isi);

  const kaki = document.createElement("p");
  kaki.className = "kartu__kaki";
  const labelPrioritas = document.createElement("span");
  labelPrioritas.textContent = "Prioritas";
  const prioritas = document.createElement("strong");
  prioritas.textContent = tugas.prioritas;
  kaki.append(labelPrioritas, prioritas);
  kartu.append(kaki);

  return kartu;
}

// --- Pola render (lembar D) -----------------------------------------
// Tampilan adalah fungsi dari data: kosongkan, periksa keadaan kosong,
// isi ulang. Urutan ini tidak boleh ditukar.

let kategoriAktif = "semua";

function render(daftar) {
  wadah.textContent = "";

  if (daftar.length === 0) {
    pesanKosong.hidden = false;
    return;
  }

  pesanKosong.hidden = true;
  daftar.forEach((tugas) => wadah.append(buatKartuTugas(tugas)));
}

// --- Event delegation (lembar C) ------------------------------------
// Satu pendengar di induk melayani semua tombol, termasuk yang nanti.

function tandaiTombolAktif(tombolAktif) {
  document.querySelectorAll("#filter button").forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol === tombolAktif);
  });
}

barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return;

  const kategori = tombol.dataset.kategori;
  const terpilih = daftarTugas.filter(
    (tugas) => kategori === "semua" || tugas.mataKuliah === kategori,
  );

  kategoriAktif = kategori;
  tandaiTombolAktif(tombol);
  render(terpilih);
});

// --- Validasi form (lembar D) ---------------------------------------

const kolom = Array.from(form.querySelectorAll("input"));

function periksaKolom(input) {
  const wrapper = input.closest(".form-kolom");
  const sah = input.value.trim() !== "";

  wrapper.classList.toggle("tidak-sah", !sah);
  input.setAttribute("aria-invalid", String(!sah));

  return sah;
}

function periksaSemuaKolom() {
  const hasil = kolom.map(periksaKolom);
  tombolKirim.disabled = !hasil.every(Boolean);
  return hasil.every(Boolean);
}

// Tombol menunggu, bukan menolak: periksa setiap kali pengguna mengetik.
kolom.forEach((input) => input.addEventListener("input", periksaSemuaKolom));

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!periksaSemuaKolom()) {
    const pertamaBermasalah = kolom.find(
      (input) => input.value.trim() === "",
    );
    pertamaBermasalah.focus();
    return;
  }

  daftarTugas.push({
    judul: form.querySelector("#nama-tugas").value.trim(),
    tenggat: form.querySelector("#tenggat").value,
    mataKuliah: form.querySelector("#nama-mata-kuliah").value.trim(),
    prioritas: "Sedang",
  });

  form.reset();
  periksaSemuaKolom();
  kategoriAktif = "semua";
  tandaiTombolAktif(document.querySelector('#filter [data-kategori="semua"]'));
  render(daftarTugas);
});

// --- Pemasangan isi halaman ------------------------------------------

document.title = judulHalaman;
document.querySelector("header h1").textContent = judulHalaman;
document.querySelector("header > p").textContent =
  `${buatPerkenalan(profil)}. Halaman ini saya gunakan untuk: ${formatKeahlian(profil.keahlian)}.`;
document.querySelector("footer p").textContent =
  `${profil.nama} · ${profil.nim} · ${profil.tahun}`;

render(daftarTugas);
