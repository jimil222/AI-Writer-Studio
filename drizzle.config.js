/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schemas.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_WlnOSu86sepN@ep-still-violet-a8evnfzn-pooler.eastus2.azure.neon.tech/Content-gen-db?sslmode=require',
    }
  }