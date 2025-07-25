import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const api_key = process.env.GOOGLE_API_KEY;

if (!api_key) {
  throw new Error('GOOGLE_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(api_key);



class ChatbotService {
  constructor() {
    this.model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      }
    });
  }
  system_prompt(){
    const SYSTEM_PROMPT = `You are an expert electric bike assistant for our company. You have extensive knowledge about our electric bike products and services. Here's what you know about our electric bikes:
PRODUCT SPECIFICATIONS:
- Motor: 750W high-torque brushless motor
- Battery: 48V 15Ah lithium-ion battery
- Range: Up to 50 miles per charge (varies by riding mode)
- Speed: Up to 28 mph with pedal assist
- Frame: Lightweight aluminum alloy construction
- Weight: 55 lbs
- Charging time: 4-6 hours for full charge
- Brakes: Hydraulic disc brakes front and rear
- Gears: 7-speed Shimano transmission
- Tires: 26" puncture-resistant tires

FEATURES:
- Smart LCD display with speed, battery, and distance
- GPS tracking and anti-theft alarm
- Mobile app connectivity for ride tracking
- Multiple riding modes (Eco, Normal, Sport, Electric-only)
- USB charging port for devices
- LED headlight and taillight included
- Removable battery for easy charging

PRICING & WARRANTY:
- Base model: $1,299
- Premium model: $1,599
- 2-year warranty on frame and components
- 1-year warranty on battery
- Free shipping and assembly

MAINTENANCE:
- Regular tire pressure checks
- Chain lubrication every 100 miles
- Battery care tips for longevity
- Seasonal maintenance recommendations

    Always be helpful, friendly, and knowledgeable. If asked about topics outside of electric bikes, politely redirect to bike-related topics. Keep responses concise but informative.`;
    return SYSTEM_PROMPT;
  }
  async generateResponse(userMessage, conversationHistory = []) {
    try {
      // Build conversation context
      const SYSTEM_PROMPT=this.system_prompt();
      let conversationContext = SYSTEM_PROMPT + '\n\n';
      
      // Add conversation history if provided
      if (conversationHistory.length > 0) {
        conversationContext += 'Previous conversation:\n';
        conversationHistory.forEach(msg => {
          conversationContext += `${msg.role}: ${msg.content}\n`;
        });
      }
      
      // Add current user message
      conversationContext += `Customer: ${userMessage}\nAssistant:`;

      const result = await this.model.generateContent(conversationContext);
      const response = await result.response;
      
      if (!response || !response.text) {
        throw new Error('No response generated');
      }
      
      return {
        success: true,
        response: response.text(),
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Handle specific error types
      if (error.message.includes('API key')) {
        return {
          success: false,
          error: 'Invalid API key',
          message: 'Please check your Google API key configuration'
        };
      }
      
      if (error.message.includes('quota')) {
        return {
          success: false,
          error: 'Quota exceeded',
          message: 'API quota exceeded. Please try again later.'
        };
      }
      
      return {
        success: false,
        error: 'Generation failed',
        message: 'Sorry, I encountered an error. Please try again.',
        details: error.message
      };
    }
  }
}

export default ChatbotService;




































// // Usage example
// async function testChatbot() {
//   const chatbot = new ChatbotService();
  
//   try {
//     const conversationHistory = [
//       { role: 'Customer', content: 'What are the features of the electric bike?' },
//       { role: 'Assistant', content: 'Our electric bikes come with many great features...' }
//     ];
    
//     const result2 = await chatbot.generateResponse("What about the Feature", conversationHistory);
    
//     if (result2.success) {
//       console.log('Follow-up Response:', result2.response);
//        console.log('result2 responce');
//     } else {
//       console.error('Error:', result2.error, result2.message);
//     }
    
//   } catch (error) {
//     console.error('Test failed:', error);
//   }
// }

// async function caller (){
//       try{
//         testChatbot();
//       }
//       catch(error){
//         console.log(error);
        
//       }
// }

// caller()