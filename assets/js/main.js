// assets/js/main.js

// Footer year
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// --- Plaintext resume that mirrors your current resume.html content ---
// (Used for local file:// downloads or as a fallback if fetch fails.)
const RESUME_FILENAME = 'Matt-McCallum-Resume.txt';
const RESUME_TEXT = `MATT McCALLUM
AI Full-Stack Software Developer • Ottawa-Gatineau Area • Secret Clearance (Active)
orbit9112@gmail.com • linkedin.com/in/mcmatt42 • mcca0711.github.io/mccallum-portfolio

Profile
Full-stack developer who transitioned into software after years in construction, where I repeatedly saw inefficiencies and failure modes that code could solve better than any tool in my belt. I now build AI-integrated production applications with the same mindset: ship systems that work in the mess of the real world. I specialize in FastAPI, Vue.js, and Python backends with GenAI integrations, including RAG pipelines, voice transcription, and automated reporting. Active Secret Security Clearance, with experience delivering secure systems for government and enterprise environments.

Technical Skills
Languages: Python, JavaScript/TypeScript, SQL, C#, Java, C++
Frontend: Vue.js, React, HTML/CSS, responsive design
Backend & Cloud: FastAPI, Flask, Node.js, PostgreSQL, MongoDB, Docker, AWS, Azure, CI/CD
AI/ML: OpenAI API, RAG, prompt engineering, LLMOps, TensorFlow, PyTorch, Scikit-learn
Security: Auth0/RBAC, OAuth 2.0, Secret Clearance protocols

Experience
Freelance AI Full-Stack Developer
Self-Employed • Apr 2024 - Present
• Build end-to-end AI solutions for clients: workflow automation, intelligent document processing, and systems that turn unstructured data into actionable outputs
• Own the full delivery cycle-requirements gathering with non-technical stakeholders, architecture decisions, implementation, and deployment
• Identify bottlenecks in client operations and propose AI-powered improvements; build lasting relationships through clear communication and reliable delivery

Full-Stack Software Developer
123 Cyber Inc. (Contract) • Apr 2025 - Oct 2025
Platform work continued from Collabowave following acquisition.
• Rebuilt FastAPI + Vue.js web application and deployed through dev, test, and production environments
• Integrated AI features: report generation, voice-to-text transcription, and content summarization
• Reduced manual reporting time by 50% through automated data structuring workflows

Full-Stack Software Developer
Earlier phase: Collabowave • Jan 2025 - Apr 2025
• Built AI-assisted reporting using OpenAI API to improve data capture accuracy and field allocation
• Developed transcription service converting audio into structured, searchable reports
• Implemented Auth0 with role-based access control for secure multi-tenant architecture

Full-Stack Software Developer
WithYouWithMe Services Inc. • Jun 2022 - Apr 2024
• Modernized legacy systems for the Canadian Armed Forces; reduced recurring support incidents by 30%
• Built REST APIs bridging legacy backends to modern Vue.js frontends; integrated AI methods for enhanced functionality
• Collaborated daily with cross-functional teams; automated manual workflows to eliminate repetitive processes

Selected Projects
Solar Forecasting Dashboard: FastAPI + Scikit-learn forecaster turning live weather data into 48-hour power predictions with maintenance recommendations
ASDChatBot: Production Express.js + OpenAI chat application deployed on Vercel; real-time messaging with NLP integration
Solar Panel Optimizer: Placement optimization tool using OpenWeather API and geospatial overlays for real-time site scoring

Education & Certifications
Erdos Research - AI and LLM Projects, 2024-2025
Algonquin College - Diploma, Computer Programming, 2020-2022
Algonquin College - Diploma, Law and Security, 2005-2007
Coursera - Supervised Machine Learning Certification
Fortinet Tech Design Sprint - Winning Solution, 2022

Background
Construction (2008-2020): 12 years managing crews, coordinating across trades, and delivering physical projects under real constraints. Transitioned to software development to solve the inefficiencies I saw every day-bringing project management discipline, troubleshooting instincts, and a bias toward solutions that survive contact with reality.
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

  // Local file:// - avoid navigating to file path; use embedded text.
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

// ===== AI CHATBOT ASSISTANT =====

const chatbotKnowledge = {
  experience: {
    keywords: ['experience', 'work', 'job', 'role', 'position', 'career', 'companies', 'worked'],
    response: `Matt has diverse experience spanning construction and software development:

