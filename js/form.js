/**
 * form.js
 * ---------------------------------------------------------
 * Logika untuk halaman input (index.html):
 *  1. Validasi isian form
 *  2. Menyimpan data lewat storage.js
 *  3. Menampilkan tiket konfirmasi setelah data berhasil disimpan
 * ---------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-layanan");
  const errorBox = document.getElementById("form-error");
  const ticketBox = document.getElementById("ticket-confirmation");
  const statTotal = document.getElementById("stat-total");

  updateStatTotal();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    errorBox.hidden = true;
    errorBox.innerHTML = "";

    const nama = form.nama.value.trim();
    const nim = form.nim.value.trim();
    const jenisLayanan = form.jenisLayanan.value;
    const keterangan = form.keterangan.value.trim();

    const errors = validateInput({ nama, nim, jenisLayanan, keterangan });

    if (errors.length > 0) {
      errorBox.hidden = false;
      errorBox.innerHTML = errors.map((msg) => `• ${msg}`).join("<br>");
      return;
    }

    // Proses & simpan data lewat modul storage.js
    const savedEntry = addEntry({ nama, nim, jenisLayanan, keterangan });

    showTicket(savedEntry);
    form.reset();
    updateStatTotal();
  });

  /**
   * Validasi sederhana untuk setiap field.
   */
  function validateInput({ nama, nim, jenisLayanan, keterangan }) {
    const errors = [];

    if (!nama) errors.push("Nama wajib diisi.");
    if (!nim) {
      errors.push("NIM wajib diisi.");
    } else if (!/^[0-9]+$/.test(nim)) {
      errors.push("NIM hanya boleh berisi angka.");
    }
    if (!jenisLayanan) errors.push("Jenis layanan wajib dipilih.");
    if (!keterangan) errors.push("Keterangan wajib diisi.");

    return errors;
  }

  /**
   * Menampilkan tiket konfirmasi setelah data berhasil disimpan.
   */
  function showTicket(entry) {
    ticketBox.hidden = false;
    ticketBox.innerHTML = `
      <div class="ticket-stub">
        <p class="ticket-label">Tiket layanan Anda</p>
        <p class="ticket-number">${entry.tiket}</p>
        <dl class="ticket-detail">
          <dt>Nama</dt><dd>${escapeHtml(entry.nama)}</dd>
          <dt>NIM</dt><dd>${escapeHtml(entry.nim)}</dd>
          <dt>Layanan</dt><dd>${escapeHtml(entry.jenisLayanan)}</dd>
          <dt>Waktu</dt><dd>${formatWaktu(entry.waktu)}</dd>
        </dl>
        <a href="data.html" class="btn btn-secondary">Lihat di Tabel Data →</a>
      </div>
    `;
    ticketBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function updateStatTotal() {
    if (statTotal) statTotal.textContent = getAllData().length;
  }

  /**
   * Mencegah XSS sederhana saat menyisipkan input pengguna ke dalam HTML.
   */
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
});
