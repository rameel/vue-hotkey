import { ObjectDirective } from "vue";
import { registerHotkey } from "@ramstack/hotkey";

const optionKeys = ["stop", "passive", "prevent", "once", "capture", "window", "document"];

export const vHotkey: ObjectDirective<HTMLElement, (e: KeyboardEvent) => void> = {
    mounted(el, { arg, modifiers, value }) {
        const {
            stop,
            prevent,
            passive,
            capture,
            once
        } = modifiers;

        const target = modifiers.window   ? window :
                       modifiers.document ? document : el;

        el[createKey(modifiers)] = Object.keys(modifiers)
            .filter(k => !optionKeys.includes(k))
            .map(hotkey => registerHotkey(
                target,
                hotkey,
                function(e) {
                    stop && e.stopPropagation();
                    prevent && e.preventDefault();
                    value.call(this, e);
                },
                arg ?? "keydown",
                {
                    capture,
                    passive,
                    once
                }));
    },

    unmounted(el, binding) {
        const key = createKey(binding.modifiers);
        const disposes = el[key] as (() => void)[];
        disposes?.forEach(r => r());
        el[key] = null;
    }
}

function createKey(modifiers: Record<string, boolean>): string {
    return `__hotkey[${ Object.keys(modifiers).join("+") }]`;
}
