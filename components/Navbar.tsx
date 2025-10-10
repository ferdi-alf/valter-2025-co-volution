import Image from "next/image";
import { BorderBeam } from "./ui/border-beam";

const Navbar = () => {
  return (
    <div className="lg:px-36 px-2 fixed z-[9999]  w-full">
      <div className="pt-3    z-50 flex justify-center items-center  top-0 right-0">
        <div className="w-full   ">
          <div className="relative  backdrop-blur-xl   overflow-hidden text-white p-3 border-t border-gray-600 bg-gray-800/40 shadow-2xl rounded-xl">
            <div className="flex gap-2  items-center">
              <Image
                src={"/assets/logo.png"}
                height={1080}
                loading="lazy"
                width={1080}
                className="w-10 h-10"
                alt="logo valter 2025"
              />
              <p className="lg:text-lg text-xs font-funky">Valter 2025</p>
            </div>

            <BorderBeam
              duration={12}
              size={150}
              className="from-transparent via-purple-500 to-fuchsia-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
