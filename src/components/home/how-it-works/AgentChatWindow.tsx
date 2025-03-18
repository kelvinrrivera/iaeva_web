import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, Send, User, Clock, Bot, Bell, 
  Info, X, Paperclip, AlertCircle, Search as SearchIcon, 
  MoreVertical, Menu, ArrowLeft, CheckCircle
} from 'lucide-react';

// Componente principal de chat para la demostración
const IAEVAChatDemo = () => {
  // Estados principales
  const [activeTab, setActiveTab] = useState('todas');
  const [selectedChat, setSelectedChat] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [typing, setTyping] = useState(false);
  const [message, setMessage] = useState('');
  const [showSmallScreenSidebar, setShowSmallScreenSidebar] = useState(false);
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Datos simulados de las conversaciones (reducidos para la demostración)
  const conversations = [
    {
      id: 1,
      patient: "María García",
      department: "Cardiología",
      status: "activa",
      unread: 2,
      urgent: true,
      lastMessage: "5 min",
      avatar: "MG",
      patientInfo: {
        age: 57,
        lastVisit: "15/02/2025",
        doctor: "Dr. Ramírez",
        medications: ["Enalapril 10mg", "Aspirina 100mg"],
        allergies: ["Penicilina"],
        recentTests: ["Electrocardiograma (25/02/2025)", "Análisis de sangre (24/02/2025)"]
      },
      messages: [
        { sender: "iaeva", content: "Hola María, soy IAEVA, asistente virtual de la Clínica San Rafael. ¿En qué puedo ayudarte hoy?", time: "10:05" },
        { sender: "patient", content: "Hola, necesito una cita con el cardiólogo. He tenido molestias en el pecho últimamente.", time: "10:06" },
        { sender: "iaeva", content: "Entiendo tu preocupación, María. Para agendar una cita con cardiología, necesito algunos datos. ¿Podrías indicarme si eres paciente regular de nuestra clínica?", time: "10:06" },
        { sender: "patient", content: "Sí, fui hace 3 meses con el Dr. Ramírez", time: "10:07" },
        { sender: "iaeva", content: "Perfecto. Veo tu historial. El Dr. Ramírez tiene disponibilidad este jueves a las 9:00 am o el viernes a las 3:30 pm. ¿Alguna de estas opciones te funciona?", time: "10:08" },
        { sender: "patient", content: "El jueves a las 9 estaría bien", time: "10:10" },
        { sender: "iaeva", content: "Excelente. He reservado tu cita para el jueves a las 9:00 am con el Dr. Ramírez en Cardiología. ¿Necesitas que te envíe un recordatorio por SMS?", time: "10:10" }
      ]
    },
    {
      id: 2,
      patient: "Carlos Rodríguez",
      department: "Traumatología",
      status: "activa",
      unread: 0,
      urgent: false,
      lastMessage: "15 min",
      avatar: "CR",
      patientInfo: {
        age: 42,
        lastVisit: "10/02/2025",
        doctor: "Dra. Méndez",
        medications: ["Ibuprofeno 600mg"],
        allergies: [],
        recentTests: ["Radiografía de rodilla (05/02/2025)"]
      },
      messages: [
        { sender: "iaeva", content: "Hola Carlos, soy IAEVA, asistente virtual de la Clínica San Rafael. ¿En qué puedo ayudarte hoy?", time: "09:45" },
        { sender: "patient", content: "Buenas, tengo una radiografía programada para mañana pero necesito cambiarla", time: "09:46" },
        { sender: "iaeva", content: "Claro Carlos, puedo ayudarte con eso. Veo que tienes una radiografía de rodilla programada para mañana a las 11:00 am. ¿Para cuándo te gustaría reprogramarla?", time: "09:47" },
        { sender: "patient", content: "¿Tienen disponibilidad para el viernes?", time: "09:48" },
        { sender: "iaeva", content: "Déjame verificar... Tenemos disponibilidad el viernes a las 10:15 am o a las 4:30 pm. ¿Alguno de esos horarios te conviene?", time: "09:50" },
        { sender: "patient", content: "A las 10:15 estaría perfecto", time: "09:51" },
        { sender: "agent", content: "Hola Carlos, soy Leticia del departamento de Traumatología. He confirmado tu cita para el viernes a las 10:15 am. Por favor recuerda venir con 15 minutos de anticipación y traer tu orden médica. ¿Hay algo más en lo que pueda ayudarte?", time: "09:55" }
      ]
    },
    {
      id: 3,
      patient: "Javier Mendoza",
      department: "Laboratorio",
      status: "espera",
      unread: 1,
      urgent: true,
      lastMessage: "2 min",
      avatar: "JM",
      patientInfo: {
        age: 35,
        lastVisit: "20/02/2025",
        doctor: "Dr. Suárez",
        medications: ["Levotiroxina 50mg"],
        allergies: ["Látex"],
        recentTests: ["Análisis completo de laboratorio (20/02/2025)"]
      },
      messages: [
        { sender: "iaeva", content: "Hola Javier, soy IAEVA, asistente virtual de la Clínica San Rafael. ¿En qué puedo ayudarte hoy?", time: "10:15" },
        { sender: "patient", content: "Hola, me gustaría saber si ya están mis resultados de laboratorio", time: "10:16" },
        { sender: "iaeva", content: "Con gusto te ayudo a verificar. ¿Me podrías proporcionar tu número de identificación para buscar tus resultados?", time: "10:16" },
        { sender: "patient", content: "Mi número es 45789632", time: "10:17" },
        { sender: "iaeva", content: "Gracias. Estoy consultando en nuestro sistema... Veo que tus exámenes de sangre fueron realizados ayer. Los resultados aún están en proceso. Normalmente tardan 48 horas. ¿Deseas que un especialista de laboratorio te brinde más información?", time: "10:18" },
        { sender: "patient", content: "Sí por favor, es que mi médico me dijo que estarían hoy y tengo consulta esta tarde", time: "10:19" }
      ]
    }
  ];

  // Efecto para hacer scroll al último mensaje
  useEffect(() => {
    if (messagesEndRef.current) {
      // Obtener el contenedor de mensajes (el elemento padre o ancestro con scroll)
      const messageContainer = document.querySelector('.flex-1.overflow-y-auto.p-4');
      
      if (messageContainer) {
        // Desplazar solo dentro del contenedor de mensajes
        messageContainer.scrollTop = messageContainer.scrollHeight;
      } else {
        // Alternativa más segura que no afecta al scroll de la página
        messagesEndRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        });
      }
    }
  }, [selectedChat, typing]);
  
  // Animación de entrada al cargar
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);

  // Simular efecto de escritura al cambiar de chat
  useEffect(() => {
    if (selectedChat !== null) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
      }, 1500);
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // En una demo, solo simulamos el envío
      setMessage('');
      // Simular respuesta
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Alternar visibilidad del panel lateral en pantallas pequeñas
  const toggleSmallScreenSidebar = () => {
    setShowSmallScreenSidebar(!showSmallScreenSidebar);
  };

  // Función para generar el color de fondo del avatar basado en nombre
  const getAvatarColor = (name) => {
    const colors = [
      'from-pink-500 to-rose-500',
      'from-indigo-500 to-blue-500',
      'from-amber-500 to-orange-500',
      'from-emerald-500 to-green-500', 
      'from-blue-500 to-green-500' 
    ];
    
    // Usar la primera letra del nombre para determinar el color
    const firstChar = name.charAt(0).toLowerCase();
    const index = firstChar.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Renderizar la lista de chats
  const renderChatList = () => {
    const filteredConversations = conversations.filter(
      convo => activeTab === 'todas' || 
               (activeTab === 'urgente' ? convo.urgent : convo.status === activeTab)
    );
    
    return (
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((convo, index) => (
          <div 
            key={convo.id} 
            className={`flex items-center p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-all duration-200 
              ${selectedChat === index ? 'bg-gradient-to-r from-indigo-50 to-green-50 border-l-4 border-indigo-500' : ''}
              ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            style={{ transitionDelay: `${index * 50}ms` }}
            onClick={() => {
              setSelectedChat(index);
              setShowSmallScreenSidebar(false);
            }}
          >
            <div className="relative">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium
                bg-gradient-to-br ${getAvatarColor(convo.patient)}`}>
                {convo.avatar}
              </div>
              {convo.urgent && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <AlertCircle size={12} className="text-white" />
                </div>
              )}
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900 truncate">{convo.patient}</span>
                <span className="text-xs text-gray-500 flex items-center ml-1 flex-shrink-0">
                  <Clock size={12} className="mr-1" />
                  {convo.lastMessage}
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${convo.status === 'activa' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                  <span className="text-xs text-gray-600 truncate">{convo.department}</span>
                </div>
                {convo.unread > 0 && (
                  <span className="bg-gradient-to-r bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white text-xs px-2 py-0.5 rounded-full animate-pulse ml-1 flex-shrink-0">
                    {convo.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Renderizar los mensajes
  const renderMessages = () => {
    if (selectedChat === null || conversations.length === 0) return null;
    const chat = conversations[selectedChat];
    
    return (
      <div className="space-y-4">
        {/* Fecha de inicio de conversación */}
        <div className="text-center my-6">
          <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-500">
            Hoy, {new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long' })}
          </div>
        </div>
        
        {chat.messages.map((msg, index) => {
          const isUser = msg.sender === 'patient';
          const isIAEVA = msg.sender === 'iaeva';
          const isAgent = msg.sender === 'agent';
          
          // Calcular retraso de animación basado en índice
          const delay = isLoaded ? index * 100 : 0;
          
          return (
            <div 
              key={index} 
              className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end`}
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                transitionDelay: `${delay}ms`
              }}
            >
              {/* Avatar para IAEVA o agente */}
              {!isUser && (
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mr-2 
                  ${isIAEVA ? 'bg-gradient-to-br from-blue-500 to-indigo-500' : 'bg-gradient-to-br from-emerald-500 to-teal-500'}`}>
                  {isIAEVA ? (
                    <Bot className="text-white" size={16} />
                  ) : (
                    <User className="text-white" size={16} />
                  )}
                </div>
              )}
              
              <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 shadow-sm ${
                isUser ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-tr-none' : 
                isIAEVA ? 'bg-white border border-gray-200 rounded-tl-none' : 
                'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-tl-none'
              }`}>
                {(isIAEVA || isAgent) && (
                  <div className={`font-bold text-xs mb-1 ${isIAEVA ? 'text-indigo-600' : 'text-emerald-700'}`}>
                    {isIAEVA ? 'IAEVA (IA)' : 'Agente: Leticia'}
                  </div>
                )}
                <p className={`text-sm break-words ${isUser ? 'text-white' : 'text-gray-800'}`}>{msg.content}</p>
                <div className={`text-right mt-1 flex items-center justify-end ${isUser ? 'text-indigo-100' : 'text-gray-500'}`}>
                  <span className="text-xs">{msg.time}</span>
                  {isUser && <CheckCircle size={12} className="inline ml-1 text-white" />}
                </div>
              </div>
              
              {/* Avatar para usuario */}
              {isUser && (
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ml-2 
                  bg-gradient-to-br ${getAvatarColor(chat.patient)}`}>
                  <span className="text-xs font-medium text-white">{chat.avatar}</span>
                </div>
              )}
            </div>
          );
        })}
        
        {/* Indicador de "escribiendo..." */}
        {typing && (
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mr-2 bg-gradient-to-br from-blue-500 to-indigo-500">
              <Bot className="text-white" size={16} />
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3 rounded-tl-none inline-block">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{animationDelay: '200ms'}}></div>
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{animationDelay: '400ms'}}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Elemento invisible para hacer scroll */}
        <div ref={messagesEndRef} />
      </div>
    );
  };
  
  // Información del paciente
  const renderPatientInfo = () => {
    if (selectedChat === null) return null;
    const patient = conversations[selectedChat];
    
    return (
      <div className="w-full h-full flex flex-col bg-white border-l border-gray-200 overflow-auto">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-green-50 flex justify-between items-center">
          <h3 className="font-bold text-lg">Información del Paciente</h3>
          <button 
            onClick={() => setShowPatientInfo(false)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold
              bg-gradient-to-br ${getAvatarColor(patient.patient)}`}>
              {patient.avatar}
            </div>
            <div className="ml-4">
              <h4 className="font-bold text-xl">{patient.patient}</h4>
              <div className="flex items-center text-gray-600">
                <span className="text-sm">{patient.patientInfo.age} años</span>
                <span className="mx-2">•</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  patient.status === 'activa' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {patient.status === 'activa' ? 'Activo' : 'En espera'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h5 className="text-sm font-bold text-gray-700 mb-2 flex items-center">
                <Clock size={16} className="mr-2 text-indigo-500" />
                Última visita
              </h5>
              <p className="text-sm bg-gray-50 p-3 rounded-lg">{patient.patientInfo.lastVisit} - {patient.patientInfo.doctor}</p>
            </div>
            
            <div>
              <h5 className="text-sm font-bold text-gray-700 mb-2 flex items-center">
                <Paperclip size={16} className="mr-2 text-indigo-500" />
                Medicamentos
              </h5>
              <ul className="bg-gray-50 p-3 rounded-lg space-y-1">
                {patient.patientInfo.medications.map((med, idx) => (
                  <li key={idx} className="text-sm flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    {med}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm font-bold text-gray-700 mb-2 flex items-center">
                <AlertCircle size={16} className="mr-2 text-indigo-500" />
                Alergias
              </h5>
              <div className="bg-gray-50 p-3 rounded-lg">
                {patient.patientInfo.allergies.length > 0 ? (
                  <ul className="space-y-1">
                    {patient.patientInfo.allergies.map((allergy, idx) => (
                      <li key={idx} className="text-sm flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        {allergy}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No se registran alergias</p>
                )}
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-bold text-gray-700 mb-2 flex items-center">
                <Info size={16} className="mr-2 text-indigo-500" />
                Pruebas recientes
              </h5>
              <ul className="bg-gray-50 p-3 rounded-lg space-y-1">
                {patient.patientInfo.recentTests.map((test, idx) => (
                  <li key={idx} className="text-sm flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    {test}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Contar conversaciones por estado
  const activeConversations = conversations.filter(convo => convo.status === 'activa').length;
  const waitingConversations = conversations.filter(convo => convo.status === 'espera').length;
  const urgentConversations = conversations.filter(convo => convo.urgent).length;

  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto">
      {/* Barra de título solo visible en dispositivos móviles */}
      <div className="md:hidden bg-gradient-to-r bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white p-3 flex items-center justify-between rounded-t-lg">
        <button 
          onClick={toggleSmallScreenSidebar}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-bold text-lg">IAEVA - Panel de control</h1>
        <div className="relative">
          <Bell size={20} />
          {urgentConversations > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs">
              {urgentConversations}
            </span>
          )}
        </div>
      </div>
    
      <div className={`flex-1 bg-white shadow-xl rounded-lg flex overflow-hidden transform transition-all duration-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
           style={{ boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(99, 102, 241, 0.06)' }}>
        
        {/* Panel lateral para dispositivos móviles - se muestra como overlay */}
        <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-50 md:hidden transition-opacity duration-300 ${showSmallScreenSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
             onClick={() => setShowSmallScreenSidebar(false)}>
          <div 
            className={`w-80 h-full bg-white shadow-xl transform transition-transform duration-300 ${showSmallScreenSidebar ? 'translate-x-0' : '-translate-x-full'}`}
            onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-700 to-green-700 text-white flex justify-between items-center">
              <h2 className="font-bold text-lg">IAEVA - Chat</h2>
              <button 
                onClick={() => setShowSmallScreenSidebar(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-3 border-b border-gray-200">
              <div className="flex items-center">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-r bg-gradient-to-r from-iaeva-blue to-iaeva-purple flex items-center justify-center">
                <User size={18} className="text-white" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
                <div className="ml-3">
                  <h3 className="font-medium text-sm">Leticia Gomez</h3>
                  <p className="text-xs text-gray-500">Agente de soporte - En línea</p>
                </div>
              </div>
            </div>

            {/* Filtros de conversación */}
            <div className="flex px-3 py-2 overflow-x-auto scrollbar-hide">
              <button 
                onClick={() => setActiveTab('todas')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium mr-2 whitespace-nowrap
                  ${activeTab === 'todas' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Todas ({conversations.length})
              </button>
              <button 
                onClick={() => setActiveTab('activa')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium mr-2 flex items-center whitespace-nowrap
                  ${activeTab === 'activa' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                Activas ({activeConversations})
              </button>
              <button 
                onClick={() => setActiveTab('espera')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium mr-2 flex items-center whitespace-nowrap
                  ${activeTab === 'espera' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <div className="w-2 h-2 rounded-full bg-amber-500 mr-1"></div>
                En espera ({waitingConversations})
              </button>
              <button 
                onClick={() => setActiveTab('urgente')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center whitespace-nowrap
                  ${activeTab === 'urgente' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <AlertCircle size={12} className="mr-1" />
                Urgentes ({urgentConversations})
              </button>
            </div>

            {/* Buscador */}
            <div className="px-3 py-2">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar paciente..." 
                  className="w-full px-3 py-2 pl-10 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
                <SearchIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {renderChatList()}
          </div>
        </div>
        
        {/* Panel lateral de escritorio - siempre visible en md+ */}
        <div className="hidden md:flex md:flex-col w-80 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white">
            <h2 className="font-bold text-lg">IAEVA - Chat</h2>
            <p className="text-xs text-indigo-200 mt-1">Panel de atención al paciente</p>
          </div>
          
          <div className="p-3 border-b border-gray-200">
            <div className="flex items-center">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-r bg-gradient-to-r from-iaeva-blue to-iaeva-purple flex items-center justify-center">
                <User size={18} className="text-white" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-sm">Leticia Gomez</h3>
                <p className="text-xs text-gray-500">Agente de soporte - En línea</p>
              </div>
            </div>
          </div>

          {/* Filtros de conversación */}
          <div className="flex px-3 py-2 overflow-x-auto scrollbar-hide">
            <button 
              onClick={() => setActiveTab('todas')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium mr-2 whitespace-nowrap
                ${activeTab === 'todas' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Todas ({conversations.length})
            </button>
            <button 
              onClick={() => setActiveTab('activa')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium mr-2 flex items-center whitespace-nowrap
                ${activeTab === 'activa' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
              Activas ({activeConversations})
            </button>
            <button 
              onClick={() => setActiveTab('espera')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium mr-2 flex items-center whitespace-nowrap
                ${activeTab === 'espera' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <div className="w-2 h-2 rounded-full bg-amber-500 mr-1"></div>
              En espera ({waitingConversations})
            </button>
          </div>

          {/* Buscador */}
          <div className="px-3 py-2">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar paciente..." 
                className="w-full px-3 py-2 pl-10 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
              <SearchIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {renderChatList()}
        </div>

        {/* Panel principal de chat */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Encabezado del chat */}
          {selectedChat !== null && (
            <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <button 
                  className="md:hidden p-2 mr-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={toggleSmallScreenSidebar}
                >
                  <ArrowLeft size={20} className="text-gray-500" />
                </button>
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium
                    bg-gradient-to-br ${getAvatarColor(conversations[selectedChat].patient)}`}>
                    {conversations[selectedChat].avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    conversations[selectedChat].status === 'activa' ? 'bg-green-500' : 'bg-amber-500'
                  }`}></div>
                </div>
                <div className="ml-3">
                  <div className="flex items-center">
                    <h3 className="font-medium">{conversations[selectedChat].patient}</h3>
                    {conversations[selectedChat].urgent && (
                      <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium animate-pulse flex items-center">
                        <AlertCircle size={10} className="mr-1" />
                        Urgente
                      </span>
                    )}
                  </div>
                  {/*<div className="flex items-center text-xs text-gray-500">
                    <span>{conversations[selectedChat].department}</span>
                    <span className="mx-1">•</span>
                    <span className="flex items-center">
                      <Clock size={10} className="mr-1" />
                      Último mensaje hace {conversations[selectedChat].lastMessage}
                    </span>
                  </div>*/}
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" onClick={() => setShowAIPanel(!showAIPanel)}>
                  <Bot size={18} className="text-indigo-600" />
                </button>
                {/*<button className="p-2 rounded-full hover:bg-gray-100 transition-colors" onClick={() => setShowPatientInfo(!showPatientInfo)}>
                  <Info size={18} className="text-gray-600" />
                </button>*/}
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <MoreVertical size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          )}
          
          {/* Área de mensajes */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
            {renderMessages()}
          </div>
          
          {/* Área de escritura de mensajes */}
          {selectedChat !== null && (
            <div className="px-4 py-3 bg-white border-t border-gray-200">
              {showAIPanel && (
                <div className="mb-3 bg-gradient-to-r from-indigo-50 to-green-50 p-3 rounded-lg border border-indigo-100 flex items-start">
                  <Bot size={20} className="text-indigo-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs font-medium text-indigo-700 mb-1">Sugerencia de IAEVA</div>
                    <p className="text-sm text-gray-700">¿Desea confirmar la cita o necesita reprogramarla para otra fecha?</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button 
                        className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        onClick={() => {
                          setMessage("Confirmamos su cita para el jueves a las 9:00 am. Recuerde llegar 15 minutos antes con su identificación.");
                          setShowAIPanel(false);
                        }}
                      >
                        Usar sugerencia
                      </button>
                      {/*<button 
                        className="text-xs px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => setShowAIPanel(false)}
                      >
                        Descartar
                      </button>*/}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Paperclip size={18} className="text-gray-500" />
                </button>
                <div className="flex-1 mx-2">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Mensaje..."
                    className="w-full p-3 min-h-[44px] max-h-32 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-none transition-all"
                    rows="1"
                  />
                </div>
                <button 
                  onClick={handleSendMessage}
                  className={`p-3 rounded-full ${
                    message.trim() ? 'bg-gradient-to-r bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white' : 'bg-gray-100 text-gray-400'
                  } transition-all`}
                  disabled={!message.trim()}
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="flex justify-between items-center mt-2 px-1">
                {/*<div className="flex items-center text-xs text-gray-500">
                  <Bot size={12} className="mr-1 text-indigo-500" />
                  <span>IAEVA está monitorizando la conversación</span>
                </div>*/}
                <div className="text-xs text-gray-500 flex items-center">
                  <CheckCircle size={12} className="mr-1" />
                  <span>Tiempo de respuesta: ~40s</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Panel de información del paciente (lateral derecho) */}
        {showPatientInfo && selectedChat !== null && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 md:relative md:inset-auto md:bg-transparent md:z-auto flex">
            <div className="ml-auto w-full max-w-xs md:max-w-md h-full">
              {renderPatientInfo()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IAEVAChatDemo;
