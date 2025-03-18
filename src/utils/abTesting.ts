// Nuevo archivo: src/utils/abTesting.ts
type TestVariant = 'A' | 'B';

interface ABTest {
  id: string;
  variants: Record<TestVariant, unknown>;
}

const activeTests: Record<string, ABTest> = {
  'cta-primary-text': {
    id: 'cta-primary-text',
    variants: {
      'A': 'Solicitar demo gratis',
      'B': 'Prueba IAEVA sin costo'
    }
  },
  'cta-color': {
    id: 'cta-color',
    variants: {
      'A': 'from-iaeva-blue to-iaeva-purple',
      'B': 'from-iaeva-teal to-iaeva-blue'
    }
  }
};

// Función para obtener la variante para el usuario actual
export const getVariant = (testId: string): TestVariant => {
  // En producción, esto tendría una lógica más compleja para asignar variantes consistentemente
  // y guardar la asignación en localStorage o cookies
  
  // Asignación simple para demostración:
  return Math.random() > 0.5 ? 'A' : 'B';
};

// Función para obtener el valor de la variante asignada
export const getVariantValue = (testId: string): unknown => {
  if (!activeTests[testId]) return null;
  
  const variant = getVariant(testId);
  return activeTests[testId].variants[variant];
};

// Función para registrar conversiones
export const trackConversion = (testId: string, variant: TestVariant): void => {
  // En producción, esto enviaría datos a un sistema de analytics
  console.log(`Conversion tracked for test ${testId}, variant ${variant}`);
};
