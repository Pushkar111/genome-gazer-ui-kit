
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Bot, User, Stethoscope, Heart, Brain, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  category?: 'general' | 'urgent' | 'informational';
}

const UserChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI Health Assistant. I can help explain your genetic results, risk factors, and provide personalized health recommendations. What would you like to know about your genetic profile?",
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    { 
      question: "What does my Type 2 Diabetes risk mean?", 
      icon: AlertCircle, 
      category: "Risk Analysis",
      color: "text-orange-600"
    },
    { 
      question: "Should I be concerned about my Alzheimer's risk?", 
      icon: Brain, 
      category: "Neurological",
      color: "text-purple-600"
    },
    { 
      question: "How do my drug responses affect medications?", 
      icon: Stethoscope, 
      category: "Pharmacogenomics",
      color: "text-blue-600"
    },
    { 
      question: "What lifestyle changes should I make?", 
      icon: Heart, 
      category: "Lifestyle",
      color: "text-green-600"
    },
    { 
      question: "Can you explain my genetic variants?", 
      icon: MessageCircle, 
      category: "Genetics",
      color: "text-teal-600"
    }
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
    setIsTyping(true);

    // Simulate bot response with typing indicator
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(inputMessage),
        timestamp: new Date(),
        category: getResponseCategory(inputMessage)
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);

    setInputMessage('');
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('diabetes')) {
      return "Your Type 2 Diabetes risk is 75%, which is higher than the population average of 45%. This is primarily due to variants in the TCF7L2 gene (rs7903146). However, this doesn't mean you will definitely develop diabetes. I recommend regular blood sugar monitoring, maintaining a healthy weight, and following a low-glycemic diet with regular exercise.";
    }
    
    if (lowerMessage.includes('alzheimer')) {
      return "Your Alzheimer's risk is 55%, slightly above the population average. This is associated with your APOE genotype. While genetics play a role, lifestyle factors are equally important. Consider engaging in regular mental stimulation, maintaining social connections, following a Mediterranean diet, and staying physically active to support brain health.";
    }
    
    if (lowerMessage.includes('drug') || lowerMessage.includes('medication')) {
      return "Based on your pharmacogenomic profile, you have variations that affect how you metabolize certain medications. For example, you may need adjusted doses of warfarin due to CYP2C9 variants. Always inform your healthcare provider about your genetic results before starting new medications to ensure optimal dosing and safety.";
    }
    
    if (lowerMessage.includes('lifestyle')) {
      return "Based on your genetic profile, I recommend: 1) High-intensity cardio exercise 3x/week (you have fast-twitch muscle fibers), 2) Mediterranean diet with low-glycemic foods, 3) Limit caffeine intake (you're a slow metabolizer), 4) Regular sleep schedule of 7-8 hours, 5) Stress management through meditation or mindfulness practices.";
    }
    
    return "That's an excellent question! Your genetic results reveal important insights about your health predispositions and how your body responds to various factors. Could you be more specific about which aspect you'd like me to explain - disease risks, drug responses, nutritional needs, or lifestyle recommendations?";
  };

  const getResponseCategory = (message: string): 'general' | 'urgent' | 'informational' => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('urgent') || lowerMessage.includes('emergency')) return 'urgent';
    if (lowerMessage.includes('risk') || lowerMessage.includes('high')) return 'informational';
    return 'general';
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  const getCategoryBadge = (category?: string) => {
    switch (category) {
      case 'urgent':
        return 'bg-red-100 text-red-700 border border-red-200';
      case 'informational':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      default:
        return 'bg-green-100 text-green-700 border border-green-200';
    }
  };

  return (
    <DashboardLayout>
      <div className="container-responsive space-y-6">
        {/* Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 medical-gradient rounded-xl flex items-center justify-center animate-pulse-medical">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            AI Health Assistant
          </h1>
          <p className="text-muted-foreground text-responsive">
            Get personalized explanations about your genetic results and health recommendations
          </p>
        </div>

        {/* Chat Interface */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Chat Messages */}
          <div className="xl:col-span-3">
            <Card className="hospital-card">
              <CardHeader className="border-b border-blue-100">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                  Health Consultation Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col h-[32rem] sm:h-[36rem]">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-start gap-3 max-w-[85%] sm:max-w-3xl ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.type === 'user' 
                              ? 'medical-gradient' 
                              : 'bg-blue-50 border border-blue-200'
                          }`}>
                            {message.type === 'user' ? 
                              <User className="h-5 w-5 text-white" /> : 
                              <Bot className="h-5 w-5 text-blue-600" />
                            }
                          </div>
                          <div className={`rounded-2xl p-4 max-w-full ${
                            message.type === 'user' 
                              ? 'medical-gradient text-white' 
                              : 'bg-blue-50 border border-blue-100 text-gray-800'
                          }`}>
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            {message.category && message.type === 'bot' && (
                              <div className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${getCategoryBadge(message.category)}`}>
                                Medical Info
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center">
                            <Bot className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="border-t border-blue-100 p-4 sm:p-6 bg-blue-50/30">
                    <div className="flex gap-2 sm:gap-3">
                      <Input
                        placeholder="Ask about your genetic results, health risks, or get personalized recommendations..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 input-medical text-sm sm:text-base"
                        disabled={isTyping}
                      />
                      <Button 
                        onClick={handleSendMessage} 
                        className="btn-medical flex-shrink-0"
                        disabled={isTyping || !inputMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                        <span className="hidden sm:inline ml-2">Send</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suggested Questions & Info */}
          <div className="xl:col-span-1 space-y-6">
            {/* Suggested Questions */}
            <Card className="hospital-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  Quick Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedQuestions.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-3 text-xs sm:text-sm border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                    onClick={() => handleSuggestedQuestion(item.question)}
                  >
                    <div className="flex items-start gap-2 w-full">
                      <item.icon className={`h-4 w-4 ${item.color} flex-shrink-0 mt-0.5`} />
                      <div className="text-left">
                        <div className="font-medium">{item.question}</div>
                        <div className="text-xs text-muted-foreground">{item.category}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Health Tips */}
            <Card className="hospital-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Health Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">Daily Tip</span>
                  </div>
                  <p className="text-xs text-green-700">Stay hydrated and maintain regular sleep schedule for optimal genetic expression.</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-800">Exercise</span>
                  </div>
                  <p className="text-xs text-blue-700">Your genetic profile suggests high-intensity interval training 3x per week.</p>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card className="hospital-card border-amber-200 bg-amber-50/50">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-amber-800 mb-1">Medical Disclaimer</p>
                    <p className="text-xs text-amber-700">
                      This AI provides educational information only. Always consult qualified healthcare professionals for medical decisions and treatment plans.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserChat;
