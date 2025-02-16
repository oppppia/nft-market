<script lang="ts">
	interface IModalSkeleton {
		isOpen: boolean;
		onClose: (isOpen: boolean) => void;
	}

	const { isOpen, onClose }: IModalSkeleton = $props();
</script>

{#if isOpen}
	<div class="bg-black fixed inset-0 flex items-center justify-center">
		<div class="bg-white flex flex-col gap-4 rounded-lg border-2 border-primary p-4">
			<div class="relative">
				<button class="absolute right-0" onclick={() => onClose(isOpen)}>X</button>
			</div>
			<slot />
		</div>
	</div>
{/if}
