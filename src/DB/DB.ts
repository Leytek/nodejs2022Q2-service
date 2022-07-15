export default class DB {
  private data: Map<string, Map<string, unknown>>;

  constructor() {
    this.data = new Map();
  }

  createTable(name: string): void {
    this.data.set(name, new Map());
  }

  createRecord(table: string, id: string, record: unknown): void {
    this.data.get(table).set(id, record);
  }

  getRecord(table: string, id: string): unknown {
    return this.data.get(table).get(id);
  }

  updateRecord(table: string, id: string, record: unknown): void {
    this.data.get(table).set(id, record);
  }

  removeRecord(table: string, id: string): void {
    this.data.get(table).delete(id);
  }
}
