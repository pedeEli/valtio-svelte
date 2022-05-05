/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

declare type Person = import('valtio-svelte').Proxify<{
	name: string,
	age: number,
	hobbys: string[]
}>