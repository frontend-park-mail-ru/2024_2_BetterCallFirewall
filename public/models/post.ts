interface Header {
	authorId: number;
	author: string;
	avatar: string;
}

interface PostContent {
	text: string;
	file: string;
	created_at: string;
}

export interface PostResponse {
	id: number;
	header: Header;
	post_content: PostContent;
}
