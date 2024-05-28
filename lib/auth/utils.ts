import crypto from 'crypto';
import {registerSchema} from "@/lib/auth/schemaValidation";
import {API_BASE} from "@/consts/global";

//TODO MAKNUT OD TU
const AUTH_SECRET_TEMP: string = "i+Kl6LCKhz++ns4x61gbZCefZSw+aopncR6Rcfc4lfE="

export function hashPassword(password: string){
    const hash = crypto.createHmac('sha256', AUTH_SECRET_TEMP/*process.env.AUTH_SECRET as string*/)
        .update(password)
        .digest('hex');
    return hash;
}

export async function registerNewUser(usernameParam:string,passwordParam:string,confirmPasswordParam:string){
    try {
        const { username, password, confirmPassword } = await registerSchema.parseAsync({username: usernameParam, password: passwordParam, confirmPassword: confirmPasswordParam})

        if(password !== confirmPassword){
            return "Passwords Do Not Match!"
        }
        const a = JSON.stringify({
            username: username,
            password: hashPassword(password),
        })


        const retString: any | undefined= await fetch(API_BASE + "/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    username: username,
                    password: hashPassword(password),
                }
            )
        }).then(async (data) => {
            console.log(data)
            return undefined
        }).catch(error => console.log("error" + error + API_BASE))


        return retString
    }
    catch (error){
        return "Schema Validation Error!"
    }

}