**Current:** Freelance AI Full-Stack Developer (Apr 2024 - Present) - Building end-to-end AI solutions including workflow automation, intelligent document processing, and systems that turn unstructured data into actionable outputs.

**2025:** Full-Stack Developer at 123 Cyber Inc. & Collabowave (Jan 2025 - Sept 2025, Contract) - Built FastAPI + Vue.js applications with AI features (voice-to-text, report generation). Reduced manual reporting time by 50%.

**2022-2024:** Software Developer at WithYouWithMe (Jun 2022 - Apr 2024) - Modernized legacy systems for the Canadian Armed Forces, reduced support incidents by 30%.

**2008-2020:** 12 years in construction management - Managed crews, coordinated projects, and identified inefficiencies that led him to software development.`
  },

  skills: {
    keywords: ['skills', 'technologies', 'tech stack', 'languages', 'frameworks', 'tools', 'what does he know', 'programming'],
    response: `Matt's technical skills include:

**Languages:** Python, JavaScript/TypeScript, SQL, C#, Java, C++

**Frontend:** Vue.js, React, HTML/CSS, responsive design

**Backend & Cloud:** FastAPI, Flask, Node.js, PostgreSQL, MongoDB, Docker, AWS, Azure, CI/CD

**AI/ML:** OpenAI API, RAG pipelines, prompt engineering, LLMOps, TensorFlow, PyTorch, Scikit-learn

**Security:** Auth0/RBAC, OAuth 2.0, Active Secret Security Clearance

He specializes in AI-augmented development, using copilots and automation to ship faster.`
  },

  projects: {
    keywords: ['projects', 'work samples', 'portfolio', 'built', 'created', 'developed', 'examples'],
    response: `Matt has built several impressive projects:

**Solar Forecasting Dashboard:** FastAPI + Scikit-learn AI forecaster that converts live weather data into 48-hour power predictions with maintenance recommendations.

**ErdosChatBot:** Production Express.js + OpenAI chat application deployed on Vercel with real-time messaging and NLP integration.

**Solar Panel Optimizer:** Placement optimization tool using OpenWeather API and geospatial overlays for real-time site scoring.

All projects demonstrate his ability to integrate AI/ML with production-ready full-stack applications.`
  },

  background: {
    keywords: ['background', 'story', 'transition', 'construction', 'education', 'learned', 'journey', 'how did he', 'why software'],
    response: `Matt's journey is unique and compelling:

**Construction (2008-2020):** 12 years managing construction crews, coordinating across trades, and delivering physical projects. He repeatedly witnessed inefficiencies, data silos, and coordination failures that demanded better solutions.

**Transition (2020):** Decided to learn software development to solve the problems he saw in construction at scale.

**Education (2020-2022):** Earned Computer Programming Diploma from Algonquin College. Won Fortinet Tech Design Sprint in 2022.

**Software Career (2022-Present):** Applied his project management skills and real-world problem-solving approach to building AI-integrated production systems.

His construction background gives him a unique perspective: he builds systems that survive contact with reality.`
  },

  clearance: {
    keywords: ['clearance', 'security', 'secret', 'government', 'classified'],
    response: `Matt holds an **Active Secret Security Clearance**, enabling him to work on government and enterprise projects requiring high-security protocols. This clearance demonstrates his trustworthiness and opens doors to sensitive contract work with Canadian and allied government organizations.`
  },

  contact: {
    keywords: ['contact', 'email', 'reach', 'hire', 'availability', 'linkedin', 'get in touch'],
    response: `You can reach Matt through:

