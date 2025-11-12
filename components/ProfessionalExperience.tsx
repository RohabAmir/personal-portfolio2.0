"use client";

import React, { memo, useCallback, useState } from "react";

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

const Code = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="m16 18 6-6-6-6" />
    <path d="m8 6-6 6 6 6" />
  </svg>
);

const Palette = (props: React.SVGProps<SVGSVGElement>) => (
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
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
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
      "border border-slate-200 bg-transparent hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800",
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

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface TimelineItemData {
  id: string;
  title: string;
  type: string;
  duration: string;
  icon: IconType;
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
    title: "Senior Frontend Developer",
    type: "Trustangle Riyad Ltd.",
    duration: "09.2024 — Present",
    icon: Code,
    responsibilities: [
      "Lead development of production-ready React applications with TypeScript.",
      "Architect scalable frontend solutions using Next.js / Nuxt.js and modern tooling.",
      "Led the launching of a project with 35% increase in user adoption and user engagement.",
      "Mentor junior developers and conduct code reviews.",
      "Collaborate with design and backend teams to deliver high-quality products.",
    ],
    skills: ["React", "Vue.js", "Nuxt.js", "Next.js", "TS", "Tailwind CSS", "Shadcn UI", "React Query"],
  },
  {
    id: "prof-exp-2",
    title: "Associate Software Engineer",
    type: "Folium AI",
    duration: "01.2023 — 09.2024",
    icon: Code,
    responsibilities: [
      "Collaborated with UI/UX designers to translate 300+ pixel perfect figma designs web application wire-frames to code.",
      "Created Test-Driven websites by writing 38+ tests which includes Unit, Cypress and Integration testing using JavaScript Testing Frameworks.",
      "Lead the development with cross-functional team for simple, scalable, and powerful architecture for building production-ready applications.",
      "Implemented RTL and LTR layouts for multilingual applications.",
    ],
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Material UI", "Redux", "RTK Query"],
  },
  {
    id: "prof-exp-3",
    title: "Junior React.js Developer",
    type: "Folium AI",
    duration: "09.2022 — 12.2022",
    icon: Code,
    responsibilities: [
      "Developed responsive web applications using React and Vanilla JavaScript.",
      "Implemented pixel-perfect designs from Figma mockups.",
      "Optimized application performance and user experience.",
      "Collaborated in an agile development environment.",
    ],
    skills: ["React", "JavaScript", "CSS", "SASS", "HTML", "Bootstrap", "Responsive Designs"],
  },
];

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
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0 group-hover:bg-[#9a5df5] dark:group-hover:bg-purple transition-colors duration-200 dark:bg-slate-500" />
            <p className="text-sm text-slate-600 dark:text-white-100 leading-relaxed">
              {responsibility}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
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
  const Icon = item.icon;
  const headerId = `timeline-header-${item.id}`;
  const contentId = `timeline-content-${item.id}`;

  return (
    <div className="relative group">
      <div className="absolute left-4 sm:left-6 top-14 bottom-0 w-[2px] bg-gradient-to-b from-slate-900 via-slate-500 to-transparent dark:from-white dark:via-slate-400 dark:to-transparent" />

      <div className="absolute left-2 sm:left-4 top-6 w-4 h-4 bg-white dark:bg-black-100 border-2 border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center transform transition-all duration-200 z-10">
        <div className="w-2 h-2 bg-[#9a5df5] dark:bg-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      <div className="ml-8 sm:ml-12 mb-8">
        <div
          className={`
          bg-white dark:bg-[rgb(4,7,29)]
          rounded-lg border border-slate-200 dark:border-white/[0.2]
          transition-all duration-200
          ${expanded ? "shadow-sm" : "shadow-none hover:shadow-sm"}
        `}
        >
          <button
            id={headerId}
            className="w-full text-left p-4 sm:p-6 group/button cursor-pointer hover:bg-slate-50/50 dark:hover:bg-black-100/50 transition-colors duration-200 rounded-t-lg"
            onClick={() => onToggle(item.id)}
            aria-expanded={expanded}
            aria-controls={contentId}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-md flex-shrink-0">
                    <Icon className="w-4 h-4 text-slate-600 dark:text-purple" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center dark:text-purple text-[#9a5df5] gap-3 ml-0 sm:ml-11 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                  <span className="text-xs text-slate-500 dark:text-white-100">
                    {item.duration}
                  </span>
                </div>
              </div>

              <div
                className={`
                text-slate-400 dark:text-slate-600 
                transition-transform duration-200 flex-shrink-0
                ${expanded ? "rotate-180" : ""}
              `}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </button>

          {expanded && (
            <div
              id={contentId}
              role="region"
              aria-labelledby={headerId}
              className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-slate-100 dark:border-slate-900"
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
  expandMode = "multi",
}: ProfessionalTimelineProps) {
  const initial = defaultExpandedIds ?? data.map((item) => item.id);
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
    [expandMode]
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
    <div className="flex flex-col items-center justify-center gap-6">
    <h1 className="heading dark:text-white text-slate-800">
        My{" "}
        <span className="dark:text-purple text-[#9a5df5]">Professional Experience</span>
      </h1>
      <p className="text-slate-600 dark:text-white-100 text-center font-medium font-urbanist md:tracking-widest lg:mb-4 mb-14 text-sm md:text-lg lg:text-lg ">
        A comprehensive overview of my career journey and professional achievements.
      </p>
    </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <ProfessionalTimeline data={timelineData} expandMode="multi" />
      </div>
    </div>
  );
};

export default ProfessionalExperience;

