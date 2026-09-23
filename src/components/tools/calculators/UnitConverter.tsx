import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Copy, Check, RefreshCw, Info, AlertCircle } from 'lucide-react';

// Enhanced interfaces for better type safety
interface SubCategory {
  key: string;
  units: string[];
}

interface ConversionCategory {
  key: string;
  subcategories: SubCategory[];
}

interface UnitConverterProps {
  // Props if any
}

const UnitConverter = () => {
  const { t, i18n } = useTranslation('tools');
  const [sourceValue, setSourceValue] = useState<string>('');
  const [targetValue, setTargetValue] = useState<string>('');
  const [category, setCategory] = useState<string>('laboratory');
  const [subcategory, setSubcategory] = useState<string>('');
  const [sourceUnit, setSourceUnit] = useState<string>('');
  const [targetUnit, setTargetUnit] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showReference, setShowReference] = useState<boolean>(false);
  const [selectedReference, setSelectedReference] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Enhanced categories with subcategories for better organization
  const categories: ConversionCategory[] = [
    { 
      key: 'laboratory',
      subcategories: [
        { key: 'glucose', units: ['glucose'] },
        { key: 'cholesterol', units: ['cholesterol'] },
        { key: 'creatinine', units: ['creatinine'] },
        { key: 'hemoglobin', units: ['hemoglobin'] },
        { key: 'bilirubin', units: ['bilirubin'] },
        { key: 'tsh', units: ['tsh'] }
      ]
    },
    { 
      key: 'vital_signs',
      subcategories: [
        { key: 'temperature', units: ['temperature'] },
        { key: 'pressure', units: ['pressure'] }
      ]
    },
    { 
      key: 'medication',
      subcategories: [
        { key: 'weight', units: ['weight'] },
        { key: 'concentration', units: ['concentration'] }
      ] 
    },
    { 
      key: 'fluid_balance',
      subcategories: [
        { key: 'volume', units: ['volume'] }
      ]
    },
    { 
      key: 'nutrition',
      subcategories: [
        { key: 'weight', units: ['weight'] },
        { key: 'energy', units: ['energy'] }
      ]
    },
    { 
      key: 'pediatrics',
      subcategories: [
        { key: 'weight', units: ['weight'] },
        { key: 'length', units: ['length'] }
      ]
    },
    { 
      key: 'radiology',
      subcategories: [
        { key: 'radiation', units: ['radiation'] },
        { key: 'area', units: ['area'] }
      ]
    }
  ];

  // Define units with clearer grouping
  const units = {
    weight: ['kg', 'g', 'mg', 'mcg', 'lb', 'oz'],
    length: ['m', 'cm', 'mm', 'in', 'ft'],
    volume: ['l', 'ml', 'cc', 'dl', 'gal', 'qt', 'pt', 'fl_oz'],
    temperature: ['c', 'f', 'k'],
    pressure: ['mmhg', 'cmh2o', 'kpa', 'mbar', 'psi'],
    time: ['s', 'min', 'h', 'd'],
    concentration: [
      'mol_l', 'mmol_l', 'umol_l', 'nmol_l', 'pmol_l', 
      'g_l', 'mg_dl', 'mg_l', 'ug_dl', 'ug_l', 
      'ng_ml', 'ng_dl', 'miu_l', 'iu_l', 'meq_l'
    ],
    radiation: ['gy', 'rad', 'sv', 'rem', 'bq', 'ci'],
    area: ['m2', 'cm2', 'ft2', 'in2'],
    energy: ['kcal', 'kj'],
    glucose: ['mg_dl', 'mmol_l'],
    cholesterol: ['mg_dl', 'mmol_l'],
    creatinine: ['mg_dl', 'umol_l'],
    hemoglobin: ['g_dl', 'g_l', 'mmol_l'],
    bilirubin: ['mg_dl', 'umol_l'],
    tsh: ['uiu_ml', 'miu_l']
  };

  // Conversion factors (source unit → standard unit)
  const toStandardUnit: Record<string, Record<string, number>> = {
    weight: {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      mcg: 0.000000001,
      lb: 0.45359237,
      oz: 0.028349523125
    },
    length: {
      m: 1,
      cm: 0.01,
      mm: 0.001,
      in: 0.0254,
      ft: 0.3048
    },
    volume: {
      l: 1,
      ml: 0.001,
      cc: 0.001,
      dl: 0.1,
      gal: 3.78541,
      qt: 0.946353,
      pt: 0.473176,
      fl_oz: 0.0295735
    },
    temperature: {
      c: (c: number) => c,
      f: (f: number) => (f - 32) * 5/9,
      k: (k: number) => k - 273.15
    },
    pressure: {
      mmhg: 1,
      cmh2o: 0.735559,
      kpa: 7.50062,
      mbar: 0.750062,
      psi: 51.7149
    },
    concentration: {
      // Base: mol/L
      mol_l: 1,
      mmol_l: 0.001,
      umol_l: 0.000001,
      nmol_l: 0.000000001,
      pmol_l: 0.000000000001,
      // Special cases will be handled separately
      mg_dl: 0, // Conversion depends on the substance
      mg_l: 0, // Conversion depends on the substance
      ug_dl: 0, // Conversion depends on the substance
      ug_l: 0, // Conversion depends on the substance
      ng_ml: 0, // Conversion depends on the substance
      ng_dl: 0, // Conversion depends on the substance
      miu_l: 0, // Conversion depends on the substance
      iu_l: 0, // Conversion depends on the substance
      meq_l: 0 // Conversion depends on the substance
    },
    glucose: {
      mg_dl: 1,
      mmol_l: 18.0182 // 1 mmol/L = 18.0182 mg/dL
    },
    cholesterol: {
      mg_dl: 1,
      mmol_l: 38.67 // 1 mmol/L = 38.67 mg/dL
    },
    creatinine: {
      mg_dl: 1,
      umol_l: 88.4 // 1 mg/dL = 88.4 μmol/L
    },
    hemoglobin: {
      g_dl: 1,
      g_l: 0.1, // 1 g/dL = 10 g/L
      mmol_l: 0.6206 // 1 g/dL = 0.6206 mmol/L
    },
    bilirubin: {
      mg_dl: 1,
      umol_l: 17.1 // 1 mg/dL = 17.1 μmol/L
    },
    tsh: {
      uiu_ml: 1,
      miu_l: 1 // 1 μIU/mL = 1 mIU/L (same unit, different notation)
    }
  };
  
  // Conversion factors (standard unit → target unit)
  const fromStandardUnit: Record<string, Record<string, number>> = {
    weight: {
      kg: 1,
      g: 1000,
      mg: 1000000,
      mcg: 1000000000,
      lb: 2.20462,
      oz: 35.274
    },
    length: {
      m: 1,
      cm: 100,
      mm: 1000,
      in: 39.3701,
      ft: 3.28084
    },
    volume: {
      l: 1,
      ml: 1000,
      cc: 1000,
      dl: 10,
      gal: 0.264172,
      qt: 1.05669,
      pt: 2.11338,
      fl_oz: 33.814
    },
    temperature: {
      c: (c: number) => c,
      f: (c: number) => c * 9/5 + 32,
      k: (c: number) => c + 273.15
    },
    pressure: {
      mmhg: 1,
      cmh2o: 1.35951,
      kpa: 0.133322,
      mbar: 1.33322,
      psi: 0.0193368
    },
    concentration: {
      // Base: mol/L
      mol_l: 1,
      mmol_l: 1000,
      umol_l: 1000000,
      nmol_l: 1000000000,
      pmol_l: 1000000000000,
      // Special cases
      mg_dl: 0, // Conversion depends on the substance
      mg_l: 0, // Conversion depends on the substance
      ug_dl: 0, // Conversion depends on the substance
      ug_l: 0, // Conversion depends on the substance
      ng_ml: 0, // Conversion depends on the substance
      ng_dl: 0, // Conversion depends on the substance
      miu_l: 0, // Conversion depends on the substance
      iu_l: 0, // Conversion depends on the substance
      meq_l: 0 // Conversion depends on the substance
    },
    glucose: {
      mg_dl: 1,
      mmol_l: 1/18.0182 // 1 mg/dL = 0.0555 mmol/L
    },
    cholesterol: {
      mg_dl: 1,
      mmol_l: 1/38.67 // 1 mg/dL = 0.02586 mmol/L
    },
    creatinine: {
      mg_dl: 1,
      umol_l: 88.4 // 1 mg/dL = 88.4 μmol/L
    },
    hemoglobin: {
      g_dl: 1,
      g_l: 10, // 1 g/dL = 10 g/L
      mmol_l: 0.6206 // 1 g/dL = 0.6206 mmol/L
    },
    bilirubin: {
      mg_dl: 1,
      umol_l: 17.1 // 1 mg/dL = 17.1 μmol/L
    },
    tsh: {
      uiu_ml: 1,
      miu_l: 1 // They are the same
    }
  };

  // Get available subcategories for selected category
  const getAvailableSubcategories = (): SubCategory[] => {
    const selectedCategory = categories.find(cat => cat.key === category);
    return selectedCategory ? selectedCategory.subcategories : [];
  };

  // Get available units for selected subcategory
  const getAvailableUnits = (): string[] => {
    if (!subcategory) return [];
    
    // First, get the unit type from subcategory
    const subcatObj = getAvailableSubcategories().find(subcat => subcat.key === subcategory);
    if (!subcatObj) return [];
    
    // Then get all units for this subcategory
    let availableUnits: string[] = [];
    subcatObj.units.forEach(unitType => {
      if (units[unitType as keyof typeof units]) {
        availableUnits = [...availableUnits, ...units[unitType as keyof typeof units]];
      }
    });
    
    return Array.from(new Set(availableUnits)); // Remove duplicates
  };

  // Handle category change
  useEffect(() => {
    const availableSubcategories = getAvailableSubcategories();
    if (availableSubcategories.length > 0) {
      // Set the first subcategory as default when category changes
      setSubcategory(availableSubcategories[0].key);
      setError('');
    }
  }, [category]);

  // Handle subcategory change
  useEffect(() => {
    if (!subcategory) return;
    
    const availableUnits = getAvailableUnits();
    if (availableUnits.length > 0) {
      // Reset units when subcategory changes
      setSourceUnit(availableUnits[0]);
      if (availableUnits.length > 1) {
        setTargetUnit(availableUnits[1]);
      } else if (availableUnits.length === 1) {
        setTargetUnit(availableUnits[0]);
      }
      setError('');
    }
  }, [subcategory]);

  // Handle source unit change
  useEffect(() => {
    const availableUnits = getAvailableUnits();
    if (availableUnits.length > 0 && !availableUnits.includes(sourceUnit)) {
      setSourceUnit(availableUnits[0]);
    }
  }, [subcategory, sourceUnit]);

  // Handle target unit change
  useEffect(() => {
    const availableUnits = getAvailableUnits();
    if (availableUnits.length > 0 && !availableUnits.includes(targetUnit)) {
      // If target unit is invalid, set it to another unit than source
      // If only one unit type is available, we allow same source and target unit
      const filteredUnits = availableUnits.filter(unit => unit !== sourceUnit);
      if (filteredUnits.length > 0) {
        setTargetUnit(filteredUnits[0]);
      } else if (availableUnits.length > 0) {
        setTargetUnit(availableUnits[0]);
      }
    }
  }, [subcategory, sourceUnit, targetUnit]);

  // Determine if source and target units are compatible for conversion
  const areUnitsCompatible = (): boolean => {
    if (!sourceUnit || !targetUnit) return false;
    
    // Units are compatible if they're found in the same unit type
    for (const [type, unitList] of Object.entries(units)) {
      if (unitList.includes(sourceUnit) && unitList.includes(targetUnit)) {
        return true;
      }
    }
    
    // Special cases for lab values that have their own conversion factors
    const specialTypes = ['glucose', 'cholesterol', 'creatinine', 'hemoglobin', 'bilirubin', 'tsh'];
    for (const type of specialTypes) {
      if (units[type as keyof typeof units]?.includes(sourceUnit) && 
          units[type as keyof typeof units]?.includes(targetUnit)) {
        return true;
      }
    }
    
    return false;
  };

  // Perform conversion with improved error handling
  const performConversion = () => {
    setError('');
    
    if (!sourceValue || !sourceUnit || !targetUnit) {
      setTargetValue('');
      return;
    }

    const value = parseFloat(sourceValue);
    if (isNaN(value)) {
      setError(t('unit_converter.invalid_number'));
      setTargetValue('');
      return;
    }

    if (!areUnitsCompatible()) {
      setError(t('unit_converter.incompatible_units'));
      setTargetValue('');
      return;
    }

    let result: number;
    let unitType: string | null = null;

    // Find the unitType that contains both source and target units
    for (const [type, unitList] of Object.entries(units)) {
      if (unitList.includes(sourceUnit) && unitList.includes(targetUnit)) {
        unitType = type;
        break;
      }
    }

    if (!unitType) {
      // If not found in the same unitType, try to find both in special converters
      const specialTypes = ['glucose', 'cholesterol', 'creatinine', 'hemoglobin', 'bilirubin', 'tsh'];
      for (const type of specialTypes) {
        if (units[type as keyof typeof units].includes(sourceUnit) && 
            units[type as keyof typeof units].includes(targetUnit)) {
          unitType = type;
          break;
        }
      }
    }

    if (unitType) {
      // Temperature needs special handling due to offsets
      if (unitType === 'temperature') {
        // First convert to Celsius (our standard unit for temperature)
        const toCelsius = (toStandardUnit.temperature as any)[sourceUnit];
        const celsiusValue = typeof toCelsius === 'function' ? toCelsius(value) : value;
        
        // Then convert from Celsius to target unit
        const fromCelsius = (fromStandardUnit.temperature as any)[targetUnit];
        result = typeof fromCelsius === 'function' ? fromCelsius(celsiusValue) : celsiusValue;
      } else {
        // For regular unit types
        // Convert to standard unit
        const toStandardFactor = toStandardUnit[unitType as keyof typeof toStandardUnit][sourceUnit];
        const standardValue = value * toStandardFactor;
        
        // Convert from standard unit to target unit
        const fromStandardFactor = fromStandardUnit[unitType as keyof typeof fromStandardUnit][targetUnit];
        result = standardValue * fromStandardFactor;
      }
    } else {
      setError(t('unit_converter.conversion_not_supported'));
      setTargetValue('');
      return;
    }

    // Format the result
    const formattedResult = formatResult(result);
    setTargetValue(formattedResult);
  };

  // Format results with appropriate precision
  const formatResult = (value: number): string => {
    if (value === 0) return '0';
    
    // For very small or very large numbers, use scientific notation
    if (Math.abs(value) < 0.001 || Math.abs(value) > 1000000) {
      return value.toExponential(4);
    }
    
    // For numbers with decimal places, show up to 4 decimal places
    if (value % 1 !== 0) {
      // Adaptive precision: show fewer decimal places for larger numbers
      if (Math.abs(value) >= 100) return value.toFixed(2);
      if (Math.abs(value) >= 10) return value.toFixed(3);
      return value.toFixed(4);
    }
    
    return value.toString();
  };

  // Swap source and target units
  const swapUnits = () => {
    // Save current values
    const tempSourceUnit = sourceUnit;
    const tempTargetUnit = targetUnit;
    const tempSourceValue = sourceValue;
    const tempTargetValue = targetValue;
    
    // Swap units
    setSourceUnit(tempTargetUnit);
    setTargetUnit(tempSourceUnit);
    
    // Swap values if target has a value
    if (tempTargetValue) {
      setSourceValue(tempTargetValue);
      setTargetValue(tempSourceValue);
    }
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    if (!targetValue) return;
    
    navigator.clipboard.writeText(targetValue).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Get reference values for selected lab values
  const getReferenceValues = () => {
    const labMapping: Record<string, string> = {
      glucose: 'glucose',
      cholesterol: 'cholesterol',
      creatinine: 'creatinine',
      hemoglobin: 'hemoglobin',
      bilirubin: 'bilirubin',
      tsh: 'tsh'
    };
    
    // Find matching lab test
    for (const [unitType, mappedLabKey] of Object.entries(labMapping)) {
      if (units[unitType as keyof typeof units].includes(sourceUnit) || 
          units[unitType as keyof typeof units].includes(targetUnit)) {
        return mappedLabKey;
      }
    }
    
    return null;
  };

  // Show reference values modal
  const toggleReferenceValues = () => {
    if (!showReference) {
      const referenceKey = getReferenceValues();
      if (referenceKey) {
        setSelectedReference(referenceKey);
        setShowReference(true);
      }
    } else {
      setShowReference(false);
    }
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSourceValue(value);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performConversion();
  };
  
  // Clear all form fields
  const handleClear = () => {
    setSourceValue('');
    setTargetValue('');
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          {t('unit_converter.title')}
        </h2>
        
        <div className="mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Selection */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('unit_converter.category')}
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iaeva-blue focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat.key} value={cat.key}>
                      {t(`unit_converter.categories.${cat.key}`)}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Subcategory Selection - New */}
              <div>
                <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('unit_converter.subcategory', 'Subcategoría')}
                </label>
                <select
                  id="subcategory"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iaeva-blue focus:border-transparent"
                >
                  {getAvailableSubcategories().map((subcat) => (
                    <option key={subcat.key} value={subcat.key}>
                      {t(`unit_converter.subcategories.${subcat.key}`, getUnitType(subcat.key))}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Source Value and Unit */}
              <div>
                <label htmlFor="sourceValue" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('unit_converter.source_value')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    id="sourceValue"
                    value={sourceValue}
                    onChange={handleInputChange}
                    placeholder={t('unit_converter.enter_value')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iaeva-blue focus:border-transparent"
                  />
                  <select
                    id="sourceUnit"
                    value={sourceUnit}
                    onChange={(e) => setSourceUnit(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iaeva-blue focus:border-transparent"
                  >
                    {getAvailableUnits().map((unit) => (
                      <option key={`source-${unit}`} value={unit}>
                        {t(`unit_converter.units.${getUnitType(unit)}.${unit}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Target Value and Unit */}
              <div>
                <label htmlFor="targetValue" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('unit_converter.target_value')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    id="targetValue"
                    value={targetValue}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iaeva-blue focus:border-transparent"
                  />
                  <select
                    id="targetUnit"
                    value={targetUnit}
                    onChange={(e) => setTargetUnit(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-iaeva-blue focus:border-transparent"
                  >
                    {getAvailableUnits().map((unit) => (
                      <option key={`target-${unit}`} value={unit} disabled={unit === sourceUnit && getAvailableUnits().length > 1}>
                        {t(`unit_converter.units.${getUnitType(unit)}.${unit}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Error message - New */}
              {error && (
                <div className="md:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 flex items-start"
                  >
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mr-2 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </motion.div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="md:col-span-2 flex flex-wrap justify-between items-center gap-4">
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-iaeva-blue to-iaeva-purple text-white font-medium text-sm hover:opacity-90"
                  >
                    {t('unit_converter.convert')}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50"
                  >
                    {t('unit_converter.clear')}
                  </button>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={swapUnits}
                    className={`p-2.5 rounded-lg ${
                      sourceUnit !== targetUnit 
                        ? 'text-iaeva-blue border border-iaeva-blue/20 bg-iaeva-blue/5 hover:bg-iaeva-blue/10' 
                        : 'text-gray-400 border border-gray-200 bg-gray-100 cursor-not-allowed'
                    }`}
                    title={t('unit_converter.reciprocal_conversion')}
                    disabled={sourceUnit === targetUnit}
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                  
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    disabled={!targetValue}
                    className={`p-2.5 rounded-lg ${
                      targetValue 
                        ? 'text-iaeva-blue border border-iaeva-blue/20 bg-iaeva-blue/5 hover:bg-iaeva-blue/10' 
                        : 'text-gray-400 border border-gray-200 bg-gray-100 cursor-not-allowed'
                    }`}
                    title={t('unit_converter.copy_result')}
                  >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </button>
                  
                  {getReferenceValues() && (
                    <button
                      type="button"
                      onClick={toggleReferenceValues}
                      className="px-4 py-2 rounded-lg text-iaeva-blue border border-iaeva-blue/20 bg-iaeva-blue/5 hover:bg-iaeva-blue/10 text-sm flex items-center"
                    >
                      <Info className="h-4 w-4 mr-1.5" />
                      {t('unit_converter.common_values')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
        
        {/* Helper Text - New */}
        <div className="mb-6 px-4 py-3 bg-blue-50 border border-blue-100 rounded-lg">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mr-2 mt-0.5" />
            <p className="text-sm text-blue-700">
              {t('unit_converter.helper_text', 'Seleccione primero una categoría y subcategoría para ver las unidades disponibles para conversión. Las unidades mostradas siempre son compatibles para la conversión.')}
            </p>
          </div>
        </div>
        
        {/* Reference Values Modal */}
        {showReference && selectedReference && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
          >
            <h3 className="text-lg font-semibold mb-3 text-iaeva-blue">
              {t(`unit_converter.lab_values.${selectedReference}.name`)} - {t('unit_converter.common_values')}
            </h3>
            <div className="space-y-2">
              {Object.entries(t(`unit_converter.lab_values.${selectedReference}.reference`, {}, { returnObjects: true }) as Record<string, string>).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <span className="text-sm font-medium text-gray-600 mr-2">• {key}:</span>
                  <span className="text-sm text-gray-800">{value}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowReference(false)}
              className="mt-3 text-sm text-gray-500 hover:text-gray-700"
            >
              Cerrar
            </button>
          </motion.div>
        )}
        
        {/* Disclaimer */}
        <div className="mt-6 text-sm text-gray-500 p-4 bg-gray-50 rounded-xl">
          <p>{t('unit_converter.disclaimer')}</p>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine unit type for a given unit code
function getUnitType(unitCode: string): string {
  const unitTypes = [
    'weight', 'length', 'volume', 'temperature', 'pressure',
    'time', 'concentration', 'radiation', 'area', 'energy',
    'glucose', 'cholesterol', 'creatinine', 'hemoglobin', 'bilirubin', 'tsh'
  ];
  
  for (const type of unitTypes) {
    if (type === unitCode || 
        (type === 'weight' && ['kg', 'g', 'mg', 'mcg', 'lb', 'oz'].includes(unitCode)) ||
        (type === 'length' && ['m', 'cm', 'mm', 'in', 'ft'].includes(unitCode)) ||
        (type === 'volume' && ['l', 'ml', 'cc', 'dl', 'gal', 'qt', 'pt', 'fl_oz'].includes(unitCode)) ||
        (type === 'temperature' && ['c', 'f', 'k'].includes(unitCode)) ||
        (type === 'pressure' && ['mmhg', 'cmh2o', 'kpa', 'mbar', 'psi'].includes(unitCode)) ||
        (type === 'time' && ['s', 'min', 'h', 'd'].includes(unitCode)) ||
        (type === 'concentration' && ['mol_l', 'mmol_l', 'umol_l', 'nmol_l', 'pmol_l', 'g_l', 'mg_dl', 'mg_l', 'ug_dl', 'ug_l', 'ng_ml', 'ng_dl', 'miu_l', 'iu_l', 'meq_l'].includes(unitCode)) ||
        (type === 'radiation' && ['gy', 'rad', 'sv', 'rem', 'bq', 'ci'].includes(unitCode)) ||
        (type === 'area' && ['m2', 'cm2', 'ft2', 'in2'].includes(unitCode)) ||
        (type === 'energy' && ['kcal', 'kj'].includes(unitCode)) ||
        (type === 'glucose' && ['mg_dl', 'mmol_l'].includes(unitCode)) ||
        (type === 'cholesterol' && ['mg_dl', 'mmol_l'].includes(unitCode)) ||
        (type === 'creatinine' && ['mg_dl', 'umol_l'].includes(unitCode)) ||
        (type === 'hemoglobin' && ['g_dl', 'g_l', 'mmol_l'].includes(unitCode)) ||
        (type === 'bilirubin' && ['mg_dl', 'umol_l'].includes(unitCode)) ||
        (type === 'tsh' && ['uiu_ml', 'miu_l'].includes(unitCode))
    ) {
      return type;
    }
  }
  
  return 'weight'; // Default fallback
}

export default UnitConverter; 