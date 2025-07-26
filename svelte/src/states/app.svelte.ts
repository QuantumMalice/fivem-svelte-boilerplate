export const browser: boolean = !(window as any).invokeNative;

let visible = $state(browser);

export const isVisible = () => {
    return visible;
}

export function setVisible(state?: boolean) {
    visible = state || false;
}