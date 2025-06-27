
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Bot, User } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const UserChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your genetic counselor AI assistant. I can help explain your genetic results, risk factors, and recommendations. What would you like to know about your genetic profile?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const suggestedQuestions = [
    "What does my Type 2 Diabetes risk mean?",
    "Should I be concerned about my Alzheimer's risk?",
    "How do my drug responses affect my medications?",
    "What lifestyle changes should I make?",
    "Can you explain my genetic variants?"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('diabetes')) {
      return "Your Type 2 Diabetes risk is 75%, which is higher than the population average of 45%. This is primarily due to variants in the TCF7L2 gene (rs7903146). However, this doesn't mean you will definitely develop diabetes. I recommend regular blood sugar monitoring, maintaining a healthy weight, and following a low-glycemic diet.";
    }
    
    if (lowerMessage.includes('alzheimer')) {
      return "Your Alzheimer's risk is 55%, slightly above the population average. This is associated with your APOE genotype. While genetics play a role, lifestyle factors are equally important. Consider engaging in regular mental stimulation, maintaining social connections, following a Mediterranean diet, and staying physically active.";
    }
    
    if (lowerMessage.includes('drug') || lowerMessage.includes('medication')) {
      return "Based on your genetic profile, you have variations that affect how you metabolize certain medications. For example, you may need lower doses of warfarin due to CYP2C9 variants. Always inform your healthcare provider about your pharmacogenomic results before starting new medications.";
    }
    
    if (lowerMessage.includes('lifestyle')) {
      return "Based on your genetic profile, I recommend: 1) High-intensity cardio exercise 3x/week (you have fast-twitch muscle fibers), 2) Mediterranean diet with low-glycemic foods, 3) Limit caffeine intake (you're a slow metabolizer), 4) Regular sleep schedule of 7-8 hours, 5) Stress management through meditation or mindfulness.";
    }
    
    return "That's a great question! Your genetic results show several important insights about your health predispositions. Could you be more specific about which aspect you'd like me to explain - disease risks, drug responses, or lifestyle recommendations?";
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <MessageCircle className="h-8 w-8 text-blue-600" />
            Genetic Counselor AI
          </h1>
          <p className="text-muted-foreground">
            Ask questions about your genetic results and get personalized explanations
          </p>
        </div>

        {/* Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Messages */}
          <div className="lg:col-span-3">
            <Card className="glass h-96">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Chat with AI Counselor
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-80">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-start gap-2 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'
                        }`}>
                          {message.type === 'user' ? 
                            <User className="h-4 w-4 text-white" /> : 
                            <Bot className="h-4 w-4 text-white" />
                          }
                        </div>
                        <div className={`p-3 rounded-lg ${
                          message.type === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about your genetic results..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="dna-gradient">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suggested Questions */}
          <div className="lg:col-span-1">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg">Suggested Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-3 text-sm"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card className="glass mt-4">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">
                  <strong>Disclaimer:</strong> This AI provides educational information only. 
                  Always consult healthcare professionals for medical decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserChat;
