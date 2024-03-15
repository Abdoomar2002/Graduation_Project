import axios from "axios";
import LocaleService from "../utils/localeService";
import StorageService from "../utils/storageService";

class HttpHelpers {
  constructor() {
    this.subscribers = [];
  }
  setBaseUrl(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl;
    this.authenticatedAxios = axios.create({ baseURL: this.apiBaseUrl });
    this.unAuthenticatedAxios = axios.create({ baseURL: this.apiBaseUrl });
    this.addAuthenticationInterceptor();
    this.addUnauthenticationInterceptor();
    this.addResponseInterceptor();
  }

  getLocale() {
    return LocaleService.get();
  }

  getToken() {
    return StorageService.get("Token");
  }

  addAuthenticationInterceptor() {
    this.authenticatedAxios.interceptors.request.use(
      async (config) => {
        const locale = await this.getLocale();
        config.headers["Accept-Language"] = locale;
        const accessToken = await this.getToken();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  addUnauthenticationInterceptor() {
    this.unAuthenticatedAxios.interceptors.request.use(
      async (config) => {
        const locale = await this.getLocale();
        config.headers["Accept-Language"] = locale;
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  addResponseInterceptor() {
    this.authenticatedAxios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          StorageService.set("Token", null);
          StorageService.set("UserId", null);
          StorageService.set("auth", false);
          window.location.href = "/login"; // Navigate to the login page using window.location
        }
        return Promise.reject(error);
      }
    );
  }
}
export default new HttpHelpers();
