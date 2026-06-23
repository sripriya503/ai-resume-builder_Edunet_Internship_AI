"use client";

import { Download, FileText } from "lucide-react";

// Helper function to format score with proper suffix
const formatScore = (score: string): string => {
  if (!score) return score;
  // If already has suffix, return as is
  if (score.toLowerCase().includes("cgpa") || score.includes("%")) return score;
  // Check if it's a decimal number (likely CGPA for B.Tech)
  if (score.includes(".") && parseFloat(score) <= 10) {
    return `${score} CGPA`;
  }
  // Otherwise assume percentage
  if (!isNaN(parseFloat(score)) && parseFloat(score) > 10) {
    return `${score}%`;
  }
  return score;
};

interface EducationEntry {
  degree: string;
  school: string;
  year: string;
  score: string;
}

interface ResumeData {
  headline: string;
  summary: string;
  education: EducationEntry[];
  skills: string[];
  experiencePoints: string[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
  }[];
  coverLetter: string;
}

interface ResumePreviewProps {
  data: ResumeData | null;
  userData: any;
  onDownloadResume: () => void;
  onDownloadCoverLetter: () => void;
}

const colorConfig = {
  none: {
    headerBg: "#ffffff",
    headerText: "#000000",
    accent: "#000000",
    border: "#000000",
    skillBg: "#f0f0f0",
    skillText: "#000000"
  },
  blue: {
    headerBg: "#3b82f6",
    headerText: "#ffffff",
    accent: "#1e40af",
    border: "#3b82f6",
    skillBg: "#dbeafe",
    skillText: "#1e40af"
  },
  green: {
    headerBg: "#10b981",
    headerText: "#ffffff",
    accent: "#065f46",
    border: "#10b981",
    skillBg: "#d1fae5",
    skillText: "#065f46"
  },
  purple: {
    headerBg: "#8b5cf6",
    headerText: "#ffffff",
    accent: "#4c1d95",
    border: "#8b5cf6",
    skillBg: "#ede9fe",
    skillText: "#4c1d95"
  },
  orange: {
    headerBg: "#f97316",
    headerText: "#ffffff",
    accent: "#c2410c",
    border: "#f97316",
    skillBg: "#ffedd5",
    skillText: "#c2410c"
  }
};

export default function ResumePreview({ data, userData, onDownloadResume, onDownloadCoverLetter }: ResumePreviewProps) {
  if (!data || !userData) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-xl border border-slate-200 flex flex-col items-center justify-center min-h-[600px]">
        <FileText className="w-24 h-24 text-slate-300 mb-4" />
        <p className="text-slate-500 text-lg">Your professional resume will appear here</p>
      </div>
    );
  }

  const colors = colorConfig[userData.resumeColor as keyof typeof colorConfig] || colorConfig.blue;

  return (
    <div className="rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden">
      {/* Header with Contact Info */}
      <div className="p-4" style={{ backgroundColor: colors.headerBg, color: colors.headerText }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-3">{userData.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm">
            {userData.email && <div>{userData.email}</div>}
            {userData.phone && <div>{userData.phone}</div>}
            {userData.linkedin && <div>{userData.linkedin}</div>}
            {userData.github && <div>{userData.github}</div>}
          </div>
          <div className="mt-2 text-sm">
            {userData.address}, {userData.state} - {userData.pincode}
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 pb-1" style={{ borderBottom: `2px solid ${colors.border}`, color: colors.accent }}>
            Professional Summary
          </h2>
          <p className="text-slate-700 leading-relaxed text-justify">{data.summary || "No summary available"}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 pb-1" style={{ borderBottom: `2px solid ${colors.border}`, color: colors.accent }}>
            Education
          </h2>
          <div className="space-y-3">
            {(data.education || []).map((edu: EducationEntry, index: number) => (
              <div key={index} className="p-3 border border-slate-100 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">{edu.degree}</h3>
                    <p className="text-slate-600">{edu.school}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-700">{formatScore(edu.score)}</p>
                    <p className="text-sm text-slate-500">{edu.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 pb-1" style={{ borderBottom: `2px solid ${colors.border}`, color: colors.accent }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {(data.skills || []).slice(0, 20).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ backgroundColor: colors.skillBg, color: colors.skillText }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 pb-1" style={{ borderBottom: `2px solid ${colors.border}`, color: colors.accent }}>
            Experience Highlights
          </h2>
          <ul className="space-y-2">
            {(data.experiencePoints || []).map((point, index) => (
              <li key={index} className="text-slate-700 flex items-start gap-2">
                <span style={{ color: colors.accent }} className="font-bold mt-1">•</span>
                <span className="text-justify">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 pb-1" style={{ borderBottom: `2px solid ${colors.border}`, color: colors.accent }}>
            Portfolio
          </h2>
          <div className="space-y-3">
            {(data.projects || []).map((project, index) => (
              <div
                key={index}
                className="p-3 border border-slate-200 rounded-xl hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg text-slate-800 mb-1">{project.title || "Untitled Project"}</h3>
                <p className="text-slate-700 mb-2 text-justify">{project.description || "No description available"}</p>
                <div className="flex flex-wrap gap-2">
                  {(project.technologies || []).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-xs font-medium"
                      style={{ backgroundColor: colors.skillBg, color: colors.skillText }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline transition-all"
                      style={{ color: colors.accent }}
                    >
                      🔗 GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline transition-all"
                      style={{ color: colors.accent }}
                    >
                      🚀 Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6 bg-slate-50 p-4 rounded-xl">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Cover Letter</h2>
          <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-justify">{data.coverLetter || "No cover letter available"}</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={onDownloadResume}
            className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white font-semibold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Resume PDF
          </button>
          <button
            onClick={onDownloadCoverLetter}
            className="rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 p-4 text-white font-semibold hover:from-purple-700 hover:to-violet-700 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Cover Letter
          </button>
        </div>
      </div>
    </div>
  );
}
