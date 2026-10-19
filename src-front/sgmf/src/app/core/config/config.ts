export const API_CONFIG = {
  baseUrl: 'http://localhost:5037/api',
} as const;

import { httpErrorInterceptor } from '../interceptors/http-error-interceptor';
