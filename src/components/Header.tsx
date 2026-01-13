import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineShoppingBag } from "react-icons/md";

export default function Header() {
  return (
    <header className="w-full border-b bg-white drop-shadow-sm sticky top-0 z-999">
      <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between gap-6">
        <div className="shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/Group.png" alt="Super Base Logo" width={139} height={45} />
          </Link>
        </div>

        <div className="flex gap-10">
          <nav className="hidden md:flex items-center gap-10 text-[15px] text-[#070012] font-semibold uppercase tracking-[0.5px]">
            <Link href="#" className="cursor-pointer">HOME</Link>
            <Link href="#" className="cursor-pointer">Programs & Services</Link>
            <Link href="#" className="cursor-pointer">About</Link>
            <Link href="#" className="cursor-pointer">Contact</Link>
          </nav>

          <div className="flex items-center gap-6 shrink-0">
            <MdOutlineShoppingBag size={24}/>
            <Button 
              className="
                flex 
                px-6 
                py-3 
                uppercase 
                rounded-md 
                w-27 
                h-12
                bg-linear-to-r from-[#5D06E9] to-[#0B23FA]
                text-white
                font-semibold
                text-[15px]
                cursor-pointer
              "
            >
              Sign In
            </Button>          
          </div>
        </div>
      </div>
    </header>
  );
}
