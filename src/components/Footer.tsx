"use client";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="flex flex-col p-8 bg-gray-800 gap-4 w-full">
      <div
        className="flex gap-4 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src={Logo} alt="Logo" />
        <h1 className="text-4xl font-bold text-white">DevXLab</h1>
      </div>
      <p className="text-gray-500">
        This site is dedicated to DX research and provides information based on
        scientific studies on Developer Experience and targeted towards software
        professionals, developers. managers and researchers.
      </p>
      <nav className="flex flex-col gap-2 text-white">
        <Link href={"/privacy"}>Privacy Policy</Link>
        <Link href={"/terms"}>Terms of Service</Link>
        <Link href={"mailto:info@devxlab.org"}>Feedback</Link>
        <Link href={"/login"}>
          <b>Delete Account</b>
        </Link>
      </nav>
    </footer>
  );
};
export default Footer;
