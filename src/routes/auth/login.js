import stringHash from 'string-hash'
import * as cookie from 'cookie'
import {v4 as uuidv4} from 'uuid'
import {Tedis} from 'tedis'
import {SESSION_COOKIE} from '../../config.js'

const db = new Tedis({host:"127.0.0.1", port: 6379})

const logPrefix = "::src/routes/auth/login.js "    

export async function post({body}){
    
    const user = JSON.parse(await db.get(body.email))
    
    console.log((new Date()).toISOString()+logPrefix+' post(body) '+JSON.stringify(user))
    
    if(!user) {
        return {
            status: 401,
            body : {
                message: "Incorrect email or password"
            }
        }
    }

    if(user.password !== stringHash(body.password)){
        return {
            status: 401,
            body: {
                message: "Unauthorized"
            }
        }
    }    

    const cookieId = uuidv4()

    await db.set(cookieId, JSON.stringify({
        email: body.email
    }))

    console.log((new Date()).toISOString()+logPrefix+' authentication successful session_id:'+cookieId)

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