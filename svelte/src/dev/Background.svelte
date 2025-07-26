<script lang="ts">
    import DevBat from './Bat.svelte';
    import DevImage from './Image.svelte';
</script>

<section>
    <div class="container">
        <div class="bat-wrapper">
            <DevBat />
        </div>

        <div class="w-full h-full fixed inset-0 z-[-9999] bg-no-repeat">
        <DevImage />
        </div>
    </div>
</section>

<style>
    .container {
        position: fixed;
        display: flex;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        flex-direction: column;
        z-index: -9999999;
        overflow: hidden;
    }

    .bat-wrapper {
        position: absolute;
        top: 10px;
        left: 10px;
        padding: 1.5rem 2rem;
    }
</style>
