// ===== Latihan 1: memilih dan mengubah teks dengan DOM =====
const judul = document.getElementById("judul");
const pesan = document.getElementById("pesan");
judul.textContent = "Fakhri Afrian";
pesan.textContent = "Mahasiswa Teknik Informatika | Process Engineer di PT. LG Electronics R&D Center";

// ===== Latihan 2: event click + waktu =====
const tombol = document.getElementById("tombolAksi");
tombol.addEventListener("click", function () {
  pesan.textContent = "Tombol diklik pada " + new Date().toLocaleTimeString("id-ID");
});

// ===== Foto profil: tampilkan inisial jika foto tidak ditemukan =====
const fotoProfil = document.getElementById("fotoProfil");
const fotoCadangan = document.getElementById("fotoCadangan");
fotoProfil.addEventListener("error", function () {
  fotoProfil.hidden = true;
  fotoCadangan.hidden = false;
});

// ===== Atribut & tautan (setAttribute) =====
const tautanEmail = document.getElementById("tautanEmail");
tautanEmail.setAttribute("href", "mailto:fakhri789123@gmail.com");
const tautanTelp = document.getElementById("tautanTelp");
tautanTelp.setAttribute("href", "tel:081289202437");
const tautanMDN = document.getElementById("tautanMDN");
tautanMDN.setAttribute("href", "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction");
tautanMDN.setAttribute("target", "_blank");
tautanMDN.setAttribute("rel", "noopener");

// ===== Usia & tahun otomatis =====
const lahir = new Date(2002, 9, 3); // 3 Oktober 2002
const sekarang = new Date();
let usiaHitung = sekarang.getFullYear() - lahir.getFullYear();
const sudahUlangTahun =
  sekarang.getMonth() > lahir.getMonth() ||
  (sekarang.getMonth() === lahir.getMonth() && sekarang.getDate() >= lahir.getDate());
if (!sudahUlangTahun) usiaHitung--;
document.getElementById("usiaOtomatis").textContent = usiaHitung;
document.getElementById("tahunSekarang").textContent = sekarang.getFullYear();

// ===== Menu mobile =====
const tombolMenu = document.getElementById("tombolMenu");
const menuNav = document.getElementById("menuNav");
tombolMenu.addEventListener("click", function () {
  menuNav.classList.toggle("terbuka");
});
menuNav.querySelectorAll("a").forEach(function (a) {
  a.addEventListener("click", function () {
    menuNav.classList.remove("terbuka");
  });
});

// ===== Latihan 3: classList toggle =====
const tombolGaya = document.getElementById("tombolGaya");
const teksGaya = document.getElementById("teksGaya");
tombolGaya.addEventListener("click", function () {
  teksGaya.classList.toggle("highlight");
  teksGaya.classList.toggle("teks-besar");
});

// Eksperimen 4: sembunyikan / tampilkan paragraf dengan class CSS
const tombolSembunyi = document.getElementById("tombolSembunyi");
const detailTambahan = document.getElementById("detailTambahan");
tombolSembunyi.addEventListener("click", function () {
  detailTambahan.classList.toggle("tersembunyi");
  tombolSembunyi.textContent = detailTambahan.classList.contains("tersembunyi")
    ? "Tampilkan Detail" : "Sembunyikan Detail";
});

// Demo add / remove / toggle
const kotakKelas = document.getElementById("kotakKelas");
document.getElementById("btnAdd").addEventListener("click", function () {
  kotakKelas.classList.add("highlight");
});
document.getElementById("btnRemove").addEventListener("click", function () {
  kotakKelas.classList.remove("highlight");
});
document.getElementById("btnToggle").addEventListener("click", function () {
  kotakKelas.classList.toggle("highlight");
});

// ===== Latihan 4: event input + penghitung karakter =====
const namaInput = document.getElementById("namaInput");
const jumlahKarakter = document.getElementById("jumlahKarakter");
const sapaLangsung = document.getElementById("sapaLangsung");
namaInput.addEventListener("input", function () {
  jumlahKarakter.textContent = namaInput.value.length;
  const nilai = namaInput.value.trim();
  sapaLangsung.textContent = nilai === "" ? "" : "Halo, " + nilai + "!"; // textContent: aman dari HTML
});

// ===== Latihan 5 + Mini Project: form pendaftaran workshop =====
const form = document.getElementById("formPendaftaran");
const pesanForm = document.getElementById("pesanForm");
const inputNama = document.getElementById("nama");
const inputEmail = document.getElementById("email");
const inputUsia = document.getElementById("usia");
const pilihSesi = document.getElementById("sesi");
const catatanDaftar = document.getElementById("catatanDaftar");
const sisaCatatan = document.getElementById("sisaCatatan");
const infoSesi = document.getElementById("infoSesi");
const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rNama = document.getElementById("rNama");
const rEmail = document.getElementById("rEmail");
const rUsia = document.getElementById("rUsia");
const rSesi = document.getElementById("rSesi");

