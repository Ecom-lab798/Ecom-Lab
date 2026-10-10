import React from "react";
import { motion } from "framer-motion";
import { Check, Users, Rocket, Zap, ArrowRight } from "lucide-react";
import { packages } from "../data.js";
import { usePackage } from "../context/PackageContext.jsx";

const icons = { group: Users, turnkey: Rocket };

export default function Packages() {
  const { selectPackage } = usePackage();

  return (
    <section
      id="packages"
      className="relative overflow-hidden py-24 lg:py-32 border-t border-ink-700 bg-ink-950"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-signal/10 blur-[120px]"
      />

      <div className="relative max-w-content mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-signal/40 bg-signal-soft px-4 py-1.5 text-xs font-semibold tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            Идёт набор в группу
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl mt-6 leading-tight">
            Обучение Kaspi Магазину
          </h2>
          <p className="text-paper-dim mt-4 text-sm sm:text-base">
            Готовые решения для твоего успеха! Выбери формат: учись в группе или
            доверь запуск магазина нам.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 max-w-4xl mx-auto">
          {packages.map((p, i) => {
            const featured = p.id === "turnkey";
            const Icon = icons[p.id] || Zap;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`relative flex flex-col rounded-3xl border p-7 sm:p-9 transition-all hover:-translate-y-1 ${
                  featured
                    ? "border-signal bg-gradient-to-b from-signal-soft via-ink-800 to-ink-800 shadow-2xl shadow-signal/10"
                    : "border-ink-600 bg-ink-800 hover:border-ink-500 hover:shadow-xl hover:shadow-black/30"
                }`}
              >
                <span
                  className={`absolute -top-3 left-8 rounded-full px-3.5 py-1 text-[11px] font-semibold tracking-wide ${
                    featured ? "bg-signal" : "bg-ink-600"
                  }`}
                >
                  {featured ? "🔥 " : ""}
                  {p.badge}
                </span>

                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      featured ? "bg-signal" : "bg-ink-700 border border-ink-600"
                    }`}
                  >
                    <Icon size={22} />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-paper-faint">
                    {p.label}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl mt-6">{p.name}</h3>
                <p className="text-sm text-paper-dim mt-2">{p.tagline}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-mono text-4xl sm:text-5xl font-semibold">
                    {p.price.replace(" ₸", "")}
                  </span>
                  <span className="font-mono text-2xl text-paper-dim">₸</span>
                </div>

                <div className="my-6 h-px bg-ink-600" />

                <ul className="space-y-3.5 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm sm:text-[15px]">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          featured ? "bg-signal" : "bg-signal/20"
                        }`}
                      >
                        <Check size={12} strokeWidth={3} className={featured ? "" : "text-signal"} />
                      </span>
                      <span className="text-paper">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => selectPackage(p.id)}
                  className={`group mt-8 flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold transition-colors ${
                    featured
                      ? "bg-signal hover:bg-signal-dim"
                      : "border border-ink-500 hover:border-signal"
                  }`}
                >
                  {p.cta}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
