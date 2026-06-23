"use client";

import { useState, useRef, forwardRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";

interface EducationEntry {
  degree: string;
  school: string;
  year: string;
  score: string;
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

const PrintableResume = forwardRef<HTMLDivElement, { data: any, userData: any }>(
  ({ data, userData }, ref) => {
    const colors = colorConfig[userData.resumeColor as keyof typeof colorConfig] || colorConfig.blue;
    
    return (
      <div ref={ref} className="bg-white" style={{ width: '100%', maxWidth: '210mm', margin: '0 auto' }}>
        <style>{`
          @media print {
            @page {
              size: A4;
              margin: 12mm;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              box-sizing: border-box !important;
            }
            body {
              margin: 0 !important;
              padding: 0 !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            /* Force remove browser headers/footers */
            @page {
              margin: 12mm;
            }
            @page :first {
              margin: 12mm;
            }
          }
          /* Justify text for better readability */
          .justify-text {
            text-align: justify;
          }
          /* Ensure no overflow */
          .no-overflow {
            overflow: visible !important;
          }
        `}</style>
        
        <div style={{ padding: '0', width: '100%' }}>
          {/* Header with Contact Info */}
          <div className="p-3 mb-3" style={{ backgroundColor: colors.headerBg, color: colors.headerText }}>
            <h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
            <div className="flex flex-wrap gap-3 text-xs">
              {userData.email && <div>{userData.email}</div>}
              {userData.phone && <div>{userData.phone}</div>}
              {userData.linkedin && <div>{userData.linkedin}</div>}
              {userData.github && <div>{userData.github}</div>}
            </div>
            <div className="mt-1 text-xs">
              {userData.address}, {userData.state} - {userData.pincode}
            </div>
          </div>

          <section className="mb-3">
            <h2 className="text-lg font-bold mb-1 pb-1" style={{ borderBottom: `2px solid ${colors.border}`, color: colors.accent }}>
              Professional Summary
            </h2>
            <p className="text-slate-700 leading-snug justify-text text-sm">{data.summary || "No summary available"}</p>
          </section>

          <section className="mb-3">
            <h2 className="text-lg font-bold mb-1 pb-1" style={{ borderBottom: `2px solid ${colors.border}`, color: colors.accent }}>
              Education
            </h2>
            <div className="space-y-1">
              {(data.education || []).map((edu: EducationEntry, index: number) => (
                <div key={index} className="border-b border-slate-100 pb-1">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base text-slate-800">{edu.degree}</h3>
                      <p className="text-slate-600 text-xs">{edu.school}</p>
                    </div>
                    <div className="text-right flex-shrink-0 whitespace-nowrap">
                      <p className="font-medium text-slate-700 text-sm">{formatScore(edu.score)}</p>
                      <p className="text-xs text-slate-500">{edu.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-3">
            <h2 className="text-lg font-bold mb-1 pb-1" style={{ borderBottom: `2px solid ${colors.border}`, color: colors.accent }}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-1">
              {(data.skills || []).slice(0, 20).map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ backgroundColor: colors.skillBg, color: colors.skillText }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-3">
            <h2 className="text-lg font-bold mb-1 pb-1" style={{ borderBottom: `2px solid ${colors.border}`, color: colors.accent }}>
              Experience Highlights
            </h2>
            <ul className="space-y-1">
              {(data.experiencePoints || []).map((point: string, index: number) => (
                <li key={index} className="text-slate-700 flex items-start gap-1">
                  <span style={{ color: colors.accent }} className="font-bold mt-0.5 flex-shrink-0 text-xs">•</span>
                  <span className="justify-text text-sm leading-snug">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-1 pb-1" style={{ borderBottom: `2px solid ${colors.border}`, color: colors.accent }}>
              Portfolio
            </h2>
            <div className="space-y-2">
              {(data.projects || []).map((project: any, index: number) => (
                <div key={index} className="p-2 border border-slate-200 rounded-lg">
                  <h3 className="font-bold text-base text-slate-800 mb-0.5">{project.title || "Untitled Project"}</h3>
                  <p className="text-slate-700 mb-1 justify-text text-sm leading-snug">{project.description || "No description available"}</p>
                  <div className="flex flex-wrap gap-1">
                    {(project.technologies || []).map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded text-xs font-medium"
                        style={{ backgroundColor: colors.skillBg, color: colors.skillText }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.githubUrl && (
                      <p className="text-xs text-slate-600">GitHub: {project.githubUrl}</p>
                    )}
                    {project.liveUrl && (
                      <p className="text-xs text-slate-600">Live: {project.liveUrl}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }
);
PrintableResume.displayName = "PrintableResume";

const PrintableCoverLetter = forwardRef<HTMLDivElement, { data: any }>(
  ({ data }, ref) => {
    return (
      <div ref={ref} className="bg-white" style={{ width: '100%', maxWidth: '210mm', margin: '0 auto' }}>
        <style>{`
          @media print {
            @page {
              size: A4;
              margin: 12mm;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              box-sizing: border-box !important;
            }
            body {
              margin: 0 !important;
              padding: 0 !important;
            }
            .keep-together {
              page-break-inside: avoid;
            }
            h1 {
              page-break-after: avoid;
            }
          }
          .justify-text {
            text-align: justify;
          }
        `}</style>
        <div style={{ padding: '0', width: '100%' }}>
          <h1 className="text-2xl font-bold text-slate-800 mb-3 border-b border-slate-200 pb-1">Cover Letter</h1>
          <p className="text-slate-700 whitespace-pre-wrap leading-snug text-sm justify-text">{data.coverLetter || "No cover letter available"}</p>
        </div>
      </div>
    );
  }
);
PrintableCoverLetter.displayName = "PrintableCoverLetter";

type ResumeData = {
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
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResumeData | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const resumePrintRef = useRef<HTMLDivElement>(null);
  const coverLetterPrintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handlePrintResume = useReactToPrint({
    contentRef: resumePrintRef,
    documentTitle: "Professional_Resume",
  });

  const handlePrintCoverLetter = useReactToPrint({
    contentRef: coverLetterPrintRef,
    documentTitle: "Cover_Letter",
  });

  async function handleGenerate(data: any) {
    setLoading(true);
    setError(null);
    setResult(null);
    setUserData(data);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error || "Failed to generate resume");
      }
      
      setResult(responseData);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An error occurred");
    }
    setLoading(false);
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 no-print">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
              <h3 className="font-bold text-lg mb-2">Something went wrong!</h3>
              <p>{error}</p>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ResumeForm onSubmit={handleGenerate} loading={loading} />
            {result && userData && (
              <ResumePreview 
                data={result} 
                userData={userData}
                onDownloadResume={() => handlePrintResume()} 
                onDownloadCoverLetter={() => handlePrintCoverLetter()} 
              />
            )}
            {!result && !loading && (
              <div className="rounded-2xl bg-white p-8 shadow-xl border border-slate-200 flex flex-col items-center justify-center">
                <div className="text-6xl mb-4">📄</div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-2">Ready to Build Your Resume</h2>
                <p className="text-slate-600 text-center">Fill out the form on the left to get started</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Hidden printable content */}
      {hasMounted && result && userData && (
        <>
          <div className="hidden">
            <PrintableResume ref={resumePrintRef} data={result} userData={userData} />
          </div>
          <div className="hidden">
            <PrintableCoverLetter ref={coverLetterPrintRef} data={result} />
          </div>
        </>
      )}
    </>
  );
}
