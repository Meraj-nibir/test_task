/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import {
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const years = Array.from({ length: 16 }, (_, i) => 2010 + i); // 2010–2025

interface DatePickerProps {
  onConfirm?: (date: { day: number; month: string; year: number }) => void;
  onCancel?: () => void;
  initialDate?: { day: number; month: string; year: number };
}

export default function DatePicker({
  onConfirm,
  onCancel,
  initialDate = { day: 1, month: "January", year: 2025 }
}: DatePickerProps) {
  const [selectedDay, setSelectedDay] = useState(initialDate.day);
  const [selectedMonth, setSelectedMonth] = useState(initialDate.month);
  const [selectedYear, setSelectedYear] = useState(initialDate.year);

  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  const dayRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  // Calculate days in current month
  useEffect(() => {
    const monthIndex = months.indexOf(selectedMonth);
    if (monthIndex === -1) return;

    const date = new Date(selectedYear, monthIndex + 1, 0);
    const days = date.getDate();

    setDaysInMonth(Array.from({ length: days }, (_, i) => i + 1));

    // Prevent selected day from being invalid
    if (selectedDay > days) {
      setSelectedDay(days);
    }
  }, [selectedMonth, selectedYear]);

  // Scroll selected item into view on mount & when value changes
  useEffect(() => {
    const scrollToSelected = (
      container: HTMLDivElement | null,
      value: number | string,
      items: (number | string)[]
    ) => {
      if (!container) return;
      const index = items.indexOf(value);
      if (index === -1) return;

      const itemHeight = 48; // approx py-3 + text size
      const scrollPos = index * itemHeight - (container.clientHeight / 2 - itemHeight / 2) + 24;

      container.scrollTo({
        top: scrollPos,
        behavior: "instant" // smooth on change can be annoying
      });
    };

    scrollToSelected(dayRef.current, selectedDay, daysInMonth);
    scrollToSelected(monthRef.current, selectedMonth, months);
    scrollToSelected(yearRef.current, selectedYear, years);
  }, [selectedDay, selectedMonth, selectedYear, daysInMonth]);

  const handleConfirm = () => {
    onConfirm?.({ day: selectedDay, month: selectedMonth, year: selectedYear });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <DialogTitle className="px-6 pt-8 pb-4 text-center">
       Select start date
      </DialogTitle>

      <DialogDescription className="sr-only">
        Scroll or tap to choose day, month and year
      </DialogDescription>

      <div className="px-6 pb-8">
        <div className="flex justify-center gap-3 sm:gap-6 py-6 bg-gray-50/70 rounded-2xl backdrop-blur-sm">
          {/* DAY */}
          <div className="relative h-64 w-20 overflow-hidden rounded-xl">
            <div
              ref={dayRef}
              className="absolute inset-0 overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar"
              style={{ scrollSnapType: "y mandatory" }}
            >
              <div className="h-24" /> {/* top padding */}
              {daysInMonth.map((day) => (
                <div
                  key={day}
                  className="h-12 flex items-center justify-center snap-center"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`text-xl font-medium transition-all duration-200 w-16 text-center
                      ${day === selectedDay
                        ? "text-indigo-600 font-bold scale-125"
                        : "text-gray-500/80 hover:text-gray-700"}`}
                  >
                    {day}
                  </button>
                </div>
              ))}
              <div className="h-24" /> {/* bottom padding */}
            </div>

            {/* Fade & selection highlight */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-transparent to-white" />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 border-y border-indigo-300/40 bg-indigo-50/30 rounded-lg" />
          </div>

          {/* MONTH */}
          <div className="relative h-64 w-40 overflow-hidden rounded-xl">
            <div
              ref={monthRef}
              className="absolute inset-0 overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar"
            >
              <div className="h-24" />
              {months.map((month) => (
                <div
                  key={month}
                  className="h-12 flex items-center justify-center snap-center"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedMonth(month)}
                    className={`text-xl font-medium transition-all duration-200 w-full text-center
                      ${month === selectedMonth
                        ? "text-indigo-600 font-bold scale-110"
                        : "text-gray-500/80 hover:text-gray-700"}`}
                  >
                    {month}
                  </button>
                </div>
              ))}
              <div className="h-24" />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-transparent to-white" />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 border-y border-indigo-300/40 bg-indigo-50/30 rounded-lg" />
          </div>

          {/* YEAR */}
          <div className="relative h-64 w-28 overflow-hidden rounded-xl">
            <div
              ref={yearRef}
              className="absolute inset-0 overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar"
            >
              <div className="h-24" />
              {years.map((year) => (
                <div
                  key={year}
                  className="h-12 flex items-center justify-center snap-center"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedYear(year)}
                    className={`text-xl font-medium transition-all duration-200 w-full text-center
                      ${year === selectedYear
                        ? "text-indigo-600 font-bold scale-125"
                        : "text-gray-500/80 hover:text-gray-700"}`}
                  >
                    {year}
                  </button>
                </div>
              ))}
              <div className="h-24" />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-transparent to-white" />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 border-y border-indigo-300/40 bg-indigo-50/30 rounded-lg" />
          </div>
        </div>

        {/* Preview */}
        <div className="mt-6 text-center text-sm text-gray-600 px-2">
         <strong>NB:</strong> You&apos;ve chosen a 4-week schedule starting on{" "}
          <strong className="text-indigo-700">
            {selectedDay} {selectedMonth} {selectedYear}
          </strong>
          , with sessions on Mon, Tue, Thu, Fri, and Sat.
          <p>We’ll automatically set your end date, and you can renew whenever you like—no worries</p>
        </div>
      </div>

      <div className="flex border-t border-gray-200">
        <button
          onClick={onCancel}
          className="flex-1 py-5 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="flex-1 py-5 bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}