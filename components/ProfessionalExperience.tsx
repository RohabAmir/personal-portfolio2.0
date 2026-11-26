"use client";

import React, { memo, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  HiOutlineBuildingOffice2,
  HiOutlineMapPin,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiArrowUpRight,
} from "react-icons/hi2";
import SketchHighlight from "./ui/SketchHighlight";

interface TimelineItemData {
  id: string;
  role: string;
  company: string;
  employmentType: string;
  workMode: string;
  dateRange: string;
  durationTotal: string;
  startDate?: string;
  endDate?: string;
  location: string;
  website: string;
  logo: string;
  current?: boolean;
  responsibilities: string[];
  skills: string[];
}

const timelineData: TimelineItemData[] = [
  {
    id: "prof-exp-1",
    role: "Senior Software Engineer",
    company: "Nextbridge Ltd.",
    employmentType: "Full-time",
    workMode: "On-site",
    dateRange: "Nov 2025 — Present",
    durationTotal: "11 mos",
    startDate: "2025-11-12",
    location: "Lahore, Punjab, Pakistan",
    website: "https://nextbridge.com",
    logo: "/logos/nextbridge.png",
    current: true,
    responsibilities: [
      "Built for ADREC (Abu Dhabi Real Estate Centre), managing their lease and PMA services end to end — from service initiation to checkout.",
      "Converted a legacy, fully manual property services builder into an intelligent, automated platform using AI automation.",
      "Led the launching of a project with 35% increase in user adoption and user engagement.",
    ],
    skills: [
      "React",
      "Node",
      "MongoDB",
      "JavaScript",
      "Redux",
      "Tailwind CSS",
      "Material UI",
      "AI Automation",
    ],
  },
  {
    id: "prof-exp-2",
    role: "Frontend Developer",
    company: "Trustangle",
    employmentType: "Contract",
    workMode: "Remote",
    dateRange: "Nov 2025 — Jun 2026",
    durationTotal: "8 mos",
    startDate: "2025-11-05",
    endDate: "2026-06-30",
    location: "Riyadh, Saudi Arabia",
    website: "https://trustangle.com",
    logo: "/logos/trustangle.png",
    responsibilities: [
      "Developed two production Saudi tourism websites end to end, translating pixel-perfect Figma designs into fast, responsive, multilingual (RTL/LTR) web experiences.",
      "Built a Headless CMS dashboard product that manages the entire content, SEO, blogs, and theming of the company's tourism websites from a single platform.",
      "Implemented role-based user permissions, two-factor (2FA) authentication, and activity logs to secure and audit every operation across the dashboard.",
    ],
    skills: [
      "Vue.js",
      'Nuxt.js',
      "Next.js",
      "TypeScript",
      "Headless CMS",
      "Chakra UI",
      "TanStack Query",
    ],
  },
  {
    id: "prof-exp-3",
    role: "Software Engineer",
    company: "Logical Creations",
    employmentType: "Full-time",
    workMode: "On-site",
    dateRange: "Sep 2024 — Nov 2025",
    durationTotal: "1 yr 3 mos",
    startDate: "2024-09-01",
    endDate: "2025-11-30",
    location: "Lahore, Punjab, Pakistan",
    website: "https://logicalcreations.net",
    logo: "/logos/logical-creations.png",
    responsibilities: [
      "Collaborated with UI/UX designers to translate 300+ pixel perfect figma designs web application wire-frames to code.",
      "Developed the Golf Saudi platform from scratch with a cross-functional team, featuring six integrated pillars, online booking, and a CMS dashboard with analytics.",
      "Lead the development with cross-functional team for simple, scalable, and powerful architecture for building production-ready applications.",
    ],
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Shadcn UI",
      "TanStack Query",
    ],
  },
  {
    id: "prof-exp-4",
    role: "Associate Software Engineer",
    company: "Folium Technologies",
    employmentType: "Full-time",
    workMode: "On-site",
    dateRange: "Aug 2023 — Sep 2024",
    durationTotal: "1 yr 2 mos",
    startDate: "2023-08-01",
    endDate: "2024-09-30",
    location: "Lahore, Punjab, Pakistan",
    website: "https://folium.ai",
    logo: "/logos/folium.png",
    responsibilities: [
      "Implemented pixel-perfect designs from figma mockups and developed responsive web applications with scalable Frontend architectures.",
      "Led a launch that boosted user adoption and engagement by 35% by integrating Onfido SDK (digital verification) and PubNub (real-time communication).",
      "Developed 38+ Unit, Integration, and Cypress tests with Jest and Vitest for test-driven web development.",
    ],
    skills: [
      "React/Next",
      "JavaScript",
      "CSS/SASS",
      "UI Technologies",
      "Third Party SDKS",
      "JS Testing Frameworks",
      "Responsive Designs",
    ],
  },
  {
    id: "prof-exp-5",
    role: "IT Engineer Intern",
    company: "NAVTTC",
    employmentType: "Internship",
    workMode: "On-site",
    dateRange: "Jun 2022 — Jul 2023",
    durationTotal: "1 yr 2 mos",
    startDate: "2022-06-01",
    endDate: "2023-07-31",
    location: "Islamabad, Pakistan",
    website: "https://navttc.gov.pk",
    logo: "/logos/navttc.png",
    responsibilities: [
      "Served as an IT branch resource under a federal government internship program (BPS-16) at the Ministry of Federal Education & Professional Training.",
      "Worked alongside the in-house IT team to implement and verify amendments to the official NAVTTC website, ensuring responsive and cross-browser consistent delivery.",
      "Gained hands-on experience with public-sector IT workflows — requirement gathering, change documentation, and coordinating with multiple departments for site updates.",
    ],
    skills: [
      "Vanilla JS",
      "jQuery",
      "HTML",
      "Bootstrap",
      "SQL",
      "Web Debugging",
      "Responsive Design",
      "Documentation",
      "Communication",
      "Team Collaboration",
    ],
  },
];