**Email:** orbit9112@gmail.com
**LinkedIn:** linkedin.com/in/mcmatt42
**Portfolio:** mcca0711.github.io/mccallum-portfolio

He's open to freelance opportunities, contract work, and full-time positions that involve AI integration, full-stack development, or product-minded engineering roles.`
  },

  ai: {
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'llm', 'openai', 'rag', 'voice', 'transcription'],
    response: `Matt specializes in practical AI integration:

**RAG Pipelines:** Building retrieval-augmented generation systems for intelligent document processing
**Voice-to-Text:** Implementing transcription services that convert audio into structured, searchable reports
**OpenAI Integration:** Using GPT models for report generation, content summarization, and automated workflows
**LLMOps:** Managing LLM deployments, prompt engineering, and model optimization

His approach: ship AI systems that create measurable business value, not just demos.`
  }
};

function getChatbotResponse(userMessage) {
  const message = userMessage.toLowerCase();

  // Check for greetings
  if (/^(hi|hello|hey|greetings)/.test(message)) {
    return "Hello! I'm here to answer questions about Matt McCallum's experience, skills, projects, and background. What would you like to know?";
  }

  // Check for thank you
  if (/thank|thanks/.test(message)) {
    return "You're welcome! Feel free to ask anything else about Matt's experience or skills.";
  }

  // Search knowledge base
  for (const [topic, data] of Object.entries(chatbotKnowledge)) {
    if (data.keywords.some(keyword => message.includes(keyword))) {
      return data.response;
    }
  }

  // Default response
  return `I can help you learn about Matt's:
• **Experience** - His work history and roles
• **Skills** - Technologies and expertise
• **Projects** - Portfolio work and demos
• **Background** - His unique construction-to-software journey
• **AI Capabilities** - His AI/ML specializations
• **Contact** - How to reach him

What would you like to know?`;
}

function addChatMessage(text, isUser = false) {
  const messagesContainer = document.getElementById('chatbot-messages');

  const messageDiv = document.createElement('div');
  messageDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;

  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = isUser ? '👤' : '🤖';

  const content = document.createElement('div');
  content.className = 'message-content';

  const messageText = document.createElement('div');
  messageText.className = 'message-text';
  messageText.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');

  content.appendChild(messageText);
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);

  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
  const messagesContainer = document.getElementById('chatbot-messages');

  const messageDiv = document.createElement('div');
  messageDiv.className = 'chatbot-message bot';
  messageDiv.id = 'typing-indicator';

  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = '🤖';

  const content = document.createElement('div');
  content.className = 'message-content';

  const typing = document.createElement('div');
  typing.className = 'typing-indicator';
  typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';

  content.appendChild(typing);
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);

  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) indicator.remove();
}

function handleChatbotMessage(message) {
  if (!message.trim()) return;

  addChatMessage(message, true);

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    const response = getChatbotResponse(message);
    addChatMessage(response, false);
  }, 800);
}

// Initialize chatbot
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('chatbot-toggle');
  const closeBtn = document.getElementById('chatbot-close');
  const widget = document.getElementById('chatbot-widget');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const quickBtns = document.querySelectorAll('.quick-btn');

  toggleBtn.addEventListener('click', () => {
    widget.classList.toggle('active');
    if (widget.classList.contains('active')) {
      input.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    widget.classList.remove('active');
  });

  sendBtn.addEventListener('click', () => {
    const message = input.value;
    handleChatbotMessage(message);
    input.value = '';
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const message = input.value;
      handleChatbotMessage(message);
      input.value = '';
    }
  });

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.getAttribute('data-question');
      const questionMap = {
        'experience': 'Tell me about his experience',
        'skills': 'What are his technical skills?',
        'projects': 'What projects has he built?',
        'background': 'Tell me about his background'
      };
      handleChatbotMessage(questionMap[question]);
    });
  });
});
