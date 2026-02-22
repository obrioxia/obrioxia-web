import { mapErrorResponse } from './error-mapper';

describe('mapErrorResponse', () => {
    it('should map 429 rate limit with countdown', () => {
        const result = mapErrorResponse(429, {
            code: 'RATE_LIMITED',
            detail: 'Rate limit exceeded',
            retry_after: 42,
            upgrade_url: '/pricing'
        });

        expect(result.type).toBe('rate_limit');
        expect(result.retryAfter).toBe(42);
        expect(result.message).toContain('42');
        expect(result.showUpgrade).toBe(true);
        expect(result.upgradeUrl).toBe('/pricing');
    });

    it('should map 402 quota exceeded with upgrade CTA', () => {
        const result = mapErrorResponse(402, {
            code: 'QUOTA_EXCEEDED',
            detail: 'Monthly limit reached (50)',
            message: 'Your monthly quota has been reached.',
            plan_id: 'free',
            upgrade_url: '/pricing'
        });

        expect(result.type).toBe('quota');
        expect(result.showUpgrade).toBe(true);
        expect(result.upgradeUrl).toBe('/pricing');
        expect(result.planId).toBe('free');
        expect(result.message).toContain('quota');
    });

    it('should map 403 feature disabled', () => {
        const result = mapErrorResponse(403, {
            code: 'FEATURE_DISABLED',
            detail: 'analytics not available on growth_1',
            plan_id: 'growth_1',
            upgrade_url: '/pricing'
        });

        expect(result.type).toBe('feature');
        expect(result.showUpgrade).toBe(true);
        expect(result.planId).toBe('growth_1');
    });

    it('should map 503 service unavailable', () => {
        const result = mapErrorResponse(503, {
            code: 'SERVICE_UNAVAILABLE',
            detail: 'Try again shortly'
        });

        expect(result.type).toBe('unavailable');
        expect(result.showUpgrade).toBe(false);
        expect(result.retryAfter).toBeNull();
        expect(result.message).toContain('unavailable');
    });

    it('should handle unknown error codes', () => {
        const result = mapErrorResponse(500, { detail: 'Internal error' });

        expect(result.type).toBe('unknown');
        expect(result.showUpgrade).toBe(false);
    });

    it('should handle object-valued detail for 402 without showing [object Object]', () => {
        // detail is not a string, it's an object as returned from the Python endpoints sometimes
        const result = mapErrorResponse(402, {
            detail: { code: 'QUOTA_EXCEEDED', message: 'Monthly limit reached' }
        });

        expect(result.type).toBe('quota');
        expect(result.message).toBe('Monthly limit reached');
        expect(result.message).not.toContain('[object Object]');
    });
});
