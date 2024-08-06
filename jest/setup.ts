class LocalStorageMock implements Storage {
    private store: { [key: string]: string } = {};
  
    clear() {
      this.store = {};
    }
  
    getItem(key: string) {
      return this.store[key] || null;
    }
  
    setItem(key: string, value: string) {
      this.store[key] = value;
    }
  
    removeItem(key: string) {
      delete this.store[key];
    }
  
    key(index: number): string | null {
      const keys = Object.keys(this.store);
      return keys[index] || null;
    }
  
    get length(): number {
      return Object.keys(this.store).length;
    }
}
  
(global as any).localStorage = new LocalStorageMock();