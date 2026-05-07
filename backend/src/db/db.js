import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const adapter = new JSONFile("src/db/db.json");

const db = new Low(adapter, {
  notes: [],
});

await db.read();

export default db;