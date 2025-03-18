import { useState, useEffect, useRef } from 'react';
import { SendHorizontal, Mic, Image, FileText, Square, X, Loader2 } from 'lucide-react';
import axios from 'axios';

interface ChatMessagePayload {
  query: string;
  user: string;
  response_mode: string;
  conversation_id?: string;
  inputs: {
    nombre: string;
    tipo_centro: string;
    email: string;
    telefono: string;
  };
  files?: Array<{
    type: string;
    transfer_method: string;
    upload_file_id?: string;
    url?: string;
  }>;
}

// Variables de entorno (puedes moverlas a un archivo .env)
const API_URL = import.meta.env.VITE_DIFY_API_URL 
const API_KEY = import.meta.env.VITE_DIFY_API_KEY
const MESSAGE_LIMIT = 25; // Límite de mensajes por conversación

// Componente principal del chat de IAEVA
const IAEVAChat = () => {
  // Estados principales del chat
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [avatarState, setAvatarState] = useState('idle'); // idle, thinking, speaking
  const [userId, setUserId] = useState('');
  const [messageCount, setMessageCount] = useState(0);
  const [showMobileTools, setShowMobileTools] = useState(false);
  
  // Estados para el formulario conversacional
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    nombre: '',
    tipo_centro: '',
    email: '',
    telefono: ''
  });
  const [formCompleted, setFormCompleted] = useState(false);
  
  // Estados para funcionalidades multimedia
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Función para alternar menú de herramientas en móvil
  const toggleMobileTools = () => {
    setShowMobileTools(!showMobileTools);
  };
  
  // Referencias
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Definir los pasos de la conversación para recopilar información
  const onboardingSteps = [
    {
      message: "Para ofrecerte una experiencia personalizada, me gustaría conocerte un poco mejor. ¿Cuál es tu nombre?",
      field: "nombre",
      validate: (value) => value.trim() !== ""
    },
    {
      message: "Encantada de conocerte, {nombre}. ¿Qué tipo de centro médico gestionas? (Por ejemplo: clínica, hospital, laboratorio, centro oncológico, etc.)",
      field: "tipo_centro",
      validate: (value) => value.trim() !== ""
    },
    {
      message: "Excelente. ¿Cuál es tu email de contacto para poder enviarte información relevante?",
      field: "email",
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    },
    {
      message: "Ya casi terminamos. Por último, ¿podrías proporcionarme un número de teléfono de contacto?",
      field: "telefono",
      validate: (value) => /^[0-9+\s()-]{6,20}$/.test(value)
    },
    {
      message: "¡Perfecto! Gracias por compartir esa información, {nombre}. Ahora puedo ayudarte mejor con tus consultas sobre cómo IAEVA puede transformar la gestión de citas y atención al paciente en tu centro médico. ¿Qué te gustaría saber?",
      isCompleted: true
    }
  ];

  // Generar o recuperar el ID de usuario al cargar el componente
  useEffect(() => {
    // Intentar recuperar el ID de usuario y la información guardada
    let storedUserId = localStorage.getItem('iaeva_user_id');
    
    // Si no existe, crear uno nuevo
    if (!storedUserId) {
      storedUserId = 'web-user-' + Date.now() + '-' + Math.random().toString(36).substring(2, 10);
      localStorage.setItem('iaeva_user_id', storedUserId);
    }
    
    setUserId(storedUserId);
    
    // Comprobar si ya hay información de usuario guardada
    const savedUserInfo = localStorage.getItem('iaeva_user_info');
    if (savedUserInfo) {
      try {
        const parsedInfo = JSON.parse(savedUserInfo);
        setUserInfo(parsedInfo);
        setFormCompleted(true);
        
        // Cargar historial de conversación si existe
        const savedConversationId = localStorage.getItem('iaeva_conversation_id');
        if (savedConversationId) {
          setConversationId(savedConversationId);
          fetchConversationHistory(savedConversationId, storedUserId);
        } else {
          // Intentar cargar mensajes desde localStorage como respaldo
          const savedMessages = localStorage.getItem('iaeva_messages');
          if (savedMessages) {
            try {
              const parsedMessages = JSON.parse(savedMessages);
              // Verificar que los mensajes tienen la estructura correcta
              if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
                // Filtrar mensajes inválidos
                const validMessages = parsedMessages.filter(msg => 
                  msg && msg.content && msg.sender && (msg.sender === 'user' || msg.sender === 'assistant')
                );
                console.log('Mensajes válidos cargados desde localStorage:', validMessages);
                setMessages(validMessages);
                setMessageCount(validMessages.length);
              }
            } catch (e) {
              console.error('Error parsing saved messages:', e);
            }
          }
        }
      } catch (e) {
        console.error('Error parsing saved user info:', e);
        // Iniciar conversación de onboarding
        startOnboarding();
      }
    } else {
      // Iniciar conversación de onboarding
      startOnboarding();
    }
    
    // Probar conexión a la API al iniciar
    testApiConnection();
    
    // Limpiar recursos al desmontar el componente
    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Función para verificar si hay mensajes del usuario en el historial
    const hasUserMessages = () => {
      return messages.some(message => message.sender === 'user');
    };

  // Función para eliminar historial de chat
    const clearChatHistory = () => {
      if (window.confirm("¿Estás seguro de que deseas eliminar todo el historial de chat? Esta acción no se puede deshacer.")) {
        // Limpiar estado de mensajes
        setMessages([]);
        // Reiniciar contador de mensajes
        setMessageCount(0);
        // Borrar ID de conversación actual
        setConversationId('');
        // Limpiar localStorage
        localStorage.removeItem('iaeva_messages');
        localStorage.removeItem('iaeva_conversation_id');
        
        // Mostrar mensaje de bienvenida
        const welcomeMessage = {
          id: `assistant-welcome-${Date.now()}`,
          content: `¡Hola${userInfo?.nombre ? ' ' + userInfo.nombre : ''}! Has borrado tu historial de conversación anterior. ¿En qué puedo ayudarte ahora?`,
          sender: 'assistant',
          timestamp: new Date().toISOString()
        };
        setMessages([welcomeMessage]);
      }
    };


  // Guardar mensajes en localStorage cada vez que cambian
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('iaeva_messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Iniciar el proceso de onboarding
  const startOnboarding = () => {
    // Añadir el primer mensaje de bienvenida de IAEVA
    const welcomeMessage = {
      id: `assistant-welcome-${Date.now()}`,
      content: onboardingSteps[0].message,
      sender: 'assistant',
      timestamp: new Date().toISOString()
    };
    
    setMessages([welcomeMessage]);
    setOnboardingStep(0);
  };

  // Función para probar la conexión a la API
  const testApiConnection = async () => {
    try {
      const response = await fetch(`${API_URL}/info`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      console.log('API connection test:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('API info:', data);
      }
    } catch (error) {
      console.error('API connection test failed:', error);
    }
  };

  // Función para desplazarse hacia abajo automáticamente (corregida)
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Función para obtener el historial de conversación
  const fetchConversationHistory = async (convoId, uid) => {
    if (!convoId || !uid) return;
    
    try {
      const response = await axios.get(
        `${API_URL}/messages`, 
        {
          params: {
            conversation_id: convoId,
            user: uid
          },
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.data && response.data.data.length > 0) {
        // Depuración para ver la estructura exacta de los mensajes
        console.log('Messages from API:', response.data.data);
        
        // Transformar los mensajes al formato local con mejor manejo de campos
        const formattedMessages = response.data.data.map(msg => {
          // Depuración extendida para entender la estructura exacta
          console.log('Estructura completa del mensaje:', JSON.stringify(msg, null, 2));
          
          // Determinar el contenido de forma más robusta
          let content = '';
          if (msg.query) {
            content = msg.query;
          } else if (msg.answer) {
            content = msg.answer;
          } else if (msg.content) {
            content = msg.content;
          } else if (msg.text) {
            content = msg.text;
          } else if (msg.message) {
            content = msg.message;
          }
          
          // Determinar el remitente de forma más robusta
          let sender;
          if (msg.role === 'user' || msg.role === 'assistant') {
            sender = msg.role;
          } else if (msg.query) {
            sender = 'user';
          } else {
            sender = 'assistant';  // Asumimos que si no es usuario, es asistente
          }
          
          return {
            id: msg.id || `msg-${Date.now()}-${Math.random()}`,
            content: content,
            sender: sender,
            timestamp: new Date((msg.created_at || Date.now()) * 1000).toISOString()
          };
        });
        
        console.log('Formatted messages:', formattedMessages);
        setMessages(formattedMessages);
        setMessageCount(formattedMessages.length);
        
        // Guardar también en localStorage como respaldo
        //localStorage.setItem('iaeva_messages', JSON.stringify(formattedMessages));
      }
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      
      // Intentar cargar desde localStorage como fallback
      const savedMessages = localStorage.getItem('iaeva_messages');
      if (savedMessages) {
        try {
          setMessages(JSON.parse(savedMessages));
        } catch (e) {
          console.error('Error parsing saved messages:', e);
        }
      }
    }
  };

  // Funciones para manejo de archivos
  const handleImageSelect = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'].includes(file.type)) {
      alert('Por favor selecciona una imagen válida (PNG, JPEG, JPG, WEBP, GIF)');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Crear FormData para el archivo
      const formData = new FormData();
      formData.append('file', file);
      formData.append('user', userId);
      
      // Subir archivo a la API
      const response = await fetch(`${API_URL}/files/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        },
        body: formData
      });
      
      if (!response.ok) throw new Error('Error al subir la imagen');
      
      const data = await response.json();
      
      // Mostrar la imagen seleccionada en el chat
      setSelectedImage({
        id: data.id,
        url: URL.createObjectURL(file),
        name: file.name
      });
      
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir la imagen. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDocumentSelect = () => {
    documentInputRef.current.click();
  };

  const handleDocumentChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Verificar tipo de archivo (PDF, DOC, DOCX, etc.)
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Por favor selecciona un documento válido (PDF, DOC, DOCX)');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Crear FormData para el archivo
      const formData = new FormData();
      formData.append('file', file);
      formData.append('user', userId);
      
      // Subir archivo a la API
      const response = await fetch(`${API_URL}/files/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        },
        body: formData
      });
      
      if (!response.ok) throw new Error('Error al subir el documento');
      
      const data = await response.json();
      
      // Guardar la referencia del documento
      setSelectedDocument({
        id: data.id,
        name: file.name
      });
      
      // Informar al usuario que el documento se ha subido
      setInput(`${input} [Documento: ${file.name}]`);
      
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Error al subir el documento. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Funciones para grabación de audio
  const toggleRecording = async () => {
    if (isRecording) {
      // Detener grabación
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        audioChunksRef.current = [];
        
        // Detener todos los tracks del stream
        audioStream.getTracks().forEach(track => track.stop());
        
        // Enviar audio a la API para transcripción
        await transcribeAudio(audioBlob);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('No se pudo acceder al micrófono. Por favor verifica los permisos.');
    }
  };

  const transcribeAudio = async (audioBlob) => {
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', audioBlob);
      formData.append('user', userId);
      
      const response = await fetch(`${API_URL}/audio-to-text`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        },
        body: formData
      });
      
      if (!response.ok) throw new Error('Error en la transcripción');
      
      const data = await response.json();
      
      // Establecer el texto transcrito en el input
      setInput(prev => prev + (prev ? ' ' : '') + data.text);
      
    } catch (error) {
      console.error('Error transcribing audio:', error);
      alert('Error al procesar el audio. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para procesar respuestas de formulario conversacional
  const processOnboardingResponse = (userResponse) => {
    if (onboardingStep >= onboardingSteps.length) return false;
    
    const currentStep = onboardingSteps[onboardingStep];
    const isValid = currentStep.validate(userResponse);
    
    if (isValid) {
      // Guardar la información proporcionada
      setUserInfo(prev => ({
        ...prev,
        [currentStep.field]: userResponse
      }));
      
      // Avanzar al siguiente paso
      const nextStep = onboardingSteps[onboardingStep + 1];
      setOnboardingStep(onboardingStep + 1);
      
      // Personalizar el mensaje con la información del usuario
      let nextMessage = nextStep.message;
      Object.keys(userInfo).forEach(key => {
        const value = key === currentStep.field ? userResponse : userInfo[key];
        nextMessage = nextMessage.replace(`{${key}}`, value || '');
      });
      
      // Mostrar el siguiente mensaje del asistente
      setTimeout(() => {
        const assistantMessage = {
          id: `assistant-onboarding-${Date.now()}`,
          content: nextMessage,
          sender: 'assistant',
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
        // Si hemos completado todos los pasos, guardar la info
        if (nextStep.isCompleted) {
          const completeUserInfo = {
            ...userInfo,
            [currentStep.field]: userResponse
          };
          
          localStorage.setItem('iaeva_user_info', JSON.stringify(completeUserInfo));
          setFormCompleted(true);
        }
      }, 500);
      
      return true;
    } else {
      // Si la validación falla, pedir al usuario que lo intente de nuevo
      setTimeout(() => {
        let errorMessage = "Lo siento, esa información no parece ser válida. ";
        
        if (currentStep.field === "email") {
          errorMessage += "Por favor, introduce una dirección de email válida.";
        } else if (currentStep.field === "telefono") {
          errorMessage += "Por favor, introduce un número de teléfono válido (sólo números, espacios y símbolos básicos).";
        } else {
          errorMessage += "Por favor, inténtalo de nuevo.";
        }
        
        const assistantErrorMessage = {
          id: `assistant-error-${Date.now()}`,
          content: errorMessage,
          sender: 'assistant',
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, assistantErrorMessage]);
      }, 500);
      
      return false;
    }
  };

  // Función para enviar mensaje a la API Dify
  const sendMessageToDify = async (userInput) => {
    setAvatarState('thinking');
    
    try {
      // Agregar un mensaje temporal mientras se recibe la respuesta
      const tempMessageId = `assistant-temp-${Date.now()}`;
      setMessages(prev => [...prev, {
        id: tempMessageId,
        content: '',
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        isPartial: true
      }]);
      
      // Preparar el payload de la API
      const messagePayload: ChatMessagePayload = {
        query: userInput,
        user: userId,
        response_mode: 'streaming',
        ...(conversationId ? { conversation_id: conversationId } : {}),
        inputs: userInfo
      };
      
      // Añadir archivos si están presentes
      if (selectedImage) {
        messagePayload.files = [
          {
            type: 'image',
            transfer_method: 'local_file',
            upload_file_id: selectedImage.id
          }
        ];
      }
      
      if (selectedDocument) {
        if (!messagePayload.files) messagePayload.files = [];
        messagePayload.files.push({
          type: 'document',
          transfer_method: 'local_file',
          upload_file_id: selectedDocument.id
        });
      }
      
      const response = await fetch(`${API_URL}/chat-messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messagePayload)
      });
      
      // Limpiar los archivos seleccionados después de enviar
      setSelectedImage(null);
      setSelectedDocument(null);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      if (!response.body) throw new Error('No response body');
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let responseText = '';
      let newConversationId = conversationId;
      let newMessageId = '';
      
      // Mostrar que IAEVA está escribiendo
      setIsTyping(true);
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        console.log('Received chunk:', chunk);
        
        // Dividir el chunk en líneas, cada línea es un evento SSE
        const lines = chunk.split('\n\n');
        
        for (const line of lines) {
          if (!line.trim() || !line.startsWith('data: ')) continue;
          
          try {
            const jsonData = JSON.parse(line.substring(6));
            console.log('Parsed data:', jsonData);
            
            // Guardar IDs
            if (jsonData.conversation_id && !newConversationId) {
              newConversationId = jsonData.conversation_id;
              localStorage.setItem('iaeva_conversation_id', newConversationId);
              setConversationId(newConversationId);
            }
            
            if (jsonData.message_id && !newMessageId) {
              newMessageId = jsonData.message_id;
            }
            
            // Manejar los diferentes tipos de eventos
            if (jsonData.event === 'message' || jsonData.event === 'agent_message') {
              // Eventos de mensaje normal
              if (jsonData.answer) {
                responseText += jsonData.answer;
                
                // Actualizar mensaje
                setMessages(prev => {
                  const updatedMessages = [...prev];
                  const lastIndex = updatedMessages.findIndex(m => m.id === tempMessageId);
                  
                  if (lastIndex >= 0) {
                    updatedMessages[lastIndex] = {
                      ...updatedMessages[lastIndex],
                      content: responseText,
                      isPartial: true
                    };
                  }
                  
                  return updatedMessages;
                });
                
                setAvatarState('speaking');
              }
            } else if (jsonData.event === 'agent_thought') {
              // Gestionar pensamiento del agente
              if (jsonData.thought) {
                // Usar el contenido del thought como respuesta completa
                responseText = jsonData.thought;
                
                // Actualizar mensaje con el contenido del thought
                setMessages(prev => {
                  const updatedMessages = [...prev];
                  const lastIndex = updatedMessages.findIndex(m => m.id === tempMessageId);
                  
                  if (lastIndex >= 0) {
                    updatedMessages[lastIndex] = {
                      ...updatedMessages[lastIndex],
                      content: responseText,
                      isPartial: true
                    };
                  }
                  
                  return updatedMessages;
                });
                
                setAvatarState('speaking');
                scrollToBottom();
              }
            } else if (jsonData.event === 'message_end') {
              // Verificar que tenemos contenido antes de finalizar
              if (responseText.trim() === '') {
                console.warn('Respuesta vacía del asistente, intentando recuperar de otros campos');
                // Intentar recuperar de otros campos posibles
                responseText = jsonData.text || jsonData.answer || jsonData.content || 
                              jsonData.message || 'No se pudo recuperar la respuesta';
              }
              
              // Finalizar el mensaje con la respuesta acumulada
              setMessages(prev => {
                const updatedMessages = [...prev];
                const lastIndex = updatedMessages.findIndex(m => m.id === tempMessageId);
                const finalMessageId = newMessageId || `assistant-${Date.now()}`;
                
                console.log('Guardando mensaje final del asistente:', responseText);
                
                if (lastIndex >= 0) {
                  updatedMessages[lastIndex] = {
                    id: finalMessageId,
                    content: responseText,
                    sender: 'assistant',
                    timestamp: new Date().toISOString(),
                    isPartial: false
                  };
                } else {
                  // Si no encontramos el mensaje temporal, añadimos uno nuevo
                  updatedMessages.push({
                    id: finalMessageId,
                    content: responseText,
                    sender: 'assistant',
                    timestamp: new Date().toISOString(),
                    isPartial: false
                  });
                }
                
                // Guardar los mensajes actualizados en localStorage
                console.log('Guardando mensajes en localStorage:', updatedMessages);
                localStorage.setItem('iaeva_messages', JSON.stringify(updatedMessages));
                return updatedMessages;
              });
              
              setIsTyping(false);
              setAvatarState('idle');
            }
          } catch (e) {
            console.error('Error parsing JSON from SSE:', e);
          }
        }
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Mostrar error en el chat
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        content: `Lo siento, ha ocurrido un error al procesar tu mensaje: ${error.message}. Por favor, inténtalo de nuevo.`,
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        isError: true
      }]);
      
      setAvatarState('idle');
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Función principal para enviar mensaje
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    // Verificar si se ha alcanzado el límite de mensajes
    if (messageCount >= MESSAGE_LIMIT && formCompleted) {
      // Añadir mensaje amistoso del sistema
      const limitMessage = {
        id: `system-limit-${Date.now()}`,
        content: "¡La conversación está resultando muy interesante! Para poder profundizar más en tus necesidades específicas, uno de nuestros expertos comerciales se pondrá en contacto contigo para ofrecerte una propuesta adaptada a tu centro médico.",
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        isSystemMessage: true
      };
      
      setMessages(prev => [...prev, limitMessage]);
      return;
    }
    
    // Agregar mensaje del usuario
    const userMessage = {
      id: `user-${Date.now()}`,
      content: input,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    
    // Incrementar contador de mensajes
    setMessageCount(prev => prev + 1);
    
    // Guardar el mensaje del usuario en localStorage
    localStorage.setItem('iaeva_messages', JSON.stringify([...messages, userMessage]));
    
    // Si estamos en modo onboarding, procesar la respuesta para recopilar datos
    if (!formCompleted) {
      const processed = processOnboardingResponse(currentInput);
      if (processed) {
        // Respuesta procesada correctamente
        setIsLoading(false);
        return;
      }
    }
    
    // Si ya hemos completado el onboarding o ha fallado la validación, enviar a Dify
    if (formCompleted) {
      await sendMessageToDify(currentInput);
    } else {
      setIsLoading(false);
    }
  };

  // Manejar envío con Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-0 rounded-xl overflow-hidden border border-gray-200 shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700">
      {/* Avatar de IAEVA - Animado basado en el estado */}
      <div className="md:w-1/3 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <div className={`relative mb-6 transition-all duration-500 ${avatarState === 'thinking' ? 'scale-[1.02]' : avatarState === 'speaking' ? 'scale-[1.01] animate-pulse' : ''}`}>
          {/* Efectos de iluminación alrededor del avatar */}
          {avatarState !== 'idle' && (
            <div className="absolute inset-0 rounded-full glow-effect" 
                style={{
                  boxShadow: avatarState === 'thinking' 
                    ? '0 0 40px 2px rgba(79, 70, 229, 0.4)' 
                    : '0 0 25px 2px rgba(79, 70, 229, 0.3)',
                  animation: avatarState === 'thinking' 
                    ? 'pulse 2s infinite' 
                    : avatarState === 'speaking' 
                      ? 'smallPulse 1s infinite' 
                      : 'none'
                }}>
            </div>
          )}
          
          {/* Avatar video */}
          <div className={`relative w-48 h-48 overflow-hidden rounded-full border-4 ${
            avatarState === 'thinking' 
              ? 'border-indigo-200 dark:border-indigo-900' 
              : 'border-blue-100 dark:border-gray-600'
          } shadow-lg transition-all duration-300`}>
            <video 
              src="/video/iaeva_animate_avatar.mp4" 
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            
            {/* Overlay para efectos visuales */}
            {avatarState === 'thinking' && (
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-indigo-500/10 animate-gradient"></div>
            )}
            
            {avatarState === 'speaking' && (
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-indigo-500/40">
                <div className="voice-wave">
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Texto de estado bajo el avatar */}
        <p className="text-center text-gray-700 dark:text-gray-300 animate-fade-in max-w-xs">
          {avatarState === 'thinking' 
            ? 'Estoy analizando tu consulta...' 
            : avatarState === 'speaking' 
              ? 'Estoy respondiendo a tu pregunta...' 
              : `👋 ¡Hola${userInfo?.nombre ? ' ' + userInfo.nombre : ''}! Soy IAEVA, y estoy aquí para ayudarte a descubrir cómo puedo transformar la gestión de citas y atención al paciente en tu establecimiento.`}
        </p>
        
        {/* Enlaces legales - centrados y en columna */}
        <div className="mt-auto pt-6 w-full flex flex-col items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          {/* Botón para eliminar historial - visible solo si hay mensajes del usuario */}
          {hasUserMessages() && (
            <button 
              onClick={clearChatHistory}
              className="flex items-center text-red-500 hover:text-red-600 transition-colors"
              aria-label="Eliminar historial de chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Eliminar historial de chat
            </button>
          )}
          
          <a 
            href="/terminos-servicio" 
            target="_blank" 
            className="flex items-center hover:text-indigo-500 transition-colors"
          >
            {/* Código del icono y texto del enlace */}
            Términos del servicio
          </a>
          
          <a 
            href="/politica-privacidad" 
            target="_blank" 
            className="flex items-center hover:text-indigo-500 transition-colors"
          >
            {/* Código del icono y texto del enlace */}
            Política de privacidad
          </a>
        </div>
      </div>
      
      {/* Contenedor principal del chat */}
      <div className="md:w-2/3 flex flex-col h-[600px] md:h-auto">
        {/* Header del chat */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            IAEVA Assistant
          </h3>
        </div>
        
        {/* Área de mensajes con altura fija */}
        <div 
          ref={chatContainerRef} 
          className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
              <p className="mb-4">Inicia una conversación con IAEVA</p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.sender === 'user' 
                        ? 'bg-indigo-500 text-white rounded-tr-none' 
                        : message.isError
                          ? 'bg-red-50 dark:bg-red-900/20 text-gray-800 dark:text-gray-200 rounded-tl-none border border-red-200 dark:border-red-800/30'
                          : message.isSystemMessage
                            ? 'bg-amber-50 dark:bg-amber-900/20 text-gray-800 dark:text-gray-200 rounded-tl-none border border-amber-200 dark:border-amber-800/30'
                            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-600'
                    } ${message.isPartial ? 'animate-pulse' : ''}`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.isPartial && (
                      <div className="mt-2 flex space-x-1">
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {/* Indicador de "escribiendo" */}
              {isTyping && !messages[messages.length - 1]?.isPartial && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 rounded-tl-none">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Área de entrada de texto */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          {/* Previsualización de imagen si existe */}
          {selectedImage && (
            <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <img 
                  src={selectedImage.url} 
                  alt="Preview" 
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-2 flex-1">
                  <p className="text-sm truncate">{selectedImage.name}</p>
                </div>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          
          {/* Previsualización de documento si existe */}
          {selectedDocument && (
            <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-10 h-10 text-indigo-500" />
                <div className="ml-2 flex-1">
                  <p className="text-sm truncate">{selectedDocument.name}</p>
                </div>
                <button 
                  onClick={() => setSelectedDocument(null)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

<div className="relative flex items-center">
            <textarea
              className="flex-1 py-3 px-4 rounded-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none pr-16 md:pr-24 max-h-32"
              placeholder={messageCount >= MESSAGE_LIMIT ? "Has alcanzado el límite de mensajes para esta conversación" : "Escribe tu mensaje..."}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading || messageCount >= MESSAGE_LIMIT}
              style={{ minHeight: '50px' }}
            />
            <div className="absolute right-2 flex space-x-1">
              {/* Botón de herramientas para móvil */}
              <div className="md:hidden relative">
                {/* Botón de menú "+" */}
                <button
                  type="button"
                  className={`p-2 rounded-full ${showMobileTools ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-600'} transition-colors`}
                  onClick={toggleMobileTools}
                  disabled={isLoading || messageCount >= MESSAGE_LIMIT}
                >
                  {showMobileTools ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                  )}
                </button>
                
                {/* Menú desplegable de herramientas */}
                {showMobileTools && (
                  <div className="absolute bottom-12 right-0 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-2 space-y-2 border border-gray-200 dark:border-gray-600">
                    <button
                      type="button"
                      className={`flex items-center space-x-2 w-full p-2 rounded-md ${isRecording ? 'bg-red-500 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                      onClick={toggleRecording}
                    >
                      {isRecording ? (
                        <><Square className="w-5 h-5" /><span>Detener</span></>
                      ) : (
                        <><Mic className="w-5 h-5" /><span>Grabar audio</span></>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      className="flex items-center space-x-2 w-full p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={handleImageSelect}
                    >
                      <Image className="w-5 h-5" />
                      <span>Subir imagen</span>
                    </button>
                    
                    <button
                      type="button"
                      className="flex items-center space-x-2 w-full p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={handleDocumentSelect}
                    >
                      <FileText className="w-5 h-5" />
                      <span>Subir documento</span>
                    </button>
                  </div>
                )}
              </div>
              
              {/* Botones para escritorio */}
              <div className="hidden md:flex space-x-1">
                {/* Botón de micrófono */}
                <button
                  type="button"
                  className={`p-2 rounded-full ${isRecording ? 'bg-red-500 text-white' : 'text-gray-500 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-600'} transition-colors`}
                  onClick={toggleRecording}
                  disabled={isLoading || messageCount >= MESSAGE_LIMIT}
                >
                  {isRecording ? (
                    <Square className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>
                
                {/* Botón de imagen */}
                <button
                  type="button"
                  className="p-2 rounded-full text-gray-500 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={handleImageSelect}
                  disabled={isLoading || messageCount >= MESSAGE_LIMIT}
                >
                  <Image className="w-5 h-5" />
                </button>
                
                {/* Botón de documento */}
                <button
                  type="button"
                  className="p-2 rounded-full text-gray-500 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={handleDocumentSelect}
                  disabled={isLoading || messageCount >= MESSAGE_LIMIT}
                >
                  <FileText className="w-5 h-5" />
                </button>
              </div>
              
              {/* Botón de enviar (siempre visible) */}
              <button
                type="button"
                className="p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
                onClick={sendMessage}
                disabled={isLoading || !input.trim() || messageCount >= MESSAGE_LIMIT}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <SendHorizontal className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          
          {/* Inputs ocultos para uploads */}
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
          />
          
          <input 
            type="file"
            ref={documentInputRef}
            onChange={handleDocumentChange}
            className="hidden"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
            {messageCount >= MESSAGE_LIMIT ? (
              <span className="text-indigo-500">Has alcanzado el límite de mensajes. Uno de nuestros expertos se pondrá en contacto contigo.</span>
            ) : (
              <span>IAEVA responde basándose en la información disponible hasta marzo 2025</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Estilos CSS para animaciones y efectos */}
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 25px 2px rgba(79, 70, 229, 0.3); }
          50% { box-shadow: 0 0 35px 5px rgba(79, 70, 229, 0.5); }
          100% { box-shadow: 0 0 25px 2px rgba(79, 70, 229, 0.3); }
        }
        
        @keyframes smallPulse {
          0% { box-shadow: 0 0 15px 2px rgba(79, 70, 229, 0.2); }
          50% { box-shadow: 0 0 20px 3px rgba(79, 70, 229, 0.3); }
          100% { box-shadow: 0 0 15px 2px rgba(79, 70, 229, 0.2); }
        }
        
        @keyframes gradient {
          0% { opacity: 0.3; }
          50% { opacity: 0.5; }
          100% { opacity: 0.3; }
        }
        
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          background: #3b82f6;
          border-radius: 50%;
          display: block;
          margin-right: 3px;
          opacity: 0.4;
        }
        
        .typing-indicator span:nth-child(1) {
          animation: blink 1s infinite 0.1s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation: blink 1s infinite 0.3s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation: blink 1s infinite 0.5s;
          margin-right: 0;
        }
        
        @keyframes blink {
          0% { opacity: 0.1; }
          20% { opacity: 1; }
          100% { opacity: 0.1; }
        }
        
        .voice-wave {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          height: 100%;
          width: 100%;
        }
        
        .voice-wave .bar {
          width: 4px;
          margin: 0 1px;
          border-radius: 3px;
          background: #fff;
          animation: wave 0.5s infinite ease-in-out;
          height: 40%;
        }
        
        .voice-wave .bar:nth-child(1) { animation-delay: 0s; }
        .voice-wave .bar:nth-child(2) { animation-delay: 0.2s; }
        .voice-wave .bar:nth-child(3) { animation-delay: 0.1s; }
        .voice-wave .bar:nth-child(4) { animation-delay: 0.3s; }
        .voice-wave .bar:nth-child(5) { animation-delay: 0.4s; }
        
        @keyframes wave {
          0% { height: 10%; }
          50% { height: 80%; }
          100% { height: 10%; }
        }
      `}</style>
    </div>
  );
};

export default IAEVAChat;
