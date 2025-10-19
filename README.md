<h1 align="center">Svelte & Lua Boilerplate</h1>

## Requirements
* [Node.js](https://nodejs.org/en/)
* [pnpm](https://pnpm.io/installation) (Highly recommended over yarn or npm)

## Getting Started

**Node.js v20+**

Install any LTS release of Node.js from v20.

**pnpm**

Install the pnpm package manager globally.

```
npm install -g pnpm
```

## Installation

Install dependencies by navigating to the `svelte` folder within a terminal of your choice and type `pnpm i`.

## Svelte Utils

**Toggling main visibility**

You can exit the UI frame using the `ESC` key, if you need to forcefully hide it you can
use `app.visible = false`, *app.visible* being a Svelte state. Or if you need to check if the
UI frame is currently visible you can use `app.visible`, *app.visible* also being a Svelte state.

Before being able to change the visibility state you must first import it from `states/app.svelte`
```svelte
<button onclick={() => {app.visible = false}}>
  Exit
</button>
```

**useNuiEvent**

This intercepts and handles messages dispatched by the game scripts and is the primary way of creating passive listeners.

```svelte
<script lang="ts">
  let characterName: string;
  
  useNuiEvent<string>('myAction', (data) => {
    // the first argument to the handler function
    // is the data argument sent using SendNUIMessage
    
    // do whatever logic you want here
    characterName = data;
  })
</script>

<div>{characterName}</div>
```

**fetchNui**

This is the main way to accomplish active NUI data fetching or to trigger NUI callbacks in the game scripts.

```svelte
<script lang="ts">
  let coords: {x: number; y: number; z: number};

  fetchNui<{x: number; y: number; z: number}>('getCoords').then(retData => {
    console.log('Got return data from client scripts:', retData);
    coords = retData
  }).catch(e => {
    console.log('Setting mock data due to error', e)
    coords = {x: 500, y: 300: z: 200}
  })
</script>

<div>{coords}</div>
```

**debugData**

This will target the useNuiEvent function registered with `setVisible` and pass them the data of `true`

```ts
<script lang="ts">
  debugData([
    {
      action: 'setVisible',
      data: true,
    }
  ])
<script
```

**Misc Utils**

* `browser` - Returns a boolean indicating if the current environment is a regular browser.

## Development Workflow

**Development**

Use `pnpm watch` to actively rebuild modified files while developing the resource in-game.

During web development, use `pnpm run dev` to start vite's webserver and watch for changes.

**Build**

Use `pnpm build` to build all project files in production mode, after building an fxmanifest will be generated.