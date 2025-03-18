import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Calendar, Send, User, X, ArrowRight, Check, Info } from 'lucide-react';

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
    { id: 1, name: 'Dr. García', specialty: 'Cardiología' },
    { id: 2, name: 'Dra. Martínez', specialty: 'Pediatría' },
    { id: 3, name: 'Dr. Rodríguez', specialty: 'Traumatología' },
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
        text: '¡Hola! Soy IAEVA, tu asistente virtual para el sistema de salud. ¿En qué puedo ayudarte hoy?',
        timestamp: getCurrentTime(),
        options: [
          { id: 1, text: 'Agendar una cita', action: 'appointment' },
          { id: 2, text: 'Información sobre horarios', action: 'schedule' },
        ]
      };
      setMessages([initialMessage]);
    }
  }, [conversationStarted]);

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
    if (userMessage.toLowerCase().includes('cita') || userMessage.toLowerCase().includes('agendar')) {
      const response: Message = {
        id: messages.length + 2,
        sender: 'iaeva',
        text: 'Por supuesto, te ayudaré a agendar una cita. ¿Con qué especialista te gustaría consultar?',
        timestamp: getCurrentTime(),
        options: doctors.map(doctor => ({ 
          id: doctor.id, 
          text: `${doctor.name} - ${doctor.specialty}`,
          action: 'select_doctor'
        }))
      };
      setMessages(prev => [...prev, response]);
    } else if (userMessage.toLowerCase().includes('horario')) {
      const response: Message = {
        id: messages.length + 2,
        sender: 'iaeva',
        text: 'Nuestro horario de atención es de lunes a viernes de 8:00 a 20:00 y sábados de 9:00 a 14:00. ¿Te gustaría agendar una cita ahora?',
        timestamp: getCurrentTime(),
        options: [
          { id: 1, text: 'Sí, quiero agendar una cita', action: 'appointment' },
          { id: 2, text: 'No, gracias', action: 'end_demo' }
        ]
      };
      setMessages(prev => [...prev, response]);
    } else if (userMessage.includes('Dr. García') || userMessage.includes('Dra. Martínez') || userMessage.includes('Dr. Rodríguez')) {
      // Guardar el doctor seleccionado
      const doctorName = userMessage.split(' - ')[0];
      setSelectedDoctor(doctorName);
      
      // Respuesta con cita confirmada para simplificar el flujo
      setTimeout(() => {
        const confirmationMessage: Message = {
          id: messages.length + 3,
          sender: 'iaeva',
          text: `¡Perfecto! Te he agendado una cita con ${doctorName} para mañana a las 10:30.`,
          timestamp: getCurrentTime(),
          type: 'appointment',
          appointmentData: {
            doctor: doctorName,
            date: 'Martes, 12 de Marzo',
            time: '10:30'
          }
        };
        setMessages(prev => [...prev, confirmationMessage]);
        
        // Mensaje final con CTA después de la confirmación
        setTimeout(() => {
          endDemo();
        }, 1500);
      }, 1000);
    } else if (userMessage.toLowerCase().includes('no, gracias')) {
      endDemo();
    } else {
      // Respuesta genérica para cualquier otra entrada
      const response: Message = {
        id: messages.length + 2,
        sender: 'iaeva',
        text: '¿Puedo ayudarte con alguna de estas opciones?',
        timestamp: getCurrentTime(),
        options: [
          { id: 1, text: 'Agendar una cita', action: 'appointment' },
          { id: 2, text: 'Información sobre horarios', action: 'schedule' },
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
      text: '👋 Esta ha sido una demostración breve de IAEVA, nuestro asistente virtual para sistemas de salud. Para ver una demo completa personalizada a las necesidades de tu centro, ¡contáctanos!',
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
    window.location.href = '/contacto';
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
            <p className="text-xs opacity-80">🟢 Siempre disponible</p>
          </div>
        </div>
        <button 
          className="rounded-full h-8 w-8 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
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
              Tu asistente virtual de MedicalCare. Puedo ayudarte a agendar citas, responder preguntas y mucho más.
            </p>
            <button 
              onClick={startConversation}
              className="bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white py-3 px-8 rounded-full font-medium shadow-md hover:shadow-lg transform transition hover:-translate-y-1"
            >
              Iniciar
            </button>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                {message.sender === 'iaeva' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-iaeva-blue to-iaeva-purple flex-shrink-0 mr-2 flex items-center justify-center text-white overflow-hidden">
                    <MessageCircle size={16} />
                  </div>
                )}
                
                <div className={`max-w-xs ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
                  {message.type === 'appointment' ? (
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex items-center gap-2 mb-2 text-iaeva-purple font-medium">
                        <Calendar size={16} />
                        <span>Cita Confirmada</span>
                        <Check size={16} className="text-purple-500" />
                      </div>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Especialista:</span> {message.appointmentData?.doctor}</p>
                        <p><span className="font-medium">Fecha:</span> {message.appointmentData?.date}</p>
                        <p><span className="font-medium">Hora:</span> {message.appointmentData?.time}</p>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
                        <span>ID Cita: #IAE{Math.floor(Math.random() * 10000)}</span>
                        <span>{message.timestamp}</span>
                      </div>
                    </div>
                  ) : message.type === 'cta' ? (
                    <div className="bg-white p-4 rounded-xl shadow-sm border-2 border-iaeva-purple">
                      <p className="text-sm mb-3">{message.text}</p>
                      <button 
                        onClick={redirectToContact}
                        className="w-full bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white py-2 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transform transition hover:-translate-y-1 flex items-center justify-center gap-2"
                      >
                        <span>Reservar mi demo personalizada</span>
                        <ArrowRight size={16} />
                      </button>
                      <div className="text-xs mt-3 opacity-70 text-right">
                        {message.timestamp}
                      </div>
                    </div>
                  ) : (
                    <div 
                      className={`p-3 rounded-xl ${
                        message.sender === 'user' 
                          ? 'bg-iaeva-purple text-white rounded-br-none' 
                          : 'bg-white border border-gray-200 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className="text-xs mt-1 opacity-70 text-right">
                        {message.timestamp}
                      </div>
                    </div>
                  )}
                  
                  {message.options && (
                    <div className="mt-2 space-y-2">
                      {message.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleOptionClick(option.text, option.action)}
                          className="bg-white text-left w-full p-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm flex justify-between items-center"
                        >
                          <span>{option.text}</span>
                          <ArrowRight size={14} className="text-iaeva-purple" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 ml-2 flex items-center justify-center overflow-hidden">
                    <User size={16} className="text-gray-500" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex mb-4 animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-iaeva-blue to-iaeva-purple flex-shrink-0 mr-2 flex items-center justify-center text-white">
                  <MessageCircle size={16} />
                </div>
                <div className="bg-white p-3 rounded-xl rounded-bl-none border border-gray-200 flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef}></div>
          </>
        )}
      </div>

      {/* Pie del chat con entrada de texto */}
      {!showIntro && !demoEnded && (
        <div className="p-3 bg-white border-t border-gray-200">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder="Escribe tu mensaje..."
                className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-iaeva-blue/40 focus:border-iaeva-blue"
              />
            </div>
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white p-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
      
      {/* Nota de pie */}
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
          <Info size={12} />
          Asistente virtual IAEVA - Atención médica inteligente
        </p>
      </div>
    </div>
  );
};

export default FloatingChat;