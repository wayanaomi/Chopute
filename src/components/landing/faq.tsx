"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "What is Chopute?",
    answer:
      "Chopute is a business lead generation tool that helps you find businesses by type and location. Instead of manually searching through business listings one by one, Chopute helps you discover relevant businesses and organize their information into a lead list.",
  },
  {
    question: "How does Chopute find businesses?",
    answer:
      "You simply enter the type of business you are looking for and the location you want to search. Chopute searches current business listings and brings the available business information into one place so you can spend less time searching and more time reaching out.",
  },
  {
    question: "How long does a search take?",
    answer:
      "Most searches are designed to return results within a short time. Search time can vary depending on the location, business category, and the amount of information being collected.",
  },
  {
    question: "How many businesses can I find?",
    answer:
      "Chopute can return a large number of relevant businesses from a single search. The exact number depends on how many matching businesses are available for the business type and location you search.",
  },
  {
    question: "Does Chopute provide email addresses?",
    answer:
      "When an email address is available from the business's online presence, Chopute can include it in the lead information. Not every business publishes an email address, so email availability can vary from one result to another.",
  },
  {
    question: "Can I export my leads?",
    answer:
      "Yes. Your search results can be exported so you can use your lead list outside Chopute for your sales, outreach, marketing, or business development workflow.",
  },
  {
    question: "Which countries are covered?",
    answer:
      "Chopute supports searches across 195 countries, allowing you to discover businesses across different cities and locations around the world.",
  },
  {
    question: "Can I try Chopute before paying?",
    answer:
      "Yes. You get 2 free searches before payment. No card is required to try Chopute.",
  },
  {
    question: "What happens after I use my free searches?",
    answer:
      "Once your free searches are used, you can upgrade to unlimited access with the one-time payment option. You can then continue searching without a monthly subscription.",
  },
  {
    question: "Will I be charged again after I pay the $25?",
    answer:
      "No. Chopute is a one-time payment. There are no monthly subscriptions, recurring charges, or renewal fees after your payment.",
  },
  {
    question: "How do I know the data is accurate?",
    answer:
      "Chopute searches current business information when you run a search. Results are pulled from active business listings and available online business information, helping you work with data that is relevant at the time of your search.",
  },
  {
    question: "What if my search comes back empty?",
    answer:
      "If your search does not return useful results, try adjusting the business type or location and searching again. Results depend on the businesses available for the specific search you make.",
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
            Everything you need to know
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground-muted">
            Still wondering if Chopute is right for you? Here are the answers
            to the questions people ask before getting started.
          </p>

          <div className="mt-12">
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
                    className="flex w-full items-center justify-between gap-6 py-6 text-left transition-opacity hover:opacity-80"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-base font-semibold leading-6 text-foreground sm:text-lg">
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
                    <div
                      id={`faq-answer-${index}`}
                      className="pb-6 pr-10"
                    >
                      <p className="max-w-2xl text-sm leading-7 text-foreground-muted sm:text-base">
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