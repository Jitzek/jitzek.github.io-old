<script lang="ts">
    export let row: number = 0;
    export let column: number = 0;
</script>

<div class="grid-object" data-row="{row}" data-column="{column}">
    <slot />
</div>

<style lang="scss">
    .grid-object {
        width: 100%;
        height: 100%;
    }
</style>