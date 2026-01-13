// Option 1 – Recommended (clean & explicit)
import { Button } from "@/components/ui/button";

interface FooterProps {
  price: string;
  days: string;
}

export default function Footer({ price, days }: FooterProps) {
  return (
    <footer className="w-full bg-white border-t mt-6">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <p className="font-medium">
          {price} FOR {days.toUpperCase()}{" "}
          <span className="text-gray-500">(1 ACTIVITY PER DAY)</span>
        </p>

        <div className="flex gap-4">
          <Button 
            className="px-6 bg-transparent hover:bg-transparent hover:border-0 text-black py-3 uppercase font-semibold text-[15px] cursor-pointer"
          >
            Back
          </Button>
          <Button 
            className="px-6 py-3 uppercase rounded-md bg-[#8d3dfd] hover:bg-[#8d3dfd] hover:border-0 text-white font-semibold text-[15px] cursor-pointer"
          >
            Next
          </Button>
        </div>
      </div>
    </footer>
  );
}