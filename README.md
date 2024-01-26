# Vue-Hotkey

`@ramstack/vue-hotkey` is a lightweight package that simplifies the handling of keyboard shortcuts within Vue applications.

## Installation

### Via NPM
```sh
npm install --save @ramstack/vue-hotkey
```

## Quick start

Specify the hotkey using directive modifiers.
```vue
<script setup>
  import { vHotkey } from "@ramstack/vue-hotkey";
</script>

<template>
  <div v-hotkey.ctrl+k="() => { console.log('Search...') }"></div>
</template>
```
The hotkey is case-insensitive. Standard key names are used.
You can find them here [Key values for keyboard events](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values)

In addition, there are also aliases for some key names:

```js
const aliases: Record<string, string> = {
    "esc"         : "escape",
    "ins"         : "insert",
    "del"         : "delete",
    "up"          : "arrowup",
    "down"        : "arrowdown",
    "right"       : "arrowright",
    "left"        : "arrowleft",
    "pgup"        : "pageup",
    "pgdn"        : "pagedown",
    "break"       : "pause",
    "scroll"      : "scrolllock",
    "scrlk"       : "scrolllock",
    "prtscr"      : "printscreen",
    "win"         : "meta",
    "windows"     : "meta",
    "cmd"         : "meta",
    "command"     : "meta",
    "comma"       : ",",
    "period"      : ".",
    "quote"       : "\"",
    "singlequote" : "'",
    "colon"       : ":",
    "semicolon"   : ";",
    "plus"        : "+",
    "minus"       : "-",
    "tilde"       : "~",
    "equal"       : "=",
    "slash"       : "/"
};
```

### Event modifiers
To simplify the need to call `event.preventDefault()` or `event.stopPropagation()` inside event handlers,
the `vHotkey` directive provides appropriate event modifiers.
* `.stop`
* `.prevent`
* `.passive`
* `.capture`
* `.once`

```vue
<!-- prevent the default behavior for the keyboard event -->
<div v-hotkey.prevent.ctrl+s="event => save(event)"></div>

<!-- the event's propagation will be stopped -->
<div v-hotkey.stop.ctrl+s="event => save(event)"></div>

<!-- modifiers can be chained -->
<div v-hotkey.ctrl+s.prevent.stop="event => save(event)"></div>
```

### Global listening for events
Use the `window` or `document` modifiers to listen for events globally at the page level.

```vue
<div v-hotkey.ctrl+s.window.prevent="event => save(event)"></div>
```

### Event name to listen for
To specify the event name to be listened for, use the argument directive. The default event is `keydown`.
```vue
<div v-hotkey:keyup.ctrl+k="() => { console.log('Search...') }"></div>
```

## License
This package is released under the **MIT License**.
