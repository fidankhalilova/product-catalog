// Server-only secret reader: importing this from a Client Component fails the build.
import "server-only";

export const getCatalogSecret = () => process.env.CATALOG_API_SECRET;
