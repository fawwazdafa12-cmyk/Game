import { User } from '../../types';

// Sentry is not available in the importmap, so we create a stub.
// In a real application with a package manager, you would:
// import * as Sentry from "@sentry/react";
const Sentry = {
  init: (options: any) => {
    // In a real app, this DSN would come from environment variables
    if (options.dsn) {
      console.log('Sentry initialized');
    } else {
      console.warn('Sentry DSN not found. Sentry is disabled.');
    }
  },
  captureException: (error: any, context: any) => {
    console.error('Sentry.captureException', error, context);
  },
  setUser: (user: any) => {
    console.log('Sentry.setUser', user);
  },
  setTag: (key: string, value: any) => {
    console.log(`Sentry.setTag: ${key}=${value}`);
  },
  withScope: (callback: (scope: any) => void) => {
    const scope = { 
      setTag: Sentry.setTag, 
      setUser: Sentry.setUser,
      setContext: (name: string, context: any) => console.log(`Sentry.setContext: ${name}`, context)
    };
    callback(scope);
  }
};


export const initSentry = () => {
  // The DSN should be securely managed and injected at build time.
  const SENTRY_DSN = 'https://examplePublicKey@o0.ingest.sentry.io/0';

  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      // Add integrations here, e.g., new Sentry.BrowserTracing()
    ],
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 0.1,
    // Disabling beforeSend for this stub, but in production it would be used
    // for scrubbing PII data that the logger's redactor might miss.
    // beforeSend(event, hint) {
    //   // ... scrubbing logic ...
    //   return event;
    // },
  });
};

/**
 * Sets the Sentry user context.
 * In a real app, the ID would be a hashed or non-PII identifier.
 * @param user The user object or null to clear.
 */
export const setSentryUser = (user: User | { id?: string | null; email?: string | null } | null) => {
  if (user && user.id) {
    // The user ID should be a non-PII identifier. Hashing would happen here or on the backend.
    Sentry.setUser({ id: user.id, email: user.email });
  } else {
    Sentry.setUser(null);
  }
};


/**
 * Sets multiple tags on the current Sentry scope.
 * @param tags An object of key-value pairs to set as tags.
 */
export const setSentryTags = (tags: Record<string, any>) => {
    Sentry.withScope(scope => {
        for (const key in tags) {
            scope.setTag(key, tags[key]);
        }
    });
};
