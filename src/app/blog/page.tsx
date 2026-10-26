import type { Metadata } from "next";
import { CorporateSiteShell } from "@/components/corporate/corporate-site-shell";
import { CorporatePageHero } from "@/components/corporate/corporate-page-content";
import { blogPosts } from "./posts";

export const metadata: Metadata = {
  title: "Blog & Insights | Chopute Labs",
  description: "Practical perspectives on software development, AI, automation, marketing technology, and business systems.",
};

export default function BlogPage() {
  return (
    <CorporateSiteShell>
      <CorporatePageHero
        eyebrow="Insights & resources"
        title="Better technology decisions start with better questions."
        description="Practical perspectives on software development, AI, automation, marketing technology, and the decisions that help businesses get more value from technology."
      />
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="flex flex-col rounded-2xl border border-[#eeeeee] p-7 transition hover:border-[#ffd0b0]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#ff6b00]">{post.category}</p>
              <h2 className="mt-4 text-xl font-semibold leading-snug">{post.title}</h2>
              <p className="mt-3 flex-1 leading-7 text-[#5c5c5c]">{post.excerpt}</p>
              <p className="mt-5 text-xs text-[#777777]">{post.readingTime}</p>
              <a href={`/blog/${post.slug}`} className="mt-5 font-semibold text-[#ff6b00]">Read article ↗</a>
            </article>
          ))}
        </div>
        <p className="mt-10 text-sm leading-6 text-[#696969]">These are initial editorial drafts based on the topics in the Chopute Labs web copy. Review them before publishing as official company insights.</p>
      </section>
    </CorporateSiteShell>
  );
}
