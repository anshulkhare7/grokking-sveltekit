<script>
    import Login from '../components/login.svelte'
    import Register from '../components/register.svelte'
    import Nav from '../components/nav.svelte'
    import { goto } from '$app/navigation'

    const logPrefix = "::src/routes/index.svelte"
    console.log((new Date()).toISOString()+logPrefix)

    let login  = true  
    let error = undefined

    function redirectToProfile(){
        console.log((new Date()).toISOString()+logPrefix+' Redirecting to profile')
        goto('/profile')
    }

    function showLogin(){
        login = true
    }

    function showRegister(){
        login = false
    }    
</script>
<svelte:head>
    <title>PAF</title>
</svelte:head>
<main>
    <h1>Internal App for CRM</h1>    
    
    <Nav on:login={showLogin} on:register={showRegister}/>

    {#if login}
        <Login on:success={redirectToProfile}></Login>
    {:else}
        <Register on:success={redirectToProfile}></Register>
    {/if}
</main>