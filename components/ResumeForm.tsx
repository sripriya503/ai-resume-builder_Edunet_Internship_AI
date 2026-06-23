"use client";

import { useState } from "react";
import { Loader2, Sparkles, Briefcase, GraduationCap, Code, FileText, Palette } from "lucide-react";

interface EducationEntry {
  degree: string;
  school: string;
  year: string;
  score: string;
}

interface ResumeFormData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  address: string;
  state: string;
  pincode: string;
  resumeColor: string;
  education10th: EducationEntry;
  educationInter: EducationEntry;
  educationBtech: EducationEntry;
  experience: string;
  skills: string;
  projects: string;
  careerGoal: string;
  targetCompany: string;
  targetRole: string;
}

interface ResumeFormProps {
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
}

const colorOptions = [
  { value: "none", label: "No Color", primary: "#ffffff", accent: "#000000" },
  { value: "blue", label: "Blue", primary: "#3b82f6", accent: "#1e40af" },
  { value: "green", label: "Green", primary: "#10b981", accent: "#065f46" },
  { value: "purple", label: "Purple", primary: "#8b5cf6", accent: "#4c1d95" },
  { value: "orange", label: "Orange", primary: "#f97316", accent: "#c2410c" },
];

export default function ResumeForm({ onSubmit, loading }: ResumeFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      linkedin: formData.get("linkedin") as string,
      github: formData.get("github") as string,
      address: formData.get("address") as string,
      state: formData.get("state") as string,
      pincode: formData.get("pincode") as string,
      resumeColor: formData.get("resumeColor") as string,
      education10th: {
        degree: "10th Class",
        school: formData.get("school10th") as string,
        year: formData.get("year10th") as string,
        score: formData.get("score10th") as string,
      },
      educationInter: {
        degree: "Intermediate (12th)",
        school: formData.get("schoolInter") as string,
        year: formData.get("yearInter") as string,
        score: formData.get("scoreInter") as string,
      },
      educationBtech: {
        degree: "B.Tech",
        school: formData.get("schoolBtech") as string,
        year: formData.get("yearBtech") as string,
        score: formData.get("scoreBtech") as string,
      },
      experience: formData.get("experience") as string,
      skills: formData.get("skills") as string,
      projects: formData.get("projects") as string,
      projectGithubUrls: formData.get("projectGithubUrls") as string,
      projectLiveUrls: formData.get("projectLiveUrls") as string,
      careerGoal: formData.get("careerGoal") as string,
      targetCompany: formData.get("targetCompany") as string,
      targetRole: formData.get("targetRole") as string,
    };
    await onSubmit(data);
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-xl border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI Resume & Portfolio Builder
          </h1>
          <p className="text-slate-500">Create a professional ATS-optimized resume and portfolio in seconds</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              name="name"
              placeholder="John Doe"
              className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
            <input
              name="phone"
              placeholder="+1 (555) 000-0000"
              className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn URL</label>
            <input
              name="linkedin"
              placeholder="linkedin.com/in/johndoe"
              className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <Code className="w-4 h-4 inline mr-1" /> GitHub URL
            </label>
            <input
              name="github"
              placeholder="github.com/johndoe"
              className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <Palette className="w-4 h-4 inline mr-1" /> Resume Color
            </label>
            <select
              name="resumeColor"
              defaultValue="blue"
              className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              {colorOptions.map((color) => (
                <option key={color.value} value={color.value}>{color.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Address Fields */}
        <div className="border-t border-slate-200 pt-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Address</h3>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Street Address</label>
            <textarea
              name="address"
              placeholder="123 Main St, Apt 4B"
              rows={2}
              className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
              <input
                name="state"
                placeholder="California"
                className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pin Code</label>
              <input
                name="pincode"
                placeholder="123456"
                className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>
        </div>

        {/* Education Sections */}
        <div className="border-t border-slate-200 pt-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Education</h3>

          {/* 10th Class */}
          <div className="mb-4">
            <h4 className="text-md font-medium text-slate-700 mb-2">10th Class</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">School/Board</label>
                <input
                  name="school10th"
                  placeholder="e.g., CBSE Board"
                  className="w-full rounded-lg border border-slate-300 p-2 focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Year</label>
                <input
                  name="year10th"
                  placeholder="e.g., 2018"
                  className="w-full rounded-lg border border-slate-300 p-2 focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Percentage/CGPA</label>
                <input
                  name="score10th"
                  placeholder="e.g., 95%"
                  className="w-full rounded-lg border border-slate-300 p-2 focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Intermediate (12th) */}
          <div className="mb-4">
            <h4 className="text-md font-medium text-slate-700 mb-2">Intermediate (12th)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">College/Board</label>
                <input
                  name="schoolInter"
                  placeholder="e.g., Narayana Junior College"
                  className="w-full rounded-lg border border-slate-300 p-2 focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Year</label>
                <input
                  name="yearInter"
                  placeholder="e.g., 2020"
                  className="w-full rounded-lg border border-slate-300 p-2 focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Percentage/CGPA</label>
                <input
                  name="scoreInter"
                  placeholder="e.g., 97%"
                  className="w-full rounded-lg border border-slate-300 p-2 focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* B.Tech */}
          <div className="mb-4">
            <h4 className="text-md font-medium text-slate-700 mb-2">B.Tech</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">University/College</label>
                <input
                  name="schoolBtech"
                  placeholder="e.g., JNTUH"
                  className="w-full rounded-lg border border-slate-300 p-2 focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Year</label>
                <input
                  name="yearBtech"
                  placeholder="e.g., 2020-2024"
                  className="w-full rounded-lg border border-slate-300 p-2 focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">CGPA</label>
                <input
                  name="scoreBtech"
                  placeholder="e.g., 8.5"
                  className="w-full rounded-lg border border-slate-300 p-2 focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            <Briefcase className="w-4 h-4 inline mr-1" /> Experience
          </label>
          <textarea
            name="experience"
            placeholder="Describe your work experience, internships, or relevant roles..."
            rows={3}
            className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Skills (comma separated)</label>
          <textarea
            name="skills"
            placeholder="e.g., JavaScript, React, Node.js, Python, SQL"
            rows={2}
            className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <div className="border-t border-slate-200 pt-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Portfolio Projects</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Projects</label>
              <textarea
                name="projects"
                placeholder="List your projects with descriptions..."
                rows={3}
                className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Project GitHub URLs (comma separated)</label>
                <input
                  name="projectGithubUrls"
                  placeholder="https://github.com/username/project1, https://github.com/username/project2"
                  className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Project Live URLs (comma separated)</label>
                <input
                  name="projectLiveUrls"
                  placeholder="https://project1-demo.com, https://project2-demo.com"
                  className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Career Goal</label>
          <textarea
            name="careerGoal"
            placeholder="What are your career aspirations?"
            rows={2}
            className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Role</label>
            <input
              name="targetRole"
              placeholder="e.g., Software Engineer"
              className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Company</label>
            <input
              name="targetCompany"
              placeholder="e.g., Google"
              className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Resume...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Professional Resume & Portfolio
            </>
          )}
        </button>
      </form>
    </div>
  );
}
