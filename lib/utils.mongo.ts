import { Document, MongoClient, ObjectId, WithId } from "mongodb";
import client from "./db";


// @ts-expect-error read only property is not assignable
Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose")

/** @internal */
export function _id(hex?: string) {
    if (hex?.length !== 24) return new ObjectId()
    return new ObjectId(hex)
}

export const getDb = async (onClose?: (client: MongoClient) => Promise<void>) => {
    const _db = client.db("portfolio");

    return {
        A: _db.collection("accounts"),
        P: _db.collection("projects"),
        B: _db.collection("boards"),
        [Symbol.asyncDispose]: async () => {
            await onClose?.(client)
        },
    }
}

export const format = {
    /** Converts MongoDB object to a plain JavaScript object */
    from<T = Record<string, unknown>>(object: Record<string, any>): T {
        const parseValue = (value: any): any => {
            if (value instanceof ObjectId) {
                return value.toHexString();
            } else if (Array.isArray(value)) {
                return value.map(parseValue);
            } else if (typeof value === "object" && value !== null) {
                return parseObject(value);
            }
            return value;
        };

        const parseObject = (obj: Record<string, any>): Record<string, any> => {
            const newObject: Record<string, any> = {};
            for (const key in obj) {
                key === "_id" ?
                    newObject.id = parseValue(obj[key]) :
                    newObject[key] = parseValue(obj[key])
            }
            return newObject;
        };

        return parseObject(object) as T;
    },

    /** Converts a plain JavaScript object to a MongoDB object */
    to<T = WithId<Document>>(object: Record<string, any>):T {
        const parseValue = (value: any): any => {
            if (typeof value === "string" && ObjectId.isValid(value)) {
                return _id(value);
            } else if (Array.isArray(value)) {
                return value.map(parseValue);
            } else if (typeof value === "object" && value !== null) {
                return parseObject(value);
            }
            return value;
        };

        const parseObject = (obj: Record<string, any>): Record<string, any> => {
            const newObject: Record<string, any> = {};
            for (const key in obj) {
                key === "id" ?
                    newObject._id = parseValue(obj[key]) :
                    newObject[key] = parseValue(obj[key])
            }
            return newObject;
        };

        return parseObject(object) as T;
    },
};