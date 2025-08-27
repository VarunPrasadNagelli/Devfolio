// =============================
// Vite + React + TypeScript + Tailwind
// Components for a real-time resume builder with one template
// Dependencies: react, react-dom, tailwindcss, react-to-print
// Install: npm i react-to-print
// Usage: import { ResumeBuilder } from "./components/resume/ResumeBuilder"; then render <ResumeBuilder />
// =============================

import React, { useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

// -----------------------------
// Types
// -----------------------------
export type Experience = {
  company: string;
  location?: string;
  title: string;
  start?: string;
  end?: string;
  bullets: string[];
};

export type Education = {
  school: string;
  degree: string;
  grad?: string;
  location?: string;
};

export type Skills = {
  languages?: string;
  databases?: string;
  realtime?: string;
  cloud?: string;
  testing?: string;
  security?: string;
};

export type ResumeData = {
  header: {
    name: string;
    location?: string;
    phone?: string;
    email?: string;
    linkedin?: string;
  };
  summary?: string;
  strengths: string[];
  experience: Experience[];
  education: Education[];
  skills: Skills;
};

// -----------------------------
// Helpers
// -----------------------------
const emptyExperience = (): Experience => ({
  company: "",
  title: "",
  bullets: [""],
});
const emptyEducation = (): Education => ({ school: "", degree: "" });

// -----------------------------
// Root Page Component
// -----------------------------
export function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>({
    header: {
      name: "Your Name",
      location: "City, ST",
      phone: "(000) 000-0000",
      email: "you@example.com",
      linkedin: "linkedin.com/in/your-profile",
    },
    summary:
      "Impact-focused engineer with experience in real-time systems and clean, scalable code.",
    strengths: [
      "Distributed Systems",
      "API Design",
      "Cloud & CI/CD",
      "Real-time Streaming",
    ],
    experience: [emptyExperience()],
    education: [emptyEducation()],
    skills: {
      languages: "TypeScript, React, Node.js, Java, Python",
      databases: "PostgreSQL, MongoDB",
      realtime: "Kafka, WebSockets",
      cloud: "AWS, GCP, Docker, GitHub Actions",
      testing: "Jest, Playwright, Postman",
      security: "OAuth 2.0, JWT",
    },
  });

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: () => printRef.current,
    documentTitle: `${data.header.name} - Resume`,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Editor */}
        <div className="bg-white shadow-sm rounded-2xl border p-4 md:p-6 space-y-8">
          <HeaderForm data={data} setData={setData} />
          <SummaryForm data={data} setData={setData} />
          <StrengthsForm data={data} setData={setData} />
          <ExperienceForm data={data} setData={setData} />
          <EducationForm data={data} setData={setData} />
          <SkillsForm data={data} setData={setData} />
        </div>

        {/* RIGHT: Preview + Download */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">
              Live Preview
            </h2>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium bg-white hover:bg-slate-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M6 7V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3h1a3 3 0 0 1 3 3v3a1 1 0 1 1-2 0v-3a1 1 0 0 0-1-1h-1v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1a1 1 0 1 1 0 2H5a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h1Zm2 0h8V4H8v3Zm0 6h8V9H8v4Z" />
              </svg>
              Download PDF
            </button>
          </div>
          <div className="bg-white shadow-sm rounded-2xl border p-0">
            <div ref={printRef} className="bg-white p-8 print:p-8">
              <ResumePreview data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// Editor Components
// -----------------------------
function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="text-sm font-semibold text-slate-700">{title}</div>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-wide text-slate-600 mb-1">
        {label}
      </div>
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
}: {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
    />
  );
}

function Textarea({
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value || ""}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
    />
  );
}

