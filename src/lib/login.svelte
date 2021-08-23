<script>
    import { createEventDispatcher } from 'svelte'
    import { goto, prefetch } from '$app/navigation'
    
    const dispatch = createEventDispatcher();

    let email
    let password
    let error

    const logPrefix = "::src/components/login.svelte "


    async function redirectToProfile(){
        console.log((new Date()).toISOString()+logPrefix+' Redirecting to profile')
        // await goto('/profile')
        window.location.assign('http://localhost:3000/profile')
        console.log((new Date()).toISOString()+logPrefix+' Done redirecting')
        // const response = await goto('/profile')
    }

    async function login(){
        console.log((new Date()).toISOString()+logPrefix+' login()')
        error = undefined  
        try{
            const res = await fetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    email, 
                    password                    
                }),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })

            if(res.ok){
                redirectToProfile()
            }else{
                error = 'An error occured'
            }
        }catch(err){
             console.log(err)
             error = 'An error occured'
        }  
    }

</script>
<h1>Login</h1>
<input type="email" placeholder="Enter your email" bind:value={email}>
<input type="password" bind:value={password}>
{#if error}
    <p>{error}</p>
{/if}

<button on:click={login}>Login</button>