import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-02-09T20:20:00");

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE - now;

  if (diff <= 0) {
    return null;
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [beat, setBeat] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
      setBeat((prev) => !prev); // 💗 beat co sekundę
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return (
      <p className="text-2xl font-bold text-pink-600">
        💗 Znowu razem 💗
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* SERDUSZKA */}
      <Hearts beat={beat} />

      {/* LICZNIK */}
      <div className="flex gap-6 text-center">
        <TimeBox label="dni" value={timeLeft.days} />
        <TimeBox label="godz" value={timeLeft.hours} />
        <TimeBox label="min" value={timeLeft.minutes} />
        <TimeBox label="sek" value={timeLeft.seconds} />
      </div>
    </div>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="bg-white rounded-xl px-4 py-3 shadow-md">
      <div className="text-3xl font-extrabold text-pink-600">
        {value}
      </div>
      <div className="text-sm text-gray-500 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}

function Hearts({ beat }) {
  return (
    <div className="flex gap-4">
      <Heart beat={beat} delay={0} />
      <Heart beat={beat} delay={100} />
      <Heart beat={beat} delay={200} />
    </div>
  );
}

function Heart({ beat, delay }) {
  return (
    <span
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        text-3xl
        transition-all
        duration-300
        ${beat ? "scale-125 opacity-100" : "scale-100 opacity-80"}
      `}
    >
      💗
    </span>
  );
}
