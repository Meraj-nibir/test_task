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
            variant="outline"
            className="px-6 py-3 uppercase font-semibold text-[15px]"
          >
            Back
          </Button>
          <Button 
            className="px-6 py-3 uppercase rounded-md bg-[#852DFE] hover:bg-[#7a1ae6] text-white font-semibold text-[15px]"
          >
            Next
          </Button>
        </div>
      </div>
    </footer>
  );
}