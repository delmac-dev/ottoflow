import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseUrl = () => {

  if(process.env.NEXT_PUBLIC_VERCEL_ENV === "production")
    return (`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`)
  else
    return (`http://${process.env.NEXT_PUBLIC_VERCEL_URL}`)

};

export function addTimeStamp<T>(list: Record<string, any>[], isUpdate = false):T[] {
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  return list.map(item => isUpdate ? 
      ({ ...item, updatedAt}) : 
      ({ ...item, createdAt, updatedAt})
  ) as T[];
}

