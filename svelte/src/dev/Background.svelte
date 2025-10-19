<script lang="ts">
    import Noctis from './Noctis.svelte';
    import Image from './Image.svelte';
</script>

<section>
    <div class="container">
        <div class="bat-wrapper">
            <Noctis />
        </div>

        <div class="w-full h-full fixed inset-0 z-[-9999] bg-no-repeat">
            <Image />
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
