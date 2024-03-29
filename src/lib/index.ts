import type {Readable, Subscriber, Unsubscriber} from 'svelte/store'
import {proxy as valtioProxy, snapshot, subscribe} from 'valtio/vanilla'
import {subscribeKey} from 'valtio/utils'


export type Proxify<T extends object> = {
    [K in keyof T]: T[K] extends object ? Proxify<T[K]> : T[K]
} & {
    subscribe: (run: Subscriber<T>) => Unsubscriber,
    $key: <K extends keyof T = keyof T>(key: K) => Readable<T[K]>
}

export const proxy = <T extends object>(obj: T): Proxify<T> => {
    const p = valtioProxy(obj)
    addStoreMethods(p as any, obj)
    return p as any
}

const addStoreMethods = <T extends object>(obj: Proxify<T>, original: T) => {
    if (obj.subscribe !== undefined)
        console.warn('subscribe property of object is being overwritten\n', original)
    obj.subscribe = (run: Subscriber<T>) => {
        run(snapshot(obj) as T)
        return subscribe(obj, () => run(snapshot(obj) as T))
    }
    if (obj.$key !== undefined)
        console.warn('$key property of object is being overwritten\n', original)
    obj.$key = (key) => ({
        subscribe: (run: Subscriber<T[typeof key]>) => {
            run((snapshot(obj) as T)[key])
            return subscribeKey(obj, key, () => {
                run((snapshot(obj) as T)[key])
            })
        }
    })
    Object.keys(obj).forEach(key => {
        const value = obj[key as keyof T]
        if (typeof value !== 'object')
            return
        addStoreMethods(value as any, original)
    })
}

export const keys = <T extends object>(obj: Proxify<T>) => {
    return Object.keys(obj).filter(key => key !== 'subscribe' && key !== '$key') as Array<keyof T>
}

export const values = <T extends object>(obj: Proxify<T>) => {
    const ks = keys(obj)
    return ks.map(k => obj[k]) as Array<T[keyof T]>
}