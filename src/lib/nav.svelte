<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher();    
    
    function loginClicked(){
        dispatch('login')
    }

    function registerClicked(){
        console.log('Register Clicked')
        dispatch('register')
    }
</script>
<nav><button on:click={loginClicked}>Login</button> | <button on:click={registerClicked}>Register</button></nav>