const pluralizeMonths = (months: number) =>
  months === 1 ? "1 mo" : `${months} mos`;

const formatDuration = (startDate: string, endDate?: string): string => {
  const start = new Date(`${startDate}T00:00:00`);
  const end = endDate ? new Date(`${endDate}T00:00:00`) : new Date();
  const effectiveEnd = endDate
    ? new Date(end.getFullYear(), end.getMonth() + 1, 1)
    : end;
  const months = Math.max(
    0,
    (effectiveEnd.getFullYear() - start.getFullYear()) * 12 +
      (effectiveEnd.getMonth() - start.getMonth()) -
      (effectiveEnd.getDate() < start.getDate() ? 1 : 0),
  );
  if (months < 1) return "<1 mo";
  if (months < 12) return pluralizeMonths(months);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const yearLabel = years === 1 ? "1 yr" : `${years} yrs`;
  return rest ? `${yearLabel} ${pluralizeMonths(rest)}` : yearLabel;
};

const DurationLabel = memo(function DurationLabel({
  item,
}: {
  item: TimelineItemData;
}) {
  const [duration, setDuration] = useState(item.durationTotal);
  const { startDate, endDate } = item;

  useEffect(() => {
    if (!startDate) return;
    const update = () => setDuration(formatDuration(startDate, endDate));
    update();
    const id = setInterval(update, 60 * 60 * 1000);
    return () => clearInterval(id);
  }, [startDate, endDate]);

  return <>{duration}</>;
});
DurationLabel.displayName = "DurationLabel";

/* ───────────────────────────────────────────────────────────────────────────
 * Pieces
 * ─────────────────────────────────────────────────────────────────────────── */

