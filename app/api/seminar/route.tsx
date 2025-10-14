// /api/seminar
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

interface Seminar {
  id: number;
  title: string;
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

const data: Seminar = {
  id: 1,
  title: "Co Create or Compete: Kolaborasi atau kompetisi bersama Al",
  description:
    "Seminar VALTER 2025 hadir sebagai acara puncak dari Festival Multimedia dan Komputer (VALTER)! Dengan mengusung tema “CoCreate or Compete: Kolaborasi atau Kompetisi bersama AI”, seminar ini menjadi momen spesial yang menghadirkan GUEST STAR inspiratif untuk berbagi pengalaman dan insight terbaru. Seminar ini menggali bagaimana kreativitas, teknologi, dan AI dapat berjalan berdampingan, sekaligus menjadi tantangan di era digital dan content creation.",
  type: "card",
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
  subData: {
    photo: "/assets/kevin_anggara.jpg",
    nama: "Kevin Anggara",
    title: "Content Creator",
  },
  harga: {
    idr: 60000,
  },
  contactPerson: [
    {
      nama: "Cia",
      nohp: "0895-2040-9992",
    },
  ],
  timeline: [
    {
      judul: "Pendaftaran",
      waktu: "1 September - 13 Oktober 2025",
    },
    {
      judul: "Pelaksanaan",
      waktu: "30 Oktober 2025",
    },
  ],
};

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      data: data,
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
