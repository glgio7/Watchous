export interface HttpResponse<T> {
	statusCode: number;
	body: T | string;
}

export interface HttpRequest<B> {
	headers?: {};
	body?: B;
}
