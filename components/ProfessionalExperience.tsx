"use client";

import React, { memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";

const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ExternalLink = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

const Badge = ({
  children,
  className = "",
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "outline";
}) => {
  const variants = {
    default:
      "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
    secondary:
      "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
    outline:
      "border border-[#c6c3c4] bg-transparent hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

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

type ExpandMode = "multi" | "single";

interface ProfessionalTimelineProps {
  data: TimelineItemData[];
  defaultExpandedIds?: string[];
  expandMode?: ExpandMode;
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
      "Designed scalable Node.js and MongoDB structures powering high-traffic, production-grade platforms.",
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
      "Architect scalable frontend solutions using Next.js / Nuxt.js and modern tooling.",
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
      "Implemented RTL and LTR layouts for multilingual applications.",
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
      "Developed responsive web applications using React and Next.js.",
      "Implemented pixel-perfect designs from Figma mockups.",
      "Led a launch that boosted user adoption and engagement by 35% by integrating Onfido SDK (digital verification) and PubNub (real-time communication).",
      "Optimized application performance and user experience.",
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

interface TimelineItemContentProps {
  item: TimelineItemData;
}

const TimelineItemContent = memo(function TimelineItemContent({
  item,
}: TimelineItemContentProps) {
  return (
    <div className="mt-6 space-y-6 animate-in slide-in-from-top-1 duration-200">
      <div className="space-y-3">
        {item.responsibilities.map((responsibility, idx) => (
          <div
            key={`${item.id}-resp-${idx}`}
            className="flex items-start gap-3 group"
          >
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0 group-hover:bg-[#492C74] dark:group-hover:bg-purple transition-colors duration-200 dark:bg-slate-500" />
            <p className="text-sm text-slate-600 dark:text-white-100 leading-relaxed">
              {responsibility}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-[#c6c3c4] dark:border-slate-800">
        {item.skills.map((skill, skillIdx) => (
          <Badge key={`${item.id}-skill-${skillIdx}`} variant="secondary">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
});
TimelineItemContent.displayName = "TimelineItemContent";

interface TimelineItemProps {
  item: TimelineItemData;
  expanded: boolean;
  onToggle: (id: string) => void;
  index: number;
}

const TimelineItem = memo(function TimelineItem({
  item,
  expanded,
  onToggle,
}: TimelineItemProps) {
  const headerId = `timeline-header-${item.id}`;
  const contentId = `timeline-content-${item.id}`;
  const textIndent = "ml-[52px] sm:ml-[64px]";

  return (
    <div className="relative group">
      <div className="absolute left-4 sm:left-6 top-14 bottom-0 w-[2px] bg-gradient-to-b from-slate-900 via-slate-500 to-transparent dark:from-white dark:via-slate-400 dark:to-transparent" />

      <div className="absolute left-2 sm:left-4 top-6 w-4 h-4 bg-white dark:bg-black-100 border-2 border-[#c6c3c4] dark:border-slate-700 rounded-full flex items-center justify-center transform transition-all duration-200 z-10">
        <div className="w-2 h-2 bg-[#634196] dark:bg-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      <div className="ml-8 sm:ml-12 mb-8">
        <div
          className={`
          bg-white dark:bg-[rgb(4,7,29)]
          rounded-lg border border-[#c6c3c4] dark:border-white/[0.2]
          transition-all duration-200
          ${expanded ? "shadow-sm" : "shadow-none hover:shadow-sm"}
        `}
        >
          <div className="p-4 sm:p-5 sm:px-6">
            <div className="flex items-start justify-between gap-3">
              <button
                id={headerId}
                type="button"
                onClick={() => onToggle(item.id)}
                aria-expanded={expanded}
                aria-controls={contentId}
                className="flex flex-1 min-w-0 items-center gap-3 sm:gap-4 text-left cursor-pointer group/button"
              >
                <Image
                  src={item.logo}
                  alt={`${item.company} logo`}
                  width={48}
                  height={48}
                  className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-lg object-contain bg-white border border-[#c6c3c4] dark:border-white/10 p-0.5"
                />
                <div className="min-w-0 space-y-1">
                  <h3 className="text-sm sm:text-base font-semibold text-[#634196] dark:text-purple truncate">
                    {item.role}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 truncate">
                    <span className="font-medium">{item.company}</span>
                    <span className="text-slate-400 dark:text-neutral-500">
                      {" "}
                      · {item.employmentType} · {item.workMode}
                    </span>
                  </p>
                  <p className="text-xs text-slate-500 dark:text-neutral-400">
                    {item.dateRange} · <DurationLabel item={item} />
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onToggle(item.id)}
                aria-label={expanded ? "Collapse details" : "Expand details"}
                aria-expanded={expanded}
                aria-controls={contentId}
                className={`
                  shrink-0 mt-1 p-1.5 rounded-full text-slate-400 dark:text-slate-600
                  hover:bg-slate-100 hover:text-slate-600
                  dark:hover:bg-white/[0.06] dark:hover:text-slate-300
                  transition-all duration-200 cursor-pointer
                  ${expanded ? "rotate-180" : ""}
                `}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* location + company website link (LinkedIn-style) */}
            <a
              href={item.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/link mt-2 inline-flex max-w-full items-center gap-1.5 text-xs text-slate-500 dark:text-neutral-400 hover:text-[#634196] dark:hover:text-purple transition-colors duration-200 ${textIndent}`}
              title={`Visit ${item.company} website`}
            >
              <span className="truncate">{item.location}</span>
              <ExternalLink className="w-3 h-3 shrink-0 text-[#634196] dark:text-purple" />
            </a>
          </div>

          {expanded && (
            <div
              id={contentId}
              role="region"
              aria-labelledby={headerId}
              className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-[#c6c3c4] dark:border-slate-700"
            >
              <TimelineItemContent item={item} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
TimelineItem.displayName = "TimelineItem";

export function ProfessionalTimeline({
  data,
  defaultExpandedIds,
  expandMode = "single",
}: ProfessionalTimelineProps) {
  const initial =
    defaultExpandedIds ?? data.filter((item) => item.current).map((i) => i.id);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(initial));

  const onToggle = useCallback(
    (id: string) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (expandMode === "single") {
          return prev.has(id) ? new Set() : new Set([id]);
        }
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [expandMode],
  );

  return (
    <div className="relative">
      {data.map((item, index) => (
        <TimelineItem
          key={item.id}
          item={item}
          expanded={expanded.has(item.id)}
          onToggle={onToggle}
          index={index}
        />
      ))}
    </div>
  );
}

const ProfessionalExperience = () => {
  return (
    <div className="py-20" id="professional-experience">
      <div className="flex flex-col items-center justify-center">
        <h1 className="heading dark:text-white text-black">
          My Professional{" "} 
          <span className="dark:text-purple text-[#634196]">
            Experience
          </span>
        </h1>
        <p className="dark:text-white-200 text-slate-600 mt-8 text-center text-sm sm:text-base leading-relaxed">
          A comprehensive overview of my career journey and professional
          achievements.
        </p>
      </div>
      <div className="max-w-3xl mx-auto px-0 sm:px-6 lg:px-8 mt-10">
        <ProfessionalTimeline data={timelineData} expandMode="single" />
      </div>
    </div>
  );
};

export default ProfessionalExperience;