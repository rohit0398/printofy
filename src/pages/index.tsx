import Image from "next/image";
import { Inter } from "next/font/google";
import { Layout } from "@/layouts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <div className=" container">
        <div className="">
          <video autoPlay muted loop className="fixed top-0 left-0 -z-20 w-full max-h-[80vh] min-h-[60vh] object-cover">
            <source src="/assests/shroom-video2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className=" inset-0 bg-black/60 absolute -z-10 max-h-[80vh]"></div>
        </div>
      </div>
    </Layout>
  );
}
