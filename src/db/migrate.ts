import { migrate } from "drizzle-orm/postgres-js/migrator";
import db from "./connection";

const migrateDB = async () => {
  console.log("Migration started");
  await migrate(db, { migrationsFolder: "migrations" });
};
migrateDB();
