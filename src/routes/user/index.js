import { Tedis } from 'tedis'

const db = new Tedis ({host: '127.0.0.1', port: 6379})
const logPrefix = "::src/routes/user/index.js "

export async function get(request){    
    console.log((new Date()).toISOString()+logPrefix+' get(request) '+JSON.stringify(request.locals, null, 2))

    if(!request.locals.authenticated) {
        return {
            status: 401,
            body: {
                message: 'UnAuthenticated'
            }
        }
    }

    const user = JSON.parse(await db.get(request.locals.email))
    
    console.log((new Date()).toISOString()+logPrefix+' user>>'+JSON.stringify(user))
    
    if(!user){
        return {
            status: 404,
            body: {
                message: 'User not found'
            }
        }
    }

    delete user.password

    return {
        status: 200, 
        body: user
    }
}