<script lang="ts">
	import { SearchIcon } from '$lib/assets/icons';

	export let id: string,
		label: string = '',
		name: string,
		disabled: boolean = false,
		placeholder: string = '',
		value: string,
		classes = { container: '', inputContainer: '' };
</script>

<div class="flex flex-1 flex-col gap-2 {classes.container}">
	{#if label}
		<div class="gap-1/2 flex text-white">
			<p>{label}</p>
		</div>
	{/if}
	<div
		class="border-1 flex h-[40px] items-center gap-2 rounded-md bg-white p-3 duration-100 focus-within:border-2 {classes.inputContainer}"
	>
		<div class="size-3">
			<SearchIcon></SearchIcon>
		</div>
		<input
			{id}
			type="search"
			{name}
			{placeholder}
			{disabled}
			bind:value
			on:change
			on:input
			class="flex-1 pl-1 pr-4 focus:outline-0"
		/>
	</div>
</div>
