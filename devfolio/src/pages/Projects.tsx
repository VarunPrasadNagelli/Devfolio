import { Link } from "react-router-dom";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  to?: string; // internal route (e.g., "/resume")
  href?: string; // external url (e.g., "https://github.com/...")
};

const projects: Project[] = [
  {
    title: "Real-time Resume Builder",
    description: "Single-template builder with live preview and PDF export.",
    tech: ["React", "TypeScript", "Tailwind", "react-to-print"],
    to: "/resume", // ← clicking the card routes here
  },
  // Add more:
  // { title: "Stream Processing Dashboard", description: "...", tech: [...], href: "https://github.com/..." },
];

export default function Projects() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 text-slate-700">
        A selection of things I've built or contributed to.
      </p>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => {
          const CardInner = (
            <article className="bg-white border rounded-2xl p-5 flex flex-col transition hover:shadow-md hover:border-slate-300">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-700 flex-1">
                {p.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-slate-100 border rounded-full px-2 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Optional visible link label */}
              {(p.href || p.to) && (
                <span className="mt-4 text-sm text-blue-600 hover:underline">
                  Open
                </span>
              )}
            </article>
          );

          // Prefer internal route when `to` is present; otherwise external `href`
          if (p.to) {
            return (
              <Link
                key={p.title}
                to={p.to}
                className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl"
              >
                {CardInner}
              </Link>
            );
          }
          if (p.href) {
            return (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl"
              >
                {CardInner}
              </a>
            );
          }

          // Fallback (non-clickable if neither to nor href provided)
          return <div key={p.title}>{CardInner}</div>;
        })}
      </div>
    </section>
  );
}
