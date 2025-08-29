import { PaymentMethod } from '../types.ts';

// Constants for the scoring algorithm, as specified in the prompt
const RANK_WEIGHTS = {
    w1_base: 1,       // priority
    w2_srate: 1.2,    // success_rate
    w3_cost: 0.8,     // cost_penalty
    w4_latency: 0.4,  // latency_penalty
};

/**
 * Calculates the administration fee for a given payment method and subtotal.
 * @param method The payment method object.
 * @param subtotal The subtotal of the transaction.
 * @returns The calculated fee in the smallest currency unit (e.g., Rupiah).
 */
export const calculateFee = (method: PaymentMethod, subtotal: number): number => {
    return Math.round(method.fee.flat + subtotal * (method.fee.percent / 100));
};

/**
 * Normalizes a value within a given range [min, max] to a scale of 0 to 1.
 * If all values are the same, it returns 0 to avoid division by zero.
 */
const normalize = (value: number, min: number, max: number): number => {
    if (max - min === 0) return 0;
    return (value - min) / (max - min);
};

/**
 * Calculates a dynamic score for a payment channel based on several weighted factors.
 * The higher the score, the better the channel recommendation.
 * @param method The payment method to score.
 * @param subtotal The transaction subtotal, used for cost calculation.
 * @param allMethods A list of all available methods, used for normalization context.
 * @returns A numerical score for the channel.
 */
export const calculateChannelScore = (
    method: PaymentMethod,
    subtotal: number,
    allMethods: PaymentMethod[]
): number => {
    // 1. Base score from priority (lower priority number is better)
    const baseScore = 100 - method.priority;

    // 2. Success rate score
    const srateScore = method.successRate;

    // 3. Cost penalty calculation (needs normalization)
    const fees = allMethods.map(m => calculateFee(m, subtotal));
    const minFee = Math.min(...fees);
    const maxFee = Math.max(...fees);
    const currentFee = calculateFee(method, subtotal);
    const costPenalty = normalize(currentFee, minFee, maxFee) * 100; // Scale to 0-100

    // 4. Latency penalty calculation (needs normalization)
    const latencies = allMethods.map(m => m.avgLatencyMs);
    const minLatency = Math.min(...latencies);
    const maxLatency = Math.max(...latencies);
    const latencyPenalty = normalize(method.avgLatencyMs, minLatency, maxLatency) * 100; // Scale to 0-100

    // Final weighted score
    const score = 
        (baseScore * RANK_WEIGHTS.w1_base) +
        (srateScore * RANK_WEIGHTS.w2_srate) -
        (costPenalty * RANK_WEIGHTS.w3_cost) -
        (latencyPenalty * RANK_WEIGHTS.w4_latency);

    return Math.max(0, score); // Ensure score is not negative
};
