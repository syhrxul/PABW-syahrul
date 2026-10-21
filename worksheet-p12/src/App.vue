<script setup>
import { onMounted, watch } from "vue";
import KepalaProfil from "./components/KepalaProfil.vue";
import TombolFilter from "./components/TombolFilter.vue";
import DaftarProyek from "./components/DaftarProyek.vue";
import FormKontak from "./components/FormKontak.vue";
import { judulHalaman, profil } from "./data.js";
import { state } from "./state.js";
import { muat, simpan } from "./simpanan.js";
import { ambilTugas } from "./api.js";

function pulihkanPilihan() {
  const isi = muat();
  if (isi && typeof isi.kategoriAktif === "string") {
    state.kategoriAktif = isi.kategoriAktif;
  }
}

async function muatTugasApi() {
  state.statusApi = "Memuat data...";
  state.daftarApi = [];

  try {
    const daftar = await ambilTugas();

    if (!Array.isArray(daftar) || daftar.length === 0) {
      state.statusApi = "Belum ada tugas dari API.";
      return;
    }

    state.daftarApi = daftar.slice(0, 10);
    state.statusApi = `Berhasil memuat ${daftar.length} tugas dari API.`;
  } catch (galat) {
    state.statusApi = `Gagal memuat data: ${galat.message}`;
  }
}

onMounted(() => {
  pulihkanPilihan();
  muatTugasApi();
});

watch(
  () => state.kategoriAktif,
  (kategoriAktif) => simpan({ kategoriAktif }),
);
</script>

<template>
  <KepalaProfil :profil="profil" :judul="judulHalaman" />

  <main>
    <FormKontak />

    <section id="daftar-tugas" class="utama">
      <h2>Daftar Tugas Saya</h2>
      <TombolFilter />
      <DaftarProyek />
    </section>
  </main>

  <footer id="kontak">
    <p>{{ profil.nama }} · {{ profil.nim }} · {{ profil.tahun }}</p>
  </footer>
</template>
