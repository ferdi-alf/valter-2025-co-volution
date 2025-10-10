import About from "@/sections/About";
import Main from "@/sections/Main";

export default function Home() {
  return (
    <>
      <Main />
      <div className="relative w-full h-screen ">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gray-950 opacity-50 blur-3xl"></div>
          <div className="absolute top-1/4 left-0 w-full h-1/3 bg-gray-950 opacity-40 blur-2xl"></div>
          <div className="absolute top-1/2 left-0 w-full h-1/3 bg-gray-950 opacity-60 blur-xl"></div>
          <div className="absolute top-3/4 left-0 w-full h-1/3 bg-gray-950 opacity-80 blur-lg"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gray-950 opacity-100"></div>
        </div>

        <div className=" lg:px-36 absolute w-full flex justify-center  ">
          <About />
        </div>
      </div>
    </>
  );
}
