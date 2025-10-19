export const browser: boolean = !(window as any).invokeNative;

export const app = $state({
    visible: browser as boolean
})