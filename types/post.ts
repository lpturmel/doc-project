export interface Post {
    data: Metadata;
    content: string;
    slug: string;
}

export interface Metadata {
    title: string;
    description: string;
    class: string;
    created: string;
    author: string;
}
