/* eslint-disable import/no-anonymous-default-export */

class LocaleService {
  setLocaleResolver(resolver) {
    this.resolver = resolver;
  }

  get() {
    return this.resolver.get();
  }
}

export default new LocaleService();
