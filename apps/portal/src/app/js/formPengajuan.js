export const formKematian = [
  {
    label: 'Foto Surat Keterangan RS',
    name: 'surat_rs',
    type: 'file',
    disabled: false,
  },
  {
    label: 'Tanggal Kematian',
    name: 'tanggal_kematian',
    type: 'date',
    disabled: false,
  },
  {
    label: 'Jam Kematian',
    name: 'jam_kematian',
    type: 'time',
    disabled: false,
  },
  {
    label: 'Tempat Kematian',
    name: 'tempat_kematian',
    type: 'textarea',
    disabled: false,
  },
  {
    label: 'Tanggal Pemakaman',
    name: 'tanggal_pemakaman',
    type: 'date',
    disabled: false,
  },
  {
    label: 'Tempat Pemakaman',
    name: 'tempat_pemakaman',
    type: 'textarea',
    disabled: false,
  },
  {
    label: 'Anggota Keluarga yang menggingal',
    name: 'anggota_keluarga',
    type: 'select',
    options: [],
    disabled: false,
  },
  { label: 'Keterangan Tambahan', name: 'keterangan', type: 'textarea' },
  {
    label: 'Jenis Tanda Tangan',
    name: 'jenis_ttd',
    type: 'select',
    options: [
      { label: 'Digital', value: 1 },
      { label: 'Basah', value: 2 },
    ],
  },
];

export const formKelahiran = [
  {
    label: 'Foto Surat Keterangan RS',
    name: 'surat_rs',
    type: 'file',
    disabled: false,
  },
  { label: 'Nomor KTP', name: 'nomor_ktp', type: 'text', disabled: true },
  { label: 'Nomor KK', name: 'nomor_kk', type: 'text', disabled: true },
  { label: 'Nama', name: 'nama', type: 'text', disabled: true },
  { label: 'Nama Anak', name: 'nama_anak', type: 'text', disabled: false },
  {
    label: 'Jenis Kelamin Anak',
    name: 'jenis_kelamin',
    type: 'select',
    options: ['LAKI-LAKI', 'PEREMPUAN'],
    disabled: false,
  },
  {
    label: 'Tanggal Lahiran',
    name: 'tanggal_lahir',
    type: 'date',
    disabled: false,
  },
  {
    label: 'Jam Kelahiran',
    name: 'jam_lahir',
    type: 'time',
    disabled: false,
  },
  {
    label: 'Tempat Lahiran',
    name: 'tempat_lahir',
    type: 'text',
    disabled: false,
  },
  {
    label: 'Pasangan (Istri/Suami)',
    name: 'anggota_keluarga',
    type: 'select',
    options: [],
    disabled: false,
  },
  { label: 'Keterangan Tambahan', name: 'keterangan', type: 'textarea' },
];

export const formDomisili = [
  { label: 'Nomor KTP', name: 'nomor_ktp', type: 'text', disabled: true },
  { label: 'Nomor KK', name: 'nomor_kk', type: 'text', disabled: true },
  { label: 'Nama', name: 'nama', type: 'text', disabled: true },
  {
    label: 'Jenis Kelamin',
    name: 'jenis_kelamin',
    type: 'select',
    options: ['LAKI-LAKI', 'PEREMPUAN'],
    disabled: true,
  },
  {
    label: 'Golongan Darah',
    name: 'golongan_darah',
    type: 'text',
    disabled: true,
  },
  {
    label: 'Tanggal Lahir',
    name: 'tanggal_lahir',
    type: 'date',
    disabled: true,
  },
  { label: 'Tempat Lahir', name: 'tempat_lahir', type: 'text', disabled: true },
  { label: 'Alamat', name: 'alamat', type: 'textarea', disabled: true },
  { label: 'Agama', name: 'agama', type: 'text', disabled: true },
  { label: 'RT', name: 'rt', type: 'text', disabled: true },
  { label: 'RW', name: 'rw', type: 'text', disabled: true },
  {
    label: 'Surat dibuat untuk',
    name: 'anggota_keluarga',
    type: 'select',
    options: [],
    disabled: false,
  },
  {
    label: 'Keterangan Keperluan Surat',
    name: 'keterangan',
    type: 'textarea',
    disabled: false,
  },
  {
    label: 'Jenis Tanda Tangan',
    name: 'jenis_ttd',
    type: 'select',
    options: [
      { label: 'Digital', value: 1 },
      { label: 'Basah', value: 2 },
    ],
  },
];

export const jenisPengajuan = [
  {
    label: 'Surat Kematian',
    name: 'surat_kematian',
    value: 3,
    form: formKematian,
  },
  // {
  //   label: 'Surat Kelahiran',
  //   name: 'surat_kelahiran',
  //   value: 2,
  //   form: formKelahiran,
  // },
  {
    label: 'Keterangan Domisili ',
    name: 'keterangan_domisili',
    value: 1,
    form: formDomisili,
  },
];
