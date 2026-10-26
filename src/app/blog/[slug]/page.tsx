import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CorporateSiteShell } from "@/components/corporate/corporate-site-shell";
import { CorporatePageHero } from "@/components/corporate/corporate-page-content";
import { blogPosts } from "../posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  return post
    ? { title: `${post.title} | Chopute Labs`, description: post.excerpt }
    : { title: "Article not found | Chopute Labs" };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) notFound();

  return (
    <CorporateSiteShell>
      <CorporatePageHero
        eyebrow={`${post.category} · ${post.readingTime}`}
        title={post.title}
        description={post.excerpt}
      />
      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="space-y-6 text-lg leading-9 text-[#4f4f4f]">
          {post.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-14 border-t border-[#eeeeee] pt-7">
          <a href="/blog" className="font-semibold text-[#ff6b00]">← Back to all insights</a>
        </div>
      </article>
    </CorporateSiteShell>
  );
}
