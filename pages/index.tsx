import Image from "next/image";
import { Inter } from "next/font/google";
import Login from "./_Login/index"
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Login></Login>
    </div>
  );
}
