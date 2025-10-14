"use client";
import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownCards: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const targetDate = new Date("2025-10-20T23:59:59").getTime();

    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 100);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="min-w-lg bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const cards = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full md:w-auto flex items-center justify-center  p-4">
      <div className="max-w-5xl w-full">
        <div className="grid grid-cols-4 gap-2 md:gap-6">
          {cards.map((card, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 backdrop-blur-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 rounded-xl md:rounded-2xl" />
              <div className="relative backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-xl md:rounded-2xl p-3 md:p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:bg-slate-800/60 hover:border-slate-600/70">
                <div className="text-center">
                  <div className="text-xl md:text-4xl font-bold text-slate-200 mb-1 md:mb-4">
                    {card.value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-slate-400 text-xs md:text-lg font-semibold uppercase tracking-wider">
                    {card.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountdownCards;
