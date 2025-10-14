export interface ContactPerson {
  nama: string;
  nohp: string;
}

export interface Timeline {
  judul: string;
  waktu: string;
}

export interface Pembayaran {
  nama: string;
  no: string;
}

export interface SubData {
  photo: string;
  nama: string;
  title?: string;
}

export interface Kegiatan {
  id: number;
  title: string;
  slug: string;
  type: "normal" | "card";
  description: string;
  subData?: SubData;
  pembayaran: Pembayaran[];
  logo?: string;
  harga: {
    idr: number;
  };
  contactPerson: ContactPerson[];
  timeline: Timeline[];
}

export interface Seminar {
  id: number;
  title: string;
  type: "normal" | "card";
  description: string;
  subData?: SubData;
  pembayaran: Pembayaran[];
  logo?: string;
  harga: {
    idr: number;
  };
  contactPerson: ContactPerson[];
  timeline: Timeline[];
}

export interface TeamMember {
  nama: string;
  npm: string;
}

export interface FormData {
  kategori: "mahasiswa" | "umum";
  namaTeam?: string;
  namaLengkap?: string;
  whatsapp: string;
  email?: string;
  asalInstansi: string;
  domisili?: string;
  npm?: string;
  buktiPembayaran: File | null;
  teamMembers?: TeamMember[];
}
