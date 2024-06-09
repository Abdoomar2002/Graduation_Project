/* eslint-disable import/no-anonymous-default-export */
class StorageService {
  setStorageProvider(provider) {
    this.provider = provider;
  }

  get(key) {
    return this.provider.get(key);
  }

  set(key, value) {
    return this.provider.set(key, value);
  }
<<<<<<< HEAD
  remove(key, value) {
    return this.provider.remove(key, value);
  }
=======
>>>>>>> fdb828f2cdb078504b2778ba662b959b03b01081
}

export default new StorageService();
