import {
  profil,
  judulHalaman,
  daftarTugas,
  buatPerkenalan,
  formatKeahlian,
} from "./app.js";
import { ambilTugas } from "./api.js";

const wadah = document.querySelector("#daftar");
const pesanKosong = document.querySelector("#pesan-kosong");
const wadahApi = document.querySelector("#daftar-api");
const statusApi = document.querySelector("#status-api");
const barisFilter = document.querySelector("#filter");
const form = document.querySelector("#form-tugas");
const tombolKirim = document.querySelector("#tombol-simpan");

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

// --- Data API (lembar D) ---------------------------------------------
// Keadaan yang ditampilkan: memuat, berhasil, gagal, dan kosong.

function buatKartuApi(tugas) {
  const kartu = document.createElement("li");
  kartu.className = "kartu";

  const judul = document.createElement("h3");
  judul.className = "kartu__judul";
  judul.textContent = tugas.title;

  const status = document.createElement("p");
  status.className = "kartu__kaki";
  status.textContent = tugas.completed ? "Sudah selesai" : "Belum selesai";

  kartu.append(judul, status);
  return kartu;
}

function gambarTugasApi(daftar) {
  wadahApi.textContent = "";
  daftar.forEach((tugas) => wadahApi.append(buatKartuApi(tugas)));
}

async function tampilkanTugasApi() {
  statusApi.textContent = "Memuat data...";
  wadahApi.textContent = "";

  try {
    const daftar = await ambilTugas();

    if (daftar.length === 0) {
      statusApi.textContent = "Belum ada tugas dari API.";
      return;
    }

    gambarTugasApi(daftar.slice(0, 10));
    statusApi.textContent = `Berhasil memuat ${daftar.length} tugas dari API.`;
  } catch (galat) {
    statusApi.textContent = `Gagal memuat data: ${galat.message}`;
  }
}

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

document.title = judulHalaman;
document.querySelector("header h1").textContent = judulHalaman;
document.querySelector("header > p").textContent =
  `${buatPerkenalan(profil)}. Halaman ini saya gunakan untuk: ${formatKeahlian(profil.keahlian)}.`;
document.querySelector("footer p").textContent =
  `${profil.nama} · ${profil.nim} · ${profil.tahun}`;

render(daftarTugas);
tampilkanTugasApi();
