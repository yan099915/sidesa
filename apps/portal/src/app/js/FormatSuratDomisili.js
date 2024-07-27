const printSuratDomisili = (data) => {
  const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Surat Keterangan Domisili</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          .times-new-roman {
            font-family: 'Times New Roman', Times, serif;
          }

          .text-indent {
            text-indent: 4rem;
            /* Atur sesuai dengan kebutuhan Anda */
          }
        </style>
      </head>
      <body class="p-6 times-new-roman">
        <div class="max-w-2xl mx-auto p-6">
          <div class="flex flex-col relative text-center">
            <h2 class="text-xl font-bold">PEMERINTAH KOTA PARIAMAN</h2>
            <h4 class="text-2xl font-bold">KECAMATAN PARIAMAN TENGAH</h4>
            <h3 class="text-3xl font-bold">DESA RAWANG</h3>
            <p class="font-bold">Jl. R. A. KARTINI, PARIAMAN</p>
            <div class="absolute top-0 flex justify-start w-full p-2">
              <img src="https://sidera.my.id/assets/img/Lambang_Kota_Pariaman.png" class="w-20 h-20">
            </div>
            <hr class="my-0.5 border-top-4 border-black">
            <hr class="border-top-4 border-black">
          </div>
          <div class="text-center mt-6">
            <h3 class="text-xl font-bold underline">SURAT KETERANGAN BERDOMISILI</h3>
            <h4 class="text-lg">Nomor : ${
              data.id.length > 1 ? data.id : `0${data.id}`
            }/SKD/RW/PRM.T/${data.bulan} - ${data.tahun}</h4>
          </div>
          <div class="mt-6">
            <p class="text-justify text-indent">Yang bertanda tangan dibawah ini Kepala Desa Rawang Kecamatan Pariaman
              Tengah, Kota Pariaman menerangkan :</p>
            <table class="mt-4 mb-4 w-full">
              <tr class="">
                <td class="py-1">Nama</td>
                <td class="py-1">:</td>
                <td class="py-1 w-3/4 font-bold uppercase">${data.nama}</td>
              </tr>
              <tr>
                <td class="py-1">Tempat / Tgl Lahir</td>
                <td class="py-1">:</td>
                <td class="py-1 w-3/4">${data.tempat_lahir}, ${
    data.tanggal_lahir
  }</td>
              </tr>
              <tr>
                <td class="py-1">Jenis Kelamin</td>
                <td class="py-1">:</td>
                <td class="py-1 w-3/4">${data.jenis_kelamin}</td>
              </tr>
              <tr>
                <td class="py-1">NIK</td>
                <td class="py-1">:</td>
                <td class="py-1 w-3/4">${data.nomor_ktp}</td>
              </tr>
              <tr>
                <td class="py-1">Agama</td>
                <td class="py-1">:</td>
                <td class="py-1 w-3/4">${data.agama}</td>
              </tr>
              <tr class="">
                <td class="py-1">Pekerjaan</td>
                <td class="py-1">:</td>
                <td class="py-1 w-3/4">${data.pekerjaan}</td>
              </tr>
              <tr>
                <td class="align-top py-1">Alamat</td>
                <td class="align-top py-1">:</td>
                <td class="align-top py-1 w-3/4">${
                  data.alamat
                } Desa Rawang, Kecamatan Pariaman Tengah, Kota Pariaman.
                </td>
              </tr>
            </table>
            <p class="text-justify text-indent">Bahwa yang bersangkutan diatas adalah benar <span
                class="font-bold italic">Berdomisili</span> di ${
                  data.alamat
                } Desa Rawang, Kecamatan Pariaman Tengah, Kota Pariaman.</p>
            <p class="mt-8 text-indent">Demikianlah surat keterangan ini dibuat dan diberikan kepada yang bersangkutan
              agar dapat dipergunakan sebagaimana mestinya.</p>
            <div class="flex flex-col items-end mt-12">
              <div class="flex flex-col w-fit text-center">
                <p class="inline-block">Pariaman, ${data.tanggal}</p>
                <p class="inline-block">Kepala Desa Rawang</p>
                <div class="py-12">
                </div>
                <p class="font-bold uppercase">${data.kepala_desa}</p>
              </div>
            </div>
          </div>
        </div>
         <script>
        setTimeout(function() {
          window.print();
        }, 2000); // Delay 2 detik sebelum membuka fungsi print
      </script>
      </body>
      </html>
    `;
  const newWindow = window.open();
  newWindow.document.write(content);
  newWindow.document.close();
};

export default printSuratDomisili;
