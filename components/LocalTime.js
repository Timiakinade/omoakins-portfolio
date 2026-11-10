"use client";

import { useEffect, useState } from "react";

// Aliyu's live local clock.
export default function LocalTime({ timezone = "Africa/Lagos" }) {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: timezone });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, [timezone]);
  return <span suppressHydrationWarning>{t || " "}</span>;
}
