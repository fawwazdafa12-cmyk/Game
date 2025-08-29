
import React, { createContext, useContext, ReactNode, useState, useMemo } from 'react';
import { StructuredLogger } from './logger.ts';
import { generateTraceId, generateSpanId, generateRequestId } from './tracing.ts';

interface IObservabilityContext {
  logger: StructuredLogger;
  requestId: string;
  traceId: string;
  startNewInteraction: () => void;
}

const ObservabilityContext = createContext<IObservabilityContext | undefined>(undefined);

export const ObservabilityProvider = ({ children }: { children: ReactNode }) => {
  const [requestId, setRequestId] = useState(generateRequestId());
  
  // TraceId should persist for the whole session
  const traceId = useMemo(() => generateTraceId(), []);
  
  const logger = useMemo(() => {
    return new StructuredLogger({
      service: 'NexusTOPUP-Web',
      env: 'production', // This would ideally come from env vars
      region: 'ap-southeast-1',
    });
  }, []);

  const startNewInteraction = () => {
    setRequestId(generateRequestId());
  };

  const value = useMemo(() => {
    const contextData = {
      requestId,
      traceId,
      spanId: generateSpanId(), // A new span for each render using the context
    };
    logger.setContext(contextData);
    
    return {
      logger,
      requestId,
      traceId,
      startNewInteraction,
    };
  }, [requestId, traceId, logger]);

  return (
    <ObservabilityContext.Provider value={value}>
      {children}
    </ObservabilityContext.Provider>
  );
};

export const useObservability = (): IObservabilityContext => {
  const context = useContext(ObservabilityContext);
  if (!context) {
    throw new Error('useObservability must be used within an ObservabilityProvider');
  }
  return context;
};