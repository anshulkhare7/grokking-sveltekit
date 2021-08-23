import * as cookie from 'cookie'
import { Tedis } from 'tedis'
import { SESSION_COOKIE } from './config.js'

const db = new Tedis({host: "127.0.0.1", port: 6379});
const logPrefix = "::src/hooks.js"

export async function handle({request, resolve}){ 

    const cookies = cookie.parse(request.headers.cookie || '');
    console.log((new Date()).toISOString()+logPrefix+' handle() path:'+JSON.stringify(request.path, null, 2)+' cookies:'+JSON.stringify(cookies))    

    const sessionId = cookies[SESSION_COOKIE];
    request.locals.authenticated = false

    if(sessionId){
        const userSession = JSON.parse(await db.get(sessionId))
        if(userSession){
            request.locals.authenticated = true
            request.locals.email = userSession.email        
        } 
    }

    const response = await resolve(request);

    return {
		...response,
		headers: {
			...response.headers
		}
	};
}

export function getSession(request){
    
    console.log((new Date()).toISOString()+logPrefix+' getSession() '+JSON.stringify(request.path, null, 2))

    return request ? {
            authenticated: request.locals.authenticated,
            email: request.locals.email        
	} : {};
}

export async function _getContext({headers}){
    const cookies = cookie.parse(headers.cookie || '')

    if(!cookie.session_id){
        return {
            authenticated: false
        }
    }

    const userSession = JSON.parse(await db.get(cookie.seesion_id))

    if(userSession){
        return {
            authenticated: true,
            email: userSession.email
        }
    } else {
        return {
            authenticated: false
        }
    }
}