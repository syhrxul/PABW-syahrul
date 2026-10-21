export const KUNCI = "pabw-p11";
export const VERSI = 1;

export function simpan(nilai) {
  try {
    localStorage.setItem(KUNCI, JSON.stringify({ versi: VERSI, ...nilai }));
  } catch {
    // Penyimpanan penuh atau diblokir: halaman tetap berjalan.
  }
}

export function muat() {
  try {
    const mentah = localStorage.getItem(KUNCI);
    if (!mentah) return null;

    const isi = JSON.parse(mentah);
    if (!isi || isi.versi !== VERSI) {
      localStorage.removeItem(KUNCI);
      return null;
    }

    return isi;
  } catch {
    try {
      localStorage.removeItem(KUNCI);
    } catch {
      // Abaikan bila localStorage sendiri tidak dapat diakses.
    }
    return null;
  }
}

export function aturUlang() {
  try {
    localStorage.removeItem(KUNCI);
  } catch {
    // Abaikan bila localStorage tidak dapat diakses.
  }
}
