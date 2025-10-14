// /api/kegiatan

import { NextResponse } from "next/server";

interface ContactPerson {
  nama: string;
  nohp: string;
}

interface Timeline {
  judul: string;
  waktu: string;
}

interface Pembayaran {
  nama: string;
  no: string;
}

interface Kegiatan {
  id: number;
  title: string;
  slug: string;
  type: string;
  description: string;
  subData?: {
    photo: string;
    nama: string;
    title?: string;
  };
  pembayaran: Pembayaran[];
  logo?: string;
  harga: {
    idr: number;
  };
  contactPerson: ContactPerson[];
  timeline: Timeline[];
}

const kegiatanData: Kegiatan[] = [
  {
    id: 1,
    title: "E-Sport: Mobile Legends",
    slug: "e-sport",
    type: "normal",
    description:
      "E-Sport VALTER 2025 menghadirkan Turnamen Mobile Legends: Bang Bang dalam format hybrid, yang menggabungkan keseruan kompetisi online dan pengalaman langsung secara offline. Menjadi ruang bagi para pemain untuk mengasah strategi, membangun kekompakan tim, serta menjunjung tinggi sportivitas. Buktikan diri sebagai penguasa Land of Dawn dan rebut hadiah menariknya!",
    logo: "/assets/kegiatan/MOLE.png",
    harga: { idr: 45000 },
    contactPerson: [
      {
        nama: "Rama",
        nohp: "0896-2015-6526",
      },
      {
        nama: "Ihsan",
        nohp: "0856-5836-4556",
      },
    ],
    timeline: [
      {
        judul: "Pendaftaran",
        waktu: "1 September - 22 Oktober 2025",
      },
      {
        judul: "Technical Meeting",
        waktu: "23 Oktober 2025",
      },
      {
        judul: "Pelaksanaan",
        waktu: "25 Oktober 2025",
      },
    ],
    pembayaran: [
      {
        nama: "Mandiri",
        no: "1130020796169",
      },
      {
        nama: "Dana",
        no: "081337857563",
      },
    ],
  },
  {
    id: 2,
    title: "Pelatihan Konten Kreator",
    slug: "pelatihan-content-creator",
    type: "card",
    description:
      "Pelatihan Konten Kreator VALTER 2025 adalah program intensif selama tiga hari bersama narasumber profesional untuk mengasah keterampilan editing dan produksi konten. Mengusung tema “Optimalisasi Produksi & Penyajian Konten Digital Berkelanjutan”, pelatihan ini membantu peserta meningkatkan personal branding, kreativitas, daya saing, sekaligus mendapatkan pengalaman praktis, fasilitas lengkap, dan sertifikat nasional sebagai nilai tambah di era pesatnya perkembangan content creator.",
    logo: "/assets/kegiatan/Pelatihan.png",
    harga: { idr: 75000 },
    subData: {
      photo: "/assets/siti_safira.jpg",
      nama: "Siti Safira",
      title: "Content Creator",
    },
    pembayaran: [
      {
        nama: "Mandiri",
        no: "1130020796169",
      },
      {
        nama: "Dana",
        no: "081337857563",
      },
    ],
    contactPerson: [
      {
        nama: "Faita",
        nohp: "0821-7776-1829",
      },
      {
        nama: "Rio YB",
        nohp: "0859-4560-5948",
      },
    ],
    timeline: [
      {
        judul: "Registrasi Peserta",
        waktu: "1 September - 13 Oktober 2025",
      },
      {
        judul: "Pelaksanaan",
        waktu: "20 s.d. 22 Oktober 2025",
      },
    ],
  },
  {
    id: 3,
    title: "Lomba Video Campaign",
    slug: "video-campign",

    description:
      "Video campaign valter 2025 mengajak peserta untuk mengeksplorasi dan menampilkan bagaimana teknologi Kecerdasan Buatan (AI) tidak hanya menjadi alat bantu, tetapi juga menjadi mitra kreatif bagi para content creator di era digital saat ini dengan tema Peran AI dalam Pemanfaatan Media Sosial oleh Para Content Creator.",
    logo: "/assets/kegiatan/VidCamp.png",
    harga: { idr: 60000 },
    type: "normal",
    contactPerson: [
      {
        nama: "Rama",
        nohp: "0896-2015-6526",
      },
      {
        nama: "Ihsan",
        nohp: "0856-5836-4556",
      },
    ],
    timeline: [
      {
        judul: "Pendaftaran",
        waktu: "1 September - 13 Oktober 2025",
      },
      {
        judul: "Technical Meeting",
        waktu: "15 Oktober 2025",
      },
      {
        judul: "Pengumpulan Karya",
        waktu: "16 - 23 Oktober 2025",
      },
      {
        judul: "Seleksi hasil karya",
        waktu: "24 Oktober 2025",
      },
      {
        judul: "Pengumuman Finalis",
        waktu: "25 Oktober 2025",
      },
      {
        judul: "Presentasi Karya",
        waktu: "27 Oktober 2025",
      },
    ],
    pembayaran: [
      {
        nama: "Mandiri",
        no: "1130020796169",
      },
      {
        nama: "Dana",
        no: "081337857563",
      },
    ],
  },
  {
    id: 4,
    title: "Web Design (UI/UX)",
    slug: "web-design",
    description:
      "Siap Unjuk Kreativitas? Web Design VALTER 2025 hadir sebagai ajang kompetisi merancang Landing Page bertema VALTER 2025 dengan kebebasan penuh dalam gaya dan kreativitas. Lomba ini dapat diikuti secara individu maupun kelompok, dan tentunya menghadirkan hadiah menarik bagi sang juara! Tunjukkan ide orisinalmu, ciptakan desain web inovatif, dan jadilah bagian dari energi baru di dunia digital!",
    logo: "/assets/kegiatan/WebDes.png",
    harga: { idr: 35000 },
    type: "normal",
    contactPerson: [
      {
        nama: "Afiyah",
        nohp: "0897-8737-184",
      },
    ],
    timeline: [
      {
        judul: "Pendaftaran",
        waktu: "1 September - 13 Oktober 2025",
      },
      {
        judul: "Technical Meeting",
        waktu: "15 Oktober 2025",
      },
      {
        judul: "Pengumpulan Karya",
        waktu: "16 - 21 Oktober 2025",
      },
      {
        judul: "Seleksi karya",
        waktu: "22 Oktober 2025",
      },
      {
        judul: "Pengumuman Finalis",
        waktu: "23 Oktober 2025",
      },
      {
        judul: "Presentasi Karya",
        waktu: "25 Oktober 2025",
      },
    ],
    pembayaran: [
      {
        nama: "Mandiri",
        no: "1130020796169",
      },
      {
        nama: "Dana",
        no: "081337857563",
      },
    ],
  },
];

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      data: kegiatanData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Gagal mendapatkan data kegiatan ${error}`,
      },
      {
        status: 500,
      }
    );
  }
}
