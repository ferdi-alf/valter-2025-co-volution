import { NextResponse } from "next/server";

interface Timeline {
  id: number;
  title: string;
  waktu: string;
}

const data: Timeline[] = [
  {
    id: 1,
    title: "Pembukaan",
    waktu: "Senin, 13 Oktober 2025",
  },
  {
    id: 2,
    title: "Pelaksanaan Pelatihan Content Creator",
    waktu: "Senin, 20 Oktober 2025",
  },
  {
    id: 3,
    title: "Pelaksanaan Esport dan Presentasi Lomba Web Design",
    waktu: "Sabtu, 25 Oktober 2025",
  },
  {
    id: 4,
    title: "Presentasi Lomba Video Campaign",
    waktu: "Rabu, 27 Oktober 2025",
  },
  {
    id: 5,
    title: "Penutupan",
    waktu: "Kamis, 30 Oktober 2025",
  },
];

export async function GET() {
  try {
    await new Promise((res) => setTimeout(res, 100));
    return NextResponse.json(
      {
        success: true,
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Gagal mendapatkan data timeline. ${error}`,
      },
      {
        status: 500,
      }
    );
  }
}
