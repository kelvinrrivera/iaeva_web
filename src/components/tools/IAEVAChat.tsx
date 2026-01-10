
import { useState, useEffect, useRef } from 'react';
import { SendHorizontal, Mic, Image, FileText, Square, X, Loader2, Volume2, VolumeX, ExternalLink, RefreshCw } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";
import { useTranslation } from 'react-i18next';
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

interface SuggestedQuestion {
  id: string;
  content: string;
}

interface RetrieverResource {
  position: number;
  dataset_id: string;
  dataset_name: string;
  document_id: string;
  document_name: string;
  segment_id: string;
  score: number;
  content: string;
}

interface IChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  isPdf?: boolean;
  isPartial?: boolean;
  isError?: boolean;
  isSystemMessage?: boolean;
  citations?: RetrieverResource[];
}

// Variables de entorno (puedes moverlas a un archivo .env)
const API_URL = import.meta.env.VITE_DIFY_API_URL
const API_KEY = import.meta.env.VITE_DIFY_API_KEY
const MESSAGE_LIMIT_DAILY = 25; // Mensajes permitidos cada 24 horas
const MIN_TIME_BETWEEN_MESSAGES = 2000; // ms

// Componente principal del chat de IAEVA
const IAEVAChat = () => {
  const { t, i18n } = useTranslation('chat');
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

  // Estados para la gestión del usuario (sin onboarding ahora)
  const [userInfo, setUserInfo] = useState({
    nombre: '',
    tipo_centro: '',
    email: '',
    telefono: ''
  });

  // Ya no necesitamos el estado de onboarding
  const [formCompleted, setFormCompleted] = useState(true); // Siempre consideramos el formulario completo

  // Estados para funcionalidades multimedia
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Rate limiting state
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [dailyMessageCount, setDailyMessageCount] = useState(0);

  // Audio refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioQueueRef = useRef<ArrayBuffer[]>([]);
  const isPlayingRef = useRef(false);
  const nextStartTimeRef = useRef(0);

  // Función para alternar menú de herramientas en móvil
  const toggleMobileTools = () => {
    setShowMobileTools(!showMobileTools);
  };

  // Inicializar Audio Context
  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioContextRef.current = new AudioContextClass();
    }
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  // Función para reproducir audio desde la cola
  const playNextAudioChunk = () => {
    if (!audioContextRef.current || audioQueueRef.current.length === 0 || !audioEnabled) {
      isPlayingRef.current = false;
      return;
    }

    isPlayingRef.current = true;
    const audioData = audioQueueRef.current.shift();

    if (!audioData) return;

    audioContextRef.current.decodeAudioData(audioData, (buffer) => {
      const source = audioContextRef.current!.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current!.destination);

      const currentTime = audioContextRef.current!.currentTime;
      // Asegurar que el audio se reproduce después del anterior
      const startTime = Math.max(currentTime, nextStartTimeRef.current);

      source.start(startTime);
      nextStartTimeRef.current = startTime + buffer.duration;

      source.onended = () => {
        // Un pequeño margen para evitar cortes abruptos
        if (audioContextRef.current!.currentTime >= nextStartTimeRef.current - 0.1) {
          playNextAudioChunk();
        }
      };

      // Si es el primer chunk o ya terminó el anterior, intentar programar el siguiente
      if (audioQueueRef.current.length > 0) {
        playNextAudioChunk();
      }
    }, (e) => console.error("Error decoding audio data", e));
  };

  const handleAudioChunk = (base64Data: string) => {
    if (!audioEnabled) return;

    // Convertir base64 a ArrayBuffer
    const binaryString = window.atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    audioQueueRef.current.push(bytes.buffer);

    if (!isPlayingRef.current) {
      playNextAudioChunk();
    }
  };


  // Referencias
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Inicializar Cal.com
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "30min" });
      cal("ui", { "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, []);

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
          } else {
            // Si no hay mensajes, mostrar mensaje de bienvenida
            showWelcomeMessage();
          }
        }
      } catch (e) {
        console.error('Error parsing saved user info:', e);
        // Mostrar mensaje de bienvenida
        showWelcomeMessage();
      }
    } else {
      // Comprobar límite diario
      checkDailyLimit();

      // Probar conexión a la API al iniciar
      testApiConnection();
    }

    // Limpiar recursos al desmontar el componente
    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
      }
      audioContextRef.current?.close();
    };
  }, []);

  const checkDailyLimit = () => {
    const storedLimit = localStorage.getItem('iaeva_daily_limit');
    if (storedLimit) {
      try {
        const { count, date } = JSON.parse(storedLimit);
        const storedDate = new Date(date);
        const now = new Date();

        // Si es el mismo día, mantener el conteo, si no, reiniciar
        if (storedDate.getDate() === now.getDate() &&
          storedDate.getMonth() === now.getMonth() &&
          storedDate.getFullYear() === now.getFullYear()) {
          setDailyMessageCount(count);
          // Si ya excedió, mostrar mensaje de límite (opcional al inicio)
        } else {
          // Nuevo día, reiniciar
          resetDailyLimit();
        }
      } catch (e) {
        resetDailyLimit();
      }
    } else {
      resetDailyLimit();
    }
  };

  const resetDailyLimit = () => {
    setDailyMessageCount(0);
    localStorage.setItem('iaeva_daily_limit', JSON.stringify({
      count: 0,
      date: new Date().toISOString()
    }));
  };

  const incrementDailyLimit = () => {
    const newCount = dailyMessageCount + 1;
    setDailyMessageCount(newCount);
    localStorage.setItem('iaeva_daily_limit', JSON.stringify({
      count: newCount,
      date: new Date().toISOString()
    }));
  };

  // Mostrar mensaje de bienvenida
  const showWelcomeMessage = () => {
    const welcomeMessage = {
      id: `assistant - welcome - ${Date.now()} `,
      content: t('avatar_states.idle', '👋 ¡Hola! Soy IAEVA, y estoy aquí para ayudarte a descubrir cómo puedo transformar la gestión de citas y atención al paciente en tu establecimiento.'),
      sender: 'assistant',
      timestamp: new Date().toISOString()
    };

    setMessages([welcomeMessage]);
  };

  // Función para verificar si hay mensajes del usuario en el historial
  const hasUserMessages = () => {
    return messages.some(message => message.sender === 'user');
  };

  // Función para eliminar historial de chat
  const clearChatHistory = () => {
    if (window.confirm(t('confirm_clear_history', "¿Estás seguro de que deseas eliminar todo el historial de chat? Esta acción no se puede deshacer."))) {
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
        id: `assistant - welcome - ${Date.now()} `,
        content: t('history_cleared_message', '¡Hola! Has borrado tu historial de conversación anterior. ¿En qué puedo ayudarte ahora?'),
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

  // Función para desplazarse hacia abajo automáticamente
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
      alert(t('file_upload.image_error', 'Por favor selecciona una imagen válida (PNG, JPEG, JPG, WEBP, GIF)'));
      return;
    }

    setIsLoading(true);

    try {
      // Crear FormData para el archivo
      const formData = new FormData();
      formData.append('file', file);
      formData.append('user', userId);

      console.log('Subiendo imagen:', file.name, 'para usuario:', userId);

      // Subir archivo a la API
      const response = await fetch(`${API_URL}/files/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        throw new Error(getApiErrorMessage(errorData));
      }

      const data = await response.json();
      console.log('Imagen subida correctamente:', data);

      // Mostrar la imagen seleccionada en el chat
      setSelectedImage({
        id: data.id,
        url: URL.createObjectURL(file),
        name: file.name
      });

    } catch (error) {
      console.error('Error uploading image:', error);
      alert(error.message || t('file_upload.upload_error', 'Error al subir la imagen. Por favor intenta de nuevo.'));
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
      alert(t('file_upload.document_error', 'Por favor selecciona un documento válido (PDF, DOC, DOCX)'));
      return;
    }

    setIsLoading(true);

    try {
      // Crear FormData para el archivo
      const formData = new FormData();
      formData.append('file', file);
      formData.append('user', userId);

      console.log('Subiendo documento:', file.name, 'para usuario:', userId);

      // Subir archivo a la API
      const response = await fetch(`${API_URL}/files/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        throw new Error(getApiErrorMessage(errorData));
      }

      const data = await response.json();
      console.log('Documento subido correctamente:', data);

      // Guardar la referencia del documento
      setSelectedDocument({
        id: data.id,
        name: file.name
      });

      // Informar al usuario que el documento se ha subido
      setInput(`${input} [Documento: ${file.name}]`);

    } catch (error) {
      console.error('Error uploading document:', error);
      alert(error.message || t('file_upload.upload_error', 'Error al subir el documento. Por favor intenta de nuevo.'));
    } finally {
      setIsLoading(false);
    }
  };

  // Funciones para grabación de audio
  const toggleRecording = async () => {
    if (isRecording) {
      // Detener grabación
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
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
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        if (audioChunksRef.current.length === 0) {
          console.warn('No audio data available');
          return;
        }

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        audioChunksRef.current = [];

        // Detener todos los tracks del stream
        if (audioStream) {
          audioStream.getTracks().forEach(track => track.stop());
        }

        // Enviar audio a la API para transcripción
        await transcribeAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert(t('audio.microphone_error', 'No se pudo acceder al micrófono. Por favor verifica los permisos.'));
    }
  };

  const transcribeAudio = async (audioBlob) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');
      formData.append('user', userId);

      console.log('Enviando audio para transcripción con usuario:', userId);

      const response = await fetch(`${API_URL}/audio-to-text`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error en transcripción:', errorData);
        throw new Error(getApiErrorMessage(errorData));
      }

      const data = await response.json();
      console.log('Transcripción recibida:', data);

      if (data.text) {
        // Establecer el texto transcrito en el input
        setInput(prev => prev + (prev ? ' ' : '') + data.text);
      } else {
        console.warn('La transcripción no devolvió texto');
        alert(t('audio.no_text_error', 'No se pudo transcribir el audio. Por favor intenta de nuevo.'));
      }

    } catch (error) {
      console.error('Error transcribing audio:', error);
      alert(error.message || t('audio.transcription_error', 'Error al procesar el audio. Por favor intenta de nuevo.'));
    } finally {
      setIsLoading(false);
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

      // Preparar el payload de la API con tipo adecuado
      const messagePayload: ChatMessagePayload = {
        query: userInput,
        user: userId,
        response_mode: 'streaming',
        ...(conversationId ? { conversation_id: conversationId } : {}),
        inputs: userInfo
      };

      // Añadir archivos si están presentes
      if (selectedImage || selectedDocument) {
        messagePayload.files = [];

        if (selectedImage) {
          messagePayload.files.push({
            type: 'image',
            transfer_method: 'local_file',
            upload_file_id: selectedImage.id
          });
        }

        if (selectedDocument) {
          messagePayload.files.push({
            type: 'document',
            transfer_method: 'local_file',
            upload_file_id: selectedDocument.id
          });
        }
      }

      console.log('Sending message with payload:', JSON.stringify(messagePayload));

      // Usar fetch con ReadableStream para procesar el streaming de manera más eficiente
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
      let citations: RetrieverResource[] = [];

      // Limpiar preguntas sugeridas anteriores
      setSuggestedQuestions([]);

      // Reiniciar estado de audio
      nextStartTimeRef.current = 0;
      audioQueueRef.current = [];
      isPlayingRef.current = false;
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      // Mostrar que IAEVA está escribiendo
      setIsTyping(true);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        // Dividir el chunk en eventos SSE individuales
        const events = chunk.split('\n\n');

        for (const event of events) {
          if (!event.trim() || !event.startsWith('data: ')) continue;

          try {
            const jsonStr = event.substring(6);
            const jsonData = JSON.parse(jsonStr);

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
            switch (jsonData.event) {
              case 'message':
              case 'agent_message':
              case 'text_chunk': // Compatibilidad con otros modos
                // Eventos de mensaje normal
                const contentChunk = jsonData.answer || jsonData.text || '';

                if (contentChunk) {
                  responseText += contentChunk;

                  // Actualizar mensaje inmediatamente para mejor UX
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
                break;

              case 'message_replace':
                // Reemplazo total del mensaje (usado a veces para correcciones finales)
                if (jsonData.answer) {
                  responseText = jsonData.answer;
                  setMessages(prev => {
                    const updatedMessages = [...prev];
                    const lastIndex = updatedMessages.findIndex(m => m.id === tempMessageId);
                    if (lastIndex >= 0) {
                      updatedMessages[lastIndex] = { ...updatedMessages[lastIndex], content: responseText, isPartial: true };
                    }
                    return updatedMessages;
                  });
                }
                break;

              case 'agent_thought':
                // Gestionar pensamiento del agente (COT)
                if (jsonData.thought) {
                  // Opcional: Mostrar pensamiento en UI de debug o colapsado
                  // Por ahora lo ignoramos o lo añadimos si queremos ver el proceso
                }
                break;

              case 'suggested_questions':
                if (jsonData.data && Array.isArray(jsonData.data)) {
                  setSuggestedQuestions(jsonData.data);
                }
                break;

              case 'retriever_resources':
                if (jsonData.data && Array.isArray(jsonData.data)) {
                  citations = jsonData.data;
                }
                break;

              case 'tts_message':
                if (audioEnabled && jsonData.audio) {
                  handleAudioChunk(jsonData.audio);
                }
                break;

              case 'tts_message_end':
                // Fin del stream de audio para este mensaje
                break;

              case 'message_end':
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

                  const finalizedMessage: any = {
                    id: finalMessageId,
                    content: responseText,
                    sender: 'assistant',
                    timestamp: new Date().toISOString(),
                    isPartial: false
                  };

                  if (citations.length > 0) {
                    finalizedMessage.citations = citations;
                  }

                  if (lastIndex >= 0) {
                    updatedMessages[lastIndex] = finalizedMessage;
                  } else {
                    // Si no encontramos el mensaje temporal, añadimos uno nuevo
                    updatedMessages.push(finalizedMessage);
                  }

                  // Guardar los mensajes actualizados en localStorage
                  localStorage.setItem('iaeva_messages', JSON.stringify(updatedMessages));
                  return updatedMessages;
                });

                setIsTyping(false);
                setAvatarState('idle');
                incrementDailyLimit();
                break;

              case 'error':
                console.error('Error en el streaming:', jsonData.message);
                setMessages(prev => {
                  const updatedMessages = [...prev];
                  const lastIndex = updatedMessages.findIndex(m => m.id === tempMessageId);

                  if (lastIndex >= 0) {
                    updatedMessages[lastIndex] = {
                      id: `error-${Date.now()}`,
                      content: t('error_message', { error: jsonData.message }),
                      sender: 'assistant',
                      timestamp: new Date().toISOString(),
                      isError: true
                    };
                  }

                  return updatedMessages;
                });

                setIsTyping(false);
                setAvatarState('idle');
                break;
            }
          } catch (e) {
            console.error('Error parsing JSON from SSE:', e);
          }
        }
      }

    } catch (error) {
      console.error('Error sending message:', error);

      // Corregir el formato de la función de traducción
      setMessages(prev => {
        // Encontrar el mensaje temporal y reemplazarlo con un mensaje de error
        const updatedMessages = [...prev];
        const tempIndex = updatedMessages.findIndex(m => m.id.startsWith('assistant-temp-'));

        if (tempIndex >= 0) {
          updatedMessages[tempIndex] = {
            id: `error-${Date.now()}`,
            content: t('error_message', { error: error.message }) || `Error: ${error.message}`,
            sender: 'assistant',
            timestamp: new Date().toISOString(),
            isError: true
          };
        } else {
          updatedMessages.push({
            id: `error-${Date.now()}`,
            content: t('error_message', { error: error.message }) || `Error: ${error.message}`,
            sender: 'assistant',
            timestamp: new Date().toISOString(),
            isError: true
          });
        }

        return updatedMessages;
      });

      setAvatarState('idle');
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };



  // Wrapper para el botón de enviar
  const sendMessage = () => handleSendMessage();
  const sendMessageBody = (text?: string) => {
    handleSendMessage(text);
  };

  const handleSendMessage = async (textOverride?: string) => {
    const text = textOverride || input;
    if (!text.trim() && !textOverride) return;

    /* Lógica duplicada de arriba movida aquí para reutilizar en sugerencias */

    // Verificar spam
    const now = Date.now();
    if (now - lastMessageTime < MIN_TIME_BETWEEN_MESSAGES) return;
    setLastMessageTime(now);

    // Verificar límite diario
    if (dailyMessageCount >= MESSAGE_LIMIT_DAILY) {
      setMessages(prev => [...prev, {
        id: `system-limit-${Date.now()}`,
        content: t('message_limit_reached', "Límite diario alcanzado."),
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        isSystemMessage: true
      }]);
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      content: text,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textOverride) setInput('');
    setIsLoading(true);
    setMessageCount(prev => prev + 1);
    localStorage.setItem('iaeva_messages', JSON.stringify([...messages, userMessage]));

    await sendMessageToDify(text);
  };

  // Manejar envío con Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Agregar traducciones para errores comunes
  useEffect(() => {
    // Mensajes de traducción para los errores (esto podría ir en archivos de traducción)
    i18n.addResources('es', 'chat', {
      'audio': {
        'microphone_error': 'No se pudo acceder al micrófono. Por favor verifica los permisos.',
        'transcription_error': 'Error al procesar el audio. Por favor intenta de nuevo.',
        'no_text_error': 'No se pudo transcribir el audio. Por favor intenta de nuevo.',
      },
      'file_upload': {
        'image_error': 'Por favor selecciona una imagen válida (PNG, JPEG, JPG, WEBP, GIF)',
        'document_error': 'Por favor selecciona un documento válido (PDF, DOC, DOCX)',
        'upload_error': 'Error al subir el archivo. Por favor intenta de nuevo.',
      },
      'error_message': 'Ha ocurrido un error: {{error}}',
      'api_errors': {
        'file_too_large': 'El archivo es demasiado grande',
        'unsupported_file_type': 'Tipo de archivo no soportado',
        'no_file_uploaded': 'No se ha seleccionado ningún archivo',
        'too_many_files': 'Solo se puede subir un archivo a la vez',
        's3_connection_failed': 'Error de conexión con el servidor de archivos',
        'internal_server_error': 'Error interno del servidor'
      }
    });

    i18n.addResources('fr', 'chat', {
      'audio': {
        'microphone_error': 'Impossible d\'accéder au microphone. Veuillez vérifier les autorisations.',
        'transcription_error': 'Erreur lors du traitement audio. Veuillez réessayer.',
        'no_text_error': 'Impossible de transcrire l\'audio. Veuillez réessayer.',
      },
      'file_upload': {
        'image_error': 'Veuillez sélectionner une image valide (PNG, JPEG, JPG, WEBP, GIF)',
        'document_error': 'Veuillez sélectionner un document valide (PDF, DOC, DOCX)',
        'upload_error': 'Erreur lors du téléchargement du fichier. Veuillez réessayer.',
      },
      'error_message': 'Une erreur s\'est produite: {{error}}',
      'api_errors': {
        'file_too_large': 'Le fichier est trop volumineux',
        'unsupported_file_type': 'Type de fichier non pris en charge',
        'no_file_uploaded': 'Aucun fichier n\'a été sélectionné',
        'too_many_files': 'Un seul fichier peut être téléchargé à la fois',
        's3_connection_failed': 'Erreur de connexion au serveur de fichiers',
        'internal_server_error': 'Erreur interne du serveur'
      }
    });
  }, [i18n]);

  // Función para procesar errores de API y devolver mensajes localizados
  const getApiErrorMessage = (error) => {
    if (!error) return t('error_message', { error: 'Unknown error' });

    // Si es un error con código específico
    if (error.code) {
      const translatedError = t(`api_errors.${error.code}`, null);
      if (translatedError) return translatedError;
    }

    // Si es un error con mensaje genérico
    return error.message || t('error_message', { error: 'Unknown error' });
  };

  // Función para renderizar contenido con componentes interactivos (detectar botón de calendario)
  const renderMessageContent = (content: string) => {
    if (!content) return '';

    // Detectar el bloque HTML específico del botón de calendario
    const calButtonRegex = /<div style="background-color: #f0fdf4;[\s\S]*?<\/div>/;
    const match = content.match(calButtonRegex);

    if (match) {
      const parts = content.split(match[0]);
      return (
        <>
          {parts[0]}
          <div className="my-3 p-4 rounded-xl border border-green-500 bg-green-50 text-center">
            <p className="mb-2 text-green-800 font-semibold">📅 Reserva tu Demo Express</p>
            <button
              onClick={async () => {
                const cal = await getCalApi({ "namespace": "30min" });
                cal("modal", {
                  calLink: "kelvinscale/30min",
                  config: {
                    layout: "month_view",
                    theme: "light"
                  }
                });
              }}
              className="inline-block px-5 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Ver Huecos Disponibles
            </button>
          </div>
          {parts[1]}
        </>
      );
    }

    return content;
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
          <div className={`relative w-48 h-48 overflow-hidden rounded-full border-4 ${avatarState === 'thinking'
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
            ? t('avatar_states.thinking', 'Estoy analizando tu consulta...')
            : avatarState === 'speaking'
              ? t('avatar_states.speaking', 'Estoy respondiendo a tu pregunta...')
              : t('avatar_states.idle', '👋 ¡Hola! Soy IAEVA, y estoy aquí para ayudarte a descubrir cómo puedo transformar la gestión de citas y atención al paciente en tu establecimiento.')}
        </p>

        {/* Enlaces legales - centrados y en columna */}
        <div className="mt-auto pt-6 w-full flex flex-col items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          {/* Botón para eliminar historial - visible solo si hay mensajes del usuario */}
          {hasUserMessages() && (
            <button
              onClick={clearChatHistory}
              className="flex items-center text-red-500 hover:text-red-600 transition-colors"
              aria-label={t('buttons.clear_history_aria', "Eliminar historial de chat")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              {t('buttons.clear_history', "Eliminar historial de chat")}
            </button>
          )}

          {/*<a 
            href={i18n.language.startsWith('fr') ? "/fr/conditions-utilisation" : "/terminos-y-condiciones"} 
            target="_blank" 
            className="flex items-center hover:text-indigo-500 transition-colors"
          >
            {t('links.terms', "Términos del servicio")}
          </a>
          */}

          <a
            href={i18n.language.startsWith('fr') ? "/fr/politique-de-confidentialite" : "/politica-de-privacidad"}
            target="_blank"
            className="flex items-center hover:text-indigo-500 transition-colors"
          >
            {t('links.privacy', "Política de privacidad")}
          </a>

          {/*<a 
            href={i18n.language.startsWith('fr') ? "/fr/politique-des-cookies" : "/politica-de-cookies"} 
            target="_blank" 
            className="flex items-center hover:text-indigo-500 transition-colors"
          >
            {t('links.cookies', "Política de cookies")}
          </a>
          */}
        </div>
      </div>

      {/* Contenedor principal del chat */}
      <div className="md:w-2/3 flex flex-col h-[600px] md:h-auto">
        {/* Header del chat */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            {t('header.title', "IAEVA Assistant")}
          </h3>
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`p-2 rounded-full transition-colors ${audioEnabled ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' : 'text-gray-400 hover:text-gray-600'}`}
            title={audioEnabled ? "Desactivar voz" : "Activar voz"}
          >
            {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* Área de mensajes con altura fija */}
        <div
          ref={chatContainerRef}
          className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
              <p className="mb-4">{t('empty_state', "Inicia una conversación con IAEVA")}</p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${message.sender === 'user'
                      ? 'bg-indigo-500 text-white rounded-tr-none'
                      : message.isError
                        ? 'bg-red-50 dark:bg-red-900/20 text-gray-800 dark:text-gray-200 rounded-tl-none border border-red-200 dark:border-red-800/30'
                        : message.isSystemMessage
                          ? 'bg-amber-50 dark:bg-amber-900/20 text-gray-800 dark:text-gray-200 rounded-tl-none border border-amber-200 dark:border-amber-800/30'
                          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-600'
                      } ${message.isPartial ? 'animate-pulse' : ''}`}
                  >
                    <div className="whitespace-pre-wrap">{renderMessageContent(message.content)}</div>

                    {/* Citations / Sources */}
                    {message.citations && message.citations.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                        <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center">
                          <FileText className="w-3 h-3 mr-1" /> Fuentes:
                        </p>
                        <div className="space-y-2">
                          {message.citations.map((citation, idx) => (
                            <div key={idx} className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs text-gray-600 dark:text-gray-300">
                              <div className="font-medium truncate" title={citation.document_name}>{citation.document_name}</div>
                              <div className="mt-1 line-clamp-2 text-[10px] text-gray-500 italic">{citation.content}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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

              {/* Preguntas sugeridas (pills) */}
              {!isTyping && suggestedQuestions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 justify-end">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-full px-3 py-1 text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors text-left"
                    >
                      {q}
                    </button>
                  ))}
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
              placeholder={dailyMessageCount >= MESSAGE_LIMIT_DAILY ? t('input.limit_reached_placeholder', "Límite diario alcanzado par la demo") : t('input.placeholder', "Escribe tu mensaje...")}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading || dailyMessageCount >= MESSAGE_LIMIT_DAILY}
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
                  disabled={isLoading || dailyMessageCount >= MESSAGE_LIMIT_DAILY}
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
                    {/* Ocultando temporalmente grabación de audio
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
                    */}

                    <button
                      type="button"
                      className="flex items-center space-x-2 w-full p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={handleImageSelect}
                    >
                      <Image className="w-5 h-5" />
                      <span>Subir imagen</span>
                    </button>

                    {/* Ocultando temporalmente subida de documentos
                    <button
                      type="button"
                      className="flex items-center space-x-2 w-full p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={handleDocumentSelect}
                    >
                      <FileText className="w-5 h-5" />
                      <span>Subir documento</span>
                    </button>
                    */}
                  </div>
                )}
              </div>

              {/* Botones para escritorio */}
              <div className="hidden md:flex space-x-1">
                {/* Ocultando temporalmente botón de micrófono
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
                */}

                {/* Botón de imagen */}
                <button
                  type="button"
                  className="p-2 rounded-full text-gray-500 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={handleImageSelect}
                  disabled={isLoading || dailyMessageCount >= MESSAGE_LIMIT_DAILY}
                >
                  <Image className="w-5 h-5" />
                </button>

                {/* Ocultando temporalmente botón de documento
                <button
                  type="button"
                  className="p-2 rounded-full text-gray-500 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={handleDocumentSelect}
                  disabled={isLoading || messageCount >= MESSAGE_LIMIT}
                >
                  <FileText className="w-5 h-5" />
                </button>
                */}
              </div>

              {/* Botón de enviar (siempre visible) */}
              <button
                type="button"
                className="p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim() || dailyMessageCount >= MESSAGE_LIMIT_DAILY}
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
            {dailyMessageCount >= MESSAGE_LIMIT_DAILY ? (
              <span className="text-indigo-500">{t('footer.limit_reached', "Has alcanzado el límite diario de mensajes. Vuelve mañana.")}</span>
            ) : (
              <>
                {/*<span>{t('footer.info_date', "IAEVA responde basándose en la información disponible hasta marzo 2025")}</span>*/}
                <p className="mt-1 text-gray-400">{t('footer.disclaimer', "IAEVA está en constante aprendizaje para proporcionar respuestas precisas. Como toda IA, podría ocasionalmente cometer errores o proporcionar información desactualizada.")}</p>
              </>
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
