import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

// Register font
Font.register({
  family: 'Times New Roman',
  fonts: [
    {
      src: '../../../assets/fonts/Times New Roman.ttf',
    },
    {
      src: '../../../assets/fonts/Times New Roman Bold.ttf',
      fontWeight: 'bold',
    },
    {
      src: '../../../assets/fonts/Times New Roman Italic.ttf',
      fontStyle: 'italic',
    },
    {
      src: '../../../assets/fonts/Times New Roman Bold Italic.ttf',
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Times New Roman',
    padding: 50,
    fontSize: 12,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderStyle: 'double',
    display: 'flex',
    position: 'relative',
  },
  heading: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  logo: {
    width: 60,
    height: 60,
    position: 'absolute',
    left: 10,
    bottom: 20,
  },
  h3: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    alignItems: 'center',
    marginBottom: 30,
    fontSize: 14,
  },
  text: {
    marginBottom: 10,
    fontSize: 12,
  },
  mainText: {
    margin: 10,
    fontSize: 12,
    gap: 8,
  },
  textIndent: {
    textIndent: 40,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: '25%',
  },
  separator: {
    width: '2%',
  },
  value: {
    width: '70%',
  },
  boldText: {
    fontWeight: 'bold',
  },
  boldUnderscoredText: {
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  closingTextContainer: {
    textAlign: 'justify',
    marginVertical: 20,
    gap: 10,
  },
  sign: {
    width: 150,
    height: 100,
  },
  signature: {
    position: 'absolute',
    bottom: 60,
    right: 50,
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: 'black',
    marginTop: 2,
    marginBottom: 20,
  },
});

// buat bulan romawi sesuai bulan saat ini
const bulanRomawi = (bulan) => {
  const romawi = [
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
    'X',
    'XI',
    'XII',
  ];
  return romawi[bulan - 1];
};

const data = {
  id: 1,
  id_pengajuan: 1,
  nomor_ktp: '123123321',
  tanggal_kematian: '2024-07-09',
  jam_kematian: '05:34:00',
  dokumen: '1722033300970.jpg',
  surat: null,
  tempat_kematian: 'rsud rawang',
  tanggal_pemakaman: '2024-07-11',
  tempat_pemakaman: 'rawang',
  jenis_ttd: 1,
  penduduk: {
    id: 2,
    foto_diri: '1721975653382-john1.jpg',
    foto_ktp: '1721975653382-angrycat.jpg',
    foto_kk: '1721975653382-angrycat.jpg',
    nomor_ktp: '123123321',
    nomor_kk: '30202020',
    nama: 'YIN',
    jenis_kelamin: 'PEREMPUAN',
    tanggal_lahir: '2024-07-25',
    tempat_lahir: 'BANDUNG',
    alamat: 'BANDUNG JALAN JAKARTA NO.22',
    agama: 'PROTESTAN',
    rt: 0,
    rw: 0,
    pekerjaan: 'Pelajar / Mahasiswa',
    pendidikan: 'tamat_s2',
    hubungan_keluarga: 'anak',
    status_perkawinan: 'belum kawin',
    golongan_darah: 'TIDAK TAHU',
    lat: '-6.20402280',
    lng: '106.74208590',
  },
  jenis_tanda_tangan: {
    name: 'Digital',
  },
};
// Create Document Component
const SuratKematian = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View
        style={{
          position: 'absolute',
          fontSize: 8,
          padding: 6,
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Text>{moment().format('LLL')}</Text>
        <Text>Surat Keterangan Meninggal Dunia</Text>
      </View>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          src="../../../assets/images/Lambang_Kota_Pariaman.png" // Ganti dengan path ke logo
        />
        <View style={styles.heading}>
          <Text style={styles.h3}>PEMERINTAH KOTA PARIAMAN</Text>
          <Text style={styles.h2}>KECAMATAN PARIAMAN TENGAH</Text>
          <Text style={styles.h1}>DESA RAWANG</Text>
          <Text style={styles.boldText}>Jl. R. A. KARTINI, PARIAMAN</Text>
        </View>
      </View>
      <hr style={styles.line} />
      <View style={styles.title}>
        <Text style={styles.boldUnderscoredText}>
          SURAT KETERANGAN MENINGGAL DUNIA
        </Text>
        <Text>
          Nomor : {data.id}/SK/RW/PRM.T/{bulanRomawi(moment().month() + 1)}/{' '}
          {moment().format('YYYY')}
        </Text>
      </View>
      <View style={styles.text}>
        <Text style={styles.textIndent}>
          Yang bertanda tangan dibawah ini Kepala Desa Rawang, Kecamatan
          Pariaman Tengah, Kota Pariaman menerangkan :
        </Text>
      </View>
      <View style={styles.mainText}>
        <View style={styles.row}>
          <Text style={styles.label}>Nama</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.value} wrap={false}>
            <Text style={styles.boldText}>{data.penduduk.nama}</Text>
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tempat / Tgl Lahir</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.value} wrap={false}>
            <Text>
              {data.penduduk.tempat_lahir},{' '}
              {moment(data.penduduk.tanggal_lahir).format('DD-MM-YYYY')}
            </Text>
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pekerjaan</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.value} wrap={false}>
            <Text>{data.penduduk.pekerjaan}</Text>
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Alamat</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.value} wrap={false}>
            <Text>
              {data.penduduk.alamat} Desa Rawang, Kecamatan Pariaman Tengah,
              Kota Pariaman.
            </Text>
          </Text>
        </View>
      </View>
      <Text style={{ marginVertical: 10 }}>Telah Meninggal Dunia pada :</Text>
      <View style={styles.mainText}>
        <View style={styles.row}>
          <Text style={styles.label}>Hari</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.value} wrap={false}>
            <Text>{moment(data.tanggal_kematian).format('dddd')}</Text>
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tanggal</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.value} wrap={false}>
            <Text>{moment(data.tanggal_kematian).format('DD-MM-YY')}</Text>
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Di</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.value} wrap={false}>
            <Text>{data.tempat_kematian}</Text>
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Dikebumikan tanggal</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.value} wrap={false}>
            <Text>{moment(data.tanggal_pemakaman).format('LL')}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.closingTextContainer}>
        <View style={styles.text}>
          <Text style={styles.textIndent}>
            Demikianlah surat keterangan ini dibuat dan diberikan kepada yang
            bersangkutan agar dapat dipergunakan sebagaimana mestinya.
          </Text>
        </View>
      </View>
      <View style={styles.signature}>
        <View style={{ alignItems: 'center', textAlign: 'center' }}>
          <Text>Pariaman, {moment().format('DD MMMM YYYY')}</Text>
          <Text>Kepala Desa Rawang</Text>
          <Image
            style={styles.sign}
            src="../../../assets/images/signature.png" // Ganti dengan path ke logo
          />
          <Text style={{ fontWeight: 'bold' }}>SUKRI HERIADI CAN</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default SuratKematian;
