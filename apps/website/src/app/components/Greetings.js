import DOMPurify from 'dompurify';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Greetings() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const sambutan = `
    <p>Assalamu'alaikum warahmatullahi wabarakatuh,</p><p>&nbsp;</p>
    <p style="text-align:justify;">Selamat datang di website resmi Desa Rawang, Padang Pariaman.</p>
    <p style="text-align:justify;">Puji syukur kita panjatkan ke hadirat Allah SWT atas segala rahmat dan karunia-Nya, sehingga kita dapat menghadirkan platform ini untuk kemudahan administrasi dan pelayanan kepada seluruh warga Desa Rawang.</p>
    <p>&nbsp;</p>
    <p style="text-align:justify;">Website ini kami rancang untuk memberikan layanan terbaik dalam hal pengajuan surat menyurat serta berbagai informasi penting lainnya terkait kegiatan dan perkembangan desa. Dengan adanya website ini, kami berharap dapat mempermudah proses administrasi dan meningkatkan transparansi serta efisiensi pelayanan publik di desa kita.</p>
    <p>&nbsp;</p>
    <p style="text-align:justify;">Saya mengajak seluruh warga untuk memanfaatkan fasilitas ini dengan sebaik-baiknya. Kritik dan saran yang membangun sangat kami harapkan demi perbaikan dan kemajuan bersama. Semoga dengan adanya website ini, kita dapat terus menjaga semangat kebersamaan dan gotong royong dalam mewujudkan Desa Rawang yang lebih maju dan sejahtera.</p>
    <p style="text-align:justify;">&nbsp;</p>
    <p>Terima kasih atas perhatian dan kerjasamanya. Semoga Allah SWT senantiasa memberikan kemudahan dan keberkahan bagi kita semua.</p>
    <p>&nbsp;</p>
    <p>Wassalamu'alaikum warahmatullahi wabarakatuh.</p>
  `;

  return (
    <div className="container mx-auto py-8" ref={ref}>
      <h3 className="text-2xl text-zinc-700 font-bold text-center">
        Sambutan Kepala Desa
      </h3>
      <div className="flex flex-col lg:flex-row md:justify-center">
        <motion.div
          className="flex relative justify-center lg:justify-end md:py-8 w-full lg:w-1/4"
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <img
            className="w-1/2 lg:w-80 h-fit"
            src="../../assets/img/kepala_desa2.jpg"
            alt="Kepala Desa"
          />
        </motion.div>
        <motion.div
          className="w-full lg:w-3/4 p-6"
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="w-fit">
            <h1 className="font-bold text-xl lg:text-3xl">Sukri Heriadi Can</h1>
            <h2 className="text-sm">KEPALA DESA RAWANG</h2>
            <div className="flex gap-x-1">
              <hr className="w-full bg-[#007E1C] border-2 border-[#007E1C]" />
              <hr className="w-3/5 bg-[#009DC4] border-2 border-[#009DC4]" />
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(sambutan),
            }}
            className=" pt-4 sm:pt-6"
          ></div>
        </motion.div>
      </div>
    </div>
  );
}
