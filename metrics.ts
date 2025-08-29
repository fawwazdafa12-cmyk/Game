
import { useObservability } from './ObservabilityContext.tsx';

/**
 * This is a client-side metrics module stub.
 * In a real application with a backend, you would use a proper metrics library
 * like prom-client and expose a /metrics endpoint.
 *
 * Here, we will use the structured logger to emit metric events,
 * which can be parsed and aggregated by a logging backend (like Loki, Datadog, etc.).
 */

// We can't use the hook at the top level, so we'll pass the logger in.
type Logger = {
    info: (message: string, extra?: Record<string, any>) => void;
};

/**
 * Increments a counter metric.
 * @param name The name of the counter (e.g., 'payment_channel_status_total').
 * @param tags An object of labels/tags (e.g., { channel: 'qris', status: 'success' }).
 */
export const incrementCounter = (name: string, tags: Record<string, string | number>) => {
    // This is a placeholder. In a real component, you would get the logger from context.
    // For now, we log directly to console to show the structure.
    console.log(JSON.stringify({
        ts: new Date().toISOString(),
        level: 'info',
        msg: `metric:${name}`,
        metric_type: 'counter',
        value: 1,
        ...tags
    }));
};

/**
 * Observes a value for a histogram or summary.
 * @param name The name of the histogram (e.g., 'payment_createcharge_duration_seconds').
 * @param value The value to record.
 * @param tags An object of labels/tags.
 */
export const observeHistogram = (logger: Logger, name: string, value: number, tags: Record<string, string | number>) => {
    logger.info(`metric:${name}`, {
        metric_type: 'histogram',
        value: value,
        ...tags
    });
};

/**
 * Records a gauge value.
 * @param name The name of the gauge (e.g., 'webhook_backlog_gauge').
 * @param value The current value.
 * @param tags An object of labels/tags.
 */
export const recordGauge = (logger: Logger, name: string, value: number, tags: Record<string, string | number>) => {
     logger.info(`metric:${name}`, {
        metric_type: 'gauge',
        value: value,
        ...tags
    });
};