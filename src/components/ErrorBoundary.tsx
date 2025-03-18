import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }
  render() {
    // Verificamos si hay un error en el estado
    if ((this.state as ErrorBoundaryState).hasError) {
      return <div className="p-4 text-center">Hubo un problema al cargar el componente</div>;
    }
    // Renderizamos los componentes hijos si no hay error
    return this.props.children;
  }
}

export default ErrorBoundary;