import { writable, type Writable } from 'svelte/store';

export const currentTrack: Writable<{ id: string; name: string } | null> = writable(null);
