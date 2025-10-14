/* eslint-disable @next/next/no-img-element */
// components/RegistrationForm.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

// Types
interface TeamMember {
  nama: string;
  npm: string;
}

interface FormData {
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

interface RegistrationFormProps {
  type: "normal" | "card";
  harga: number;
  pembayaran: Array<{ nama: string; no: string }>;
  onSubmit: (data: FormData) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  type,
  harga,
  pembayaran,
  onSubmit,
}) => {
  const [kategori, setKategori] = useState<"mahasiswa" | "umum">("mahasiswa");
  const [dragActive, setDragActive] = useState(false);

  // State untuk form normal (team)
  const [namaTeam, setNamaTeam] = useState("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { nama: "", npm: "" },
  ]);

  // State untuk form card (individual)
  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [domisili, setDomisili] = useState("");
  const [npm, setNpm] = useState("");

  // State bersama
  const [whatsapp, setWhatsapp] = useState("");
  const [asalInstansi, setAsalInstansi] = useState("");
  const [buktiPembayaran, setBuktiPembayaran] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Handle team member
  const addTeamMember = () => {
    if (teamMembers.length < 3) {
      setTeamMembers([...teamMembers, { nama: "", npm: "" }]);
    }
  };

  const removeTeamMember = (index: number) => {
    if (teamMembers.length > 1) {
      setTeamMembers(teamMembers.filter((_, i) => i !== index));
    }
  };

  const updateTeamMember = (
    index: number,
    field: "nama" | "npm",
    value: string
  ) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  // Handle file upload
  const handleFileChange = (file: File | null) => {
    if (file) {
      setBuktiPembayaran(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: FormData = {
      kategori,
      whatsapp,
      asalInstansi,
      buktiPembayaran,
    };

    if (type === "normal") {
      formData.namaTeam = namaTeam;
      formData.teamMembers = kategori === "mahasiswa" ? teamMembers : undefined;
    } else {
      formData.namaLengkap = namaLengkap;
      formData.email = email;
      formData.domisili = domisili;
      if (kategori === "mahasiswa") {
        formData.npm = npm;
      }
    }

    onSubmit(formData);
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Info Pembayaran */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 border border-purple-500/30 rounded-2xl p-6 mb-8"
      >
        <h3 className="text-xl font-bold text-white mb-4">
          Informasi Pembayaran
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Biaya Pendaftaran:</span>
            <span className="text-2xl font-bold text-purple-400">
              {formatRupiah(harga)}
            </span>
          </div>
          <div className="border-t border-purple-500/20 pt-3">
            <p className="text-gray-400 text-sm mb-2">
              Transfer ke salah satu rekening:
            </p>
            {pembayaran.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-gray-900/50 rounded-lg p-3 mb-2"
              >
                <span className="text-white font-medium">{item.nama}</span>
                <span className="text-purple-400 font-mono">{item.no}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-900/50 border border-purple-500/20 rounded-2xl p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tab Kategori */}
          <div>
            <label className="block text-white font-semibold mb-3">
              Kategori Peserta
            </label>
            <div className="flex gap-3">
              {["mahasiswa", "umum"].map((kat) => (
                <button
                  key={kat}
                  type="button"
                  onClick={() => setKategori(kat as "mahasiswa" | "umum")}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    kategori === kat
                      ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/50"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {kat.charAt(0).toUpperCase() + kat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Form Normal (Team) */}
          {type === "normal" && (
            <>
              <div>
                <label className="block text-white font-semibold mb-2">
                  Nama Team <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={namaTeam}
                  onChange={(e) => setNamaTeam(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Masukkan nama team"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Nomor WhatsApp Aktif <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="08xxxxxxxxxx"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Asal Instansi/Komunitas{" "}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={asalInstansi}
                  onChange={(e) => setAsalInstansi(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Nama instansi atau komunitas"
                  required
                />
              </div>

              {/* Team Members */}
              {kategori === "mahasiswa" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-white font-semibold">
                      Anggota Team <span className="text-red-400">*</span>
                    </label>
                    {teamMembers.length < 3 && (
                      <button
                        type="button"
                        onClick={addTeamMember}
                        className="text-sm text-purple-400 hover:text-purple-300 font-medium"
                      >
                        + Tambah Anggota
                      </button>
                    )}
                  </div>

                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="bg-gray-800/50 border border-purple-500/20 rounded-lg p-4 space-y-3"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-400 font-medium">
                          Anggota {index + 1}
                        </span>
                        {teamMembers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTeamMember(index)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Hapus
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={member.npm}
                        onChange={(e) =>
                          updateTeamMember(index, "npm", e.target.value)
                        }
                        className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="NPM/NIM"
                        required
                      />
                      <input
                        type="text"
                        value={member.nama}
                        onChange={(e) =>
                          updateTeamMember(index, "nama", e.target.value)
                        }
                        className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Nama Lengkap"
                        required
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Untuk umum - hanya nama */}
              {kategori === "umum" && (
                <div className="space-y-4">
                  <label className="block text-white font-semibold">
                    Anggota Team <span className="text-red-400">*</span>
                  </label>
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="bg-gray-800/50 border border-purple-500/20 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-400 font-medium">
                          Anggota {index + 1}
                        </span>
                        {teamMembers.length > 1 && index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeTeamMember(index)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Hapus
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={member.nama}
                        onChange={(e) =>
                          updateTeamMember(index, "nama", e.target.value)
                        }
                        className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Nama Lengkap"
                        required
                      />
                    </div>
                  ))}
                  {teamMembers.length < 3 && (
                    <button
                      type="button"
                      onClick={addTeamMember}
                      className="text-sm text-purple-400 hover:text-purple-300 font-medium"
                    >
                      + Tambah Anggota
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {/* Form Card (Individual) */}
          {type === "card" && (
            <>
              <div>
                <label className="block text-white font-semibold mb-2">
                  Nama Lengkap <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={namaLengkap}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              {kategori === "mahasiswa" && (
                <div>
                  <label className="block text-white font-semibold mb-2">
                    NIM/NPM <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={npm}
                    onChange={(e) => setNpm(e.target.value)}
                    className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Masukkan NIM/NPM"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-white font-semibold mb-2">
                  Nomor WhatsApp Aktif <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="08xxxxxxxxxx"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Email Aktif <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Asal Instansi/Komunitas{" "}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={asalInstansi}
                  onChange={(e) => setAsalInstansi(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Nama instansi atau komunitas"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Domisili (Kota/Kabupaten){" "}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={domisili}
                  onChange={(e) => setDomisili(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Kota/Kabupaten"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-white font-semibold mb-2">
              Bukti Pembayaran <span className="text-red-400">*</span>
            </label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                dragActive
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-purple-500/30 bg-gray-800/50"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required={!buktiPembayaran}
              />
              {previewUrl ? (
                <div className="space-y-3">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-40 mx-auto rounded-lg"
                  />
                  <p className="text-purple-400 text-sm">
                    {buktiPembayaran?.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setBuktiPembayaran(null);
                      setPreviewUrl("");
                    }}
                    className="text-red-400 text-sm hover:text-red-300"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <svg
                    className="w-12 h-12 mx-auto text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-gray-400">
                    Drag & drop atau{" "}
                    <span className="text-purple-400">klik untuk upload</span>
                  </p>
                  <p className="text-gray-500 text-sm">PNG, JPG maksimal 5MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/75"
          >
            Daftar Sekarang
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;
