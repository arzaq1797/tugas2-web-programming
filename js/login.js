// Mencegah aksi default form
document.getElementById("formlogin").addEventListener("submit", function(event) {
  event.preventDefault()
  login()
})

function ambilDataPenggunaDenganEmail(email) {
  var pengguna;
  for (let i = 0; i < dataPengguna.length; i++) {
    if (dataPengguna[i].email == email) {
      pengguna = dataPengguna[i]
      break;
    }    
  }

  return pengguna
}

function login() {
  var email = document.getElementById("email").value
  var sandi = document.getElementById("password").value

  // membersihkan spasi menggunakan trim disini email dan sandi adalah string

  email = email.trim()
  sandi = sandi.trim()

  if (email == "" || sandi == "") {
    alert("Isi email dan sandi")
    return
  }

  var pengguna = ambilDataPenggunaDenganEmail(email)

  if (pengguna == undefined) {
    alert("Pengguna tidak ditemukan")
    return
  }

  if (sandi != pengguna.password) {
    alert("Password salah")
    return
  }

  window.location.assign(`/dashboard.html`)
}

// Modal
// Ambil elemen yang dibutuhkan
var modalLupa = document.getElementById("modal-lupa");
var modalDaftar = document.getElementById("modal-daftar");
var tombolLupa = document.getElementById("tombol-lupa");
var tombolDaftar = document.getElementById("tombol-daftar");

// Fungsi untuk menutup modal

function tutupModalLupa() {
  modalLupa.style.display = "none"
}

function tutupModalDaftar() {
  modalDaftar.style.display = "none"
}

// Klik tombol pemicu: tampilkan modal
tombolLupa.onclick = function () {
  modalLupa.style.display = "block";
};
tombolDaftar.onclick = function () {
  modalDaftar.style.display = "block";
};

// Klik di luar kotak modal: tutup modal
window.onclick = function (event) {
  if (event.target == modalLupa) {
    tutupModalLupa()
  }

  if (event.target == modalDaftar) {
    tutupModalDaftar()
  }
};

// Tekan tombol Esc: tutup modal
document.onkeydown = function (event) {
  if (event.key == "Escape") {
    tutupSemua();
  }
};

function kirimTautanReset() {
  var emailReset = document.getElementById("email-reset").value
  alert("Tautan reset telah dikirim ke " + emailReset)
  tutupModalLupa()
}

function daftar() {
  var emailDaftar = document.getElementById("email-daftar").value
  var namaDaftar = document.getElementById("nama-daftar").value

  alert("Selamat " + namaDaftar + " anda sudah terdaftar. cek email anda di " + emailDaftar)
  tutupModalDaftar()
}
