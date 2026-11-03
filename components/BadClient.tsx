"use client"; // TEMPORARY: deliberately imports a server-only module to trigger the build error.
import { getCatalogSecret } from "@/lib/secret";

export const Bad = () => <p>{getCatalogSecret()}</p>;
