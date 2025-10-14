/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProfileCard from "@/components/ProfileCard";
import RegistrationForm from "@/components/RegistrationForm";
import GradientText from "@/components/GradientText";

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

export default function SeminarPage() {
  const [data, setData] = useState<Seminar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/seminar");
        const result = await res.json();

        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.log("Gagal mendapatkan data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    alert("Pendaftaran berhasil! Tim kami akan menghubungi Anda segera.");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Data tidak ditemukan</p>
      </div>
    );
  }

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen py-20 px-4 md:px-8">
      <div className="md:px-36 mx-auto">
        {/* Header Section */}

        <div className="flex mb-16 md:flex-row-reverse gap-5 flex-col-reverse  justify-between items-start">
          <div className="">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:text-start flex flex-col items-start h-full -600 mb-12 "
            >
              <h1 className="lg:text-4xl text-lg  font-funky mb-4">
                <GradientText
                  colors={[
                    "#5d0ec0",
                    "#9810fa",
                    "#8a0194",
                    "#9810fa",
                    "#5d0ec0",
                  ]}
                  animationSpeed={6}
                  showBorder={false}
                  className="custom-class"
                >
                  {data.title}
                </GradientText>
              </h1>
              <p className=" text-sm font-light  md:text-xl text-white">
                {data.description}
              </p>
            </motion.div>
          </div>

          {data.type === "card" && data.subData?.photo ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className=" px-3 flex justify-center items-center w-full"
            >
              <ProfileCard
                name={""}
                showBehindGradient={false}
                status={data.subData.title}
                handle={data.subData.nama}
                title={""}
                avatarUrl={data.subData.photo}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
              />
            </motion.div>
          ) : data.logo ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-16"
            >
              <img
                src={data.logo}
                alt={data.title}
                className="w-48 h-48 object-contain"
              />
            </motion.div>
          ) : null}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/50 border border-purple-500/20 rounded-2xl p-6"
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Timeline
            </h3>
            <div className="space-y-4">
              {data.timeline.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 pb-4 border-b border-purple-500/10 last:border-0"
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-white font-semibold">{item.judul}</p>
                    <p className="text-gray-400 text-sm">{item.waktu}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact & Price Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Price Card */}
            <div className="bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 border border-purple-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">
                Biaya Pendaftaran
              </h3>
              <p className="text-4xl font-bold text-purple-400">
                {formatRupiah(data.harga.idr)}
              </p>
            </div>

            {/* Contact Person Card */}
            <div className="bg-gray-900/50 border border-purple-500/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Contact Person
              </h3>
              <div className="space-y-3">
                {data.contactPerson.map((contact, idx) => (
                  <a
                    key={idx}
                    href={`https://wa.me/${contact.nohp.replace(
                      /[^0-9]/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 hover:bg-gray-800 transition-colors group"
                  >
                    <div>
                      <p className="text-white font-medium">{contact.nama}</p>
                      <p className="text-gray-400 text-sm">{contact.nohp}</p>
                    </div>
                    <svg
                      className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          id="registration-form"
        >
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-8">
            Form Pendaftaran
          </h2>
          <RegistrationForm
            type={data.type as "normal" | "card"}
            harga={data.harga.idr}
            pembayaran={data.pembayaran}
            onSubmit={handleFormSubmit}
          />
        </motion.div>
      </div>
    </div>
  );
}
