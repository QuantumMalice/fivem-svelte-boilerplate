<script lang="ts">
  import { fetchNui } from './utils/fetchNui'
  import { useNuiEvent } from './utils/useNuiEvent'
  import { browser, isVisible, setVisible } from './states/app.svelte'
  import Menu from './components/Menu.svelte';

  const visible = $derived(isVisible())
  
  function onKeyDown(key: KeyboardEvent) {
    const is_escape = ['Escape'].includes(key.code)
  
    if (visible && is_escape) {
      if (!browser) fetchNui('close')
      setVisible(false)
    } else if (browser && !visible && is_escape) {
      setVisible(true)
    }
  }

  useNuiEvent<boolean>('setVisible', (state: boolean) => {
    setVisible(state)
  });
</script>

<svelte:window on:keydown={onKeyDown}/>

<main>
  {#if visible}
    <Menu />
  {/if}
  {#if import.meta.env.DEV}
    {#await import('./dev/Background.svelte') then { default: Debug }}
      <Debug />
    {/await}
  {/if}
</main>