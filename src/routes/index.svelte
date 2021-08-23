<script>
    import Login from '$lib/login.svelte'
    import Register from '$lib/register.svelte'
    import Nav from '$lib/nav.svelte'
    import { goto } from '$app/navigation'

    const logPrefix = "::src/routes/index.svelte"
    console.log((new Date()).toISOString()+logPrefix)

    let login  = true  
    let error = undefined

    function showLogin(){
        login = true
    }

    function showRegister(){
        login = false
    }    
</script>
<svelte:head>
    <title>PAF - Home</title>
</svelte:head>
<main>
    <h1>Internal App for CRM</h1>    
    
    <Nav on:login={showLogin} on:register={showRegister}/>

    {#if login}
        <Login/>
    {:else}
        <Register/>
    {/if}
</main>