function HeaderForm({
  data,
  setData,
}: {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}) {
  const h = data.header;
  return (
    <Group title="Header">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Name">
          <Input
            value={h.name}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                header: { ...d.header, name: e.target.value },
              }))
            }
          />
        </Field>
        <Field label="Location">
          <Input
            value={h.location}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                header: { ...d.header, location: e.target.value },
              }))
            }
          />
        </Field>
        <Field label="Phone">
          <Input
            value={h.phone}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                header: { ...d.header, phone: e.target.value },
              }))
            }
          />
        </Field>
        <Field label="Email">
          <Input
            value={h.email}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                header: { ...d.header, email: e.target.value },
              }))
            }
          />
        </Field>
        <div className="md:col-span-2">
          <Field label="LinkedIn">
            <Input
              value={h.linkedin}
              onChange={(e) =>
                setData((d) => ({
                  ...d,
                  header: { ...d.header, linkedin: e.target.value },
                }))
              }
            />
          </Field>
        </div>
      </div>
    </Group>
  );
}

function SummaryForm({
  data,
  setData,
}: {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}) {
  return (
    <Group title="Summary">
      <Textarea
        rows={3}
        value={data.summary}
        onChange={(e) => setData((d) => ({ ...d, summary: e.target.value }))}
        placeholder="One or two lines summarizing your strengths and the value you bring."
      />
    </Group>
  );
}

