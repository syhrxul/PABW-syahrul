export const profil = {
  nama: "Syahrul Imtikhan Ahmad",
  nim: "25523064",
  tahun: 2026,
  peran: "mahasiswa Informatika",
  keahlian: ["mengelola tugas", "mencatat tenggat", "mengatur prioritas"],
};

export const judulHalaman = "Daftar Tugas Kuliah";

// id unik ditambahkan agar v-for di Vue memiliki :key yang stabil.
export const daftarTugas = [
  {
    id: "tugas-1",
    judul: "Tugas#1",
    tenggat: "2026-10-01",
    mataKuliah: "PABW",
    prioritas: "Tinggi",
  },
  {
    id: "tugas-2",
    judul: "Makalah Kelompok",
    tenggat: "2026-10-08",
    mataKuliah: "Basis Data",
    prioritas: "Sedang",
  },
  {
    id: "tugas-3",
    judul: "Presentasi Proyek",
    tenggat: "2026-10-15",
    mataKuliah: "Rekayasa Perangkat Lunak",
    prioritas: "Rendah",
  },
];

export const kategoriFilter = [
  { nilai: "semua", label: "Semua" },
  { nilai: "PABW", label: "PABW" },
  { nilai: "Basis Data", label: "Basis Data" },
  { nilai: "Rekayasa Perangkat Lunak", label: "RPL" },
  { nilai: "Sains Data", label: "Sains Data" },
];

export function buatPerkenalan({ nama, peran }) {
  return `Saya ${nama}, ${peran}`;
}

export const formatKeahlian = (daftar) => daftar.join(" · ");

let urutanTugas = daftarTugas.length;

export function buatIdTugas() {
  urutanTugas += 1;
  return `tugas-${Date.now()}-${urutanTugas}`;
}
