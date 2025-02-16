<script lang="ts">
	import logo from '../images/logotype.png';
	interface IHeader {
		tabs: string[];
		activeTab: string;
	}

	let { tabs, activeTab = $bindable() }: IHeader = $props();
</script>

<header class="flex items-center gap-4 px-32 py-8 text-white">
	<div class="flex items-center gap-2">
		<img src={logo} alt="logo" />
		<h1 class="text-3xl font-black">VOID</h1>
	</div>
	<div class="h-12 w-[2px] bg-secondary"></div>
	<ul class="flex gap-4 text-2xl">
		{#each tabs as tab}
			{@const isActive = tab === activeTab}
			<button
				class={isActive ? 'font-black transition-colors' : 'text-secondary'}
				onclick={() => (activeTab = tab)}
			>
				{tab}
				{#if isActive}
					<div class="h-1 w-full rounded-sm bg-primary"></div>
				{/if}
			</button>
		{/each}
	</ul>
</header>

<div class="bottom-0 h-[2px] w-full bg-secondary"></div>
