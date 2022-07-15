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
    if (!table.has(id)) {
      table.set(id, record);
      return Object.assign({ id }, record);
    }
    return null;
  }

  async getAll(tableName: string) {
    return Array.from(this.data.get(tableName).entries(), ([key, value]) =>
      Object.assign({ key }, value),
    ) as unknown[];
  }

  async getRecord(tableName: string, id: string) {
    const table = this.data.get(tableName);
    if (table.has(id)) return Object.assign({ id }, table.get(id));
    return null;
  }

  async updateRecord(tableName: string, id: string, record: unknown) {
    const table = this.data.get(tableName);
    if (table.has(id))
      return Object.assign(
        { id },
        table.set(id, Object.assign(table.get(id), record)).get(id),
      );
    return null;
  }

  async removeRecord(tableName: string, id: string) {
    const table = this.data.get(tableName);
    if (table.has(id)) return table.delete(id);
    return null;
  }
}

export const dataBase = new DB();
