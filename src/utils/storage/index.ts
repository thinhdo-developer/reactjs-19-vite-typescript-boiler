import { STORAGE_KEYS } from "@configs/keys";

class BaseLocalStorage<T> {
  key: string;

  constructor(_key: string) {
    this.key = _key;
  }

  get(): T | null {
    const value = localStorage.getItem(this.key);
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  }
  remove(): void {
    localStorage.removeItem(this.key);
  }

  set(values: T): void {
    localStorage.setItem(this.key, JSON.stringify(values));
  }
}

const storageHelpers = {
  token: new BaseLocalStorage<string>(STORAGE_KEYS.TOKEN),
  refreshToken: new BaseLocalStorage<string>(STORAGE_KEYS.REFRESH_TOKEN),
  removeAll: () => {
    localStorage.clear();
  },
};

export default storageHelpers;
