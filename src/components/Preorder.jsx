import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PackageSearch, ArrowRight, Check } from "lucide-react";
import { usePackage } from "../context/PackageContext.jsx";
import PreorderModal from "./PreorderModal.jsx";

// Отдельная услуга: НЕ курс и НЕ консультация — Ecom Lab сам подбирает товар
// и выставляет карточку на Kaspi в формате предзаказа.
export const PREORDER = {
  name: "Предзаказ",
  subtitle: "Выставление товара на Kaspi",
  price: "От 500 ₸",
  footerPrice: "От 500 ₸ за карточку товара",
  shortDesc:
    "Выставим товар на Kaspi в формате предзаказа. Вам не придётся самостоятельно создавать карточку товара.",
  intro:
    "Если вы хотите продавать товар на Kaspi, но не хотите самостоятельно заниматься созданием карточки, мы можем сделать это за вас.",
  highlights: [
    "Подбор и оформление товара",
    "Готовая карточка на Kaspi",
    "Выставление в формате предзаказа",
  ],
  checklist: [
    "Подбор и получение информации о товаре",
    "Подготовка информации для карточки",
    "Создание карточки товара",
    "Заполнение основных характеристик",
    "Добавление названия и описания",
    "Подготовка карточки к выставлению на Kaspi",
    "Выставление товара в формате предзаказа",
  ],
  cta: "Заказать предзаказ",
};

export default function Preorder() {
  const { selectCustomRequest } = usePackage();
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const order = () => {
    selectCustomRequest({ name: PREORDER.name, price: PREORDER.price });
    closeModal();
  };

  return (
    <section id="preorder" className="py-20 lg:py-24 border-t border-ink-700">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <div className="max-w-lg">
          <span className="inline-flex items-center rounded-full bg-signal/10 text-signal text-xs font-semibold px-3 py-1">
            Без самостоятельного создания карточки
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl mt-4">Предзаказ</h2>
          <p className="text-paper-dim mt-3 text-sm sm:text-base">
            Нужно выставить товар на Kaspi, но не хочешь сам заниматься карточкой? Мы сделаем
            это за тебя.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          role="button"
          tabIndex={0}
          onClick={openModal}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") openModal();
          }}
          className="relative overflow-hidden rounded-2xl border border-signal/30 bg-gradient-to-br from-ink-800 to-ink-900 p-6 sm:p-8 mt-10 cursor-pointer transition-all hover:-translate-y-1 hover:border-signal/60 hover:shadow-xl hover:shadow-black/30"
        >
          <div
            aria-hidden
            className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #E23B34, transparent 70%)" }}
          />

          <div className="relative grid sm:grid-cols-[1fr_auto] gap-6 sm:gap-8 sm:items-center">
            <div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-signal/10 border border-signal/30 flex items-center justify-center shrink-0">
                  <PackageSearch size={19} className="text-signal" />
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl">{PREORDER.name}</h3>
              </div>
              <p className="text-paper-dim mt-3 text-sm leading-relaxed max-w-md">
                {PREORDER.shortDesc}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {PREORDER.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-1.5 text-xs text-paper-dim">
                    <Check size={13} className="text-signal shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:gap-4 sm:border-l sm:border-ink-600 sm:pl-8">
              <span className="font-mono text-xl font-semibold whitespace-nowrap">
                {PREORDER.price}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                }}
                className="inline-flex items-center gap-2 h-11 rounded-full bg-signal px-5 text-sm font-semibold hover:bg-signal-dim transition-colors whitespace-nowrap"
              >
                Заказать
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <PreorderModal preorder={PREORDER} onClose={closeModal} onSelect={order} />
        )}
      </AnimatePresence>
    </section>
  );
}
