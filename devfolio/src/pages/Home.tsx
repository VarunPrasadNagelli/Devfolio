export default function Home() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-sky-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* LEFT */}
          <div>
            {/* Avatar + Name */}
            <div className="flex items-center gap-4">
              <div className="p-1 rounded-full bg-gradient-to-br from-emerald-400 to-sky-500">
                <img
                  src="https://res.cloudinary.com/dlkgxwt6l/image/upload/v1756258838/WhatsApp_Image_2025-07-30_at_10.52.14_se0cu8.jpg"
                  alt="Varun Prasad Nagelli"
                  className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover ring-4 ring-black"
                />
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                VarunPrasad Nagelli
              </h1>
            </div>

            {/* Bio */}
            <div className="mt-5 space-y-3 text-slate-300 ">
              <p>
                Full-stack developer with nearly six years of experience
                designing and building scalable web and mobile applications
                across telecommunications, SaaS, regulatory, and retail. I
                create end-to-end, mission-critical platforms—from licensing and
                compliance systems to enterprise portals and real-time video
                conferencing—focused on reliability, performance, and scale.
              </p>

              <p>
                Proficient in Java, Spring Boot, React, Redux, TypeScript,
                Node.js, and React Native, with hands-on experience in GCP,
                CI/CD pipelines, Docker, and cloud-native architectures. Strong
                background in report generation, API development, workflow
                automation, and secure data handling.
              </p>

              <p>
                I thrive in Agile teams, collaborating closely with stakeholders
                to translate requirements into high-quality solutions. I care
                about clean, maintainable code, pragmatic design patterns, and
                building software that balances scalability, usability, and
                compliance.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur supports-[backdrop-filter]:bg-white/5">
            <h2 className="text-sm font-semibold text-slate-200">
              Quick Facts
            </h2>
            <ul className="mt-2 space-y-1 text-sm text-slate-300 list-disc pl-5">
              <li>Java / Spring Boot / React / TypeScript</li>
              <li>Node.js / React Native</li>
              <li>Databases: PostgreSQL, MongoDB, Cassandra</li>
              <li>
                Real-time: Kafka; event-driven architectures (Flink familiarity)
              </li>
              <li>
                Cloud & DevOps: GCP (Anthos, GCS, Assured Workloads), AWS,
                Docker
              </li>
              <li>CI/CD: GitHub Actions, Jenkins</li>
              <li>Testing & API: Jest, Postman, Swagger</li>
              <li>Security: JWT, OAuth 2.0, SSL, AWS KMS</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
