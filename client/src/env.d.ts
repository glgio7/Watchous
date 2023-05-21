interface ImportMetaEnv {
	readonly VITE_APP_FORMKEY: string;
	readonly VITE_APP_API_KEY: string;
	readonly VITE_APP_API_URL: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
