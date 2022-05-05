<script lang="ts">
    import {getContext} from 'svelte'

    const person = getContext<Person>('person')
    const hobbys = person.$key('hobbys')
</script>


<p>Name: {person.name}</p>
<p>Age: {$person.age}</p>
<p>Hobbys: {$hobbys.join()}</p>