import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const IAEVAPhoneInterface = () => {
  const { t } = useTranslation('home');
  const [callState, setCallState] = useState('inactive'); // inactive, ringing, active, ended
  const [conversationStage, setConversationStage] = useState(0);
  const [assistantResponse, setAssistantResponse] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [userResponseSelected, setUserResponseSelected] = useState(false);
  const [activeBubble, setActiveBubble] = useState(null); // 'assistant', 'user', or null
  const [bubbleOpacity, setBubbleOpacity] = useState(0);
  const waveformCanvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const componentRef = useRef(null);
  const timeoutRef = useRef(null);
  const durationTimerRef = useRef(null);
  const bubbleTimeoutRef = useRef(null);
  
  // Simulación de respuestas del asistente en una llamada de confirmación de cita
  const simulatedResponses = [
    { text: t('vapi_voice_phone.assistant_message1'), delay: 5500 },
    { text: t('vapi_voice_phone.assistant_message2'), delay: 6000 },
    { text: t('vapi_voice_phone.assistant_message3'), delay: 7500 },
    { text: t('vapi_voice_phone.assistant_message4'), delay: 5000 },
    { text: t('vapi_voice_phone.assistant_message5'), delay: 5500 }
  ];
  
  // Simulación de respuestas del usuario
  const userResponses = [
    t('vapi_voice_phone.user_message1'),
    t('vapi_voice_phone.user_message2'),
    "",
    t('vapi_voice_phone.user_message3'),
    ""
  ];
  
  // Función para formatear el tiempo de llamada
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Función para mostrar y ocultar burbujas de texto
  const showTextBubble = (type, text, duration) => {
    // Limpiar cualquier burbuja activa previa
    if (bubbleTimeoutRef.current) {
      clearTimeout(bubbleTimeoutRef.current);
    }
    
    // Mostrar nueva burbuja
    if (type === 'assistant') {
      setAssistantResponse(text);
      setActiveBubble('assistant');
    } else {
      setUserResponse(text);
      setActiveBubble('user');
    }
    
    // Animación de aparición
    setBubbleOpacity(0);
    setTimeout(() => setBubbleOpacity(1), 50);
    
    // Ocultar después de duration
    bubbleTimeoutRef.current = setTimeout(() => {
      // Animación de desaparición
      setBubbleOpacity(0);
      
      // Limpiar después de la transición
      setTimeout(() => {
        setActiveBubble(null);
      }, 500);
    }, duration - 700); // Reducimos el tiempo para permitir la animación de salida
  };

  
  // Función para reiniciar la conversación (para la demo)
  const resetConversation = () => {
    // Activar bandera de reset
    setIsResetting(true);
    
    // Primero desmontamos todos los listeners para evitar comportamientos inesperados
    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
      durationTimerRef.current = null;
    }
    
    if (bubbleTimeoutRef.current) {
      clearTimeout(bubbleTimeoutRef.current);
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Importante: establecer el estado de conversación a -1 temporalmente 
    setConversationStage(-1);
    
    // Limpiamos todas las visualizaciones
    setAssistantResponse("");
    setUserResponse("");
    setCallDuration(0);
    setUserResponseSelected(false);
    setActiveBubble(null);
    setAudioPlaying(false);
    
    // Esperamos que los estados se actualicen antes de cambiar callState
    setTimeout(() => {
      // Primero establecemos el estado de la conversación
      setConversationStage(0);
      
      // Y después de otra pequeña pausa, activamos el estado
      setTimeout(() => {
        setCallState('inactive');
        // Desactivar bandera de reset cuando todo ha terminado
        setIsResetting(false);
      }, 100);
    }, 300);
  };
  
  
  
  // Iniciar llamada
  const startCall = () => {
    setCallState('ringing');
    
    // Limpiar cualquier timeout previo
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Simular el tiempo de timbre
    timeoutRef.current = setTimeout(() => {
      setCallState('active');
      setAudioPlaying(true);
      
      // Iniciar temporizador de duración de llamada
      if (durationTimerRef.current) {
        clearInterval(durationTimerRef.current);
      }
      
      durationTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      
      // Iniciar primera respuesta
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        showTextBubble('assistant', simulatedResponses[0].text, simulatedResponses[0].delay);
        
        // Avanzar a la siguiente etapa después de un tiempo
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          // Mostrar respuesta del usuario
          showTextBubble('user', userResponses[0], 4000);
          
          setTimeout(() => {
            setConversationStage(1);
          }, 2500);
        }, simulatedResponses[0].delay);
        
      }, 1000);
      
    }, 3000);
  };
  
  // Colgar llamada
  const endCall = () => {
    setCallState('ended');
    setAudioPlaying(false);
    setActiveBubble(null);
    
    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
      durationTimerRef.current = null;
    }
    
    // Limpiar cualquier timeout pendiente
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (bubbleTimeoutRef.current) {
      clearTimeout(bubbleTimeoutRef.current);
    }
    
    // Reiniciar después de unos segundos
    timeoutRef.current = setTimeout(() => {
      resetConversation();
    }, 3000);
  };
  
  // Efectos para la interacción durante la llamada
  useEffect(() => {
    if (callState !== 'active' || conversationStage === 0) return;
    
    // Limpiar timeout previo
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (conversationStage < simulatedResponses.length) {
      // Simular un retraso antes de que el asistente responda
      timeoutRef.current = setTimeout(() => {
        showTextBubble('assistant', simulatedResponses[conversationStage].text, simulatedResponses[conversationStage].delay);
        
        // Avanzar a la siguiente etapa después de un tiempo
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          // Mostrar respuesta del usuario si existe
          if (userResponses[conversationStage] && userResponses[conversationStage].length > 0) {
            showTextBubble('user', userResponses[conversationStage], 4000);
            
            setTimeout(() => {
              if (conversationStage < simulatedResponses.length - 1) {
                setConversationStage(prev => prev + 1);
              } else {
                // Final de la conversación
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
                
                timeoutRef.current = setTimeout(() => {
                  endCall();
                }, 2000);
              }
            }, 2500);
          } else {
            if (conversationStage < simulatedResponses.length - 1) {
              setConversationStage(prev => prev + 1);
            } else {
              // Final de la conversación
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
              
              timeoutRef.current = setTimeout(() => {
                endCall();
              }, 2000);
            }
          }
        }, simulatedResponses[conversationStage].delay);
        
      }, 2000);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [conversationStage, callState]);
  
  // Animación de ondas de audio
  useEffect(() => {
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const drawWaveform = () => {
      // Solo dibujar si el canvas está visible en el DOM
      if (!document.body.contains(canvas)) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        return;
      }
      
      // Limpiar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (callState !== 'active') {
        animationFrameRef.current = requestAnimationFrame(drawWaveform);
        return;
      }
      
      const centerY = canvas.height / 2;
      const numberOfWaves = 40;
      const waveWidth = canvas.width / numberOfWaves;
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#4361ee';
      
      ctx.beginPath();
      
      for (let i = 0; i <= numberOfWaves; i++) {
        const x = i * waveWidth;
        
        // Generar patrones de ondas más realistas para una llamada telefónica
        let amplitude;
        
        if (audioPlaying) {
          // Simulación de patrones de voz con diferentes frecuencias superpuestas
          amplitude = Math.sin(Date.now() / 200 + i * 0.3) * 8 +
                     Math.sin(Date.now() / 100 + i * 0.7) * 5 +
                     Math.sin(Date.now() / 50 + i * 1.1) * 3;
                     
          // Añadir algunas pausas en la conversación
          if (Math.sin(Date.now() / 800) > 0.7) {
            amplitude = amplitude * 0.3;
          }
        } else {
          // Cuando no está hablando, mostrar actividad mínima
          amplitude = Math.sin(Date.now() / 800 + i) * 2;
        }
        
        const y = centerY + amplitude;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      animationFrameRef.current = requestAnimationFrame(drawWaveform);
    };
    
    drawWaveform();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [audioPlaying, callState]);
  
  // Limpieza al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (durationTimerRef.current) {
        clearInterval(durationTimerRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (bubbleTimeoutRef.current) {
        clearTimeout(bubbleTimeoutRef.current);
      }
    };
  }, []);
  
  // Observador de Intersección para activar automáticamente cuando el componente entra en el viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && callState === 'inactive' && conversationStage === 0 && !isResetting) {
          // Solo inicia si estamos en el estado inicial correcto y NO estamos en proceso de reset
          startCall();
        }
      },
      { threshold: 0.5 }
    );
    
    if (componentRef.current) {
      observer.observe(componentRef.current);
    }
    
    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, [callState, conversationStage]); // Añadir conversationStage como dependencia
  
  
  return (
    <div ref={componentRef} className="w-full max-w-xs mx-auto h-full relative">
      {/* Burbujas flotantes de conversación */}
      {activeBubble === 'assistant' && (
        <div 
          className="absolute z-30 left-0 top-2/3 transform -translate-x-1/3 max-w-xs" 
          style={{ 
            opacity: bubbleOpacity, 
            transition: 'opacity 0.5s ease-in-out',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
          }}
        >
          <div className="relative bg-indigo-100 rounded-lg p-4 pr-5 border border-indigo-200">
            <div className="text-sm text-indigo-900">{assistantResponse}</div>
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-100 border-r border-t border-indigo-200 rotate-45"></div>
            <div className="absolute -left-6 -bottom-6 w-12 h-12 rounded-full border-2 border-indigo-200 bg-indigo-50 flex items-center justify-center overflow-hidden">
              <svg className="w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 0 0 1.99 12v2a1 1 0 0 0 1 1H3v5c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 0 0 1-1v-1.938a1.006 1.006 0 0 0-.072-.455zM5 20V8h14l.001 3.996L19 12v2l.001.005.001 5.995H5z"/>
                <ellipse cx="8.5" cy="12" rx="1.5" ry="2"/>
                <ellipse cx="15.5" cy="12" rx="1.5" ry="2"/>
                <path d="M8 16h8v2H8z"/>
              </svg>
            </div>
          </div>
        </div>
      )}
      
      {activeBubble === 'user' && (
        <div 
          className="absolute z-30 right-0 top-2/3 transform translate-x-1/3 max-w-xs" 
          style={{ 
            opacity: bubbleOpacity, 
            transition: 'opacity 0.5s ease-in-out',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
          }}
        >
          <div className="relative bg-green-100 rounded-lg p-4 pl-5 border border-green-200">
            <div className="text-sm text-green-900">{userResponse}</div>
            <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-100 border-l border-t border-green-200 rotate-45"></div>
            <div className="absolute -right-6 -bottom-6 w-12 h-12 rounded-full border-2 border-green-200 bg-green-50 flex items-center justify-center overflow-hidden">
              <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      )}
      
      {/* Dispositivo móvil */}
      <div className="relative w-full pb-[175%] bg-black rounded-[36px] shadow-xl overflow-hidden border-8 border-gray-800">
        
        {/* Pantalla del teléfono */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-blue-50">
          
          {/* Notch superior */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-20 flex justify-center items-end pb-1">
            <div className="w-16 h-1 bg-gray-400 rounded-full"></div>
          </div>
          
          {/* Barra de estado */}
          <div className="pt-8 px-4 flex justify-between items-center text-xs font-medium text-gray-700 z-10">
            <div>{new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}</div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 00-1 1v12a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2zm0 1h16v12H2V4z"/><path d="M4 8a1 1 0 011-1h4a1 1 0 110 2H5a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H5a1 1 0 01-1-1z"/></svg>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 4.75C2 3.784 2.784 3 3.75 3h4.836c.464 0 .909.184 1.237.513l1.414 1.414a.25.25 0 00.177.073h4.836c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0116.25 17H3.75A1.75 1.75 0 012 15.25V4.75z"/></svg>
              <div className="w-5 h-3 bg-gray-700 rounded-sm relative overflow-hidden">
                <div className="absolute inset-0.5 right-auto bg-gray-500 rounded-sm" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
          
          {/* Contenido principal de la llamada */}
          <div className="w-full h-full pt-5 flex flex-col">
            
            {/* Estado de la llamada */}
            <div className="text-center mb-2">
              {callState === 'inactive' && (
                <div className="text-indigo-800 font-medium">
                  {t('vapi_voice_phone.caller_description')}
                </div>
              )}
              
              {callState === 'ringing' && (
                <div className="text-green-600 font-medium animate-pulse">
                  {t('vapi_voice_phone.calling')}
                </div>
              )}
              
              {callState === 'active' && (
                <div className="text-green-600 font-medium">
                  {t('vapi_voice_phone.call_in_progress')} - {formatTime(callDuration)}
                </div>
              )}
              
              {callState === 'ended' && (
                <div className="text-red-600 font-medium">
                  {t('vapi_voice_phone.call_ended')} - {formatTime(callDuration)}
                </div>
              )}
            </div>
            
            {/* Información del contacto */}
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-indigo-100 border-4 border-indigo-200 mb-3">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Nueva imagen en lugar del SVG */}
                  <img 
                    src="/images/iaeva-assistant-front.webp" 
                    alt="IAEVA - Asistente Virtual" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                
                {/* Indicador de llamada activa */}
                {callState === 'active' && (
                  <div className="absolute inset-0 border-4 border-green-400 rounded-full opacity-40 animate-ping"></div>
                )}
              </div>
              
              <h3 className="text-lg font-bold text-indigo-900">IAEVA</h3>
              <p className="text-sm text-indigo-700">{t('vapi_voice_phone.caller_description')}</p>
              {callState === 'active' && (
                <div className="mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  {t('floating_chat.always_available')}
                </div>
              )}
            </div>
            
            {/* Visualización de ondas de voz */}
            {(callState === 'active' || callState === 'ringing') && (
              <div className="w-full h-16 mb-2 px-4">
                <canvas 
                  ref={waveformCanvasRef} 
                  width="280" 
                  height="64" 
                  className="w-full h-full"
                ></canvas>
              </div>
            )}
            
            {/* Botones de control de llamada */}
            <div className="mt-auto mb-20 flex justify-center items-center gap-8">
              {callState === 'inactive' && (
                <button 
                  onClick={startCall}
                  className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
                  aria-label={t('vapi_voice_phone.start_call', 'Iniciar llamada')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </button>
              )}
              
              {(callState === 'ringing' || callState === 'active') && (
                <>
                  <button className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
                          aria-label={t('vapi_voice_phone.volume_control', 'Control de volumen')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    </svg>
                  </button>
                  
                  <button 
                    onClick={endCall}
                    className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                    aria-label={t('vapi_voice_phone.end_call', 'Finalizar llamada')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path>
                      <line x1="23" y1="1" x2="1" y2="23"></line>
                    </svg>
                  </button>
                  
                  <button className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
                          aria-label={t('vapi_voice_phone.mute_microphone', 'Silenciar micrófono')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" y1="19" x2="12" y2="23"></line>
                      <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                  </button>
                </>
              )}
              
              {callState === 'ended' && (
                <button 
                  onClick={resetConversation}
                  className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg hover:bg-indigo-600 transition-colors"
                  aria-label={t('vapi_voice_phone.reset_conversation', 'Reiniciar conversación')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Barra de navegación inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 rounded-full mx-auto w-1/3 mb-2"></div>
        </div>
      </div>
    </div>
  );
};

export default IAEVAPhoneInterface;