function tampilkanPesan(teks, jenis) {
  pesanForm.textContent = teks;
  pesanForm.className = jenis === "sukses" ? "pesan-sukses" : "pesan-error";
}

function bersihkanTanda() {
  [inputNama, inputEmail, inputUsia, pilihSesi].forEach(function (el) {
    el.classList.remove("input-salah");
  });
}

function perbaruiRingkasan() {
  rNama.textContent = inputNama.value.trim() || "-";
  rEmail.textContent = inputEmail.value.trim() || "-";
  rUsia.textContent = inputUsia.value || "-";
  rSesi.textContent = pilihSesi.value || "-";
}

[inputNama, inputEmail, inputUsia].forEach(function (el) {
  el.addEventListener("input", perbaruiRingkasan);
});

// Eksperimen 3: event change pada dropdown sesi
pilihSesi.addEventListener("change", function () {
  perbaruiRingkasan();
  infoSesi.textContent = pilihSesi.value === ""
    ? "Belum ada sesi dipilih."
    : "Sesi yang dipilih: " + pilihSesi.value;
});

catatanDaftar.addEventListener("input", function () {
  sisaCatatan.textContent = catatanDaftar.maxLength - catatanDaftar.value.length;
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  bersihkanTanda();

  const nama = inputNama.value.trim();
  const email = inputEmail.value.trim();
  const usiaInput = inputUsia.value;
  const usia = Number(usiaInput);
  const sesi = pilihSesi.value;

  if (nama === "") {
    inputNama.classList.add("input-salah");
    tampilkanPesan("Nama wajib diisi.", "error");
  } else if (nama.length < 3) { // Eksperimen 2: minimal 3 karakter
    inputNama.classList.add("input-salah");
    tampilkanPesan("Nama minimal terdiri dari 3 karakter.", "error");
  } else if (!polaEmail.test(email)) {
    inputEmail.classList.add("input-salah");
    tampilkanPesan("Masukkan email yang valid.", "error");
  } else if (usiaInput === "" || !Number.isInteger(usia) || usia < 17 || usia > 100) {
    inputUsia.classList.add("input-salah");
    tampilkanPesan("Usia harus berupa bilangan bulat 17â€“100.", "error");
  } else if (sesi === "") {
    pilihSesi.classList.add("input-salah");
    tampilkanPesan("Pilih salah satu sesi workshop.", "error");
  } else {
    tampilkanPesan("Validasi berhasil. Terima kasih, " + nama + "! Anda terdaftar di sesi " + sesi + ".", "sukses");
    form.reset();
    sisaCatatan.textContent = catatanDaftar.maxLength;
    perbaruiRingkasan();
    infoSesi.textContent = "Belum ada sesi dipilih.";
  }
});

document.getElementById("tombolReset").addEventListener("click", function () {
  form.reset();
  bersihkanTanda();
  pesanForm.textContent = "";
  pesanForm.className = "";
  sisaCatatan.textContent = catatanDaftar.maxLength;
  infoSesi.textContent = "Belum ada sesi dipilih.";
  perbaruiRingkasan();
});

// ===== Latihan 6: To-do list (+ Eksperimen 1: tombol hapus) =====
const inputTugas = document.getElementById("inputTugas");
const tambahTugas = document.getElementById("tambahTugas");
const daftarTugas = document.getElementById("daftarTugas");
const pesanTugas = document.getElementById("pesanTugas");

function buatTugas(teks) {
  const item = document.createElement("li");
  const label = document.createElement("span");
  const aksi = document.createElement("div");
  const selesai = document.createElement("button");
  const hapus = document.createElement("button");

  label.textContent = teks;
  aksi.className = "aksi-item";

  selesai.type = "button";
  selesai.className = "btn btn-kecil";
  selesai.textContent = "Tandai selesai";
  selesai.addEventListener("click", function () {
    item.classList.toggle("selesai");
    selesai.textContent = item.classList.contains("selesai")
      ? "Batalkan selesai" : "Tandai selesai";
  });

  hapus.type = "button";
  hapus.className = "btn btn-kecil btn-garis btn-hapus";
  hapus.textContent = "Hapus";
  hapus.addEventListener("click", function () {
    item.remove();
    pesanTugas.textContent = "Tugas dihapus.";
  });

  aksi.append(selesai, hapus);
  item.append(label, aksi);
  return item;
}

function tambahkanTugas() {
  const teks = inputTugas.value.trim();
  if (teks === "") {
    pesanTugas.textContent = "Tulis tugas terlebih dahulu.";
    return;
  }
  daftarTugas.appendChild(buatTugas(teks));
  inputTugas.value = "";
  pesanTugas.textContent = "Tugas ditambahkan.";
  inputTugas.focus();
}

tambahTugas.addEventListener("click", tambahkanTugas);
inputTugas.addEventListener("keydown", function (event) {
  if (event.key === "Enter") tambahkanTugas();
});

// Contoh tugas awal
["Kerjakan Lab6Web", "Buat README.md dan screenshot", "Commit ke repository"].forEach(function (t) {
  daftarTugas.appendChild(buatTugas(t));
});
