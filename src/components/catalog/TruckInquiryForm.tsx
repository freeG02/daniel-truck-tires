"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useLang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { buildTruckInquiryWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { CloseIcon } from "@/components/CartIcons";

// The five most common heavy-truck brands in Canada. Proper nouns, not translated.
const BRANDS = ["Freightliner", "International", "Kenworth", "Peterbilt", "Volvo"];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 16 }, (_, i) => String(CURRENT_YEAR - i));

const fieldClass =
  "mt-1 w-full border border-black/15 bg-white px-3 py-2 text-sm text-brand-navy-dark outline-none focus:border-brand-navy-dark";
const labelClass =
  "block text-xs font-bold uppercase tracking-wide text-brand-navy-dark/70";

export function TruckInquiryForm({
  cabType,
  onClose,
}: {
  /** Pre-selected cab type from the truck that was clicked. */
  cabType: "Con camarote" | "Sin camarote";
  onClose: () => void;
}) {
  const { t } = useLang();
  const { user } = useAuth();
  const tf = t.truckForm;

  const [brand, setBrand] = useState("");
  const [brandOther, setBrandOther] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [mileage, setMileage] = useState("");
  const [transmission, setTransmission] = useState("");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const cabLabel = cabType === "Con camarote" ? tf.cabWith : tf.cabWithout;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const chosenBrand =
      brand === "__other__" ? brandOther.trim() : brand;
    const link = buildTruckInquiryWhatsAppLink({
      // Identity comes from the signed-in account.
      name: user?.name ?? "",
      phone: user?.phone,
      brand: chosenBrand,
      model: model.trim(),
      year,
      condition,
      // Cab type is stored in Spanish for the customer-service team.
      cab: cabType,
      color: color.trim(),
      mileage: mileage.trim(),
      transmission,
      budget: budget.trim(),
      notes: notes.trim(),
    });
    // TODO (Supabase): also persist this payload as an invoice/lead in the
    // business database before/after opening WhatsApp.
    window.open(link, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={tf.title}
        className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden bg-white shadow-2xl sm:max-h-[88vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-brand-navy-dark px-5 py-4 text-brand-cream">
          <h2 className="font-display text-lg font-bold uppercase tracking-wide">
            {tf.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={tf.cancel}
            className="text-brand-cream/70 transition-colors hover:text-brand-cream"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={submit} className="flex-1 overflow-y-auto p-5">
          <p className="mb-4 text-sm leading-relaxed text-black/60">{tf.intro}</p>

          {user && (
            <p className="mb-4 border border-black/10 bg-brand-cream/50 px-3 py-2 text-xs text-black/60">
              {t.auth.signedInAs}: <span className="font-semibold text-brand-navy-dark">{user.name}</span>
              {user.phone ? ` · ${user.phone}` : ""}
            </p>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Brand */}
            <div>
              <label className={labelClass} htmlFor="tf-brand">
                {tf.brand}
              </label>
              <select
                id="tf-brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className={fieldClass}
              >
                <option value="">{tf.select}</option>
                {BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
                <option value="__other__">{tf.brandOther}</option>
              </select>
              {brand === "__other__" && (
                <input
                  value={brandOther}
                  onChange={(e) => setBrandOther(e.target.value)}
                  className={`${fieldClass} mt-2`}
                  placeholder={tf.brandOther}
                />
              )}
            </div>

            {/* Model */}
            <div>
              <label className={labelClass} htmlFor="tf-model">
                {tf.model}
              </label>
              <input
                id="tf-model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className={fieldClass}
              />
            </div>

            {/* Year */}
            <div>
              <label className={labelClass} htmlFor="tf-year">
                {tf.year}
              </label>
              <select
                id="tf-year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={fieldClass}
              >
                <option value="">{tf.any}</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className={labelClass} htmlFor="tf-condition">
                {tf.condition}
              </label>
              <select
                id="tf-condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className={fieldClass}
              >
                <option value="">{tf.any}</option>
                <option value={tf.conditionUsed}>{tf.conditionUsed}</option>
                <option value={tf.conditionLikeNew}>{tf.conditionLikeNew}</option>
                <option value={tf.conditionNew}>{tf.conditionNew}</option>
              </select>
            </div>

            {/* Cab (pre-filled, read-only) */}
            <div>
              <label className={labelClass} htmlFor="tf-cab">
                {tf.cab}
              </label>
              <input
                id="tf-cab"
                value={cabLabel}
                readOnly
                className={`${fieldClass} bg-brand-cream/60`}
              />
            </div>

            {/* Transmission */}
            <div>
              <label className={labelClass} htmlFor="tf-trans">
                {tf.transmission}
              </label>
              <select
                id="tf-trans"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className={fieldClass}
              >
                <option value="">{tf.any}</option>
                <option value={tf.transAuto}>{tf.transAuto}</option>
                <option value={tf.transManual}>{tf.transManual}</option>
              </select>
            </div>

            {/* Color */}
            <div>
              <label className={labelClass} htmlFor="tf-color">
                {tf.color}{" "}
                <span className="font-normal lowercase text-black/40">
                  ({tf.optional})
                </span>
              </label>
              <input
                id="tf-color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className={fieldClass}
              />
            </div>

            {/* Mileage */}
            <div>
              <label className={labelClass} htmlFor="tf-mileage">
                {tf.mileage}{" "}
                <span className="font-normal lowercase text-black/40">
                  ({tf.optional})
                </span>
              </label>
              <input
                id="tf-mileage"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                className={fieldClass}
                inputMode="numeric"
              />
            </div>

            {/* Budget */}
            <div>
              <label className={labelClass} htmlFor="tf-budget">
                {tf.budget}{" "}
                <span className="font-normal lowercase text-black/40">
                  ({tf.optional})
                </span>
              </label>
              <input
                id="tf-budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={fieldClass}
                inputMode="numeric"
              />
            </div>

            {/* Notes */}
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="tf-notes">
                {tf.notes}{" "}
                <span className="font-normal lowercase text-black/40">
                  ({tf.optional})
                </span>
              </label>
              <textarea
                id="tf-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className={`${fieldClass} resize-none`}
              />
            </div>
          </div>
        </form>

        {/* Footer actions */}
        <div className="border-t border-black/10 p-4">
          <button
            type="button"
            onClick={submit}
            className="btn-sweep relative flex h-14 w-full items-center justify-center gap-2 bg-brand-yellow text-sm font-semibold text-brand-navy-dark"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span>{tf.submit}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
