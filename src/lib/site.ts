export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const publicPath = (path: string) => `${basePath}${path}`;