function StrengthsForm({
  data,
  setData,
}: {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}) {
  const [value, setValue] = useState("");
  const add = () => {
    const v = value.trim();
    if (!v) return;
    setData((d) => ({ ...d, strengths: [...d.strengths, v] }));
    setValue("");
  };
  const remove = (i: number) =>
    setData((d) => ({
      ...d,
      strengths: d.strengths.filter((_, idx) => idx !== i),
    }));
  return (
    <Group title="Key Strengths">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g., Distributed Systems"
        />
        <button
          onClick={add}
          className="rounded-lg border px-3 py-2 text-sm bg-white hover:bg-slate-50"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {data.strengths.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="px-2 py-1 text-xs bg-slate-100 rounded-full border flex items-center gap-1"
          >
            {t}
            <button
              className="text-slate-500 hover:text-slate-700"
              onClick={() => remove(i)}
              aria-label={`Remove ${t}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </Group>
  );
}

function ExperienceForm({
  data,
  setData,
}: {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}) {
  const addRole = () =>
    setData((d) => ({
      ...d,
      experience: [...d.experience, emptyExperience()],
    }));
  const removeRole = (idx: number) =>
    setData((d) => ({
      ...d,
      experience: d.experience.filter((_, i) => i !== idx),
    }));
  const patchRole = (idx: number, patch: Partial<Experience>) =>
    setData((d) => ({
      ...d,
      experience: d.experience.map((e, i) =>
        i === idx ? { ...e, ...patch } : e
      ),
    }));
  const addBullet = (idx: number) =>
    setData((d) => ({
      ...d,
      experience: d.experience.map((e, i) =>
        i === idx ? { ...e, bullets: [...e.bullets, ""] } : e
      ),
    }));
  const updateBullet = (idx: number, bIdx: number, value: string) =>
    setData((d) => ({
      ...d,
      experience: d.experience.map((e, i) =>
        i === idx
          ? { ...e, bullets: e.bullets.map((b, j) => (j === bIdx ? value : b)) }
          : e
      ),
    }));
  const removeBullet = (idx: number, bIdx: number) =>
    setData((d) => ({
      ...d,
      experience: d.experience.map((e, i) =>
        i === idx
          ? { ...e, bullets: e.bullets.filter((_, j) => j !== bIdx) }
          : e
      ),
    }));

  return (
    <Group title="Experience">
      <div className="space-y-6">
        {data.experience.map((exp, idx) => (
          <div key={idx} className="rounded-xl border p-4">
            <div className="flex items-center justify-between mb-3 text-sm text-slate-600">
              <div>Role #{idx + 1}</div>
              <button
                onClick={() => removeRole(idx)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <Field label="Company">
                <Input
                  value={exp.company}
                  onChange={(e) => patchRole(idx, { company: e.target.value })}
                />
              </Field>
              <Field label="Location">
                <Input
                  value={exp.location}
                  onChange={(e) => patchRole(idx, { location: e.target.value })}
                />
              </Field>
              <Field label="Title">
                <Input
                  value={exp.title}
                  onChange={(e) => patchRole(idx, { title: e.target.value })}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Start">
                  <Input
                    value={exp.start}
                    onChange={(e) => patchRole(idx, { start: e.target.value })}
                  />
                </Field>
                <Field label="End">
                  <Input
                    value={exp.end}
                    onChange={(e) => patchRole(idx, { end: e.target.value })}
                  />
                </Field>
              </div>
            </div>
            <div className="mt-3">
              <div className="text-xs uppercase tracking-wide text-slate-600 mb-1">
                Bullets
              </div>
              <div className="space-y-2">
                {exp.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex gap-2">
                    <Input
                      value={b}
                      onChange={(e) => updateBullet(idx, bIdx, e.target.value)}
                      placeholder="What did you accomplish? Start with a verb."
                    />
                    <button
                      onClick={() => removeBullet(idx, bIdx)}
                      className="rounded-lg border px-3 py-2 text-sm bg-white hover:bg-slate-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addBullet(idx)}
                  className="rounded-lg border px-3 py-2 text-sm bg-white hover:bg-slate-50"
                >
                  Add bullet
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-2">
        <button
          onClick={addRole}
          className="rounded-lg border px-3 py-2 text-sm bg-white hover:bg-slate-50"
        >
          Add Role
        </button>
      </div>
    </Group>
  );
}

function EducationForm({
  data,
  setData,
}: {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}) {
  const add = () =>
    setData((d) => ({ ...d, education: [...d.education, emptyEducation()] }));
  const patch = (idx: number, patch: Partial<Education>) =>
    setData((d) => ({
      ...d,
      education: d.education.map((e, i) =>
        i === idx ? { ...e, ...patch } : e
      ),
    }));
  const remove = (idx: number) =>
    setData((d) => ({
      ...d,
      education: d.education.filter((_, i) => i !== idx),
    }));

  return (
    <Group title="Education">
      <div className="space-y-6">
        {data.education.map((ed, idx) => (
          <div
            key={idx}
            className="grid md:grid-cols-2 gap-3 rounded-xl border p-4"
          >
            <div className="md:col-span-2 flex items-center justify-between -mt-2 mb-1 text-sm text-slate-600">
              <div>School #{idx + 1}</div>
              <button
                onClick={() => remove(idx)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
            <Field label="School">
              <Input
                value={ed.school}
                onChange={(e) => patch(idx, { school: e.target.value })}
              />
            </Field>
            <Field label="Degree">
              <Input
                value={ed.degree}
                onChange={(e) => patch(idx, { degree: e.target.value })}
              />
            </Field>
            <Field label="Graduation / Date">
              <Input
                value={ed.grad}
                onChange={(e) => patch(idx, { grad: e.target.value })}
              />
            </Field>
            <Field label="Location">
              <Input
                value={ed.location}
                onChange={(e) => patch(idx, { location: e.target.value })}
              />
            </Field>
          </div>
        ))}
      </div>
      <div className="pt-2">
        <button
          onClick={add}
          className="rounded-lg border px-3 py-2 text-sm bg-white hover:bg-slate-50"
        >
          Add School
        </button>
      </div>
    </Group>
  );
}

function SkillsForm({
  data,
  setData,
}: {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}) {
  return (
    <Group title="Skills">
      <div className="grid md:grid-cols-2 gap-3">
        <Field label="Languages & Frameworks">
          <Input
            value={data.skills.languages}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                skills: { ...d.skills, languages: e.target.value },
              }))
            }
          />
        </Field>
        <Field label="Databases">
          <Input
            value={data.skills.databases}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                skills: { ...d.skills, databases: e.target.value },
              }))
            }
          />
        </Field>
        <Field label="Real-time / Streaming">
          <Input
            value={data.skills.realtime}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                skills: { ...d.skills, realtime: e.target.value },
              }))
            }
          />
        </Field>
        <Field label="Cloud & DevOps">
          <Input
            value={data.skills.cloud}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                skills: { ...d.skills, cloud: e.target.value },
              }))
            }
          />
        </Field>
        <Field label="Testing & Tools">
          <Input
            value={data.skills.testing}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                skills: { ...d.skills, testing: e.target.value },
              }))
            }
          />
        </Field>
        <Field label="Security">
          <Input
            value={data.skills.security}
            onChange={(e) =>
              setData((d) => ({
                ...d,
                skills: { ...d.skills, security: e.target.value },
              }))
            }
          />
        </Field>
      </div>
    </Group>
  );
}

// -----------------------------
// Preview (Single Professional Template)
// -----------------------------
export function ResumePreview({ data }: { data: ResumeData }) {
  const {
    header: { name, location, phone, email, linkedin },
    summary,
    strengths,
    experience,
    education,
    skills,
  } = data;

  const joinLine = useMemo(
    () => (arr: (string | undefined)[]) => arr.filter(Boolean).join(" | "),
    []
  );

  return (
    <div className="mx-auto max-w-[850px] text-[13px] leading-relaxed text-slate-900">
      {/* Header */}
      <div className="flex items-end justify-between border-b pb-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
          <div className="text-slate-600 mt-1">
            {joinLine([location, phone, email, linkedin])}
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <SectionBlock title="Summary">
          <p>{summary}</p>
        </SectionBlock>
      )}

      {/* Strengths */}
      {strengths?.length > 0 && (
        <SectionBlock title="Key Strengths">
          <ul className="grid grid-cols-2 gap-x-6 list-disc pl-4">
            {strengths.map((s, i) => (
              <li key={`${s}-${i}`}>{s}</li>
            ))}
          </ul>
        </SectionBlock>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <SectionBlock title="Experience">
          <div className="space-y-4">
            {experience.map((e, i) => (
              <div key={i} className="break-inside-avoid">
                <div className="flex items-baseline justify-between">
                  <div className="font-medium">
                    {e.company && <span>{e.company}</span>}
                    {e.location && (
                      <span className="text-slate-600">
                        {" "}
                        {" | " + e.location}
                      </span>
                    )}
                  </div>
                  <div className="text-slate-600 text-sm">
                    {[e.start, e.end].filter(Boolean).join(" - ")}
                  </div>
                </div>
                <div className="text-[13px] italic">{e.title}</div>
                {e.bullets?.length > 0 && (
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    {e.bullets.filter(Boolean).map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <SectionBlock title="Education">
          <div className="space-y-2">
            {education.map((ed, i) => (
              <div key={i} className="flex items-baseline justify-between">
                <div>
                  <div className="font-medium">{ed.school}</div>
                  <div className="text-[13px] italic">{ed.degree}</div>
                </div>
                <div className="text-slate-600 text-sm">
                  {[ed.location, ed.grad].filter(Boolean).join(" | ")}
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Skills */}
      <SectionBlock title="Skills">
        <div className="grid md:grid-cols-2 gap-x-8">
          <SkillRow label="Languages & Frameworks" value={skills.languages} />
          <SkillRow label="Databases" value={skills.databases} />
          <SkillRow label="Real-Time Processing" value={skills.realtime} />
          <SkillRow label="Cloud & DevOps" value={skills.cloud} />
          <SkillRow label="Testing & Tools" value={skills.testing} />
          <SkillRow label="Security" value={skills.security} />
        </div>
      </SectionBlock>

      <div className="h-2" />
    </div>
  );
}

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <div className="uppercase tracking-wide text-[11px] font-semibold text-slate-700 border-b pb-1 mb-2">
        {title}
      </div>
      {children}
    </div>
  );
}

function SkillRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-2">
      <div className="whitespace-nowrap font-medium">{label}:</div>
      <div className="flex-1">{value}</div>
    </div>
  );
}

// -----------------------------
// Print Tweaks (optional)
// Add to your global CSS if needed for perfect PDF colors:
// @media print {
//   body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
// }
