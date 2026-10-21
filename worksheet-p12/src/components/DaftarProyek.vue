<script setup>
import { computed } from "vue";
import { state } from "../state.js";

// Berkas ada di public/, jadi dibaca lewat alamat dan tidak diolah Vite.
const gambarTugas = "/Tugas-1.jpg";

const daftarTampil = computed(() =>
  state.kategoriAktif === "semua"
    ? state.daftarProyek
    : state.daftarProyek.filter(
        (tugas) => tugas.mataKuliah === state.kategoriAktif,
      ),
);
</script>

<template>
  <ul id="daftar" class="galeri">
    <li
      v-for="tugas in daftarTampil"
      :key="tugas.id"
      class="kartu"
    >
      <h3 class="kartu__judul">{{ tugas.judul }}</h3>

      <dl class="kartu__isi">
        <dt>Tenggat</dt>
        <dd>{{ tugas.tenggat }}</dd>
        <dt>Mata Kuliah</dt>
        <dd>{{ tugas.mataKuliah }}</dd>
      </dl>

      <p class="kartu__kaki">
        <span>Prioritas</span>
        <strong>{{ tugas.prioritas }}</strong>
      </p>
    </li>
  </ul>

  <p id="pesan-kosong" :hidden="daftarTampil.length !== 0">
    Tidak ada tugas pada kategori itu.
  </p>

  <section id="data-api" aria-labelledby="judul-data-api">
    <h2 id="judul-data-api">Tugas dari API</h2>
    <p id="status-api" role="status" aria-live="polite">
      {{ state.statusApi }}
    </p>
    <ul id="daftar-api" class="galeri">
      <li
        v-for="tugas in state.daftarApi"
        :key="tugas.id"
        class="kartu"
      >
        <h3 class="kartu__judul">{{ tugas.title }}</h3>
        <p class="kartu__kaki">
          {{ tugas.completed ? "Sudah selesai" : "Belum selesai" }}
        </p>
      </li>
    </ul>
  </section>

  <figure>
    <img
      :src="gambarTugas"
      alt="Gambar pendukung untuk Tugas #1 kuliah."
      width="640"
      height="360"
      loading="lazy"
    />
    <figcaption>Dokumentasi Tugas #1 kuliah.</figcaption>
  </figure>
</template>
