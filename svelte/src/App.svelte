<script lang="ts">
  import { fetchNui } from './utils/fetchNui'
  import { useNuiEvent } from './utils/useNuiEvent'
  import { app, browser } from './states/app.svelte'
  import Menu from './components/Menu.svelte';
  
  function onKeyDown(key: KeyboardEvent) {
    const is_escape = ['Escape'].includes(key.code)
  
    if (app.visible && is_escape) {
      if (!browser) fetchNui('close')
      app.visible = false
    } else if (browser && !app.visible && is_escape) {
      app.visible = true
    }
  }

  useNuiEvent<boolean>('setVisible', (state: boolean) => {
    app.visible = state
  });
</script>

<svelte:window on:keydown={onKeyDown}/>

<main>
  {#if app.visible}
    <Menu />
  {/if}
  {#if import.meta.env.DEV}
    {#await import('./dev/Background.svelte') then { default: Debug }}
      <Debug />
    {/await}
  {/if}
</main>