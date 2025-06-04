import type { RequestEvent } from '@sveltejs/kit';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { supabaseAdmin } from '$lib/server/db';
import type { Session } from '$lib/server/db/schema';
import type { PostgrestError } from '@supabase/supabase-js';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

type SessionWithUser = {
	id: string;
	user_id: string;
	expires_at: string;
	created_at: string;
	users: {
		id: string;
		email: string;
	};
};

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);
	return token;
}

export async function createSession(token: string, userId: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		user_id: userId,
		expires_at: new Date(Date.now() + DAY_IN_MS * 30).toISOString(),
		created_at: new Date().toISOString()
	};
	
	const { error } = await supabaseAdmin
		.from('sessions')
		.insert(session);
	
	if (error) throw error;
	return session;
}

export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	
	const { data, error } = await supabaseAdmin
		.from('sessions')
		.select(`
			id,
			user_id,
			expires_at,
			created_at,
			users!inner (
				id,
				email
			)
		`)
		.eq('id', sessionId)
		.single() as { data: SessionWithUser | null; error: PostgrestError | null };

	if (error || !data) {
		return { session: null, user: null };
	}

	const session = {
		id: data.id,
		user_id: data.user_id,
		expires_at: new Date(data.expires_at),
		created_at: new Date(data.created_at)
	};

	const user = {
		id: data.users.id,
		email: data.users.email
	};

	const sessionExpired = Date.now() >= session.expires_at.getTime();
	if (sessionExpired) {
		await supabaseAdmin
			.from('sessions')
			.delete()
			.eq('id', session.id);
		return { session: null, user: null };
	}

	const renewSession = Date.now() >= session.expires_at.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		const newExpiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		const { error: updateError } = await supabaseAdmin
			.from('sessions')
			.update({ expires_at: newExpiresAt.toISOString() })
			.eq('id', session.id);
		
		if (updateError) throw updateError;
		session.expires_at = newExpiresAt;
	}

	return { session, user };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(sessionId: string) {
	const { error } = await supabaseAdmin
		.from('sessions')
		.delete()
		.eq('id', sessionId);
	
	if (error) throw error;
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(sessionCookieName, token, {
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, {
		path: '/'
	});
}
