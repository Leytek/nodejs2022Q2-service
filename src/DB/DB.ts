class DB {
  private data: Map<string, Map<string, unknown>>;

  constructor() {
    this.data = new Map();
  }

  async createTable(name: string) {
    this.data.set(name, new Map());
  }

  async createRecord(tableName: string, id: string, record: unknown) {
    const table = this.data.get(tableName);
    if (table.has(id)) {
      table.set(id, record);
      return record;
    }
    return null;
  }

  async getAll(tableName: string) {
    return Array.from(this.data.get(tableName).values());
  }

  async getRecord(tableName: string, id: string) {
    const table = this.data.get(tableName);
    if (table.has(id)) return table.get(id);
    return null;
  }

  async updateRecord(tableName: string, id: string, record: unknown) {
    const table = this.data.get(tableName);
    if (table.has(id)) {
      table.set(id, record);
      return record;
    }
    return null;
  }

  async removeRecord(tableName: string, id: string) {
    const table = this.data.get(tableName);
    if (table.has(id)) return table.delete(id);
    return null;
  }
}

export const dataBase = new DB();
