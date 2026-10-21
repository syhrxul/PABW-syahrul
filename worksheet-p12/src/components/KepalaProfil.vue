<script setup>
import { computed } from "vue";
import { buatPerkenalan, formatKeahlian } from "../data.js";

const props = defineProps({
  profil: { type: Object, required: true },
  judul: { type: String, default: "Daftar Tugas Kuliah" },
});

const perkenalan = computed(
  () =>
    `${buatPerkenalan(props.profil)}. Halaman ini saya gunakan untuk: ${formatKeahlian(props.profil.keahlian)}.`,
);
</script>

<template>
  <header id="beranda">
    <div class="header-baris">
      <h1>{{ props.judul }}</h1>
      <label for="tema" class="tombol-tema">
        <input type="checkbox" id="tema" class="pengalih-tema" />
        Tema gelap
      </label>
      <nav aria-label="Navigasi utama">
        <ul>
          <li><a href="#beranda">Beranda</a></li>
          <li><a href="#daftar-tugas">Daftar Tugas</a></li>
          <li><a href="#kontak">Kontak</a></li>
        </ul>
      </nav>
    </div>
    <p>{{ perkenalan }}</p>
  </header>
</template>
