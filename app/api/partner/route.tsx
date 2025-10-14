import { NextResponse } from "next/server";

interface Partner {
  id: number;
  photo: string;
}

const partners: Partner[] = [
  { id: 1, photo: "/assets/partners/partner1.png" },
  { id: 2, photo: "/assets/partners/partner2.png" },
  { id: 3, photo: "/assets/partners/partner3.png" },
  { id: 4, photo: "/assets/partners/partner4.webp" },
  { id: 5, photo: "/assets/partners/partner5.png" },
  { id: 6, photo: "/assets/partners/partner6.png" },
  { id: 7, photo: "/assets/partners/partner7.png" },
  { id: 8, photo: "/assets/partners/partner8.png" },
  { id: 9, photo: "/assets/partners/partner9.png" },
  { id: 10, photo: "/assets/partners/partner10.png" },
];

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      data: partners,
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
