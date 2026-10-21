<script setup>
import { computed, reactive, ref } from "vue";
import { buatIdTugas } from "../data.js";
import { pilihKategori, tambahProyek } from "../state.js";

const isian = reactive({
  namaTugas: "",
  tenggat: "",
  mataKuliah: "",
});

const disentuh = reactive({
  namaTugas: false,
  tenggat: false,
  mataKuliah: false,
});

const inputNama = ref(null);
const inputTenggat = ref(null);
const inputMataKuliah = ref(null);

const semuaTerisi = computed(() =>
  Object.values(isian).every((nilai) => nilai.trim() !== ""),
);

function periksaSemua() {
  Object.keys(disentuh).forEach((kolom) => {
    disentuh[kolom] = true;
  });
}

function tidakSah(kolom) {
  return disentuh[kolom] && isian[kolom].trim() === "";
}

function kirim() {
  if (!semuaTerisi.value) {
    periksaSemua();

    const kolomBermasalah = [
      [isian.namaTugas, inputNama],
      [isian.tenggat, inputTenggat],
      [isian.mataKuliah, inputMataKuliah],
    ].find(([nilai]) => nilai.trim() === "");

    kolomBermasalah?.[1].value?.focus();
    return;
  }

  tambahProyek({
    id: buatIdTugas(),
    judul: isian.namaTugas.trim(),
    tenggat: isian.tenggat,
    mataKuliah: isian.mataKuliah.trim(),
    prioritas: "Sedang",
  });

  isian.namaTugas = "";
  isian.tenggat = "";
  isian.mataKuliah = "";
  periksaSemua();
  pilihKategori("semua");
}
</script>

<template>
  <aside class="sisi">
    <h2>Tambah Tugas</h2>
    <form
      id="form-tugas"
      action="/simpan"
      method="post"
      novalidate
      @submit.prevent="kirim"
    >
      <p
        class="form-kolom"
        :class="{ 'tidak-sah': tidakSah('namaTugas') }"
      >
        <label for="nama-tugas">Nama Tugas</label>
        <input
          id="nama-tugas"
          ref="inputNama"
          v-model="isian.namaTugas"
          type="text"
          name="nama-tugas"
          required
          :aria-invalid="String(tidakSah('namaTugas'))"
          @input="periksaSemua"
        />
        <span class="pesan-galat">Nama tugas wajib diisi.</span>
      </p>

      <p
        class="form-kolom"
        :class="{ 'tidak-sah': tidakSah('tenggat') }"
      >
        <label for="tenggat">Tenggat</label>
        <input
          id="tenggat"
          ref="inputTenggat"
          v-model="isian.tenggat"
          type="date"
          name="tenggat"
          required
          :aria-invalid="String(tidakSah('tenggat'))"
          @input="periksaSemua"
        />
        <span class="pesan-galat">Tenggat wajib diisi.</span>
      </p>

      <p
        class="form-kolom"
        :class="{ 'tidak-sah': tidakSah('mataKuliah') }"
      >
        <label for="nama-mata-kuliah">Nama Mata Kuliah</label>
        <input
          id="nama-mata-kuliah"
          ref="inputMataKuliah"
          v-model="isian.mataKuliah"
          type="text"
          name="nama-mata-kuliah"
          required
          :aria-invalid="String(tidakSah('mataKuliah'))"
          @input="periksaSemua"
        />
        <span class="pesan-galat">Nama mata kuliah wajib diisi.</span>
      </p>

      <button type="submit" id="tombol-simpan" :disabled="!semuaTerisi">
        Simpan
      </button>
    </form>
  </aside>
</template>
