import type { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <article className="container mx-auto max-w-3xl px-6 py-24 md:py-32">
      <div
        className="
          prose prose-neutral max-w-none
          [&_h1]:text-4xl md:[&_h1]:text-5xl [&_h1]:font-semibold [&_h1]:tracking-[-0.03em] [&_h1]:text-[var(--brand-ink)]
          [&_h2]:text-xl md:[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-[var(--brand-ink)]
          [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_p]:mb-4
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-muted-foreground
          [&_li]:mb-1
          [&_a]:text-[var(--brand-cobalt)] [&_a:hover]:underline
          [&_strong]:text-foreground
        "
      >
        {children}
      </div>
    </article>
  );
}
