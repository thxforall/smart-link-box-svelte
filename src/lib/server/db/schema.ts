export type Link = {
	id: string;
	user_id: string;
	url: string;
	title: string | null;
	summary: string | null;
	category: string | null;
	created_at: string;
	updated_at: string;
};

export type User = {
	id: string;
	email: string;
	created_at: string;
};

export type Session = {
	id: string;
	user_id: string;
	expires_at: string;
};