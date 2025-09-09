// assets/js/main.js

// Footer year
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// --- Plaintext resume that mirrors your current resume.html content ---
// (Used for local file:// downloads or as a fallback if fetch fails.)
const RESUME_FILENAME = 'Matt-McCallum-Resume.txt';
const RESUME_TEXT = `Matt McCallum
AI-Augmented Software Developer & Product Engineer · FastAPI · Vue · Auth0/RBAC · CI/CD · GenAI
Email: orbit9112@gmail.com
LinkedIn: https://www.linkedin.com/in/mcmatt42/

Professional Summary
Innovative and results-driven Software Developer & Technologist with over 3 years of experience designing, developing, and deploying cutting-edge applications. Skilled in AI-augmented development, integrating advanced machine learning models into practical solutions. Holds Secret Security Clearance, enabling contribution to high-security projects. Adept at building robust, scalable systems using FastAPI, Vue.js, and modern cloud technologies. Passionate about creating impactful digital products that leverage AI for efficiency, automation, and user experience.

Experience
123 Cyber Inc. (Contractor) — Software Developer | Apr 2025 – Present
- Rebuilt FastAPI + Vue.js application from the ground up; moved from dev/test to production.
- Integrated AI for report building, voice-to-text transcription, and content summarization.
- Implemented AI-powered workflows to structure unformatted data into actionable insights.
- Optimized backend performance, enhanced UI/UX, and ensured security compliance.
- Reduced manual reporting time by over 50%.

Collabowave — Software Developer | Feb 2025 – Feb 2025
- Built AI-assisted reporting with OpenAI API to improve data capture and field allocation.
- Developed transcription services converting audio into structured reports.
- Implemented Auth0 with role-based access control.
- Transitioned to 123 Cyber Inc. following merger.

ThinkOrbit Innovations Inc. — Founder & Developer | Apr 2024 – Present
- Delivered tailored software and SEO solutions that improved client engagement and rankings.
- Consulted on operational efficiency using innovative tech and automation.
- Developed AI-powered solutions to remove bottlenecks and accelerate workflows.

WithYouWithMe Services Inc. — Software Developer | Jun 2022 – Apr 2024
- Modernized legacy systems for the Canadian Armed Forces to improve performance and security.
- Automated workflows and led cross-functional delivery.
- Built APIs bridging legacy backends to modern frontends; applied AI methods to improve functionality.

Projects
Solar Forecasting Dashboard
- FastAPI + Scikit-Learn: On-prem AI forecaster for solar sites.
- Turns live weather into 48-hour power predictions with peak/maintenance tips, plus map and compare views.

ASDChatBot (React)
- Express.js + OpenAI chat, deployed on Vercel; NLP chat with realtime notifications.
- Production-ready messaging; OpenAI integration; performance optimized for scale.

Solar panel optimizer
- Solar placement optimization using OpenWeather data and geospatial overlays.
- UI for real-time site scoring and potential energy yield.

Instructional Tutorials — Oxford University AI Course
- Published step-by-step series on building simple web apps with modern AI tools.
- Covers AI-assisted generation with step-by-step execution.

Portfolio Website (HTML, JavaScript)
- Clean, fast GitHub Pages site showcasing projects, skills, and outcomes.

Education
Erdos Research — AI and LLM Projects (Ongoing), 2024–Present
Algonquin College — Diploma in Computer Programming, 2022 (Ottawa, ON)
Algonquin College — Diploma in Law and Security, 2007 (Ottawa, ON)

Skills
AI-Augmented Development, Copilot-First, Prompt Engineering, RAG, LLMOps, FastAPI, Vue, Auth0/RBAC, Docker, CI/CD, Observability, Java, Python, C++, C#, JavaScript, SQL, PL/SQL, Git, Jira, Toad for Oracle, AWS, Azure, SQL Server, Node.js, MongoDB, Oracle, PostgreSQL, React Native, Flask, TensorFlow, PyTorch, Keras

Certifications & Awards
- Coursera: Supervised Machine Learning Certification
- Tech Design Sprint: Winning Solution — 2022

Additional Experience
- Construction Career Transition (2020) — Successfully transitioned to software development; transferred project management and troubleshooting strengths.

Security Clearance
- Secret Security Clearance (active).
`;

// Helpers
function blobFromResumeText() {
  return new Blob([RESUME_TEXT], { type: 'text/plain;charset=utf-8' });
}

function triggerDownloadFromBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Public: force a download of resume.txt without navigating
function downloadResumeTxt(event) {
  if (event) event.preventDefault();

  // Local file:// — avoid navigating to file path; use embedded text.
  if (location.protocol === 'file:') {
    triggerDownloadFromBlob(blobFromResumeText(), RESUME_FILENAME);
    return false;
  }

  // Hosted (http/https): try to fetch the actual file; if anything fails, fall back.
  fetch('resume.txt', { cache: 'no-store' })
    .then(r => {
      if (!r.ok) throw new Error('resume.txt not found');
      return r.blob();
    })
    .then(blob => triggerDownloadFromBlob(blob, RESUME_FILENAME))
    .catch(() => triggerDownloadFromBlob(blobFromResumeText(), RESUME_FILENAME));

  return false;
}
window.downloadResumeTxt = downloadResumeTxt;

// Optional: copy resume text to clipboard
async function copyResumeTxt() {
  try {
    if (location.protocol === 'file:') {
      await navigator.clipboard.writeText(RESUME_TEXT);
      alert('Resume text copied to clipboard.');
      return;
    }
    const res = await fetch('resume.txt', { cache: 'no-store' });
    const text = res.ok ? await res.text() : RESUME_TEXT;
    await navigator.clipboard.writeText(text);
    alert('Resume text copied to clipboard.');
  } catch {
    alert('Copy failed. You can open resume.txt and copy manually.');
  }
}
window.copyResumeTxt = copyResumeTxt;
