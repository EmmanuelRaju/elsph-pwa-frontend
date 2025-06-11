<script lang="ts">
	import { ChevronDown } from '$lib/assets/icons';

	export let id: string,
		name: string,
		required: boolean = false,
		disabled: boolean = false,
		value: string | number,
		options: { label: string | number; value: string | number }[],
		classes: { container?: string; select?: string } = { container: '', select: '' },
		label: string = '',
		placeholder: string = '';
</script>

<div class="flex flex-col gap-2 {classes.container}">
	{#if label}
		<div class="gap-1/2 flex text-white">
			<p>{label}</p>
			{#if required}
				<p class="">*</p>
			{/if}
		</div>
	{/if}
	<div class="relative flex items-center">
		<select
			{id}
			bind:value
			{disabled}
			{name}
			on:change
			class="h-10 rounded-md px-3 {classes.select} focus-within:brk-border-selected flex-1 border pr-10 duration-100 focus-within:border-2 focus:outline-0"
		>
			{#if placeholder}
				<option value="" disabled selected hidden>{placeholder}</option>
			{/if}
			{#each options as option, i (i)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		<div class="absolute right-3">
			<ChevronDown></ChevronDown>
		</div>
	</div>
</div>

<style>
	select {
		-webkit-appearance: none;
		appearance: none;
	}
</style>
