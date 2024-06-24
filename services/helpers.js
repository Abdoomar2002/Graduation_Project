import axios from "axios";
import LocaleService from "../utils/localeService";
import StorageService from "../utils/storageService";

class HttpHelpers {
  constructor() {
    this.subscribers = [];
  }
  setBaseUrl(apiBaseUrl) {
    this.apiBaseUrl = "https://hatley.runasp.net/api/";
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
        }
        return Promise.reject(error);
      }
    );
  }
}
export default new HttpHelpers();
