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

    // return format.from<IAccount>(account!);

    return {
        id: "1",
        email: "contact@delalitengue.com",
        username: "delmac",
        avatar: "avatar-1",
        password: "c2f10579c54cb0ac1ea0eb4e006956fdc1392e5738942ca507a96f167f1d597b8f95fd581f72859add1876a8228fab2747e200baaa7a8965bfd704ea0f6e209f"
    }
}