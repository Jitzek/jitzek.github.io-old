<script lang="ts">
    import { desktop, mobile } from '$stores/DeviceTypeStore';

    desktop.subscribe(value => {
        console.log(`Desktop: ${value}`);
    });
    mobile.subscribe(value => {
        console.log(`Mobile: ${value}`);
    });
</script>