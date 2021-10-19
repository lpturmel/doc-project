export interface Post {
	data: Metadata;
	content: string;
	slug: string;
}

export interface Metadata {
	title: string;
	languages: string[];
	created: string;
	author: string;
}
