
import { generateSpanId } from './tracing.ts';

// --- PII Redaction ---
const MASK = '****';
const PII_PEPPER = 'DEFAULT_PEPPER_CHANGE_ME_IN_ENV'; // Should be from process.env.PII_PEPPER_HEX

// Simple SHA-256 hashing stub (in a real Node.js env, you'd use the 'crypto' module)
async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashPii(value: string): Promise<string> {
    return sha256(value + PII_PEPPER);
}

function maskSecret(value: string): string {
    if (value.length <= 4) return MASK;
    return `${MASK}${value.slice(-4)}`;
}

// Redact function to recursively scan and mask/hash PII in an object
async function redact(obj: any): Promise<any> {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    const newObj: any = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            let value = obj[key];
            if (typeof value === 'string') {
                if (key.match(/email/i)) {
                    value = await hashPii(value);
                } else if (key.match(/phone|wa/i)) {
                    value = await hashPii(value);
                } else if (key.match(/token|secret|signature|password/i)) {
                    value = maskSecret(value);
                }
            } else if (typeof value === 'object') {
                value = await redact(value);
            }
            newObj[key] = value;
        }
    }
    return newObj;
}

// --- Structured Logger ---

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  service: string;
  env: string;
  region: string;
}

interface RequestContext {
  requestId?: string;
  traceId?: string;
  spanId?: string;
}

export class StructuredLogger {
  private baseContext: LogContext;
  private requestContext: RequestContext;

  constructor(baseContext: LogContext) {
    this.baseContext = baseContext;
    this.requestContext = {};
  }

  public setContext(requestContext: RequestContext) {
    this.requestContext = requestContext;
  }

  private async log(level: LogLevel, message: string, extra: Record<string, any> = {}) {
    // In a real app, you would check LOG_LEVEL from env vars
    const redactedExtra = await redact(extra);

    const logEntry = {
      ts: new Date().toISOString(),
      level,
      msg: message,
      ...this.baseContext,
      ...this.requestContext,
      // Generate a new spanId for each individual log message
      spanId: this.requestContext.spanId ? generateSpanId(this.requestContext.spanId) : generateSpanId(),
      ...redactedExtra,
    };

    // Output as a single JSON line
    console[level](JSON.stringify(logEntry));
  }

  public debug(message: string, extra?: Record<string, any>) {
    // In production, this would be conditional
    this.log('debug', message, extra);
  }

  public info(message: string, extra?: Record<string, any>) {
    this.log('info', message, extra);
  }

  public warn(message: string, extra?: Record<string, any>) {
    this.log('warn', message, extra);
  }

  public error(message: string, extra?: Record<string, any>) {
    this.log('error', message, extra);
  }
}