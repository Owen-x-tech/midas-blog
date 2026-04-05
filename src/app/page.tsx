import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function BlogHome() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="mb-12">
        <h1 className="font-[family-name:var(--font-instrument)] text-4xl text-white mb-3">
          The Science of Focus
        </h1>
        <p className="text-neutral-400 text-lg max-w-xl">
          Research-backed insights on attention, neuroscience, and building a
          sharper mind.
        </p>
      </section>

      {posts.length === 0 ? (
        <p className="text-neutral-500">Articles coming soon.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/${post.slug}`} className="group">
              <article className="rounded-xl border border-card-border bg-gradient-to-b from-card-bg to-[#171717] p-6 transition-all hover:border-gold-dim/40">
                <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
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

                <h2 className="font-[family-name:var(--font-instrument)] text-2xl text-white mb-2 group-hover:text-gold transition-colors">
                  {post.title}
                </h2>

                <p className="text-neutral-400 leading-relaxed mb-4">
                  {post.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gold-dim/10 px-3 py-1 text-xs text-gold-dim"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
