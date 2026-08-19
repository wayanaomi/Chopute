"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "Will I be charged again after I pay the $25?",
    answer:
      "No. Chopute is a one-time payment. There are no monthly subscriptions, recurring charges, or renewal fees after your payment.",
  },
  {
    question:
      "How do I know the data is accurate and not just outdated or fake listings?",
    answer:
      "Chopute searches for current business information when you run a search. Results are pulled from active business listings so you can work with contact information that is relevant at the time of your search.",
  },
  {
    question: "Which countries are covered?",
    answer:
      "Chopute covers 195 countries and allows you to search for businesses across cities and locations worldwide.",
  },
  {
    question: "What if my first search comes back empty?",
    answer:
      "If your first search does not return useful results, contact the Chopute team and we will help you resolve the issue. Your first searches are also available before you decide to purchase.",
  },
  {
    question: "Can I try it before paying?",
    answer:
      "Yes. Chopute gives you 2 free searches before payment. No card is required to try it.",
  },
  {
    question: "How do I pay?",
    answer:
      "You can pay securely through the available checkout option. Once payment is confirmed, your unlimited access is activated.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-brand">
            <span className="h-px w-4 bg-brand" />
            Questions
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Before you buy
          </h2>

          <div className="mt-16">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="border-b border-border"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-foreground">
                      {faq.question}
                    </span>

                    <span className="flex shrink-0 items-center justify-center text-foreground-muted">
                      {isOpen ? (
                        <Minus className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-6 pr-10">
                      <p className="max-w-2xl text-sm leading-6 text-foreground-muted">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}