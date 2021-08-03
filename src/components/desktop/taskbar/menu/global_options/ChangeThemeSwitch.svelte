<script lang="ts">
	import { theme as theme_store } from '$stores/shared/ThemeStore';
	import { Theme } from '$components/shared/Theme';
	import { onMount } from 'svelte';
	let theme: Theme = Theme.Dark;
	theme_store.subscribe((new_theme) => {
		theme = new_theme;
	});

	$: {
		theme;
		switch (theme) {
			case Theme.Light:
				checked = false;
				break;
			case Theme.Dark:
				checked = true;
				break;
		}
	}

	let checked: boolean = false;

	$: {
		checked;
		checked ? theme_store.set(Theme.Dark) : theme_store.set(Theme.Light);
	}
</script>

<div class="change-theme-container" on:click={() => (checked = !checked)}>
	<label class="change-theme-switch" on:click={() => (checked = !checked)}>
		<input type="checkbox" bind:checked on:click={() => (checked = !checked)} />
		<span class="slider round" />
	</label>
</div>

<style lang="scss">
	.change-theme-container {
		height: 3rem;
		width: 3rem;
		display: flex;
		align-items: center;
		transition: transform 0.25s;
		cursor: pointer;

		.change-theme-switch {
			width: 3rem;
			height: 2rem;

			position: relative;
			display: inline-block;
			cursor: pointer;

			input {
				opacity: 0;
				width: 0;
				height: 0;
			}

			.slider {
				position: absolute;
				cursor: pointer;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: var(--background-color);
				-webkit-transition: 0.4s;
				transition: 0.4s;
				
				box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
			}

			.slider:before {
				position: absolute;
				content: '';
				height: 22px;
				width: 22px;
				left: 3px;
				bottom: 5px;
				background-color: var(--font-color);
				transition: 0.5s;
				-webkit-transition: 0.5s;
				-moz-transition: 0.5s;
			}

			input:checked + .slider {
				background-color: var(--background-color);
			}

			input:checked + .slider:before {
				-webkit-transform: translateX(20px);
				-ms-transform: translateX(20px);
				transform: translateX(20px);
			}

			.slider.round {
				border-radius: 34px;
			}

			.slider.round:before {
				border-radius: 50%;
			}
		}
	}

	.change-theme-container:hover {
		transform: translateY(-0.2rem);
	}
</style>
