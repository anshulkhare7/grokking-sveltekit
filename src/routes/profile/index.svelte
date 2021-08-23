<script context="module">

    const logPrefix = "::src/routes/profile/index.svelte "

    export async function load({session}){
        console.log((new Date()).toISOString()+logPrefix+' load() '+JSON.stringify(session))

        if(!session.authenticated){
            console.log((new Date()).toISOString()+logPrefix+' Not authenticated')
            return {
                status: 302,
                redirect: '/auth/unauthorized/'
            }
        }

        return {
            props: {
                email: session.email
            }
        }
    }
</script>
<script>
    import { onMount } from 'svelte'
    let name    
    export let email
    let error

    onMount(async () => {
        const res = await fetch('/user/')
        const user = await res.json()
        name = user.name        
        console.log((new Date()).toISOString()+logPrefix+' onMount() user>> '+JSON.stringify(user))                
    })

    async function doLogout(){
        console.log((new Date()).toISOString()+logPrefix+' doLogout()')        
        try{
            const res = await fetch('/auth/logout')
            console.log((new Date()).toISOString()+logPrefix+' fetch sent')

            if(res.ok){
                console.log((new Date()).toISOString()+logPrefix+' res.ok')
            }else{
                error = 'An error occured'
            }
        }catch(err){
             console.log(err)
             error = 'An error occured'
        } 
    }
</script>
<h1>Profile</h1>
<p> Hi {name}, You're logged in with email {email}</p>
<button on:click={doLogout}>Logout</button>