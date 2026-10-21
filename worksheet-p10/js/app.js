export const profil = {
  nama: "Syahrul Imtikhan Ahmad",
  nim: "25523064",
  tahun: 2026,
  peran: "mahasiswa Informatika",
  keahlian: ["mengelola tugas", "mencatat tenggat", "mengatur prioritas"],
};

export const judulHalaman = "Daftar Tugas Kuliah";

export const daftarTugas = [
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

export function buatPerkenalan({ nama, peran }) {
  return `Saya ${nama}, ${peran}`;
}

export const formatKeahlian = (daftar) => daftar.join(" · ");


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

console.table(profil.keahlian);
console.table(daftarTugas);
console.table(tugasPrioritasTinggi);
console.log(tugasBasisData);
console.table(judulTugas);
console.table(tugasTerurut);
console.log(kalimatProfil);
