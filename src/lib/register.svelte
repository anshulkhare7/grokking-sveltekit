<script>
    import { createEventDispatcher } from 'svelte'
    import { set_current_component } from 'svelte/internal';
    
    const dispatch = createEventDispatcher();

    let email
    let password
    let name
    let error

    const logPrefix = "::src/components/register.svelte "

    
    function redirectToProfile(){
        console.log((new Date()).toISOString()+logPrefix+' Redirecting to profile')
        // goto('/profile')        
        window.location.assign('http://localhost:3000/profile')
    }
    
    async function register(){
        error = undefined
        console.log((new Date()).toISOString()+logPrefix+' register()')                                                                         
        try{
            const res = await fetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    email, 
                    password,
                    name
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
<h1>Register</h1>
<input type="name" placeholder="Enter your name" bind:value={name}>
<input type="email" placeholder="Enter your email" bind:value={email}>
<input type="password" bind:value={password}>

{#if error}
    <p>{error}</p>
{/if}

<button on:click={register}>Register</button>