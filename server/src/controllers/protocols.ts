export interface HttpResponse<T> {
	statusCode: number;
	body: T | string;
}

export interface HttpRequest<B> {
	params?: unknown;
	headers?: {
		token: string;
	};
	body?: B;
}
