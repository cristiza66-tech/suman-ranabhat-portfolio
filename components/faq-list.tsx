import { HelpCircle } from "lucide-react";
import type { FAQ } from "@/data/profile";

export function FaqList({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-3.5">
      {faqs.map((faq) => (
        <div
          key={faq.question}
          className="rounded-lg border p-5"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <h3
            className="text-sm font-bold flex items-start gap-2"
            style={{ color: "var(--color-fg)" }}
          >
            <HelpCircle size={16} className="shrink-0 mt-0.5" style={{ color: "var(--color-gold)" }} />
            <span>{faq.question}</span>
          </h3>
          <p
            className="text-sm mt-2 pl-6 leading-relaxed"
            style={{ color: "var(--color-fg-secondary)" }}
          >
            {faq.answer}
          </p>
        </div>
      ))}
    </div>
  );
}
