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
export const _baseUrl = () => {

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
};

export const _degToRad = (angle: number) => (angle / 180) * Math.PI;

export const _getCorner = (pivotX: number, pivotY: number, diffX: number, diffY: number, angle: number) => {
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);
  angle += Math.atan2(diffY, diffX);
  const x = pivotX + distance * Math.cos(angle);
  const y = pivotY + distance * Math.sin(angle);
  return { x, y };
};

export const _getClientRect = (element: any) => {
  const { x, y, width, height, rotation = 0 } = element;
  const rad = _degToRad(rotation);

  const p1 = _getCorner(x, y, 0, 0, rad);
  const p2 = _getCorner(x, y, width, 0, rad);
  const p3 = _getCorner(x, y, width, height, rad);
  const p4 = _getCorner(x, y, 0, height, rad);

  const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
  const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
  const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
  const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};