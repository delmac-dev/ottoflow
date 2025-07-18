import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
* Combines and merges CSS class names with proper conflict resolution.
*
* @param inputs - Variable number of class values (strings, objects, arrays, etc.) to be combined.
* @returns A merged string of class names with Tailwind CSS conflicts resolved.
*/
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
* Constructs the base URL for the application based on the current environment.
*
* @returns The base URL string - uses HTTPS for production environment and HTTP for all other environments.
*/
export const baseUrl = () => {

  if(process.env.NEXT_PUBLIC_VERCEL_ENV === "production")
    return (`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`)
  else
    return (`http://${process.env.NEXT_PUBLIC_VERCEL_URL}`)

};

/**
* Adds timestamp fields to an object based on operation type.
*
* @param item - Object to add timestamps to.
* @param isUpdate - Whether this is an update operation. If true, only adds updatedAt. If false, adds both createdAt and updatedAt.
* @returns The modified object with timestamp fields added, cast to the specified generic type.
*/
export function addTimeStamp<T>(item: Record<string, any>, isUpdate = false): T {
 const createdAt = new Date().toISOString();
 const updatedAt = new Date().toISOString();

  return isUpdate ? 
    ({ ...item, updatedAt }) as T : 
    ({ ...item, createdAt, updatedAt }) as T;
}