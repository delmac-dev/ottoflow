import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * COMBINES AND MERGES CSS CLASS NAMES WITH PROPER CONFLICT RESOLUTION.
 *
 * @param inputs - Variable number of class values (strings, objects, arrays, etc.) to be combined.
 * @returns A merged string of class names with Tailwind CSS conflicts resolved.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * GENERATES THE BASE URL FOR THE APPLICATION BASED ON THE DEPLOYMENT ENVIRONMENT.
 * 
 * @returns The complete base URL string with appropriate protocol (HTTPS for production, HTTP otherwise).
 */
export const _baseUrl = () => {

  if(process.env.NEXT_PUBLIC_VERCEL_ENV === "production")
    return (`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`)
  else
    return (`http://${process.env.NEXT_PUBLIC_VERCEL_URL}`)

};