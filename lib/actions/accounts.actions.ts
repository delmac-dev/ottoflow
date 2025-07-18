import { IAccount } from "../types";
import { format, getDb } from "../utils.mongo";


/**
 * Retrieves an account from the database by their email address.
 *
 * @param email - The email address of the acount to retrieve.
 * @returns A promise that resolves to the account object formatted as an IAccount instance.
 */
export async function getAccountByEmail(email: string){
    await using db = await getDb();
    const account = await db.A.findOne({email});

    return format.from<IAccount>(account!)
}