/** Logo on a frosted-glass squircle with a soft gradient edge. */
const CompanyLogo = ({ src, company }: { src: string; company: string }) => (
  <div className="relative shrink-0 rounded-2xl bg-gradient-to-br from-[#634196]/40 via-slate-300/40 to-transparent p-px dark:from-purple/40 dark:via-white/10 dark:to-white/[0.02]">
    <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-gradient-to-br from-white to-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:from-[#16163a] dark:to-[#0a0b1f] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:h-14 sm:w-14">
      <Image
        src={src}
        alt={`${company} logo`}
        width={40}
        height={40}
        className="h-8 w-8 rounded-[10px] object-contain sm:h-9 sm:w-9"
      />
    </div>
  </div>
);

/** Emerald "Current" pill with a live dot and a radiating pulse ring. */
const CurrentPill = () => (
  <span className="relative inline-flex rounded-full text-[#634196] dark:text-purple animate-[pill-pulse_2s_ease-out_infinite]">
    <span className="relative inline-flex items-center gap-1.5 rounded-full bg-[#634196]/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#634196] ring-1 ring-[#634196]/40 dark:bg-purple/10 dark:text-purple dark:ring-purple/40">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#634196] opacity-75 dark:bg-purple" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#634196] dark:bg-purple" />
      </span>
      Current
    </span>
  </span>
);

const MetaItem = ({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) => (
  <span className="inline-flex items-center gap-1.5">
    <Icon className="h-3.5 w-3.5 shrink-0 text-[#634196] dark:text-purple" />
    {children}
  </span>
);

/* ───────────────────────────────────────────────────────────────────────────
 * Timeline entry
 * ─────────────────────────────────────────────────────────────────────────── */

const TimelineItem = memo(function TimelineItem({
  item,
  isLast,
}: {
  item: TimelineItemData;
  isLast: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.li
      className="relative pl-8 sm:pl-12"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* rail */}
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-[7px] top-6 -bottom-2 w-px bg-gradient-to-b from-slate-300 to-slate-200 dark:from-white/15 dark:to-white/5 sm:left-[11px]"
        />
      )}

      {/* node */}
      <span aria-hidden className="absolute left-0 top-[18px] flex h-[15px] w-[15px] items-center justify-center sm:left-1 sm:top-[22px]">
        {item.current ? (
          <>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#634196]/40 dark:bg-purple/40" />
            <span className="relative h-[15px] w-[15px] rounded-full border-2 border-[#634196] dark:border-purple bg-white shadow-[0_0_12px_rgba(99,65,150,0.6)] dark:shadow-[0_0_12px_rgba(203,172,249,0.6)] dark:bg-black-100">
              <span className="absolute inset-[3px] rounded-full bg-[#634196] dark:bg-purple" />
            </span>
          </>
        ) : (
          <span className="h-[9px] w-[9px] rounded-full bg-slate-300 ring-4 ring-[#F3F3F3] dark:bg-slate-600 dark:ring-black-100" />
        )}
      </span>

      <article className="pb-12 sm:pb-14">
        {/* header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="flex min-w-0 items-start gap-4">
            <CompanyLogo src={item.logo} company={item.company} />
            <div className="min-w-0">
              <h3 className="text-base font-bold leading-snug text-slate-900 dark:text-white sm:text-lg">
                {item.role}
                <span className="mx-2 text-slate-300 dark:text-white/25">·</span>
                <span className="text-[#634196] dark:text-purple">{item.company}</span>
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-neutral-400 sm:text-[13px]">
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Visit ${item.company} website`}
                  className="group/link inline-flex items-center gap-1.5 transition-colors hover:text-[#634196] dark:hover:text-purple"
                >
                  <HiOutlineBuildingOffice2 className="h-3.5 w-3.5 shrink-0 text-[#634196] dark:text-purple" />
                  {item.website.replace(/^https?:\/\/(www\.)?/, "")}
                  <HiArrowUpRight className="h-3 w-3 transition-transform group-hover/link:-translate-y-px group-hover/link:translate-x-px" />
                </a>
                <MetaItem icon={HiOutlineMapPin}>{item.location}</MetaItem>
                <MetaItem icon={HiOutlineBriefcase}>
                  {item.employmentType} · {item.workMode}
                </MetaItem>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2.5 pl-16 sm:flex-col sm:items-end sm:gap-1.5 sm:pl-0 sm:pt-1">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-slate-500 dark:text-neutral-400">
                <HiOutlineCalendarDays className="h-3.5 w-3.5 sm:hidden" />
                {item.dateRange}
              </span>
              {item.current && <CurrentPill />}
            </div>
            <span className="font-mono text-[11px] text-slate-400 dark:text-neutral-500">
              <DurationLabel item={item} />
            </span>
          </div>
        </div>

        {/* responsibilities */}
        <ul className="mt-5 space-y-2.5 sm:pl-[72px]">
          {item.responsibilities.map((r, idx) => (
            <li
              key={`${item.id}-resp-${idx}`}
              className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-neutral-300"
            >
              <span
                aria-hidden
                className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-neutral-500"
              />
              {r}
            </li>
          ))}
        </ul>

        {/* skills */}
        <div className="mt-5 flex flex-wrap gap-2 sm:pl-[72px]">
          {item.skills.map((skill) => (
            <span
              key={`${item.id}-${skill}`}
              className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </article>
    </motion.li>
  );
});
TimelineItem.displayName = "TimelineItem";

export function ProfessionalTimeline({ data }: { data: TimelineItemData[] }) {
  return (
    <ol className="relative">
      {data.map((item, index) => (
        <TimelineItem key={item.id} item={item} isLast={index === data.length - 1} />
      ))}
    </ol>
  );
}

const ProfessionalExperience = () => {
  return (
    <div className="py-20 sm:py-32" id="professional-experience">
      <div className="flex flex-col items-center justify-center">
        <h1 className="heading dark:text-white text-black">
          My Professional <SketchHighlight>Experience</SketchHighlight>
        </h1>
        <p className="dark:text-white-200 text-slate-600 mt-8 text-center text-sm sm:text-base leading-relaxed">
          Roles across government, tourism, SaaS, and CMS.
        </p>
      </div>
      <div className="mx-auto mt-24 px-0 sm:px-6 lg:px-0">
        <ProfessionalTimeline data={timelineData} />
      </div>
      <style>{`
        @keyframes pill-pulse {
          0%   { box-shadow: 0 0 0 0 color-mix(in srgb, currentColor 45%, transparent); }
          70%  { box-shadow: 0 0 0 7px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
      `}</style>
    </div>
  );
};

export default ProfessionalExperience;
