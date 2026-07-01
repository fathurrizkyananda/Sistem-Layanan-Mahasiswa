document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("table-body");
  const emptyState = document.getElementById("empty-state");
  const searchInput = document.getElementById("search-input");
  const btnClearAll = document.getElementById("btn-clear-all");
  const statTotal = document.getElementById("stat-total");
  const tableWrapper = document.getElementById("table-wrapper");

  render();

  searchInput.addEventListener("input", () => render(searchInput.value));

  btnClearAll.addEventListener("click", () => {
    if (getAllData().length === 0) return;
    const confirmed = confirm(
      "Hapus seluruh data layanan? Tindakan ini tidak bisa dibatalkan."
    );
    if (confirmed) {
      clearAllData();
      render();
    }
  });

  /**
   * Menggambar ulang isi tabel berdasarkan data terkini & kata kunci pencarian.
   * @param {string} filterText
   */
  function render(filterText = "") {
    const data = getAllData().sort(
      (a, b) => new Date(b.waktu) - new Date(a.waktu)
    );
    const keyword = filterText.trim().toLowerCase();
    const filtered = keyword
      ? data.filter((item) =>
          `${item.nama} ${item.nim}`.toLowerCase().includes(keyword)
        )
      : data;

    statTotal.textContent = data.length;
    tbody.innerHTML = "";

    if (filtered.length === 0) {
      tableWrapper.hidden = true;
      emptyState.hidden = false;
      emptyState.querySelector("p").textContent =
        keyword && data.length > 0
          ? "Tidak ada data yang cocok dengan pencarian."
          : "Belum ada data layanan. Silakan isi form terlebih dahulu.";
      return;
    }

    tableWrapper.hidden = false;
    emptyState.hidden = true;

    filtered.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><span class="ticket-badge">${item.tiket}</span></td>
        <td>${escapeHtml(item.nama)}</td>
        <td>${escapeHtml(item.nim)}</td>
        <td><span class="pill">${escapeHtml(item.jenisLayanan)}</span></td>
        <td>${escapeHtml(item.keterangan)}</td>
        <td>${formatWaktu(item.waktu)}</td>
        <td>
          <button
            class="btn-icon"
            data-id="${item.id}"
            aria-label="Hapus data ${escapeHtml(item.nama)}"
            title="Hapus data ini"
          >✕</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Pasang event listener untuk setiap tombol hapus baris
    tbody.querySelectorAll(".btn-icon").forEach((btn) => {
      btn.addEventListener("click", () => {
        deleteEntry(btn.dataset.id);
        render(searchInput.value);
      });
    });
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
