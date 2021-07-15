<script lang="ts">
    import { desktop, mobile } from '$stores/DeviceTypeStore';
    import Desktop from '$components/desktop/Desktop.svelte';

</script>

{#if $desktop}
    <Desktop />
{:else if $mobile}
    <Desktop />
{/if}