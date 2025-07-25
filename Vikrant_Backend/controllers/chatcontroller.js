import ChatbotService from '../service/chatservice.js';

const chatbotService = new ChatbotService();

const chatResponse = async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input',
        message: 'Message is required and must be a non-empty string'
      });
    }

    // Sanitize input
    const sanitizedMessage = message.trim();
    
    // Limit message length
    if (sanitizedMessage.length > 1000) {
      return res.status(400).json({
        success: false,
        error: 'Message too long',
        message: 'Message must be less than 1000 characters'
      });
    }

    // Process conversation history if provided
    const processedHistory = Array.isArray(conversationHistory) 
      ? conversationHistory.slice(-10).map(msg => ({
          role: msg.type === 'user' ? 'Customer' : 'Assistant',
          content: msg.text
        }))
      : [];

    const result = await chatbotService.generateResponse(sanitizedMessage, processedHistory);

    if (result.success) {
      res.status(200).json({
        success: true,
        response: result.response,
        timestamp: result.timestamp
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
        message: result.message
      });
    }

  } catch (error) {
    console.error('Chat controller error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Sorry, I encountered an error. Please try again.'
    });
  }
};

export default chatResponse;