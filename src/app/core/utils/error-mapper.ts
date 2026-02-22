/**
 * Maps structured API error responses to user-friendly display objects.
 * Pure function — no Angular dependency, testable with plain Jest/Jasmine.
 */
export interface ErrorDisplay {
    message: string;
    type: 'quota' | 'feature' | 'rate_limit' | 'unavailable' | 'unknown' | 'auth';
    showUpgrade: boolean;
    upgradeUrl: string | null;
    retryAfter: number | null;
    planId: string | null;
    status?: number;
    code?: string | null;
    title?: string;
    ctaText?: string | null;
    ctaUrl?: string | null;
}

/**
 * Safely extract a string from a potentially nested error detail object.
 */
function safeDetail(val: any): string {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val.message || val.detail || val.code || JSON.stringify(val);
}

export function mapErrorResponse(status: number, body: any): ErrorDisplay {
    // Try structured error body first
    const code = body?.code || body?.detail?.code;
    const message = body?.message || body?.detail?.message;
    const detailObj = body?.detail;
    // Extract a safe string for general fallback usage.
    const safeExtraction = safeDetail(detailObj) || message;

    // We already have code and message natively. The remaining variables
    const upgradeUrl = body?.upgrade_url || body?.detail?.upgrade_url || null;
    const retryAfter = body?.retry_after || body?.detail?.retry_after || null;
    const planId = body?.plan_id || body?.detail?.plan_id || null;

    switch (status) {
        case 401:
            return {
                message: safeExtraction || 'Please log in to perform this action.',
                type: 'auth',
                showUpgrade: false,
                upgradeUrl: null,
                retryAfter: null,
                planId: null,
                status,
                code: code || 'AUTH_REQUIRED',
                title: 'Authentication Required',
                ctaText: 'LOGIN',
                ctaUrl: '/login'
            };
        case 402:
            return {
                message: safeExtraction || 'Your monthly quota has been reached.',
                type: 'quota',
                showUpgrade: true,
                upgradeUrl: upgradeUrl || '/pricing',
                retryAfter: null,
                planId,
                status,
                code: code || 'QUOTA_EXCEEDED',
                title: 'Logging failed',
                ctaText: 'UPGRADE NOW',
                ctaUrl: upgradeUrl || '/pricing'
            };
        case 403:
            return {
                message: safeExtraction || 'This feature is not available on your current plan.',
                type: 'feature',
                showUpgrade: true,
                upgradeUrl: upgradeUrl || '/pricing',
                retryAfter: null,
                planId,
                status,
                code: code || 'FEATURE_DISABLED',
                title: 'Logging failed',
                ctaText: 'UPGRADE NOW',
                ctaUrl: upgradeUrl || '/pricing'
            };
        case 429:
            return {
                message: `Too many requests — try again in ${retryAfter || 60} seconds.`,
                type: 'rate_limit',
                showUpgrade: !!upgradeUrl,
                upgradeUrl,
                retryAfter,
                planId,
                status,
                code: code || 'RATE_LIMITED',
                title: 'Logging failed',
                ctaText: null,
                ctaUrl: null
            };
        case 503:
            return {
                message: 'Service temporarily unavailable. Please retry shortly.',
                type: 'unavailable',
                showUpgrade: false,
                upgradeUrl: null,
                retryAfter: null,
                planId: null,
                status,
                code: code || 'SERVICE_UNAVAILABLE',
                title: 'Logging failed',
                ctaText: null,
                ctaUrl: null
            };
        default:
            return {
                message: safeExtraction || 'An unexpected error occurred.',
                type: 'unknown',
                showUpgrade: false,
                upgradeUrl: null,
                retryAfter: null,
                planId: null,
                status,
                code: code || 'UNKNOWN_ERROR',
                title: 'Logging failed',
                ctaText: null,
                ctaUrl: null
            };
    }
}
