import { reactive } from "vue";
import { daftarTugas } from "./data.js";

export const state = reactive({
  daftarProyek: daftarTugas.map((tugas) => ({ ...tugas })),
  kategoriAktif: "semua",
  daftarApi: [],
  statusApi: "Memuat data...",
});

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai;
}

export function tambahProyek(tugas) {
  state.daftarProyek.push(tugas);
}
