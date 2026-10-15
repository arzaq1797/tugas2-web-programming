var divHasil = document.getElementById("hasil");
var inputNomorDO = document.getElementById("nomor-do");

function cariDeliveryOrder() {
  var nomorDO = inputNomorDO.value;
  nomorDO = nomorDO.trim();
  var data = dataTracking[nomorDO];
  if (data == undefined) {
    alert("Data tracking tidak ditemukan");
    // bersihkan hasil jika tidak ada data yang cocok
    divHasil.innerHTML = ""
    return;
  }
  buatHasil(data)
}

function buatDetail(data) {

  return `
    <div class="kartu-detail section-tengah">
      <table style="width: 100%;">
        <tr>
          <td>
            <span style="font-size: large;font-weight: bold;">Delivery Order ${data.nomorDO}</span>
          </td>
          <td style="text-align: right;">
            <span class="status">${data.status}</span>
          </td>
        </tr>
      </table>
      <table style="width: 100%;">
        <tr>
          <td>Nama</td>
          <td>: ${data.nama}</td>
        </tr>
        <tr>
          <td>Ekspedisi</td>
          <td>: ${data.ekspedisi}</td>
        </tr>
        <tr>
          <td>Tgl Kirim</td>
          <td>: ${data.tanggalKirim}</td>
        </tr>
        <tr>
          <td>Paket</td>
          <td>: ${data.paket}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>: ${data.total}</td>
        </tr>
      </table>
    </div>
  `;
}

function buatPerjalanan(daftarPerjalanan) {
  var barisPerjalanan = "";
  for (var i = 0; i < daftarPerjalanan.length; i++) {
    var item = daftarPerjalanan[i];

    barisPerjalanan += `
      <tr>
        <td>${item.keterangan}</td>
        <td style="text-align: right;font-weight: bold;">${item.waktu}</td>
      </tr>
    `;
  }

  return `
    <div class="kartu-detail section-tengah">
      <h3>Perjalanan</h3>
      <table>
        ${barisPerjalanan}
      </table>
    </div>
  `;
}

function buatHasil(data) {
  document.getElementById("hasil").innerHTML =
    buatDetail(data) + "<br>" + buatPerjalanan(data.perjalanan);
}
