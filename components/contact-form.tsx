"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2, MessageSquare, UserCheck, Briefcase } from "lucide-react";
import { profile } from "@/data/profile";

interface ContactFormProps {
  defaultTab?: "tuition" | "services";
}

export function ContactForm({ defaultTab = "tuition" }: ContactFormProps) {
  const [tab, setTab] = useState<"tuition" | "services">(defaultTab);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subjectOrService: "",
    educationLevel: "Class 11 / 12",
    businessType: "Private Company / SME",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validate inputs
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedMessage) {
      setValidationError("Please complete all required fields.");
      return;
    }

    if (trimmedName.length > 100 || trimmedEmail.length > 120 || trimmedPhone.length > 25 || trimmedMessage.length > 2000) {
      setValidationError("Input exceeds maximum permitted length.");
      return;
    }

    setIsSubmitting(true);

    // Prepare direct transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 400);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setValidationError(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subjectOrService: "",
      educationLevel: "Class 11 / 12",
      businessType: "Private Company / SME",
      message: "",
    });
  };

  const sanitizedNumber = (profile.whatsappNumber || "9779805864812").replace(/[^0-9]/g, "");
  const sanitizedName = formData.name.trim().slice(0, 100);
  const sanitizedPhone = formData.phone.trim().slice(0, 25);
  const sanitizedEmail = formData.email.trim().slice(0, 120);
  const sanitizedSubject = (formData.subjectOrService.trim() || "General Consultation").slice(0, 150);
  const sanitizedMessage = formData.message.trim().slice(0, 2000);

  const formattedMessage = encodeURIComponent(
    `*Inquiry for Suman Ranabhat (${tab === "tuition" ? "Tuition & Coaching" : "Accounting & Advisory Services"})*\n` +
    `• Name: ${sanitizedName}\n` +
    `• Phone: ${sanitizedPhone}\n` +
    `• Email: ${sanitizedEmail}\n` +
    `• ${tab === "tuition" ? "Academic Level" : "Entity Type"}: ${tab === "tuition" ? formData.educationLevel : formData.businessType}\n` +
    `• ${tab === "tuition" ? "Subject Focus" : "Service Focus"}: ${sanitizedSubject}\n` +
    `• Details: ${sanitizedMessage}`
  );

  return (
    <div className="bg-white rounded-2xl border border-[#E6E2D8] p-6 sm:p-10 shadow-sm">
      {/* Inquiry Type Tabs */}
      <div className="flex bg-[#F3F1EA] p-1.5 rounded-xl mb-8 border border-[#E6E2D8]">
        <button
          type="button"
          onClick={() => {
            setTab("tuition");
            setIsSuccess(false);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            tab === "tuition"
              ? "bg-[#0E2439] text-white shadow-sm"
              : "text-[#475467] hover:text-[#12161A] hover:bg-white/50"
          }`}
        >
          <UserCheck size={16} />
          <span>Student / Tuition Inquiry</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setTab("services");
            setIsSuccess(false);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            tab === "services"
              ? "bg-[#0E2439] text-white shadow-sm"
              : "text-[#475467] hover:text-[#12161A] hover:bg-white/50"
          }`}
        >
          <Briefcase size={16} />
          <span>Accounting &amp; Advisory Inquiry</span>
        </button>
      </div>

      {isSuccess ? (
        <div className="py-10 px-4 text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-[#EFE4CA] text-[#0E2439] flex items-center justify-center mb-4">
            <CheckCircle2 size={30} className="text-[#C29B38]" />
          </div>
          <h3 className="text-2xl font-bold text-[#12161A]">
            Inquiry Details Prepared
          </h3>
          <p className="text-[#475467] max-w-md mt-2 leading-relaxed text-sm">
            Thank you, <strong className="text-[#12161A]">{formData.name}</strong>. Your inquiry for{" "}
            <span className="font-semibold text-[#0E2439]">
              {tab === "tuition" ? "Academic Tuition & Coaching" : "Accounting & Advisory Services"}
            </span>{" "}
            is ready. Send directly via WhatsApp or contact by phone.
          </p>

          <div className="mt-6 p-4 rounded-xl bg-[#FAF9F5] border border-[#E6E2D8] text-left w-full max-w-md text-xs text-[#475467]">
            <p className="font-bold text-[#12161A] mb-1">Summary of Details:</p>
            <p>• <strong>Scope:</strong> {tab === "tuition" ? `Tuition (${formData.educationLevel})` : `Accounting Advisory (${formData.businessType})`}</p>
            <p>• <strong>Subject/Service:</strong> {formData.subjectOrService || "General Consultation"}</p>
            <p>• <strong>Contact:</strong> {formData.phone} | {formData.email}</p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <a
              href={`https://wa.me/${sanitizedNumber}?text=${formattedMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 text-sm !py-3 !px-5 inline-flex items-center justify-center gap-2"
            >
              <MessageSquare size={16} />
              <span>Send via WhatsApp</span>
            </a>
            <button
              onClick={handleReset}
              className="btn-secondary text-sm !py-3 !px-5"
            >
              Edit Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {validationError && (
            <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {validationError}
            </div>
          )}

          <div className="border-b border-[#E6E2D8] pb-4 mb-1">
            <h3 className="text-lg font-bold text-[#12161A]">
              {tab === "tuition"
                ? "Academic Cohort & Tuition Registration"
                : "Professional Financial Advisory Inquiry"}
            </h3>
            <p className="text-xs text-[#667085] mt-1">
              {tab === "tuition"
                ? "Please share your current academic level and subjects requiring focused coaching."
                : "Please outline your business scope or specific compliance requirements."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="inquiry-name"
                className="block text-xs font-bold uppercase tracking-wider text-[#475467] mb-2"
              >
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="inquiry-name"
                type="text"
                required
                maxLength={100}
                autoComplete="name"
                placeholder="e.g. Aayush Sharma"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-[#DEDAD0] bg-[#FAF9F5] text-[#12161A] text-sm focus:bg-white focus:border-[#0E2439] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="inquiry-email"
                className="block text-xs font-bold uppercase tracking-wider text-[#475467] mb-2"
              >
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="inquiry-email"
                type="email"
                required
                maxLength={120}
                autoComplete="email"
                placeholder="e.g. aayush.sharma@gmail.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-[#DEDAD0] bg-[#FAF9F5] text-[#12161A] text-sm focus:bg-white focus:border-[#0E2439] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="inquiry-phone"
                className="block text-xs font-bold uppercase tracking-wider text-[#475467] mb-2"
              >
                Phone / WhatsApp Number <span className="text-rose-500">*</span>
              </label>
              <input
                id="inquiry-phone"
                type="tel"
                required
                maxLength={25}
                autoComplete="tel"
                placeholder="e.g. +977 98XXXXXXXX"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-[#DEDAD0] bg-[#FAF9F5] text-[#12161A] text-sm focus:bg-white focus:border-[#0E2439] focus:outline-none transition-colors"
              />
            </div>

            {tab === "tuition" ? (
              <div>
                <label
                  htmlFor="inquiry-level"
                  className="block text-xs font-bold uppercase tracking-wider text-[#475467] mb-2"
                >
                  Current Academic Level
                </label>
                <select
                  id="inquiry-level"
                  value={formData.educationLevel}
                  onChange={(e) =>
                    setFormData({ ...formData, educationLevel: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-[#DEDAD0] bg-[#FAF9F5] text-[#12161A] text-sm focus:bg-white focus:border-[#0E2439] focus:outline-none transition-colors"
                >
                  <option value="Class 11 / 12">Class 11 / 12 (NEB Commerce)</option>
                  <option value="BBS / BBA / B.Com">BBS / BBA / B.Com (Bachelor)</option>
                  <option value="Individual Tuition & Doubt Solving">Individual Tuition / Doubt Solving</option>
                </select>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="inquiry-business"
                  className="block text-xs font-bold uppercase tracking-wider text-[#475467] mb-2"
                >
                  Entity / Business Type
                </label>
                <select
                  id="inquiry-business"
                  value={formData.businessType}
                  onChange={(e) =>
                    setFormData({ ...formData, businessType: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-[#DEDAD0] bg-[#FAF9F5] text-[#12161A] text-sm focus:bg-white focus:border-[#0E2439] focus:outline-none transition-colors"
                >
                  <option value="Private Limited Company">Private Limited Company</option>
                  <option value="Proprietorship / Partnership">Proprietorship / Partnership</option>
                  <option value="Startup / Tech Venture">Startup / New Business Setup</option>
                  <option value="Individual / Professional Tax">Individual / Freelancer Tax Filing</option>
                  <option value="NGO / Non-Profit">Institutional / Non-Profit</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="inquiry-service"
              className="block text-xs font-bold uppercase tracking-wider text-[#475467] mb-2"
            >
              {tab === "tuition" ? "Subject / Focus Area" : "Primary Service Required"}
            </label>
            <input
              id="inquiry-service"
              type="text"
              maxLength={150}
              placeholder={
                tab === "tuition"
                  ? "e.g. Accountancy, Costing, or Taxation"
                  : "e.g. Annual Tax Return, VAT Compliance, or Internal Audit"
              }
              value={formData.subjectOrService}
              onChange={(e) =>
                setFormData({ ...formData, subjectOrService: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-[#DEDAD0] bg-[#FAF9F5] text-[#12161A] text-sm focus:bg-white focus:border-[#0E2439] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="inquiry-message"
              className="block text-xs font-bold uppercase tracking-wider text-[#475467] mb-2"
            >
              Inquiry Details &amp; Objectives <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="inquiry-message"
              required
              rows={4}
              maxLength={2000}
              placeholder={
                tab === "tuition"
                  ? "Share your target exam date, current challenges, and whether you prefer in-person or online classes..."
                  : "Briefly describe your current business accounting structure, specific deadlines, and key requirements..."
              }
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-[#DEDAD0] bg-[#FAF9F5] text-[#12161A] text-sm focus:bg-white focus:border-[#0E2439] focus:outline-none transition-colors leading-relaxed resize-y"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-xs text-[#667085]">
              🔒 Direct inquiry via verified communication channels.
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full sm:w-auto text-sm !py-3 !px-8 cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? (
                <span>Preparing...</span>
              ) : (
                <>
                  <span>Prepare &amp; Send Inquiry</span>
                  <Send size={15} />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
