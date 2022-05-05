<script lang="ts">
    import {setContext} from 'svelte'
    import {proxy} from 'valtio-svelte'
    import Child from '$lib/demo/Child.svelte'

    const person: Person = proxy({
        name: 'Elias Gerster',
        age: 20,
        hobbys: []
    })

    let hobby = ''
    const addHobby = () => {
        person.hobbys.push(hobby)
        hobby = ''
    }

    setContext('person', person)
</script>

<button on:click={() => person.age++}>Increment Age</button>
<input type="text" bind:value={hobby}>
<button on:click={addHobby}>Add</button>
<Child/>