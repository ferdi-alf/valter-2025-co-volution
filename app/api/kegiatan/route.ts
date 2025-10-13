import { NextResponse } from "next/server";

interface ContactPerson {
  nama: string;
  nohp: string;
}

interface Timeline {
  judul: string;
  waktu: string;
}

interface Kegiatan {
  id: number;
  title: string;
  description: string;
  logo: string;
  harga: {
    idr: number;
  };
  contactPerson: ContactPerson;
  timeline: Timeline;
}

const kegiatanData: Kegiatan[] = [
  {
    id: 1,
    title: "MOLE 2025",
    description:
      "Media Online Learning Event - Event pembelajaran online terbesar",
    logo: "/assets/kegiatan/MOLE.png",
    harga: { idr: 35000 },
    contactPerson: {
      nama: "Ahmad Ferdiansyah",
      nohp: "08123456789",
    },
    timeline: {
      judul: "Pendaftaran Dibuka",
      waktu: "19 Oktober 2025",
    },
  },
  {
    id: 2,
    title: "Pelatihan Web Development",
    description: "Pelatihan intensif pengembangan web modern",
    logo: "/assets/kegiatan/Pelatihan.png",
    harga: { idr: 50000 },
    contactPerson: {
      nama: "Siti Nurhaliza",
      nohp: "08234567890",
    },
    timeline: {
      judul: "Batch 3 Dimulai",
      waktu: "1 November 2025",
    },
  },
  {
    id: 3,
    title: "Video Campaign Workshop",
    description: "Workshop pembuatan konten video kreatif untuk media sosial",
    logo: "/assets/kegiatan/VidCamp.png",
    harga: { idr: 40000 },
    contactPerson: {
      nama: "Budi Santoso",
      nohp: "08345678901",
    },
    timeline: {
      judul: "Early Bird",
      waktu: "25 Oktober 2025",
    },
  },
  {
    id: 4,
    title: "Web Design Masterclass",
    description: "Kelas desain web dari dasar hingga mahir",
    logo: "/assets/kegiatan/WebDes.png",
    harga: { idr: 45000 },
    contactPerson: {
      nama: "Dewi Lestari",
      nohp: "08456789012",
    },
    timeline: {
      judul: "Pendaftaran Terakhir",
      waktu: "15 November 2025",
    },
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
