import React, { useState, useEffect, useRef } from 'react';
import { SIGNUP_URL } from '@/config/app-urls';
import { MessageCircle, Calendar, Send, User, X, ArrowRight, Check, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Message {
  id: number;
  sender: 'iaeva' | 'user';
  text: string;
  timestamp: string;
  options?: Array<{
    id: number;
    text: string;
    action?: string;
  }>;
  type?: 'text' | 'appointment' | 'cta';
  appointmentData?: {
    doctor: string;
    date: string;
    time: string;
  };
}

interface FloatingChatProps {
  className?: string;
}

const FloatingChat: React.FC<FloatingChatProps> = ({ className = "" }) => {
  const { t } = useTranslation('home');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [demoEnded, setDemoEnded] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const doctors = [
    { id: 1, name: t('floating_chat.doctors.doctor1'), specialty: t('floating_chat.specialties.cardiology') },
    { id: 2, name: t('floating_chat.doctors.doctor2'), specialty: t('floating_chat.specialties.pediatrics') },
    { id: 3, name: t('floating_chat.doctors.doctor3'), specialty: t('floating_chat.specialties.traumatology') },
  ];

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (conversationStarted) {
      const initialMessage: Message = {
        id: 1,
        sender: 'iaeva',
        text: t('floating_chat.greeting'),
        timestamp: getCurrentTime(),
        options: [
          { id: 1, text: t('floating_chat.options.schedule_appointment'), action: 'appointment' },
          { id: 2, text: t('floating_chat.options.schedule_info'), action: 'schedule' },
        ]
      };
      setMessages([initialMessage]);
    }
  }, [conversationStarted, t]);

  const simulateTyping = () => {
    setIsTyping(true);
    scrollToBottom();
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText;
    if (!messageText.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: messageText,
      timestamp: getCurrentTime(),
    };

    setMessages([...messages, newUserMessage]);
    setInputText('');
    simulateTyping();

    setTimeout(() => {
      handleIaevaResponse(messageText);
    }, 1000);
  };

  const handleIaevaResponse = (userMessage: string) => {
    setIsTyping(false);
    
    // Si ya terminamos la demo, no hacer nada más
    if (demoEnded) return;

    // Primera respuesta basada en la opción seleccionada por el usuario
    if (userMessage.toLowerCase().includes(t('floating_chat.keywords.appointment').toLowerCase()) || 
        userMessage.toLowerCase().includes(t('floating_chat.keywords.schedule').toLowerCase())) {
      const response: Message = {
        id: messages.length + 2,
        sender: 'iaeva',
        text: t('floating_chat.responses.which_specialist'),
        timestamp: getCurrentTime(),
        options: doctors.map(doctor => ({ 
          id: doctor.id, 
          text: `${doctor.name} - ${doctor.specialty}`,
          action: 'select_doctor'
        }))
      };
      setMessages(prev => [...prev, response]);
    } else if (userMessage.toLowerCase().includes(t('floating_chat.keywords.schedule_info').toLowerCase())) {
      const response: Message = {
        id: messages.length + 2,
        sender: 'iaeva',
        text: t('floating_chat.responses.office_hours'),
        timestamp: getCurrentTime(),
        options: [
          { id: 1, text: t('floating_chat.options.yes_schedule'), action: 'appointment' },
          { id: 2, text: t('floating_chat.options.no_thanks'), action: 'end_demo' }
        ]
      };
      setMessages(prev => [...prev, response]);
    } else if (userMessage.includes(doctors[0].name) || userMessage.includes(doctors[1].name) || userMessage.includes(doctors[2].name)) {
      // Guardar el doctor seleccionado
      const doctorName = userMessage.split(' - ')[0];
      setSelectedDoctor(doctorName);
      
      // Respuesta con cita confirmada para simplificar el flujo
      setTimeout(() => {
        const confirmationMessage: Message = {
          id: messages.length + 3,
          sender: 'iaeva',
          text: t('floating_chat.responses.appointment_confirmed', { doctor: doctorName }),
          timestamp: getCurrentTime(),
          type: 'appointment',
          appointmentData: {
            doctor: doctorName,
            date: t('floating_chat.appointment.date'),
            time: t('floating_chat.appointment.time')
          }
        };
        setMessages(prev => [...prev, confirmationMessage]);
        
        // Mensaje final con CTA después de la confirmación
        setTimeout(() => {
          endDemo();
        }, 1500);
      }, 1000);
    } else if (userMessage.toLowerCase().includes(t('floating_chat.keywords.no_thanks').toLowerCase())) {
      endDemo();
    } else {
      // Respuesta genérica para cualquier otra entrada
      const response: Message = {
        id: messages.length + 2,
        sender: 'iaeva',
        text: t('floating_chat.responses.help_options'),
        timestamp: getCurrentTime(),
        options: [
          { id: 1, text: t('floating_chat.options.schedule_appointment'), action: 'appointment' },
          { id: 2, text: t('floating_chat.options.schedule_info'), action: 'schedule' },
        ]
      };
      setMessages(prev => [...prev, response]);
    }
  };

  const endDemo = () => {
    setDemoEnded(true);
    
    // Mensaje final con CTA
    const demoEndMessage: Message = {
      id: messages.length + 10,
      sender: 'iaeva',
      text: t('floating_chat.demo_end'),
      timestamp: getCurrentTime(),
      type: 'cta'
    };
    
    setMessages(prev => [...prev, demoEndMessage]);
  };

  const handleOptionClick = (optionText: string, action?: string) => {
    handleSendMessage(optionText);
    
    if (action === 'end_demo') {
      setTimeout(() => {
        endDemo();
      }, 1000);
    }
  };

  const startConversation = () => {
    setShowIntro(false);
    setConversationStarted(true);
  };

  const redirectToContact = () => {
    window.location.href = SIGNUP_URL;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={`relative rounded-2xl shadow-lg w-full h-full max-w-md overflow-hidden bg-white flex flex-col ${className}`}>
      {/* Encabezado del chat */}
      <div className="bg-gradient-to-r from-iaeva-blue to-iaeva-purple p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg">IAEVA</h3>
            <p className="text-xs opacity-80">🟢 {t('floating_chat.always_available')}</p>
          </div>
        </div>
        <button 
          className="rounded-full h-8 w-8 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
          aria-label={t('floating_chat.close_chat', 'Cerrar chat')}
        >
          <X size={18} />
        </button>
      </div>

      {/* Contenedor principal del chat */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-50"
      >
        {showIntro ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 p-4 animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-iaeva-blue to-iaeva-purple flex items-center justify-center shadow-md">
              <MessageCircle size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">IAEVA</h2>
            <p className="text-gray-600 max-w-xs">
              {t('floating_chat.intro_text')}
            </p>
            <button 
              onClick={startConversation}
              className="bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white py-3 px-8 rounded-full font-medium shadow-md hover:shadow-lg transform transition hover:-translate-y-1"
            >
              {t('floating_chat.start_chat')}
            </button>
          </div>
        ) : (
          <>
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.sender === 'iaeva' ? 'justify-start' : 'justify-end'}`}
              >
                {message.type === 'appointment' ? (
                  <div className="bg-white rounded-xl shadow-sm p-4 w-full max-w-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" /> {t('floating_chat.appointment_confirmed')}
                      </h4>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {t('floating_chat.confirmed')}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 mb-2">
                      <p className="text-sm font-medium text-gray-800">{message.appointmentData?.doctor}</p>
                      <p className="text-xs text-gray-500">{message.appointmentData?.date} - {message.appointmentData?.time}</p>
                    </div>
                    <div className="flex justify-end">
                      <button className="text-xs text-iaeva-blue flex items-center">
                        <Check className="h-3 w-3 mr-1" /> {t('floating_chat.add_to_calendar')}
                      </button>
                    </div>
                  </div>
                ) : message.type === 'cta' ? (
                  <div className="bg-gradient-to-r from-iaeva-blue/10 to-iaeva-purple/10 rounded-xl p-4 w-full">
                    <p className="text-gray-800 text-sm mb-3">{message.text}</p>
                    <button 
                      onClick={redirectToContact}
                      className="bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white py-2 px-4 rounded-full text-sm font-medium shadow-sm flex items-center"
                    >
                      {t('floating_chat.contact_us')} <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className={`${
                    message.sender === 'iaeva' 
                      ? 'bg-white text-gray-800' 
                      : 'bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white'
                    } rounded-2xl px-4 py-3 max-w-[80%] shadow-sm`}
                  >
                    <p className="text-sm">{message.text}</p>
                    {message.options && (
                      <div className="mt-3 space-y-2">
                        {message.options.map(option => (
                          <button
                            key={option.id}
                            onClick={() => handleOptionClick(option.text, option.action)}
                            className="block w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm transition-colors"
                          >
                            {option.text}
                          </button>
                        ))}
                      </div>
                    )}
                    <span className="text-xs opacity-70 block mt-1 text-right">
                      {message.timestamp}
                    </span>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white rounded-2xl px-4 py-3 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      {/* Input de mensaje */}
      {!showIntro && !demoEnded && (
        <div className="border-t border-gray-200 p-3 bg-white">
          <div className="flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('floating_chat.type_message')}
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-iaeva-blue focus:border-transparent"
            />
            <button
              onClick={() => handleSendMessage()}
              className="ml-2 bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChat;