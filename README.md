# Valtio Svelte

Combines the power of valtio and svelte stores.

# Usage

```bash
npm install -D valtio-svelte
```

Create a proxy store
```js
import {proxy} from 'valtio-svelte'

const person = proxy({
    name: 'elias',
    age: 20,
    hobbys: ['svelte', 'valtio']
})
```

Now you can just use the $ syntax from svelte to listen to changes
```svelte
<button on:click={() => person.age++}>Increment Age</button>
<p>Name: {person.name}</p>
<p>Age: {$person.age}</p>
```

You can also create readable stores for single keys
```js
const hobbys = person.$key('hobbys')
```

Now, if you have
```svelte
<script>
    import {proxy} from 'valtio-svelte'
    const person = proxy({
        name: 'elias',
        age: 20,
        hobbys: ['svelte', 'valtio']
    })

    let value = ''
    const handleKey = (event) => {
        if (event.key !== 'Enter')
            return
        person.hobbys.push(value)
        value = ''
    }

    const name = person.$key('name')
    const age = person.$key('age')
    const hobbys = person.$key('hobbys')
</script>

<input bind:value on:keydown={handleKey}>
<p>Name: {$name}</p>
<p>Age: {$age}</p>
<p>Hobbys: {$hobbys.join(', ')}</p>
```
and you add a hobby only the last paragraph is redrawn