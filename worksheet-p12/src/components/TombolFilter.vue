<script setup>
import { kategoriFilter } from "../data.js";
import { state, pilihKategori } from "../state.js";
import { aturUlang, simpan } from "../simpanan.js";

function pilih(nilai) {
  pilihKategori(nilai);
}

function aturUlangPilihan() {
  aturUlang();
  pilihKategori("semua");
  simpan({ kategoriAktif: state.kategoriAktif });
}
</script>

<template>
  <div id="filter">
    <button
      v-for="kategori in kategoriFilter"
      :key="kategori.nilai"
      type="button"
      :data-kategori="kategori.nilai"
      :class="{ aktif: state.kategoriAktif === kategori.nilai }"
      @click="pilih(kategori.nilai)"
    >
      {{ kategori.label }}
    </button>
    <button type="button" @click="aturUlangPilihan">Atur ulang</button>
  </div>
</template>
