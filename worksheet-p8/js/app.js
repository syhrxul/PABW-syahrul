const profil = {
  namaLengkap: "Syahrul Imtikhan Ahmad",
  peran: "mahasiswa Informatika yang mengelola daftar tugas kuliah",
  keahlian: ["mencatat tugas", "mengatur tenggat", "menentukan prioritas"],
  jumlahTugas: 3,
};

const identitasHalaman = {
  judul: "Daftar Tugas Kuliah",
  nim: "25523064",
  tahun: 2026,
};

function buatPerkenalan({ namaLengkap, peran }) {
  return `Saya ${namaLengkap}, ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

const kalimatProfil = `${buatPerkenalan(profil)}. Keahlian: ${formatKeahlian(profil.keahlian)}. Saat ini ada ${profil.jumlahTugas} tugas tercatat.`;

document.title = identitasHalaman.judul;
document.querySelector("header h1").textContent = identitasHalaman.judul;
document.querySelector("header > p").textContent = kalimatProfil;
document.querySelector("footer p").textContent =
  `${profil.namaLengkap} · ${identitasHalaman.nim} · ${identitasHalaman.tahun}`;
