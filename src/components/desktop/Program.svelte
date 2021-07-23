<script lang="ts">
	export let icon: string;
	export let name: string;
</script>

<div class="program">
	<div class="image-container">
		<img src={icon} alt={name} draggable="false" />
	</div>
	<p>{name}</p>
</div>

<style lang="scss">
	.program {
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;

		.image-container {
			width: 100%;
			height: 100%;
			img {
				width: 65%;
			}
		}
		p {
			margin: 0;
			color: #eeeeee;
			text-shadow: 0px 1px 2px black;

			width: 100%;
			word-wrap: break-word;
		}
	}
</style>
