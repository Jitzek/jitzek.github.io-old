<script lang="ts">
    export let icon: string;
    export let name: string;
</script>

<button class="about-me-button">
    <div class="about-me-button-content">
        <img src="{icon}" alt="User Icon" />
        <p>{name}</p>
    </div>
</button>

<style lang="scss">
    .about-me-button {
		background-color: rgba(0, 0, 0, 0);
        outline: none;
		border: none;

        // display: flex;
		// justify-content: center;
		// align-items: center;
        
        padding: 0.5rem 1rem 0.5rem 1rem;

        color: inherit;
		font-family: inherit;
		font-size: 1.25rem;

        width: 100%;

		cursor: pointer;

        .about-me-button-content {
            display: flex;
			text-align: center;
			justify-content: center;
			align-items: center;

			max-height: 100px;

            img {
				display: inline;
				margin: 0;
                margin-right: 8px;
				width: 3rem;
				height: auto;
			}
        }
    }

    .about-me-button:hover {
		background-color: rgba(0, 0, 0, 0.2);
	}
</style>