export const COUPON_CODE = {
	EID2025: 'EID2025',
	QURBANISPECIAL: 'QURBANISPECIAL',
} as const;

export type CouponCode = keyof typeof COUPON_CODE;
