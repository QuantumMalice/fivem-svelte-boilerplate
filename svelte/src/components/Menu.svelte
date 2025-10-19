<script lang="ts">
  import { fade } from 'svelte/transition';
  import { fetchNui } from '../utils/fetchNui';
  import { app } from '../states/app.svelte';

  type Coords = {
    x: number,
    y: number,
    z: number
  }

  let coords: Coords = { x: 0, y: 0, z: 0 }

  const getCoords = () => {
    fetchNui('getCoords')
      .then((data) => {
        coords = data
      })
      .catch((e) => {
        coords = { x: 100, y: 100, z: 100 }
      })
  }

  const close = () => {
    app.visible = false
    fetchNui('close')
  }
</script>

<div
  class="absolute bg-[#2d2f35] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-[0.5rem] border border-[rgba(14,15,20,0.959)] rounded-[1.5rem]"
>
  <div
    class="bg-[#1d1f25] h-full w-[500px] rounded-xl text-[14px] font-medium border border-[rgba(14,15,20,0.959)]"
    transition:fade={{ duration: 100 }}
  >
    <div class="flex items-center shrink-0 w-full px-2 py-2 whitespace-nowrap text-white">
      <div class="ml-auto">
        <button
          class="relative w-6 h-6 p-0 border-none bg-transparent cursor-pointer rounded-full group"
          aria-label="button"
          onclick={close}
        >
          <svg
            class="flex text-[#bfb7b7] scale-[1.15] transition-colors duration-200 group-hover:text-[#ca1818]"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" />
          </svg>
        </button>
      </div>
    </div>
    <p class="flex items-center shrink-0 w-full whitespace-nowrap text-white text-[1.125rem] underline justify-center">
      Coordinates:
    </p>
    <p class="flex items-center shrink-0 w-full whitespace-nowrap text-white text-[1rem] italic justify-center">
      {JSON.stringify(coords)}
    </p>
    <div class="flex flex-col h-full items-center shrink-0 w-full px-2 py-2 whitespace-nowrap text-white justify-center">
      <div class="mt-auto">
        <button
          class="bg-[#474a4e] border border-[#000] rounded-lg text-white cursor-pointer 
                flex-shrink-0 text-[1rem] font-semibold leading-6 
                px-[1.2rem] py-[0.6rem] mt-8 mb-2 md:px-6 text-center no-underline 
                transition-colors duration-100 ease-in-out 
                select-none touch-manipulation focus:outline-none focus:outline-2 focus:outline-transparent 
                active:bg-[#323436]"
          onclick={getCoords}
        >
          Get Player Coords
        </button>
      </div>
    </div>
    <span class="flex items-center shrink-0 w-full mb-2 whitespace-nowrap text-white text-[0.9rem] justify-center">
      Or press the escape key!
    </span>
  </div>
</div>