import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

// helper function
const generateText = async (prompt) => {
    const result = await ai.generateContent(prompt);
    return result.response.text();
};

//controller for enhancing a resume's professional summary
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const prompt = `
You are an expert in resume writing.
Enhance the following professional summary.
Keep it 1-2 sentences, ATS-friendly, and impactful.

Text:
${userContent}
        `;

        const enhancedContent = await generateText(prompt);

        return res.status(200).json({ enhancedContent });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

//controller for enhancing job description
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const prompt = `
You are an expert in resume writing.
Enhance this job description in 1-2 sentences.
Use action verbs and quantify impact.

Text:
${userContent}
        `;

        const enhancedContent = await generateText(prompt);

        return res.status(200).json({ enhancedContent });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

//upload resume (AI extraction)
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const prompt = `
Extract structured data from this resume:

${resumeText}

Return ONLY valid JSON:

{
  "professional_summary": "string",
  "skills": ["string"],
  "personal_info": {
    "full_name": "string",
    "profession": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedIn": "string",
    "website": "string"
  },
  "experience": [],
  "projects": [],
  "education": []
}
        `;

        let extractedData = await generateText(prompt);

        // clean markdown
        if (extractedData.includes('```')) {
            extractedData = extractedData.split('```')[1].replace('json', '');
        }

        const parsedData = JSON.parse(extractedData.trim());

        const newResume = await Resume.create({ userId, title, ...parsedData });

        return res.json({ resumeId: newResume._id });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

//analyze resume
export const analyzeResume = async (req, res) => {
    try {
        const { resumeText } = req.body;

        if (!resumeText) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const prompt = `
Analyze this resume for ATS:

${resumeText}

Return ONLY JSON:

{
  "ats_score": number,
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "summary": ""
}
        `;

        let analysisData = await generateText(prompt);

        if (analysisData.includes('```')) {
            analysisData = analysisData.split('```')[1].replace('json', '');
        }

        return res.json(JSON.parse(analysisData.trim()));

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};