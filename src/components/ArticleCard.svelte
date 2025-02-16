<script lang="ts">
	import background from '../images/background.png';

	interface IArticleCard {
		primaryName: string;
		secondaryName: string;
	}

	const { primaryName, secondaryName }: IArticleCard = $props();
</script>

<div class="relative">
	<img src={background} alt="background" />
	<div
		class="absolute inset-0 flex flex-col items-center justify-center text-5xl font-black text-white"
	>
		<span>{primaryName}</span>
		<span class="secondary-name">{secondaryName}</span>
	</div>
</div>

<style>
	.secondary-name {
		background: linear-gradient(90deg, #c155ef 0%, #05f8a1 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
</style>
