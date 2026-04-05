import { getPost, getAllSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <article>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gold-dim hover:text-gold transition-colors mb-8"
      >
        &larr; All articles
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-3 text-sm text-neutral-500 mb-4">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>-</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="font-[family-name:var(--font-instrument)] text-4xl text-white mb-4">
          {post.title}
        </h1>

        <p className="text-lg text-neutral-400">{post.description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gold-dim/10 px-3 py-1 text-xs text-gold-dim"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <footer className="mt-16 pt-8 border-t border-card-border">
        <div className="rounded-xl border border-card-border bg-gradient-to-b from-card-bg to-[#171717] p-8 text-center">
          <h3 className="font-[family-name:var(--font-instrument)] text-2xl text-white mb-2">
            Train your focus
          </h3>
          <p className="text-neutral-400 mb-5 max-w-md mx-auto">
            Midas uses visual neuroscience techniques to sharpen your attention
            in minutes a day.
          </p>
          <a
            href="https://midasfocus.com"
            className="inline-block rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Get Midas Focus
          </a>
        </div>
      </footer>
    </article>
  );
}
