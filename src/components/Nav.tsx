"use client";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import { useRouter } from "next/navigation";
const Nav = () => {
  const router = useRouter();
  return (
    <nav className="flex gap-4 p-8 w-full justify-center">
      <Image
        src={Logo}
        alt="Logo"
        onClick={() => router.push("/")}
        className="cursor-pointer"
      />
      <h1
        className="text-4xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        DevXLab
      </h1>
    </nav>
  );
};
export default Nav;
