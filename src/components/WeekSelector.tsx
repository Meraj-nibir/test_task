"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FaChevronLeft, FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DatePicker from "./DatePicker";
import Footer from "./Footer";

const options = [
  { id: 1, label: "1 Weeks", weeks: 5, days: "05 days", price: "$35" },
  { id: 2, label: "2 Weeks", weeks: 10, days: "10 days", price: "$70" },
  { id: 3, label: "3 Weeks", weeks: 15, days: "15 days", price: "$105" },
  { id: 4, label: "4 Weeks", weeks: 20, days: "20 days", price: "$140" },
] as const;

export default function WeekSelector() {
  const [selected, setSelected] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.id === selected);

  const weeks = selectedOption?.weeks ?? 0;
  const label = selectedOption?.label ?? "";
  const totalDays = weeks * 5;
  const footerPrice = selectedOption?.price ?? "$0";
  const footerDays = selectedOption?.days ?? "0 days";

  const handleDateConfirm = (pickerData: { day: number; month: string; year: number }) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    const monthIndex = months.indexOf(pickerData.month);
    if (monthIndex === -1) return;

    const date = new Date(pickerData.year, monthIndex, pickerData.day);

    setStartDate(date);
    setIsDateDialogOpen(false);
  };

  return (
    <div className="min-h-[60vh] bg-linear-to-b from-[#5D06E905] to-[#1C1DF621]">
        <div
            className="
            bg-[url('/bg.png')] bg-size-[100%_100%] bg-center bg-no-repeat
            "
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-12 pb-20">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <button className="p-2 rounded-full transition-colors cursor-pointer">
                        <FaChevronLeft className="text-gray-600 text-xl" />
                    </button>
                    <span className="text-sm font-medium text-gray-600">
                        Regular aftercare program
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                    How many weeks would you like to continue?
                </h1>

                <p className="text-gray-600 mb-10 max-w-2xl">
                    Your sessions will be scheduled on:{" "}
                    <strong>Mon, Tue, Thu, Fri, Sat</strong>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {options.map((option) => {
                    const isSelected = selected === option.id;

                    return (
                        <Card
                            key={option.id}
                            onClick={() => setSelected(option.id)}
                            className={cn(
                                "relative cursor-pointer transition-all duration-200",
                                "border-2 bg-white hover:shadow-lg",
                                isSelected
                                ? "shadow-md scale-[1.02]"
                                : "border-transparent hover:border-gray-200"
                            )}
                        >
                            <CardContent className="p-6 flex flex-col items-center h-full relative">
                                <div
                                    className={cn(
                                        "absolute right-4 top-4 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all",
                                        isSelected
                                        ? "bg-[#852DFE] border-[#852DFE]"
                                        : "border-gray-300 bg-white"
                                    )}
                                >
                                    {isSelected && (
                                        <svg
                                            className="w-4 h-4 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                        />
                                        </svg>
                                    )}
                                </div>

                                <div className="mb-6 transform transition-transform">
                                    <Image
                                        src="/packImage.png"
                                        alt={option.label}
                                        width={110}
                                        height={110}
                                        className="object-contain"
                                        priority={option.id === 1}
                                    />
                                </div>

                                <div className="text-center space-y-2 mt-auto">
                                    <p className="text-xl font-bold text-gray-900">{option.label}</p>
                                    <p className="text-sm text-gray-500 font-medium">
                                        {option.price} for {option.days}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                    })}
                </div>

                {selected && (
                    <div className="mt-12 max-w-full mx-auto">
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                            <h2 className="text-2xl font-bold text-center mb-6">
                                {label}
                            </h2>

                            <p className="text-center text-xl text-gray-700 mb-10 font-medium">
                                ({weeks} Weeks × 5 Days) = <strong>{totalDays} Days</strong>
                            </p>

                            <div className="space-y-8">
                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => setIsDateDialogOpen(true)}
                                        className={cn(
                                            "inline-flex items-center justify-center gap-3",
                                            "px-8 py-4 bg-gray-50 border border-gray-300",
                                            "rounded-xl text-gray-700 hover:bg-gray-100",
                                            "transition w-full max-w-full text-lg font-semiBold cursor-pointer"
                                        )}
                                    >
                                        {startDate ? format(startDate, "MMMM d, yyyy") : "Select start date"}
                                        <FaCalendarAlt className="text-gray-500 text-xl ml-auto" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <Footer 
            price={footerPrice} 
            days={footerDays}
        />
        <Dialog open={isDateDialogOpen} onOpenChange={setIsDateDialogOpen}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden">
                <DatePicker
                    onConfirm={handleDateConfirm}
                    onCancel={() => setIsDateDialogOpen(false)}
                />
            </DialogContent>
        </Dialog>
    </div>
  );
}