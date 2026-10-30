"use client";

import { useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { MessageSquare, UserCheck, Briefcase } from "lucide-react";
import { profile } from "@/data/profile";

type InquiryTab = "tuition" | "services";

interface ContactFormProps {
  defaultTab?: InquiryTab;
}

const inputClass =
  "w-full px-4 py-3 rounded-lg border text-base focus:outline-none transition-colors bg-surface border-(--color-border-card) text-primary focus:border-navy";

const labelClass = "block text-sm font-semibold mb-2 text-secondary";

/**
 * Reads the inquiry type from `?type=tuition|services`.
 * Must be rendered inside <Suspense> so the page stays prerendered;
 * use <ContactForm> with a matching defaultTab as the fallback.
 */
export function ContactFormFromQuery({ defaultTab = "tuition" }: ContactFormProps) {
  const type = useSearchParams().get("type");
  const tab: InquiryTab = type === "services" || type === "tuition" ? type : defaultTab;
  return <ContactForm key={tab} defaultTab={tab} />;
}

export function ContactForm({ defaultTab = "tuition" }: ContactFormProps) {
  const [tab, setTab] = useState<InquiryTab>(defaultTab);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subjectOrService: "",
    educationLevel: "Class 11 / 12",
    businessType: "Private Limited Company",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const message = formData.message.trim();
    const subject = formData.subjectOrService.trim() || "General enquiry";

    if (!name || !phone || !message) {
      setValidationError("Please fill in your name, phone number and message.");
      return;
    }

    if (name.length > 100 || email.length > 120 || phone.length > 25 || message.length > 2000 || subject.length > 150) {
      setValidationError("One of the fields is too long. Please shorten it and try again.");
      return;
    }

    const isTuition = tab === "tuition";
    const lines = [
      `*Enquiry for ${profile.name} (${isTuition ? "Tuition" : "Accounting"})*`,
      `• Name: ${name}`,
      `• Phone: ${phone}`,
      ...(email ? [`• Email: ${email}`] : []),
      `• ${isTuition ? "Level" : "Business type"}: ${isTuition ? formData.educationLevel : formData.businessType}`,
      `• ${isTuition ? "Subject" : "Service"}: ${subject}`,
      `• Details: ${message}`,
    ];

    const url = `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const tabButtonClass = (active: boolean) =>
    `flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
      active
        ? "bg-navy text-(--color-accent-fg) shadow-sm"
        : "text-secondary hover:text-primary hover:bg-surface"
    }`;

  return (
    <div className="rounded-2xl border p-6 sm:p-10 shadow-sm bg-surface border-(--color-border)">
      {/* Inquiry Type Tabs */}
      <div
        className="flex p-1.5 rounded-xl mb-8 border bg-surface-alt border-(--color-border)"
        role="group"
        aria-label="Enquiry type"
      >
        <button
          type="button"
          onClick={() => setTab("tuition")}
          aria-pressed={tab === "tuition"}
          className={tabButtonClass(tab === "tuition")}
        >
          <UserCheck size={16} aria-hidden="true" />
          <span>Tuition</span>
        </button>
        <button
          type="button"
          onClick={() => setTab("services")}
          aria-pressed={tab === "services"}
          className={tabButtonClass(tab === "services")}
        >
          <Briefcase size={16} aria-hidden="true" />
          <span>Accounting</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {validationError && (
          <div
            role="alert"
            className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium"
          >
            {validationError}
          </div>
        )}

        <div className="border-b pb-4 mb-1 border-(--color-border)">
          <h2 className="text-lg font-bold text-primary">
            {tab === "tuition" ? "Tuition enquiry" : "Accounting enquiry"}
          </h2>
          <p className="text-sm mt-1 text-secondary">
            {tab === "tuition"
              ? "Share your level and the subjects you need help with."
              : "Tell me about your business and what you need help with."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="inquiry-name" className={labelClass}>
              Full name <span className="text-rose-700" aria-hidden="true">*</span>
            </label>
            <input
              id="inquiry-name"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              placeholder="e.g. Aayush Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="inquiry-phone" className={labelClass}>
              Phone / WhatsApp <span className="text-rose-700" aria-hidden="true">*</span>
            </label>
            <input
              id="inquiry-phone"
              type="tel"
              required
              maxLength={25}
              autoComplete="tel"
              placeholder="e.g. +977 98XXXXXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="inquiry-email" className={labelClass}>
              Email <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id="inquiry-email"
              type="email"
              maxLength={120}
              autoComplete="email"
              placeholder="e.g. aayush.sharma@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
            />
          </div>

          {tab === "tuition" ? (
            <div>
              <label htmlFor="inquiry-level" className={labelClass}>
                Current level
              </label>
              <select
                id="inquiry-level"
                value={formData.educationLevel}
                onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                className={inputClass}
              >
                <option value="Class 11 / 12">Class 11 / 12 (NEB Commerce)</option>
                <option value="BBS / BBA / B.Com">BBS / BBA / B.Com (Bachelor)</option>
                <option value="Individual Tuition & Doubt Solving">Individual tuition / doubt solving</option>
              </select>
            </div>
          ) : (
            <div>
              <label htmlFor="inquiry-business" className={labelClass}>
                Business type
              </label>
              <select
                id="inquiry-business"
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                className={inputClass}
              >
                <option value="Private Limited Company">Private Limited Company</option>
                <option value="Proprietorship / Partnership">Proprietorship / Partnership</option>
                <option value="Startup / New Business">Startup / New business setup</option>
                <option value="Individual / Freelancer">Individual / Freelancer tax filing</option>
                <option value="NGO / Non-Profit">Institution / Non-profit</option>
              </select>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="inquiry-service" className={labelClass}>
            {tab === "tuition" ? "Subject" : "Service needed"}
          </label>
          <input
            id="inquiry-service"
            type="text"
            maxLength={150}
            placeholder={
              tab === "tuition"
                ? "e.g. Accountancy, Costing, or Taxation"
                : "e.g. Annual tax return, VAT filing, or bookkeeping"
            }
            value={formData.subjectOrService}
            onChange={(e) => setFormData({ ...formData, subjectOrService: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="inquiry-message" className={labelClass}>
            Message <span className="text-rose-700" aria-hidden="true">*</span>
          </label>
          <textarea
            id="inquiry-message"
            required
            rows={4}
            maxLength={2000}
            placeholder={
              tab === "tuition"
                ? "Your exam date, the topics you find difficult, and whether you prefer in-person or online classes..."
                : "Your current accounting setup, any deadlines, and what you need..."
            }
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={`${inputClass} leading-relaxed resize-y`}
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-sm text-secondary">
            Opens WhatsApp with your message filled in. Nothing is sent until you press send there.
          </p>
          <button
            type="submit"
            className="btn-primary w-full sm:w-auto shrink-0 text-sm py-3! px-6!"
          >
            <MessageSquare size={16} aria-hidden="true" />
            <span>Continue on WhatsApp</span>
          </button>
        </div>
      </form>
    </div>
  );
}
