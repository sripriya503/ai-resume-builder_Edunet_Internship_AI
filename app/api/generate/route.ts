import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("Missing GEMINI_API_KEY in environment variables");
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const body = await req.json();
    console.log("Received request body:", body);

    const prompt = `You are an expert ATS Resume Writer & Portfolio Creator. Respond ONLY with valid JSON in exactly this format:
{
  "headline": "Full Name - Target Role",
  "summary": "4-5 line professional summary",
  "education": [
    {"degree": "B.Tech", "school": "${body.educationBtech?.school || "University Name"}", "year": "${body.educationBtech?.year || "2020-2024"}", "score": "${body.educationBtech?.score || "8.5 CGPA"}"},
    {"degree": "Intermediate (12th)", "school": "${body.educationInter?.school || "College Name"}", "year": "${body.educationInter?.year || "2020"}", "score": "${body.educationInter?.score || "97%"}"},
    {"degree": "10th Class", "school": "${body.education10th?.school || "School Name"}", "year": "${body.education10th?.year || "2018"}", "score": "${body.education10th?.score || "95%"}"}
  ],
  "skills": ["Skill1", "Skill2", "Skill3"],
  "experiencePoints": ["Bullet point 1", "Bullet point 2", "Bullet point 3", "Bullet point 4", "Bullet point 5"],
  "projects": [{"title": "Project Title", "description": "Project description", "technologies": ["Tech1", "Tech2"], "githubUrl": "https://github.com/username/project", "liveUrl": "https://project-demo.com"}],
  "coverLetter": "Full cover letter text"
}

Candidate Details:
- Name: ${body.name || "N/A"}
- Target Role: ${body.targetRole || "N/A"}
- Target Company: ${body.targetCompany || "N/A"}
- Education (10th): ${body.education10th?.school || "N/A"}, ${body.education10th?.year || "N/A"}, ${body.education10th?.score || "N/A"}
- Education (Inter): ${body.educationInter?.school || "N/A"}, ${body.educationInter?.year || "N/A"}, ${body.educationInter?.score || "N/A"}
- Education (B.Tech): ${body.educationBtech?.school || "N/A"}, ${body.educationBtech?.year || "N/A"}, ${body.educationBtech?.score || "N/A"}
- Experience: ${body.experience || "N/A"}
- Skills: ${body.skills || "N/A"}
- Projects: ${body.projects || "N/A"}
- Project GitHub URLs: ${body.projectGithubUrls || "N/A"}
- Project Live URLs: ${body.projectLiveUrls || "N/A"}
- Career Goal: ${body.careerGoal || "N/A"}

IMPORTANT: 
- Education entries should be in reverse chronological order (highest degree first)
- Use the exact education details provided in the Candidate Details
- Return ONLY the JSON - no extra text, no markdown, no backticks!`;

    console.log("Sending request to Gemini...");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || "{}";
    console.log("Raw Gemini response:", text);

    // Clean up response
    let cleanedText = text
      .trim()
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    // Try to find JSON object if it's wrapped
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedText = jsonMatch[0];
    }

    console.log("Cleaned Gemini response:", cleanedText);

    try {
      const parsed = JSON.parse(cleanedText);
      // Format education scores
      if (parsed.education && Array.isArray(parsed.education)) {
        parsed.education = parsed.education.map((edu: any) => ({
          ...edu,
          score: formatScore(edu.score),
        }));
      }

      // Assign user-provided project URLs
      if (parsed.projects && Array.isArray(parsed.projects)) {
        const githubUrls = body.projectGithubUrls 
          ? body.projectGithubUrls.split(',').map((url: string) => url.trim())
          : [];
        const liveUrls = body.projectLiveUrls 
          ? body.projectLiveUrls.split(',').map((url: string) => url.trim())
          : [];

        parsed.projects = parsed.projects.map((project: any, index: number) => ({
          ...project,
          githubUrl: githubUrls[index] || project.githubUrl,
          liveUrl: liveUrls[index] || project.liveUrl,
        }));
      }

      return NextResponse.json(parsed);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Attempted to parse:", cleanedText);
      return NextResponse.json(
        {
          error: "Could not parse AI response. Please try again.",
          raw: cleanedText,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: `Server error: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}