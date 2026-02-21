/**
 * Maps structured API error responses to user-friendly display objects.
 * Pure function — no Angular dependency, testable with plain Jest/Jasmine.
 */
export interface ErrorDisplay {
    message: string;
    type: 'quota' | 'feature' | 'rate_limit' | 'unavailable' | 'unknown';
    showUpgrade: boolean;
    upgradeUrl: string | null;
    retryAfter: number | null;
    planId: string | null;
}

export function mapErrorResponse(status: number, body: any): ErrorDisplay {
    // Try structured error body first
    const code = body?.code || body?.detail?.code;
    const message = body?.message || body?.detail?.message;
    const detail = typeof body?.detail === 'string' ? body.detail : body?.detail?.detail;
    const upgradeUrl = body?.upgrade_url || body?.detail?.upgrade_url || null;
    const retryAfter = body?.retry_after || body?.detail?.retry_after || null;
    const planId = body?.plan_id || body?.detail?.plan_id || null;

    switch (status) {
        case 402:
            return {
                message: message || detail || 'Your monthly quota has been reached.',
                type: 'quota',
                showUpgrade: true,
                upgradeUrl: upgradeUrl || '/pricing',
                retryAfter: null,
                planId
            };
        case 403:
            return {
                message: message || detail || 'This feature is not available on your current plan.',
                type: 'feature',
                showUpgrade: true,
                upgradeUrl: upgradeUrl || '/pricing',
                retryAfter: null,
                planId
            };
        case 429:
            return {
                message: retryAfter
                    ? `Rate limited. Retry in ${retryAfter} seconds.`
                    : (message || 'Too many requests. Please wait.'),
                type: 'rate_limit',
                showUpgrade: !!upgradeUrl,
                upgradeUrl,
                retryAfter,
                planId
            };
        case 503:
            return {
                message: 'Service temporarily unavailable. Please retry shortly.',
                type: 'unavailable',
                showUpgrade: false,
                upgradeUrl: null,
                retryAfter: null,
                planId: null
            };
        default:
            return {
                message: detail || message || 'An unexpected error occurred.',
                type: 'unknown',
                showUpgrade: false,
                upgradeUrl: null,
                retryAfter: null,
                planId: null
            };
    }
}
