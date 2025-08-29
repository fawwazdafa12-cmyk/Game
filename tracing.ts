/**
 * Generates random hex strings for tracing IDs.
 * In a real-world scenario with OpenTelemetry, the SDK would handle this automatically.
 * This implementation provides the necessary correlation IDs for the logger.
 */

function generateRandomHex(byteLength: number): string {
  const byteArray = new Uint8Array(byteLength);
  crypto.getRandomValues(byteArray);
  return Array.from(byteArray, byte => ('0' + byte.toString(16)).slice(-2)).join('');
}

/**
 * Generates a W3C-compliant Trace ID.
 * A 16-byte (32-hex characters) random string.
 * @returns {string} The generated trace ID.
 */
export function generateTraceId(): string {
  return generateRandomHex(16);
}

/**
 * Generates a W3C-compliant Span ID.
 * An 8-byte (16-hex characters) random string.
 * @param {string} [parentSpanId] Optional parent span ID. Not used here but good practice.
 * @returns {string} The generated span ID.
 */
export function generateSpanId(parentSpanId?: string): string {
  // The parentSpanId is not used in this simple generator but is included
  // to show how it would be considered in a real tracing system.
  return generateRandomHex(8);
}

/**
 * Generates a unique request ID (e.g., UUID v4).
 * This helps correlate all events associated with a single user interaction.
 * @returns {string} The generated request ID.
 */
export function generateRequestId(): string {
  return crypto.randomUUID();
}
