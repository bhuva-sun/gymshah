type RateRecord = { count: number; resetAt: number };

const windowMs = 60_000; // 1 min
const maxPerWindow = 60;
const store = new Map<string, RateRecord>();

export function rateLimit(key: string) {
	const now = Date.now();
	const current = store.get(key);
	if (!current || current.resetAt < now) {
		store.set(key, { count: 1, resetAt: now + windowMs });
		return { allowed: true, remaining: maxPerWindow - 1 };
	}
	if (current.count >= maxPerWindow) {
		return { allowed: false, remaining: 0 };
	}
	current.count += 1;
	store.set(key, current);
	return { allowed: true, remaining: maxPerWindow - current.count };
}


