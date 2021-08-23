import {Tedis} from 'tedis'
import * as cookie from 'cookie'
import { SESSION_COOKIE } from '../../config.js'

const db = new Tedis({host:"127.0.0.1", port: 6379})

const logPrefix = "::src/routes/auth/logout.js "

export async function get(request){
    console.log((new Date()).toISOString()+logPrefix+' get(request) '+JSON.stringify(request.locals, null, 2))    

    const headers = {
        'Set-Cookie' : cookie.serialize(SESSION_COOKIE, '', {
            httpOnly: true,
            maxAge: 0,
            path: '/',
            sameSite: 'lax'
        })
    }

    delete request.locals    

    return {
        status: 200,
        headers        
    }
}