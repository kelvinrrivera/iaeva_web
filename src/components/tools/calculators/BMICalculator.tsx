import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Define interface for extended jsPDF type with autotable properties
interface ExtendedJsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  bodyFat?: number;
  recommendations: string[];
}

const BMICalculator = () => {
  const { t, i18n } = useTranslation('tools');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  // Calcular IMC
  const calculateBMI = () => {
    let weightNum = parseFloat(weight);
    let heightNum = parseFloat(height);
    
    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      return;
    }
    
    // Convertir según el sistema de unidades
    if (unit === 'imperial') {
      // Convertir libras a kg y pulgadas a metros
      weightNum = weightNum * 0.453592; // libras a kg
      heightNum = heightNum * 0.0254; // pulgadas a metros
    } else {
      // Convertir cm a metros si está en sistema métrico
      // Verificar si la altura es mayor a 3, asumiendo que está en cm y no en metros
      if (heightNum > 3) {
        heightNum = heightNum / 100; // cm a metros
      }
    }
    
    // Calcular IMC: peso (kg) / altura² (m)
    const bmiValue = weightNum / (heightNum * heightNum);
    
    // Calcular el porcentaje de grasa corporal usando la fórmula de Deurenberg
    const ageNum = parseInt(age);
    let bodyFat;
    
    if (!isNaN(ageNum) && ageNum > 0) {
      // Fórmula de Deurenberg
      bodyFat = 1.2 * bmiValue + 0.23 * ageNum - 10.8 * (gender === 'male' ? 1 : 0) - 5.4;
    }
    
    // Determinar categoría
    let category: string;
    let color: string;
    let recommendations: string[] = [];
    
    if (bmiValue < 16) {
      category = t('bmi.categories.severe_thinness');
      color = "text-red-600";
      recommendations = [
        "Consulta urgente con un profesional de la salud",
        "Evaluación nutricional completa recomendada",
        "Posible necesidad de suplementación nutricional"
      ];
    } else if (bmiValue < 17) {
      category = t('bmi.categories.moderate_thinness');
      color = "text-orange-600";
      recommendations = [
        "Seguimiento médico recomendado",
        "Plan de alimentación para aumento de peso saludable",
        "Evaluación para descartar trastornos alimenticios"
      ];
    } else if (bmiValue < 18.5) {
      category = t('bmi.categories.mild_thinness');
      color = "text-yellow-600";
      recommendations = [
        "Incremento moderado de la ingesta calórica",
        "Incorporación de proteínas de calidad",
        "Ejercicio de fortalecimiento muscular"
      ];
    } else if (bmiValue < 25) {
      category = t('bmi.categories.normal');
      color = "text-green-600";
      recommendations = [
        "Mantener hábitos alimenticios saludables",
        "Actividad física regular (150-300 min/semana)",
        "Chequeos médicos preventivos anuales"
      ];
    } else if (bmiValue < 30) {
      category = t('bmi.categories.overweight');
      color = "text-yellow-600";
      recommendations = [
        "Reducción moderada de calorías (300-500 kcal/día)",
        "Incrementar actividad física (30-60 min/día)",
        "Monitoreo de factores de riesgo cardiovascular"
      ];
    } else if (bmiValue < 35) {
      category = t('bmi.categories.obese_1');
      color = "text-orange-600";
      recommendations = [
        "Evaluación médica completa recomendada",
        "Plan alimenticio supervisado por nutricionista",
        "Actividad física adaptada (consultar con profesional)"
      ];
    } else if (bmiValue < 40) {
      category = t('bmi.categories.obese_2');
      color = "text-red-600";
      recommendations = [
        "Consulta médica especializada",
        "Evaluación de factores de riesgo y comorbilidades",
        "Considerar intervenciones multidisciplinarias"
      ];
    } else {
      category = t('bmi.categories.obese_3');
      color = "text-red-700";
      recommendations = [
        "Atención médica especializada urgente",
        "Evaluación para intervenciones terapéuticas específicas",
        "Seguimiento médico continuo necesario"
      ];
    }
    
    setResult({
      bmi: parseFloat(bmiValue.toFixed(1)),
      category,
      color,
      bodyFat: bodyFat ? parseFloat(bodyFat.toFixed(1)) : undefined,
      recommendations
    });
    
    setShowResults(true);
  };

  // Limpiar formulario
  const resetForm = () => {
    setWeight('');
    setHeight('');
    setAge('');
    setGender('male');
    setResult(null);
    setShowResults(false);
  };

  // Generar PDF
  const generatePDF = () => {
    if (!result) return;
    
    // Cargar las bibliotecas dinámicamente para evitar problemas con SSR
    Promise.all([
      import('jspdf'),
      import('jspdf-autotable')
    ]).then(([{ default: jsPDF }, autotableModule]) => {
      // Añadir plugin de autotable a jsPDF
      const autoTable = autotableModule.default;
      
      // Crear un nuevo documento PDF
      const doc = new jsPDF();
      
      // Añadir logo
      const imgData = '/logo/logo.png';
      // Añadir logo en la esquina superior derecha
      doc.addImage(imgData, 'PNG', 145, 10, 25, 7.5, undefined, 'FAST');
      
      // Configuración de fuentes y estilos
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(0, 51, 102);
      
      // Usar el idioma actual de la app para los textos del PDF
      const currentLang = i18n.language;
      
      // Textos localizados para el PDF
      const pdfTexts = {
        title: currentLang === 'fr' ? 'Rapport d\'IMC' : 'Informe de IMC',
        date: currentLang === 'fr' ? 'Date' : 'Fecha',
        patientData: currentLang === 'fr' ? 'Données du patient' : 'Datos del paciente',
        parameter: currentLang === 'fr' ? 'Paramètre' : 'Parámetro',
        value: currentLang === 'fr' ? 'Valeur' : 'Valor',
        weight: currentLang === 'fr' ? 'Poids' : 'Peso',
        height: currentLang === 'fr' ? 'Taille' : 'Altura',
        age: currentLang === 'fr' ? 'Âge' : 'Edad',
        years: currentLang === 'fr' ? 'ans' : 'años',
        gender: currentLang === 'fr' ? 'Genre' : 'Género',
        male: currentLang === 'fr' ? 'Masculin' : 'Masculino',
        female: currentLang === 'fr' ? 'Féminin' : 'Femenino',
        results: currentLang === 'fr' ? 'Résultats' : 'Resultados',
        bmi: currentLang === 'fr' ? 'IMC' : 'IMC',
        classification: currentLang === 'fr' ? 'Classification' : 'Clasificación',
        bodyFat: currentLang === 'fr' ? '% Graisse corporelle estimée' : '% Grasa corporal estimado',
        deuerenberg: currentLang === 'fr' ? '(Basé sur la formule de Deurenberg)' : '(Basado en fórmula de Deurenberg)',
        recommendations: currentLang === 'fr' ? 'Recommandations' : 'Recomendaciones',
        footer1: 'IAEVA - ' + (currentLang === 'fr' ? 'Assistant Virtuel pour la Santé' : 'Asistente Virtual Sanitario'),
        footer2: currentLang === 'fr' 
          ? 'Ce rapport est généré automatiquement et a une finalité informative.' 
          : 'Este informe es generado automáticamente y tiene fines informativos.',
        footer3: currentLang === 'fr' 
          ? 'Il ne remplace pas le diagnostic ou la recommandation d\'un professionnel de santé.' 
          : 'No reemplaza el diagnóstico o recomendación de un profesional médico.'
      };
      
      // Título
      doc.text(pdfTexts.title, 20, 20);
      
      // Línea divisoria
      doc.setDrawColor(0, 101, 179);
      doc.setLineWidth(0.5);
      doc.line(20, 25, 190, 25);
      
      // Fecha del informe
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text(`${pdfTexts.date}: ${new Date().toLocaleDateString()}`, 20, 32);
      
      // Tabla de datos del paciente
      doc.setFontSize(14);
      doc.setTextColor(0, 51, 102);
      doc.setFont("helvetica", "bold");
      doc.text(pdfTexts.patientData, 20, 42);
      
      // Crear tabla con datos del paciente
      const patientTableY = 45;
      autoTable(doc, {
        startY: patientTableY,
        head: [[pdfTexts.parameter, pdfTexts.value]],
        body: [
          [pdfTexts.weight, `${weight} ${unit === 'metric' ? 'kg' : 'lb'}`],
          [pdfTexts.height, `${height} ${unit === 'metric' ? 'cm' : 'in'}`],
          age ? [pdfTexts.age, `${age} ${pdfTexts.years}`] : [],
          gender ? [pdfTexts.gender, gender === 'male' ? pdfTexts.male : pdfTexts.female] : []
        ].filter(row => row.length > 0),
        headStyles: {
          fillColor: [0, 101, 179],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        theme: 'grid',
        margin: { left: 20, right: 20 },
        tableWidth: 'auto'
      });
      
      // Tabla de resultados
      doc.setFontSize(14);
      doc.setTextColor(0, 51, 102);
      doc.setFont("helvetica", "bold");
      
      // Usar una posición de referencia segura
      const finalY = typeof (doc as ExtendedJsPDF).lastAutoTable !== 'undefined' 
        ? (doc as ExtendedJsPDF).lastAutoTable.finalY 
        : patientTableY + 40;
      const resultTableY = finalY + 10;
      
      doc.text(pdfTexts.results, 20, resultTableY);
      
      // Obtener color para la clasificación IMC
      const fillColor = result.color.includes('red') 
        ? [204, 51, 51] 
        : result.color.includes('orange') 
          ? [230, 126, 34] 
          : result.color.includes('yellow') 
            ? [241, 196, 15] 
            : [0, 153, 0];
      
      // Crear tabla con los resultados
      autoTable(doc, {
        startY: resultTableY + 5,
        head: [[pdfTexts.parameter, pdfTexts.value]],
        body: [
          [pdfTexts.bmi, `${result.bmi}`],
          [pdfTexts.classification, result.category],
          result.bodyFat !== undefined ? [pdfTexts.bodyFat, `${result.bodyFat}%`] : []
        ].filter(row => row.length > 0),
        headStyles: {
          fillColor: [0, 101, 179],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        bodyStyles: {
          textColor: [0, 0, 0]
        },
        columnStyles: {
          1: {
            fontStyle: 'bold',
          }
        },
        theme: 'grid',
        margin: { left: 20, right: 20 },
        tableWidth: 'auto'
      });
      
      // Añadir indicador visual de la categoría IMC
      const categoryTableY = typeof (doc as ExtendedJsPDF).lastAutoTable !== 'undefined'
        ? (doc as ExtendedJsPDF).lastAutoTable.finalY
        : resultTableY + 40;
      doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
      doc.rect(20, categoryTableY + 10, 170, 8, 'F');
      
      // Añadir escala de categorías IMC
      doc.setDrawColor(204, 0, 0); // Rojo
      doc.setFillColor(204, 0, 0);
      doc.rect(20, categoryTableY + 25, 20, 5, 'F');
      doc.setFillColor(230, 126, 34); // Naranja
      doc.rect(45, categoryTableY + 25, 20, 5, 'F');
      doc.setFillColor(241, 196, 15); // Amarillo
      doc.rect(70, categoryTableY + 25, 20, 5, 'F');
      doc.setFillColor(46, 204, 113); // Verde
      doc.rect(95, categoryTableY + 25, 20, 5, 'F');
      doc.setFillColor(241, 196, 15); // Amarillo
      doc.rect(120, categoryTableY + 25, 20, 5, 'F');
      doc.setFillColor(230, 126, 34); // Naranja
      doc.rect(145, categoryTableY + 25, 20, 5, 'F');
      doc.setFillColor(204, 0, 0); // Rojo
      doc.rect(170, categoryTableY + 25, 20, 5, 'F');
      
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);
      doc.text('< 16', 20, categoryTableY + 35);
      doc.text('16-17', 45, categoryTableY + 35);
      doc.text('17-18.5', 70, categoryTableY + 35);
      doc.text('18.5-25', 95, categoryTableY + 35);
      doc.text('25-30', 120, categoryTableY + 35);
      doc.text('30-35', 145, categoryTableY + 35);
      doc.text('> 35', 170, categoryTableY + 35);
      
      // Tabla de recomendaciones
      doc.setFontSize(14);
      doc.setTextColor(0, 51, 102);
      doc.setFont("helvetica", "bold");
      doc.text(pdfTexts.recommendations, 20, categoryTableY + 50);
      
      // Preparar recomendaciones para la tabla
      const recommendationsData = result.recommendations.map(rec => ['•', rec]);
      
      // Crear tabla con las recomendaciones
      autoTable(doc, {
        startY: categoryTableY + 53,
        body: recommendationsData,
        theme: 'plain',
        styles: {
          lineColor: [240, 240, 240]
        },
        columnStyles: {
          0: { cellWidth: 8 },
          1: { cellWidth: 'auto' }
        },
        margin: { left: 20, right: 20 }
      });
      
      // Añadir pie de página
      const footer1Y = doc.internal.pageSize.height - 30;
      const footer2Y = doc.internal.pageSize.height - 25;
      const footer3Y = doc.internal.pageSize.height - 20;
      
      // Línea divisoria
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.line(20, footer1Y - 7, 190, footer1Y - 7);
      
      // Texto del pie de página
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.setFont("helvetica", "bold");
      doc.text(pdfTexts.footer1, 20, footer1Y);
      doc.setFont("helvetica", "normal");
      doc.text(pdfTexts.footer2, 20, footer2Y);
      doc.text(pdfTexts.footer3, 20, footer3Y);
      
      // Añadir el sitio web en el pie de página
      doc.setFont("helvetica", "bold");
      doc.text("www.iaeva.com", 190, footer1Y, { align: 'right' });
      doc.setFont("helvetica", "normal");
      doc.text("info@iaeva.com", 190, footer2Y, { align: 'right' });
      
      // Guardar el PDF
      doc.save("IAEVA-Informe-IMC.pdf");
    }).catch(error => {
      console.error("Error al generar PDF", error);
      alert("No se pudo generar el PDF. Por favor, inténtelo de nuevo más tarde.");
    });
  };

  // Validación de campos
  const isFormValid = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    
    return (
      !isNaN(weightNum) && 
      !isNaN(heightNum) && 
      weightNum > 0 && 
      heightNum > 0
    );
  };

  // Para mantener el botón de calcular deshabilitado hasta que los campos sean válidos
  useEffect(() => {
    if (!showResults && isFormValid()) {
      calculateBMI();
    }
  }, [weight, height, age, gender, unit]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          {t('bmi.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-5">{t('bmi.patient_data')}</h3>
            
            {/* Sistema de unidades */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('bmi.unit_system')}</label>
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
                  {t('bmi.metric')}
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
                  {t('bmi.imperial')}
                </button>
              </div>
            </div>
            
            {/* Peso */}
            <div className="mb-4">
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                {unit === 'metric' ? t('bmi.weight_metric') : t('bmi.weight_imperial')}
              </label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === 'metric' ? 'Ej: 70' : 'Ej: 154'}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iaeva-blue focus:border-transparent"
                aria-required="true"
              />
            </div>
            
            {/* Altura */}
            <div className="mb-4">
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                {unit === 'metric' ? t('bmi.height_metric') : t('bmi.height_imperial')}
              </label>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === 'metric' ? 'Ej: 175' : 'Ej: 69'}
                min="1"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iaeva-blue focus:border-transparent"
                aria-required="true"
              />
            </div>
            
            {/* Edad (opcional para % grasa) */}
            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                {t('bmi.age')} <span className="text-gray-500 text-xs">({t('bmi.optional')})</span>
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Ej: 35"
                min="1"
                max="120"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iaeva-blue focus:border-transparent"
              />
            </div>
            
            {/* Género (opcional para % grasa) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('bmi.gender')} <span className="text-gray-500 text-xs">({t('bmi.optional')})</span>
              </label>
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
                  {t('bmi.male')}
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
                  {t('bmi.female')}
                </button>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={calculateBMI}
                disabled={!isFormValid()}
                className={`px-5 py-2.5 rounded-lg text-white font-medium text-sm ${
                  isFormValid() 
                    ? 'bg-gradient-to-r from-iaeva-blue to-iaeva-purple hover:opacity-90'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                aria-disabled={!isFormValid()}
              >
                {t('bmi.calculate')}
              </button>
              
              <button
                onClick={resetForm}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50"
              >
                {t('bmi.clear')}
              </button>
            </div>
          </div>
          
          {/* Resultados */}
          <div>
            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-full flex flex-col">
                  <h3 className="text-xl font-semibold mb-5">{t('bmi.results')}</h3>
                  
                  <div className="mb-6 text-center">
                    <div className="mb-2 text-gray-600 font-medium">{t('bmi.bmi')}</div>
                    <div className={`text-4xl font-bold ${result.color}`}>
                      {result.bmi}
                    </div>
                    <div className={`font-medium mt-1 ${result.color}`}>
                      {result.category}
                    </div>
                  </div>
                  
                  {result.bodyFat !== undefined && (
                    <div className="mb-6 text-center">
                      <div className="mb-2 text-gray-600 font-medium">{t('bmi.body_fat')}</div>
                      <div className="text-2xl font-bold text-gray-800">
                        {result.bodyFat}%
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        ({t('bmi.bf_formula')})
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-2">
                    <div className="text-gray-700 font-medium mb-2">{t('bmi.recommendations')}</div>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-iaeva-blue flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-auto pt-6">
                    <button
                      onClick={generatePDF}
                      className="w-full px-5 py-2.5 rounded-lg bg-iaeva-blue/10 text-iaeva-blue font-medium text-sm hover:bg-iaeva-blue/20 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {t('bmi.generate_pdf')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-center text-gray-500">
                  {t('bmi.empty_state')}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Información adicional */}
        <div className="mt-10 text-sm text-gray-500 p-4 bg-gray-50 rounded-xl">
          <h4 className="font-medium text-gray-700 mb-2">{t('bmi.interpretation')}:</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-600"></span>
              <span>{t('bmi.categories.severe_thinness')}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-orange-600"></span>
              <span>{t('bmi.categories.moderate_thinness')}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-yellow-600"></span>
              <span>{t('bmi.categories.mild_thinness')}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-600"></span>
              <span>{t('bmi.categories.normal')}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-yellow-600"></span>
              <span>{t('bmi.categories.overweight')}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-orange-600"></span>
              <span>{t('bmi.categories.obese_1')}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-600"></span>
              <span>{t('bmi.categories.obese_2')}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-700"></span>
              <span>{t('bmi.categories.obese_3')}</span>
            </li>
          </ul>
          <p className="mt-4">
            <strong>{t('bmi.disclaimer')}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator; 