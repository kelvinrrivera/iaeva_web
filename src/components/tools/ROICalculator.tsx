import { useState, useEffect } from 'react';
import { ArrowRight, Calculator, BarChart3, DollarSign, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Tipos para el formulario y resultados
interface FormData {
  establishmentType: string;
  providerCount: number;
  dailyAppointments: number;
  appointmentValue: number;
  noShowRate: number;
  adminHourlyRate: number;
  schedulingTime: number;
  reminderTime: number;
  inquiryTime: number;
  email?: string;
  name?: string;
  organization?: string;
}

interface Results {
  timeHoursSaved: number;
  timeSavingsValue: number;
  noShowSavings: number;
  totalSavings: number;
  annualCost: number;
  netSavings: number;
  roi: number;
  paybackPeriod: number;
}

const ROICalculator = () => {
  const { t } = useTranslation('roi_calculator');
  // Estado inicial con valores predeterminados según tipo de establecimiento
  const [formData, setFormData] = useState<FormData>({
    establishmentType: 'clinic',
    providerCount: 5,
    dailyAppointments: 50,
    appointmentValue: 80,
    noShowRate: 18,
    adminHourlyRate: 20,
    schedulingTime: 5,
    reminderTime: 3,
    inquiryTime: 4,
    email: '',
    name: '',
    organization: ''
  });
  
  const [results, setResults] = useState<Results | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Actualizar valores predeterminados al cambiar el tipo de establecimiento
  useEffect(() => {
    const establishmentDefaults = {
      clinic: {
        dailyAppointments: 50,
        appointmentValue: 80,
        noShowRate: 18,
      },
      hospital: {
        dailyAppointments: 200,
        appointmentValue: 120,
        noShowRate: 15,
      },
      laboratory: {
        dailyAppointments: 80,
        appointmentValue: 60,
        noShowRate: 20,
      },
      dental: {
        dailyAppointments: 30,
        appointmentValue: 100,
        noShowRate: 22,
      },
      oncology: {
        dailyAppointments: 60,
        appointmentValue: 180,
        noShowRate: 14,
      },
      surgery: {
        dailyAppointments: 25,
        appointmentValue: 200,
        noShowRate: 20,
      },
      rehabilitation: {
        dailyAppointments: 45,
        appointmentValue: 90,
        noShowRate: 17,
      },
      imaging: {
        dailyAppointments: 70,
        appointmentValue: 140,
        noShowRate: 13,
      }
    };
    
    const defaults = establishmentDefaults[formData.establishmentType as keyof typeof establishmentDefaults];
    if (defaults) {
      setFormData(prev => ({
        ...prev,
        ...defaults
      }));
    }
  }, [formData.establishmentType]);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'establishmentType' ? value : Number(value)
    }));
  };

  // Calcular el ROI
  const calculateROI = () => {
    setIsSubmitting(true);
    
    // Simular breve carga
    setTimeout(() => {
      // Factores de mejora según investigación y datos de clientes existentes
      const improvementFactors = {
        noShowReduction: 0.60, // 60% reducción en ausencias
        schedulingEfficiency: 0.75, // 75% reducción en tiempo de programación
        reminderEfficiency: 0.90, // 90% reducción en tiempo de recordatorios
        inquiryEfficiency: 0.70, // 70% reducción en tiempo de consultas
      };
      
      // Cálculos de tiempo ahorrado
      const annualAppointments = formData.dailyAppointments * 250; // 250 días operativos al año
      
      const schedulingTimeSaved = (formData.schedulingTime * improvementFactors.schedulingEfficiency * annualAppointments) / 60;
      const reminderTimeSaved = (formData.reminderTime * improvementFactors.reminderEfficiency * annualAppointments) / 60;
      const inquiryTimeSaved = (formData.inquiryTime * improvementFactors.inquiryEfficiency * annualAppointments) / 60;
      
      const totalHoursSaved = schedulingTimeSaved + reminderTimeSaved + inquiryTimeSaved;
      const timeSavingsValue = totalHoursSaved * formData.adminHourlyRate;
      
      // Cálculo de ahorro por reducción de ausencias
      const currentNoShows = annualAppointments * (formData.noShowRate / 100);
      const reducedNoShows = currentNoShows * improvementFactors.noShowReduction;
      const noShowSavings = reducedNoShows * formData.appointmentValue;
      
      // Estimación de costo anual de IAEVA (basado en tipo de establecimiento)
      let annualCost = 0;
      switch(formData.establishmentType) {
        case 'clinic':
          annualCost = 5000 + (formData.providerCount * 500);
          break;
        case 'hospital':
          annualCost = 10000 + (formData.providerCount * 400);
          break;
        case 'laboratory':
          annualCost = 4000 + (formData.providerCount * 450);
          break;
        case 'dental':
          annualCost = 4500 + (formData.providerCount * 475);
          break;
        case 'oncology':
          annualCost = 8000 + (formData.providerCount * 550);
          break;
        case 'surgery':
          annualCost = 6000 + (formData.providerCount * 525);
          break;
        case 'rehabilitation':
          annualCost = 4200 + (formData.providerCount * 460);
          break;
        case 'imaging':
          annualCost = 7000 + (formData.providerCount * 500);
          break;
        default:
          annualCost = 4500 + (formData.providerCount * 475);
      }
      
      // Cálculo de ROI
      const totalSavings = timeSavingsValue + noShowSavings;
      const netSavings = totalSavings - annualCost;
      const roi = (netSavings / annualCost) * 100;
      
      setResults({
        timeHoursSaved: Math.round(totalHoursSaved),
        timeSavingsValue: Math.round(timeSavingsValue),
        noShowSavings: Math.round(noShowSavings),
        totalSavings: Math.round(totalSavings),
        annualCost: Math.round(annualCost),
        netSavings: Math.round(netSavings),
        roi: Math.round(roi),
        paybackPeriod: Math.round((annualCost / (netSavings / 12)) * 10) / 10
      });
      
      setShowResults(true);
      setIsSubmitting(false);
      setShowLeadForm(true);
    }, 1000);
  };

  // Volver a calcular
  const recalculate = () => {
    setShowResults(false);
    setShowLeadForm(false);
  };

  // Obtener el título según el tipo de establecimiento
  const getEstablishmentTitle = () => {
    const titles = {
      clinic: t('establishment_types.clinic'),
      hospital: t('establishment_types.hospital'),
      laboratory: t('establishment_types.laboratory'),
      dental: t('establishment_types.dental'),
      oncology: t('establishment_types.oncology', 'Centro oncológico'),
      surgery: t('establishment_types.surgery', 'Cirugía estética'),
      rehabilitation: t('establishment_types.rehabilitation', 'Rehabilitación física'),
      imaging: t('establishment_types.imaging', 'Diagnóstico por imagen')
    };
    return titles[formData.establishmentType as keyof typeof titles] || t('establishment_types.default');
  };
  
  // Manejar el envío del formulario de lead
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se implementaría la lógica para enviar el lead al CRM
    // Por ahora, solo mostraremos un agradecimiento
    alert(t('lead_form.thank_you', "Gracias por tu interés. Te hemos enviado un análisis detallado a tu correo electrónico."));
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-iaeva-blue/10 mb-4">
            <Calculator className="h-6 w-6 text-iaeva-blue" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('form.title', 'Calcula tu retorno de inversión con IAEVA')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t('form.subtitle', 'Descubre cuánto podría ahorrar tu centro médico implementando nuestro asistente virtual inteligente.')}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {!showResults ? (
            <div className="grid grid-cols-1 gap-6">
              {/* Sección 1: Información del Centro Médico */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4">{t('form.clinic_info')}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('form.clinic_type')}
                    </label>
                    <select
                      name="establishmentType"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      onChange={handleChange}
                      value={formData.establishmentType}
                    >
                      <option value="clinic">{t('form.clinic_type_options.general')}</option>
                      <option value="hospital">{t('form.clinic_type_options.hospital')}</option>
                      <option value="laboratory">{t('form.clinic_type_options.laboratory')}</option>
                      <option value="dental">{t('form.clinic_type_options.dental')}</option>
                      <option value="oncology">{t('form.clinic_type_options.oncology', 'Centro oncológico')}</option>
                      <option value="surgery">{t('form.clinic_type_options.surgery', 'Cirugía estética')}</option>
                      <option value="rehabilitation">{t('form.clinic_type_options.rehabilitation', 'Rehabilitación física')}</option>
                      <option value="imaging">{t('form.clinic_type_options.imaging', 'Diagnóstico por imagen')}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('form.provider_count', 'Número de médicos/proveedores')}
                    </label>
                    <input
                      type="number"
                      name="providerCount"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      min="1"
                      onChange={handleChange}
                      value={formData.providerCount}
                    />
                  </div>
                </div>
              </div>
              
              {/* Sección 2: Métricas Operativas */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4">{t('form.operational_metrics', 'Métricas operativas actuales')}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('form.monthly_appointments', 'Citas médicas diarias (promedio)')}
                    </label>
                    <input
                      type="number"
                      name="dailyAppointments"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      min="1"
                      onChange={handleChange}
                      value={formData.dailyAppointments}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('form.average_consultation', 'Valor promedio por cita/servicio ($)')}
                    </label>
                    <input
                      type="number"
                      name="appointmentValue"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      min="0"
                      onChange={handleChange}
                      value={formData.appointmentValue}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('form.no_show_rate', 'Tasa actual de ausencias (no-shows) (%)')}
                    </label>
                    <input
                      type="number"
                      name="noShowRate"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      min="0"
                      max="100"
                      onChange={handleChange}
                      value={formData.noShowRate}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('form.staff_cost', 'Salario promedio por hora del personal administrativo ($)')}
                    </label>
                    <input
                      type="number"
                      name="adminHourlyRate"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      min="0"
                      onChange={handleChange}
                      value={formData.adminHourlyRate}
                    />
                  </div>
                </div>
              </div>
              
              {/* Sección 3: Tiempo Administrativo */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4">{t('form.admin_time', 'Tiempo dedicado a tareas administrativas (minutos por cita)')}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('form.scheduling_time', 'Programación de citas')}
                    </label>
                    <input
                      type="number"
                      name="schedulingTime"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      min="0"
                      onChange={handleChange}
                      value={formData.schedulingTime}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('form.reminder_time', 'Recordatorios y confirmaciones')}
                    </label>
                    <input
                      type="number"
                      name="reminderTime"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      min="0"
                      onChange={handleChange}
                      value={formData.reminderTime}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('form.inquiry_time', 'Respuesta a consultas de pacientes')}
                    </label>
                    <input
                      type="number"
                      name="inquiryTime"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      min="0"
                      onChange={handleChange}
                      value={formData.inquiryTime}
                    />
                  </div>
                </div>
              </div>
              
              {/* Botón de cálculo */}
              <button
                onClick={calculateROI}
                disabled={isSubmitting}
                className="mt-8 w-full px-8 py-4 rounded-full bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white font-medium hover:shadow-lg transition-shadow duration-300 flex items-center justify-center text-lg"
              >
                {isSubmitting ? (
                  <>{t('form.calculating', 'Calculando...')} <span className="ml-2 animate-spin">⟳</span></>
                ) : (
                  <>{t('form.calculate_button')} <ArrowRight className="ml-2 h-5 w-5" /></>
                )}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {/* Resultados del ROI */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('results.title')}
                  </h3>
                  <div className="text-5xl font-bold text-iaeva-purple mb-2">
                    {results?.roi}%
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('results.roi_percentage')}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 mb-2">
                      <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                      ${results?.totalSavings.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {t('results.annual_savings')}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 mb-2">
                      <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                      {results?.timeHoursSaved.toLocaleString()} h
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {t('results.time_saved', 'Tiempo ahorrado')}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 mb-2">
                      <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                      ${results?.noShowSavings.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {t('results.recovered_appointments')}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 mb-2">
                      <Calculator className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                      {results?.paybackPeriod} {t('results.months')}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {t('results.payback_period')}
                    </div>
                  </div>
                </div>
                
                <div className="bg-iaeva-blue/5 dark:bg-iaeva-blue/10 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    {t('results.detailed_breakdown', 'Desglose detallado')}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">{t('results.admin_time_savings', 'Ahorro en tiempo administrativo:')}</span>
                      <span className="font-medium text-gray-900 dark:text-white">${results?.timeSavingsValue.toLocaleString()}/año</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">{t('results.no_show_recovery', 'Ingresos recuperados por reduccción de ausencias:')}</span>
                      <span className="font-medium text-gray-900 dark:text-white">${results?.noShowSavings.toLocaleString()}/año</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">{t('results.iaeva_cost', 'Inversión estimada en IAEVA:')}</span>
                      <span className="font-medium text-gray-900 dark:text-white">${results?.annualCost.toLocaleString()}/año</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">{t('results.net_benefit', 'Beneficio neto estimado:')}</span>
                      <span className="font-bold text-iaeva-purple">${results?.netSavings.toLocaleString()}/año</span>
                    </div>
                  </div>
                </div>
                
                {/* Formulario de lead si está visible */}
                {showLeadForm && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      {t('lead_form.title', 'Recibe un análisis personalizado y detallado')}
                    </h3>
                    <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t('lead_form.name', 'Nombre')}
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                          required
                          onChange={handleChange}
                          value={formData.name || ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t('lead_form.email', 'Email profesional')}
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                          required
                          onChange={handleChange}
                          value={formData.email || ''}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t('lead_form.organization', 'Nombre de su')} {getEstablishmentTitle()}
                        </label>
                        <input
                          type="text"
                          name="organization"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                          required
                          onChange={handleChange}
                          value={formData.organization || ''}
                        />
                      </div>
                      <div className="md:col-span-2 flex gap-4 mt-2">
                        <button
                          type="submit"
                          className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white font-medium hover:shadow-lg transition-shadow duration-300"
                        >
                          {t('lead_form.submit', 'Recibir análisis detallado')}
                        </button>
                        <Link
                          to="/contacto"
                          className="flex-1 px-6 py-3 border border-iaeva-blue text-iaeva-blue rounded-full font-medium hover:bg-iaeva-blue/5 transition-colors flex items-center justify-center"
                        >
                          {t('lead_form.talk_expert', 'Hablar con un experto')}
                        </Link>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Botones de acción */}
                {!showLeadForm && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={recalculate}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-1"
                    >
                      {t('results.recalculate', 'Calcular de nuevo')}
                    </button>
                    <Link
                      to="/contacto"
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white font-medium hover:shadow-lg transition-shadow duration-300 flex items-center justify-center flex-1"
                    >
                      {t('results.request_demo', 'Solicitar demo personalizada')} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Descargo de responsabilidad */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                <p className="mb-2 font-medium">{t('disclaimer.title', 'Descargo de responsabilidad:')}</p>
                <p>
                  {t('disclaimer.text1', 'Esta calculadora de ROI proporciona una estimación basada en promedios del sector y resultados típicos observados en organizaciones de salud similares. Los resultados reales pueden variar dependiendo de su implementación específica, procesos organizativos y otros factores.')}
                </p>
                <p className="mt-2">
                  {t('disclaimer.text2', 'Para un análisis de ROI personalizado adaptado a su situación única, por favor')}{' '}
                  <Link to="/contacto" className="text-iaeva-blue hover:underline">{t('disclaimer.contact_us', 'contáctenos')}</Link>{' '}
                  {t('disclaimer.text3', 'para una consulta con uno de nuestros expertos en eficiencia sanitaria.')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
