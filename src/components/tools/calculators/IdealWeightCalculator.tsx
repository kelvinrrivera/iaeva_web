import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator, Scale, FileText, Copy, CheckCircle, RefreshCcw } from 'lucide-react';

interface IdealWeightResult {
  devine: number;
  robinson: number;
  miller: number;
  hamwi: number;
  average: number;
  adjusted: number;
}

const IdealWeightCalculator = () => {
  const { t, i18n } = useTranslation('tools');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [frameSize, setFrameSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<IdealWeightResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Calcular peso ideal
  const calculateIdealWeight = () => {
    let heightCm = parseFloat(height);
    let actualWeight = parseFloat(weight);
    
    if (isNaN(heightCm) || heightCm <= 0) {
      return;
    }
    
    // Convertir según el sistema de unidades
    if (unit === 'imperial') {
      // Convertir pulgadas a cm
      heightCm = heightCm * 2.54;
      // Convertir libras a kg si el peso está disponible
      if (!isNaN(actualWeight)) {
        actualWeight = actualWeight * 0.453592;
      }
    }
    
    // Altura en metros para algunas fórmulas
    const heightM = heightCm / 100;
    // Altura en pulgadas para fórmulas americanas tradicionales
    const heightInches = heightCm / 2.54;
    // Factor de corrección para marco corporal
    const frameFactor = frameSize === 'small' ? 0.9 : (frameSize === 'large' ? 1.1 : 1.0);
    
    // Fórmula de Devine (1974)
    let devine = 0;
    if (gender === 'male') {
      devine = 50 + 2.3 * (heightInches - 60);
    } else {
      devine = 45.5 + 2.3 * (heightInches - 60);
    }
    devine = Math.round(devine * frameFactor * 10) / 10;
    
    // Fórmula de Robinson (1983)
    let robinson = 0;
    if (gender === 'male') {
      robinson = 52 + 1.9 * (heightInches - 60);
    } else {
      robinson = 49 + 1.7 * (heightInches - 60);
    }
    robinson = Math.round(robinson * frameFactor * 10) / 10;
    
    // Fórmula de Miller (1983)
    let miller = 0;
    if (gender === 'male') {
      miller = 56.2 + 1.41 * (heightInches - 60);
    } else {
      miller = 53.1 + 1.36 * (heightInches - 60);
    }
    miller = Math.round(miller * frameFactor * 10) / 10;
    
    // Fórmula de Hamwi (1964)
    let hamwi = 0;
    if (gender === 'male') {
      hamwi = 48 + 2.7 * (heightInches - 60);
    } else {
      hamwi = 45.5 + 2.2 * (heightInches - 60);
    }
    hamwi = Math.round(hamwi * frameFactor * 10) / 10;
    
    // Promedio de todas las fórmulas
    const average = Math.round(((devine + robinson + miller + hamwi) / 4) * 10) / 10;
    
    // Peso corporal ajustado (Adjusted Body Weight - ABW)
    // Fórmula: IBW + 0.4 * (Actual Weight - IBW)
    let adjusted = 0;
    if (!isNaN(actualWeight)) {
      adjusted = Math.round((average + 0.4 * (actualWeight - average)) * 10) / 10;
    }
    
    setResult({
      devine,
      robinson,
      miller,
      hamwi,
      average,
      adjusted: adjusted || 0
    });
    
    setShowResults(true);
  };
  
  // Validación del formulario
  const isFormValid = (): boolean => {
    return !!height && parseFloat(height) > 0;
  };
  
  // Reiniciar formulario
  const resetForm = () => {
    setHeight('');
    setWeight('');
    setGender('male');
    setFrameSize('medium');
    setResult(null);
    setShowResults(false);
  };
  
  // Generar contenido para copiar
  const generateResultText = (): string => {
    if (!result) return '';
    
    const currentLang = i18n.language.substring(0, 2);
    const heightValue = height + (unit === 'metric' ? ' cm' : ' in');
    const weightValue = weight ? (weight + (unit === 'metric' ? ' kg' : ' lb')) : '-';
    const genderText = gender === 'male' 
      ? (currentLang === 'fr' ? 'Masculin' : 'Masculino') 
      : (currentLang === 'fr' ? 'Féminin' : 'Femenino');
    const frameSizeText = frameSize === 'small' 
      ? (currentLang === 'fr' ? 'Petite' : 'Pequeña') 
      : (frameSize === 'medium' 
         ? (currentLang === 'fr' ? 'Moyenne' : 'Mediana') 
         : (currentLang === 'fr' ? 'Grande' : 'Grande'));
    
    return `=== ${t('ideal_weight.title')} ===
${currentLang === 'fr' ? 'Date' : 'Fecha'}: ${new Date().toLocaleDateString()}

${currentLang === 'fr' ? 'Données du patient' : 'Datos del paciente'}:
${currentLang === 'fr' ? 'Taille' : 'Altura'}: ${heightValue}
${currentLang === 'fr' ? 'Poids actuel' : 'Peso actual'}: ${weightValue}
${currentLang === 'fr' ? 'Genre' : 'Género'}: ${genderText}
${currentLang === 'fr' ? 'Corpulence' : 'Estructura corporal'}: ${frameSizeText}

${currentLang === 'fr' ? 'Résultats' : 'Resultados'}:
${t('ideal_weight.results.devine')}: ${result.devine} ${unit === 'metric' ? 'kg' : 'lb'}
${t('ideal_weight.results.robinson')}: ${result.robinson} ${unit === 'metric' ? 'kg' : 'lb'}
${t('ideal_weight.results.miller')}: ${result.miller} ${unit === 'metric' ? 'kg' : 'lb'}
${t('ideal_weight.results.hamwi')}: ${result.hamwi} ${unit === 'metric' ? 'kg' : 'lb'}
-------------------------------------
${t('ideal_weight.results.average')}: ${result.average} ${unit === 'metric' ? 'kg' : 'lb'}
${weight ? `${t('ideal_weight.results.adjusted')}: ${result.adjusted} ${unit === 'metric' ? 'kg' : 'lb'}` : ''}

${t('ideal_weight.disclaimer')}
`;
  };
  
  // Copiar resultados
  const copyResults = () => {
    if (!result) return;
    
    const text = generateResultText();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // Convertir unidades cuando cambia el sistema
  useEffect(() => {
    if (height) {
      const heightVal = parseFloat(height);
      if (!isNaN(heightVal) && heightVal > 0) {
        // Convertir de métrico a imperial o viceversa
        if (unit === 'imperial') {
          // Convertir de cm a pulgadas
          setHeight((heightVal / 2.54).toFixed(1));
        } else {
          // Convertir de pulgadas a cm
          setHeight((heightVal * 2.54).toFixed(1));
        }
      }
    }
    
    if (weight) {
      const weightVal = parseFloat(weight);
      if (!isNaN(weightVal) && weightVal > 0) {
        // Convertir de métrico a imperial o viceversa
        if (unit === 'imperial') {
          // Convertir de kg a libras
          setWeight((weightVal * 2.20462).toFixed(1));
        } else {
          // Convertir de libras a kg
          setWeight((weightVal / 2.20462).toFixed(1));
        }
      }
    }
    
    // Recalcular resultados si ya se habían calculado previamente
    if (result) {
      calculateIdealWeight();
    }
  }, [unit]);
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{t('ideal_weight.title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-5">{t('ideal_weight.patient_data')}</h3>
            
            {/* Sistema de unidades */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('ideal_weight.unit_system')}</label>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => setUnit('metric')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg focus:outline-none ${
                    unit === 'metric'
                      ? 'bg-iaeva-blue text-white'
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                  aria-pressed={unit === 'metric'}
                >
                  {t('ideal_weight.metric')}
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('imperial')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg focus:outline-none ${
                    unit === 'imperial'
                      ? 'bg-iaeva-blue text-white'
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                  aria-pressed={unit === 'imperial'}
                >
                  {t('ideal_weight.imperial')}
                </button>
              </div>
            </div>
            
            {/* Género */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('ideal_weight.gender')}</label>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg focus:outline-none ${
                    gender === 'male'
                      ? 'bg-iaeva-blue text-white'
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                  aria-pressed={gender === 'male'}
                >
                  {t('ideal_weight.male')}
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg focus:outline-none ${
                    gender === 'female'
                      ? 'bg-iaeva-blue text-white'
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                  aria-pressed={gender === 'female'}
                >
                  {t('ideal_weight.female')}
                </button>
              </div>
            </div>
            
            {/* Estructura corporal */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('ideal_weight.frame_size')}</label>
              <div className="flex flex-wrap">
                <button
                  type="button"
                  onClick={() => setFrameSize('small')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg focus:outline-none ${
                    frameSize === 'small'
                      ? 'bg-iaeva-blue text-white'
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                  aria-pressed={frameSize === 'small'}
                >
                  {t('ideal_weight.small')}
                </button>
                <button
                  type="button"
                  onClick={() => setFrameSize('medium')}
                  className={`px-4 py-2 text-sm font-medium focus:outline-none ${
                    frameSize === 'medium'
                      ? 'bg-iaeva-blue text-white'
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                  aria-pressed={frameSize === 'medium'}
                >
                  {t('ideal_weight.medium')}
                </button>
                <button
                  type="button"
                  onClick={() => setFrameSize('large')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg focus:outline-none ${
                    frameSize === 'large'
                      ? 'bg-iaeva-blue text-white'
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                  aria-pressed={frameSize === 'large'}
                >
                  {t('ideal_weight.large')}
                </button>
              </div>
            </div>
            
            {/* Altura */}
            <div className="mb-4">
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                {unit === 'metric' ? t('ideal_weight.height_metric') : t('ideal_weight.height_imperial')}
              </label>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === 'metric' ? 'Ej: 175' : 'Ej: 69'}
                min="1"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iaeva-blue focus:border-transparent"
                aria-required="true"
              />
            </div>
            
            {/* Peso (opcional para peso ajustado) */}
            <div className="mb-6">
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                {unit === 'metric' ? t('ideal_weight.weight_metric') : t('ideal_weight.weight_imperial')}
                <span className="text-gray-500 text-xs ml-1">({t('ideal_weight.optional')})</span>
              </label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === 'metric' ? 'Ej: 70' : 'Ej: 154'}
                min="1"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iaeva-blue focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={calculateIdealWeight}
                disabled={!isFormValid()}
                className={`px-5 py-2.5 rounded-lg text-white font-medium text-sm ${
                  isFormValid() 
                    ? 'bg-gradient-to-r from-iaeva-blue to-iaeva-purple hover:opacity-90'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                aria-disabled={!isFormValid()}
              >
                {t('ideal_weight.calculate')}
              </button>
              
              <button
                onClick={resetForm}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50"
              >
                {t('ideal_weight.clear')}
              </button>
            </div>
          </div>
          
          {/* Resultados */}
          <div className="bg-gray-50 p-6 rounded-xl">
            {!showResults ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <Scale className="h-12 w-12 mb-4 text-gray-400" />
                <p>{t('ideal_weight.empty_state')}</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">{t('ideal_weight.results.title')}</h3>
                  <button 
                    onClick={copyResults}
                    className="flex items-center text-sm text-iaeva-blue hover:text-iaeva-purple"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span>{t('ideal_weight.results.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        <span>{t('ideal_weight.results.copy')}</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div className="space-y-4 mb-6">
                  {/* Pesos ideales por fórmula */}
                  <div className="bg-white px-4 py-3 rounded-lg border border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-gray-700">{t('ideal_weight.results.devine')}</span>
                      <span className="font-medium">{result?.devine} {unit === 'metric' ? 'kg' : 'lb'}</span>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-3 rounded-lg border border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-gray-700">{t('ideal_weight.results.robinson')}</span>
                      <span className="font-medium">{result?.robinson} {unit === 'metric' ? 'kg' : 'lb'}</span>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-3 rounded-lg border border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-gray-700">{t('ideal_weight.results.miller')}</span>
                      <span className="font-medium">{result?.miller} {unit === 'metric' ? 'kg' : 'lb'}</span>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-3 rounded-lg border border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-gray-700">{t('ideal_weight.results.hamwi')}</span>
                      <span className="font-medium">{result?.hamwi} {unit === 'metric' ? 'kg' : 'lb'}</span>
                    </div>
                  </div>
                  
                  {/* Línea divisoria */}
                  <div className="border-t border-gray-300 my-2"></div>
                  
                  {/* Promedio y peso ajustado */}
                  <div className="bg-blue-50 px-4 py-3 rounded-lg border border-blue-200">
                    <div className="flex justify-between font-medium">
                      <span className="text-iaeva-blue">{t('ideal_weight.results.average')}</span>
                      <span className="text-iaeva-blue">{result?.average} {unit === 'metric' ? 'kg' : 'lb'}</span>
                    </div>
                  </div>
                  
                  {weight && (
                    <div className="bg-purple-50 px-4 py-3 rounded-lg border border-purple-200">
                      <div className="flex justify-between font-medium">
                        <span className="text-iaeva-purple">{t('ideal_weight.results.adjusted')}</span>
                        <span className="text-iaeva-purple">{result?.adjusted} {unit === 'metric' ? 'kg' : 'lb'}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-xs text-gray-500 mt-4">
                  <p className="mb-2">
                    <strong>{t('ideal_weight.formulas.title')}</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>{t('ideal_weight.formulas.devine')}</li>
                    <li>{t('ideal_weight.formulas.robinson')}</li>
                    <li>{t('ideal_weight.formulas.miller')}</li>
                    <li>{t('ideal_weight.formulas.hamwi')}</li>
                    <li>{t('ideal_weight.formulas.adjusted')}</li>
                  </ul>
                </div>
                
                <div className="mt-4 text-xs text-gray-500 italic">
                  {t('ideal_weight.disclaimer')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdealWeightCalculator; 