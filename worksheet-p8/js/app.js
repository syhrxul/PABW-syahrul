const profil = {
  nama: "Syahrul Imtikhan Ahmad",
  nim: "25523064",
  tahun: 2026,
  peran: "mahasiswa Informatika",
  keahlian: ["mengelola tugas", "mencatat tenggat", "mengatur prioritas"],
};

const judulHalaman = "Daftar Tugas Kuliah";

const daftarTugas = [
  {
    judul: "Tugas#1",
    tenggat: "2026-10-01",
    mataKuliah: "PABW",
    prioritas: "Tinggi",
  },
  {
    judul: "Makalah Kelompok",
    tenggat: "2026-10-08",
    mataKuliah: "Basis Data",
    prioritas: "Sedang",
  },
  {
    judul: "Presentasi Proyek",
    tenggat: "2026-10-15",
    mataKuliah: "Rekayasa Perangkat Lunak",
    prioritas: "Rendah",
  },
];

function buatPerkenalan({ nama, peran }) {
  return `Saya ${nama}, ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

function buatKartuTugas(tugas) {
  const kartu = document.createElement("article");
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

const kalimatProfil = `${buatPerkenalan(profil)}. Halaman ini saya gunakan untuk: ${formatKeahlian(profil.keahlian)}.`;
const tugasPrioritasTinggi = daftarTugas.filter(
  (tugas) => tugas.prioritas === "Tinggi",
);
const tugasBasisData = daftarTugas.find(
  (tugas) => tugas.mataKuliah === "Basis Data",
);
const judulTugas = daftarTugas.map((tugas) => tugas.judul);
const tugasTerurut = [...daftarTugas].sort((a, b) =>
  a.tenggat.localeCompare(b.tenggat),
);

document.title = judulHalaman;
document.querySelector("header h1").textContent = judulHalaman;
document.querySelector("header > p").textContent = kalimatProfil;
document.querySelector("footer p").textContent =
  `${profil.nama} · ${profil.nim} · ${profil.tahun}`;
document
  .querySelector(".galeri")
  .replaceChildren(...daftarTugas.map(buatKartuTugas));

console.table(profil.keahlian);
console.table(daftarTugas);
console.table(tugasPrioritasTinggi);
console.log(tugasBasisData);
console.table(judulTugas);
console.table(tugasTerurut);
