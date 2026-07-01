const STORAGE_KEY = "slm_data"; // key penyimpanan array data layanan
const COUNTER_KEY = "slm_counter"; // key penomoran tiket berurutan

/**
 * Mengambil seluruh data layanan yang tersimpan.
 * @returns {Array<Object>} daftar data layanan
 */
function getAllData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Gagal membaca data dari localStorage:", err);
    return [];
  }
}

/**
 * Menyimpan seluruh data layanan ke localStorage.
 * @param {Array<Object>} data
 */
function saveAllData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Menghasilkan nomor tiket berurutan, format: LYN-0001, LYN-0002, dst.
 * @returns {string}
 */
function generateTicketNumber() {
  let counter = parseInt(localStorage.getItem(COUNTER_KEY) || "0", 10);
  counter += 1;
  localStorage.setItem(COUNTER_KEY, String(counter));
  return "LYN-" + String(counter).padStart(4, "0");
}

/**
 * Menambahkan satu entri layanan baru.
 * @param {{nama:string, nim:string, jenisLayanan:string, keterangan:string}} entry
 * @returns {Object} entri lengkap yang baru saja disimpan (termasuk id & tiket)
 */
function addEntry(entry) {
  const data = getAllData();
  const newEntry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    tiket: generateTicketNumber(),
    nama: entry.nama,
    nim: entry.nim,
    jenisLayanan: entry.jenisLayanan,
    keterangan: entry.keterangan,
    waktu: new Date().toISOString(),
  };
  data.push(newEntry);
  saveAllData(data);
  return newEntry;
}

/**
 * Menghapus satu entri berdasarkan id.
 * @param {string} id
 */
function deleteEntry(id) {
  const data = getAllData().filter((item) => item.id !== id);
  saveAllData(data);
}

/**
 * Menghapus seluruh data layanan (tidak menghapus penomoran tiket).
 */
function clearAllData() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Format tanggal ISO menjadi format yang mudah dibaca (Bahasa Indonesia).
 * @param {string} isoString
 * @returns {string}
 */
function formatWaktu(isoString) {
  const d = new Date(isoString);
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
