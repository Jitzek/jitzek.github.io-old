<!-- 
    This page is shown on ANY error for ANY route withing THIS FOLDER.
    (also shown for routes within subfolders if no __error.svelte file exists)
 -->

<script context="module">
    export const load = ({ error, status }) => {
        return {
            props: {
                error,
                status
            }
        };
    };
</script>

<script lang="ts">
    export let error: any;
    export let status: any;
</script>

<h1>{status}</h1>
<p>{error.message}</p>

<style lang="scss">
</style>