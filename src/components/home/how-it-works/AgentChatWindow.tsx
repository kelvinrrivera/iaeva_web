import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, Send, User, Clock, Bot, Bell, 
  Info, X, Paperclip, AlertCircle, Search as SearchIcon, 
  MoreVertical, Menu, ArrowLeft, CheckCircle, Calendar
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Componente principal de chat para la demostración
const IAEVAChatDemo = () => {
  // Estados principales
  const { t } = useTranslation('home');
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
      patient: t('agent_chat.conversations.patient1.name'),
      department: t('agent_chat.conversations.patient1.department'),
      status: "activa",
      unread: 2,
      urgent: true,
      lastMessage: t('agent_chat.conversations.patient1.last_message'),
      avatar: "MG",
      patientInfo: {
        age: 57,
        lastVisit: "15/02/2025",
        doctor: t('agent_chat.conversations.patient1.doctor'),
        medications: [t('agent_chat.conversations.patient1.medications.med1'), t('agent_chat.conversations.patient1.medications.med2')],
        allergies: [t('agent_chat.conversations.patient1.allergies.allergy1')],
        recentTests: [t('agent_chat.conversations.patient1.tests.test1'), t('agent_chat.conversations.patient1.tests.test2')]
      },
      messages: [
        { sender: "iaeva", content: t('agent_chat.conversations.patient1.messages.message1'), time: "10:05" },
        { sender: "patient", content: t('agent_chat.conversations.patient1.messages.message2'), time: "10:06" },
        { sender: "iaeva", content: t('agent_chat.conversations.patient1.messages.message3'), time: "10:06" },
        { sender: "patient", content: t('agent_chat.conversations.patient1.messages.message4'), time: "10:07" },
        { sender: "iaeva", content: t('agent_chat.conversations.patient1.messages.message5'), time: "10:08" },
        { sender: "patient", content: t('agent_chat.conversations.patient1.messages.message6'), time: "10:10" },
        { sender: "iaeva", content: t('agent_chat.conversations.patient1.messages.message7'), time: "10:10" }
      ]
    },
    {
      id: 2,
      patient: t('agent_chat.conversations.patient2.name'),
      department: t('agent_chat.conversations.patient2.department'),
      status: "activa",
      unread: 0,
      urgent: false,
      lastMessage: t('agent_chat.conversations.patient2.last_message'),
      avatar: "CR",
      patientInfo: {
        age: 42,
        lastVisit: "10/02/2025",
        doctor: t('agent_chat.conversations.patient2.doctor'),
        medications: [t('agent_chat.conversations.patient2.medications.med1')],
        allergies: [],
        recentTests: [t('agent_chat.conversations.patient2.tests.test1')]
      },
      messages: [
        { sender: "iaeva", content: t('agent_chat.conversations.patient2.messages.message1'), time: "09:45" },
        { sender: "patient", content: t('agent_chat.conversations.patient2.messages.message2'), time: "09:46" },
        { sender: "iaeva", content: t('agent_chat.conversations.patient2.messages.message3'), time: "09:47" },
        { sender: "patient", content: t('agent_chat.conversations.patient2.messages.message4'), time: "09:48" },
        { sender: "iaeva", content: t('agent_chat.conversations.patient2.messages.message5'), time: "09:50" },
        { sender: "patient", content: t('agent_chat.conversations.patient2.messages.message6'), time: "09:51" },
        { sender: "agent", content: t('agent_chat.conversations.patient2.messages.message7'), time: "09:55" }
      ]
    },
    {
      id: 3,
      patient: t('agent_chat.conversations.patient3.name'),
      department: t('agent_chat.conversations.patient3.department'),
      status: "espera",
      unread: 1,
      urgent: true,
      lastMessage: t('agent_chat.conversations.patient3.last_message'),
      avatar: "JM",
      patientInfo: {
        age: 35,
        lastVisit: "20/02/2025",
        doctor: t('agent_chat.conversations.patient3.doctor'),
        medications: [t('agent_chat.conversations.patient3.medications.med1')],
        allergies: [t('agent_chat.conversations.patient3.allergies.allergy1')],
        recentTests: [t('agent_chat.conversations.patient3.tests.test1')]
      },
      messages: [
        { sender: "iaeva", content: t('agent_chat.conversations.patient3.messages.message1'), time: "10:15" },
        { sender: "patient", content: t('agent_chat.conversations.patient3.messages.message2'), time: "10:16" },
        { sender: "iaeva", content: t('agent_chat.conversations.patient3.messages.message3'), time: "10:16" },
        { sender: "patient", content: t('agent_chat.conversations.patient3.messages.message4'), time: "10:17" },
        { sender: "iaeva", content: t('agent_chat.conversations.patient3.messages.message5'), time: "10:18" },
        { sender: "patient", content: t('agent_chat.conversations.patient3.messages.message6'), time: "10:19" }
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
            {t('agent_chat.today')}, {new Date().toLocaleDateString(t('common:locale'), { day: '2-digit', month: 'long' })}
          </div>
        </div>

        {/* Mensajes */}
        {chat.messages.map((msg, i) => (
          <div key={i} className={`flex items-start ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'iaeva' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-iaeva-blue to-iaeva-purple flex items-center justify-center text-white mr-2 flex-shrink-0">
                <Bot size={14} />
              </div>
            )}
            
            {msg.sender === 'agent' && (
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-2 flex-shrink-0">
                <User size={14} />
              </div>
            )}
            
            <div 
              className={`
                ${msg.sender === 'patient' 
                  ? 'bg-blue-100 ml-2 rounded-t-lg rounded-bl-lg' 
                  : msg.sender === 'iaeva'
                    ? 'bg-white rounded-t-lg rounded-br-lg shadow-sm' 
                    : 'bg-emerald-100 rounded-t-lg rounded-br-lg shadow-sm'
                } 
                px-4 py-3 max-w-[75%]
              `}
            >
              <div className="text-sm">
                {msg.content}
              </div>
              <div className="text-xs text-gray-500 mt-1 text-right">
                {msg.time}
              </div>
            </div>
            
            {msg.sender === 'patient' && (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white ml-2 flex-shrink-0">
                <User size={14} />
              </div>
            )}
          </div>
        ))}
        
        {/* Indicador de escritura */}
        {typing && (
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-iaeva-blue to-iaeva-purple flex items-center justify-center text-white mr-2 flex-shrink-0">
              <Bot size={14} />
            </div>
            <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 max-w-[75%] shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef}></div>
      </div>
    );
  };
  
  // Renderizar la información del paciente
  const renderPatientInfo = () => {
    if (selectedChat === null || conversations.length === 0) return null;
    const patient = conversations[selectedChat];
    
    return (
      <div className="w-full h-full bg-white p-4 overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
          <h3 className="font-bold text-lg">{t('agent_chat.patient_info.title')}</h3>
          <button 
            onClick={() => setShowPatientInfo(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="flex flex-col items-center mb-6">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-medium mb-3
            bg-gradient-to-br ${getAvatarColor(patient.patient)}`}>
            {patient.avatar}
          </div>
          <h4 className="font-semibold text-xl">{patient.patient}</h4>
          <p className="text-gray-500 text-sm">{patient.department}</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <h5 className="text-sm uppercase text-gray-500 font-medium mb-2 border-b border-gray-100 pb-1">
              {t('agent_chat.patient_info.basic_info')}
            </h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">{t('agent_chat.patient_info.age')}</span>
                <span className="font-medium">{patient.patientInfo.age} {t('agent_chat.patient_info.years')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t('agent_chat.patient_info.last_visit')}</span>
                <span className="font-medium">{patient.patientInfo.lastVisit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t('agent_chat.patient_info.doctor')}</span>
                <span className="font-medium">{patient.patientInfo.doctor}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="text-sm uppercase text-gray-500 font-medium mb-2 border-b border-gray-100 pb-1">
              {t('agent_chat.patient_info.medications')}
            </h5>
            <ul className="space-y-1">
              {patient.patientInfo.medications.map((med, idx) => (
                <li key={idx} className="text-sm flex items-start">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0"></span>
                  {med}
                </li>
              ))}
            </ul>
          </div>
          
          {patient.patientInfo.allergies.length > 0 && (
            <div>
              <h5 className="text-sm uppercase text-gray-500 font-medium mb-2 border-b border-gray-100 pb-1">
                {t('agent_chat.patient_info.allergies')}
              </h5>
              <ul className="space-y-1">
                {patient.patientInfo.allergies.map((allergy, idx) => (
                  <li key={idx} className="text-sm flex items-start">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 mr-2 flex-shrink-0"></span>
                    {allergy}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div>
            <h5 className="text-sm uppercase text-gray-500 font-medium mb-2 border-b border-gray-100 pb-1">
              {t('agent_chat.patient_info.recent_tests')}
            </h5>
            <ul className="space-y-1">
              {patient.patientInfo.recentTests.map((test, idx) => (
                <li key={idx} className="text-sm flex items-start">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 mr-2 flex-shrink-0"></span>
                  {test}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // Contar conversaciones por estado
  const activeConversations = conversations.filter(convo => convo.status === 'activa').length;
  const waitingConversations = conversations.filter(convo => convo.status === 'espera').length;
  const urgentConversations = conversations.filter(convo => convo.urgent).length;

  // Renderizado principal
  return (
    <div className="w-full h-full bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-xl">
      {/* Barra superior */}
      <div className="bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white p-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Bot size={18} />
            </div>
            <h2 className="font-semibold">{t('agent_chat.title')}</h2>
          </div>
          <div className="md:hidden">
            <button 
              onClick={toggleSmallScreenSidebar}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
              aria-label={showSmallScreenSidebar ? "Cerrar menú" : "Abrir menú"}
            >
              {showSmallScreenSidebar ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
            aria-label="Notificaciones"
          >
            <Bell size={18} />
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
            aria-label="Perfil de usuario"
          >
            <User size={18} />
          </button>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Lista de Chats */}
        <div className={`w-80 border-r border-gray-200 flex flex-col ${
          showSmallScreenSidebar ? 'block absolute inset-0 z-10 bg-white md:relative' : 'hidden md:flex'
        }`}>
          {/* Barra de búsqueda */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <input 
                type="text" 
                placeholder={t('agent_chat.search_placeholder')}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-iaeva-blue focus:border-transparent"
              />
              <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          {/* Filtros de chat */}
          <div className="border-b border-gray-100 px-4 py-3">
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeTab === 'todas' 
                    ? 'bg-iaeva-blue/10 text-iaeva-blue' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('todas')}
              >
                {t('agent_chat.filters.all')}
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeTab === 'activa' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('activa')}
              >
                {t('agent_chat.filters.active')}
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeTab === 'espera' 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('espera')}
              >
                {t('agent_chat.filters.waiting')}
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeTab === 'urgente' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('urgente')}
              >
                {t('agent_chat.filters.urgent')}
              </button>
            </div>
          </div>
          
          {/* Lista de chats */}
          {renderChatList()}
        </div>
        
        {/* Contenido de chat */}
        <div className="flex-1 flex flex-col">
          {selectedChat !== null && conversations.length > 0 ? (
            <>
              {/* Encabezado del chat */}
              <div className="border-b border-gray-200 p-3 flex justify-between items-center">
                <div className="flex items-center">
                  {showSmallScreenSidebar ? null : (
                    <button 
                      className="md:hidden mr-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                      onClick={toggleSmallScreenSidebar}
                      aria-label="Volver a la lista de chats"
                    >
                      <ArrowLeft size={18} />
                    </button>
                  )}
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium mr-3
                      bg-gradient-to-br ${getAvatarColor(conversations[selectedChat].patient)}`}>
                      {conversations[selectedChat].avatar}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{conversations[selectedChat].patient}</h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className={`w-2 h-2 rounded-full mr-1 ${
                          conversations[selectedChat].status === 'activa' ? 'bg-green-500' : 'bg-amber-500'
                        }`}></span>
                        <span>{conversations[selectedChat].department}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <button 
                    onClick={() => setShowAIPanel(!showAIPanel)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 mr-1 ${
                      showAIPanel ? 'bg-iaeva-blue/10 text-iaeva-blue' : ''
                    }`}
                    aria-label={showAIPanel ? "Ocultar panel de IA" : "Mostrar panel de IA"}
                    aria-pressed={showAIPanel}
                  >
                    <Bot size={18} />
                  </button>
                  <button 
                    onClick={() => setShowPatientInfo(!showPatientInfo)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 mr-1 ${
                      showPatientInfo ? 'bg-iaeva-blue/10 text-iaeva-blue' : ''
                    }`}
                    aria-label={showPatientInfo ? "Ocultar información del paciente" : "Mostrar información del paciente"}
                    aria-pressed={showPatientInfo}
                  >
                    <User size={18} />
                  </button>
                  <button 
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100"
                    aria-label="Más opciones"
                  >
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
              
              {/* Contenido principal */}
              <div className="flex-1 flex">
                {/* Área de mensajes */}
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4">
                    {renderMessages()}
                  </div>
                  
                  {/* Input de mensaje */}
                  <div className="border-t border-gray-200 p-3 bg-white">
                    <div className="flex items-center">
                      <button 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
                        aria-label="Adjuntar archivo"
                      >
                        <Paperclip size={18} />
                      </button>
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t('agent_chat.message_placeholder')}
                        className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 mx-2 focus:outline-none focus:ring-2 focus:ring-iaeva-blue focus:border-transparent"
                        aria-label="Escribe un mensaje"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm"
                        aria-label="Enviar mensaje"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Panel de información del paciente */}
                {showPatientInfo && (
                  <div className="w-80 border-l border-gray-200 hidden lg:block">
                    {renderPatientInfo()}
                  </div>
                )}
                
                {/* Versión móvil del panel de información */}
                {showPatientInfo && (
                  <div className="fixed inset-0 bg-black/30 z-20 lg:hidden flex justify-end">
                    <div className="w-80 bg-white h-full animate-slide-in-right">
                      {renderPatientInfo()}
                    </div>
                  </div>
                )}
                
                {/* Panel de IA */}
                {showAIPanel && (
                  <div className="w-80 border-l border-gray-200 hidden lg:block">
                    <div className="w-full h-full bg-white p-4 overflow-y-auto">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                        <h3 className="font-bold text-lg flex items-center">
                          <Bot size={18} className="mr-2 text-iaeva-blue" /> 
                          {t('agent_chat.ai_panel.title')}
                        </h3>
                        <button 
                          onClick={() => setShowAIPanel(false)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm text-gray-500 mb-2">{t('agent_chat.ai_panel.suggested_responses')}</h4>
                          <div className="space-y-2">
                            <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm border border-gray-200">
                              {t('agent_chat.ai_panel.response1')}
                            </button>
                            <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm border border-gray-200">
                              {t('agent_chat.ai_panel.response2')}
                            </button>
                            <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm border border-gray-200">
                              {t('agent_chat.ai_panel.response3')}
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm text-gray-500 mb-2">{t('agent_chat.ai_panel.quick_actions')}</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm border border-gray-200 flex items-center">
                              <Calendar size={14} className="mr-1 text-iaeva-blue" />
                              {t('agent_chat.ai_panel.schedule_appointment')}
                            </button>
                            <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm border border-gray-200 flex items-center">
                              <CheckCircle size={14} className="mr-1 text-green-500" />
                              {t('agent_chat.ai_panel.send_reminder')}
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                          <h4 className="text-sm font-medium text-blue-800 flex items-center mb-2">
                            <Info size={14} className="mr-1" />
                            {t('agent_chat.ai_panel.ai_suggestion')}
                          </h4>
                          <p className="text-xs text-blue-700">
                            {t('agent_chat.ai_panel.suggestion_text')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Versión móvil del panel de IA */}
                {showAIPanel && (
                  <div className="fixed inset-0 bg-black/30 z-20 lg:hidden flex justify-end">
                    <div className="w-80 bg-white h-full animate-slide-in-right">
                      <div className="w-full h-full bg-white p-4 overflow-y-auto">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                          <h3 className="font-bold text-lg flex items-center">
                            <Bot size={18} className="mr-2 text-iaeva-blue" /> 
                            {t('agent_chat.ai_panel.title')}
                          </h3>
                          <button 
                            onClick={() => setShowAIPanel(false)}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm text-gray-500 mb-2">{t('agent_chat.ai_panel.suggested_responses')}</h4>
                            <div className="space-y-2">
                              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm border border-gray-200">
                                {t('agent_chat.ai_panel.response1')}
                              </button>
                              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm border border-gray-200">
                                {t('agent_chat.ai_panel.response2')}
                              </button>
                              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm border border-gray-200">
                                {t('agent_chat.ai_panel.response3')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={30} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">{t('agent_chat.no_conversation.title')}</h3>
                <p className="text-sm max-w-md">{t('agent_chat.no_conversation.description')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IAEVAChatDemo;
