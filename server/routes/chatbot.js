import express from 'express';
import { resumeData } from '../data/resumeData.js';
import ChatSession from '../models/ChatSession.js';

const router = express.Router();

// Helper function to score Q&A matching
const findBestResponse = (userMessage) => {
  const message = userMessage.toLowerCase().trim();
  
  if (!message) {
    return "Please ask me something about Ganeshbabu's resume!";
  }

  let bestMatch = null;
  let maxScore = 0;

  for (const qa of resumeData.chatbotQA) {
    let score = 0;
    for (const keyword of qa.keywords) {
      // Check if keyword is in the message (boundary-aware check or simple substring)
      if (message.includes(keyword)) {
        // Higher weight for longer keyword matches
        score += keyword.length;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = qa;
    }
  }

  // Check custom skills specifically if not matched to React/Devops etc.
  if (maxScore > 0 && bestMatch) {
    return bestMatch.answer;
  }

  // Handle generic skills inquiries dynamically if no exact QA matches
  const skillMatch = resumeData.skills.find(s => 
    message.includes(s.category.toLowerCase()) || 
    s.items.some(item => message.includes(item.toLowerCase()))
  );
  
  if (skillMatch) {
    return `Yes! Ganeshbabu has experience in **${skillMatch.category}**, including: ${skillMatch.items.join(', ')}.`;
  }

  // Fallback response
  return "I'm not sure about that specific detail, but I can tell you about Ganeshbabu's React experience, Azure DevOps background, certifications, education, or how to contact him! Feel free to ask one of those or check the UI.";
};

router.post('/', async (req, res) => {
  const { message, sessionId } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const activeSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const botResponse = findBestResponse(message);

  try {
    // If DB is connected, save the log
    if (ChatSession.db.readyState === 1) {
      await ChatSession.findOneAndUpdate(
        { sessionId: activeSessionId },
        {
          $push: {
            messages: [
              { sender: 'user', text: message },
              { sender: 'bot', text: botResponse }
            ]
          },
          $set: { updatedAt: new Date() }
        },
        { upsert: true, new: true }
      );
    }
  } catch (error) {
    console.error('Error logging chat session:', error.message);
    // Continue despite db log failure so chatbot works
  }

  res.json({
    text: botResponse,
    sessionId: activeSessionId
  });
});

// GET endpoint to fetch chat history for a session
router.get('/history/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  
  try {
    if (ChatSession.db.readyState === 1) {
      const session = await ChatSession.findOne({ sessionId });
      if (session) {
        return res.json({ messages: session.messages });
      }
    }
    res.json({ messages: [] });
  } catch (error) {
    console.error('Error fetching chat history:', error.message);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

export default router;
