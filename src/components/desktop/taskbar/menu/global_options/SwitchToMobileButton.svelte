<script lang="ts">
</script>

<button class="switch-to-mobile-button">
	<img src="/images/desktop/menu/mobile.svg" alt="Mobile View" height="75%" width="auto"/>
</button>

<style lang="scss">
	.switch-to-mobile-button {
		height: 3rem;
		width: 3rem;

		background-color: #9671d1;
		transition: transform 0.25s, background-color 0.25s;

		outline: none;
		border: none;

		color: inherit;
		font-family: inherit;
		font-size: inherit;

		cursor: pointer;

		border-radius: 12px;
		box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
		
	}

    .switch-to-mobile-button:hover {
		background-color: #9066d3;
		transform: translateY(-0.2rem);
    }
</style>