import stringHash from 'string-hash'
import * as cookie from 'cookie'
import {v4 as uuidv4} from 'uuid'
import {Tedis} from 'tedis'
import {SESSION_COOKIE} from '../../config.js'

const db = new Tedis({host:"127.0.0.1", port: 6379})
const logPrefix = "::src/routes/auth/register.js "

export async function post({body}){
    
    console.log((new Date()).toISOString()+logPrefix+' post() '+JSON.stringify(body))
    const user = JSON.parse(await db.get(body.email))
    
    if(user) {
        return {
            status: 409,
            body : {
                message: "User already exists"
            }
        }
    }

    await db.set(body.email, JSON.stringify({
        email: body.email,
        name: body.name,
        password: stringHash(body.password)
    }))

    const cookieId = uuidv4()

    await db.set(cookieId, JSON.stringify({
        email: body.email
    }))

    const headers = {
        'Set-Cookie' : cookie.serialize(SESSION_COOKIE, cookieId, {
            httpOnly: true,
            maxAge: 60*60,
            path: '/',
            sameSite: 'lax'
        })
    }

    return {
        status: 200,
        headers,
        body: {
            message: "Success"
        }
    }
}