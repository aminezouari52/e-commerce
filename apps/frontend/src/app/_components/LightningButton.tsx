// components/LightningButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useState } from "react";

export default function LightningButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Button className="relative z-10 px-6 py-3 font-bold overflow-hidden">
        <span className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Strike Now
        </span>

        {/* Lightning Bolt Animation */}
        {hovered && (
          <motion.span
            initial={{ x: "-150%", rotate: 25, opacity: 0 }}
            animate={{ x: "150%", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute left-0 top-1/2 z-0 -translate-y-1/2 text-yellow-400"
          >
            <Zap className="h-6 w-6 drop-shadow-[0_0_6px_#facc15]" />
          </motion.span>
        )}
      </Button>
    </div>
  );
}
