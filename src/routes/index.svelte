<script lang="ts">
    import {setContext} from 'svelte'
    import {keys, proxy, values} from 'valtio-svelte'
    import Child from '$lib/demo/Child.svelte'

    const person: Person = proxy({
        name: 'Elias Gerster',
        age: 20,
        hobbys: [],
        subscribe: 'test'
    })

    const vs = values(person)
    const ks = keys(person)
    console.log({vs, ks})

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