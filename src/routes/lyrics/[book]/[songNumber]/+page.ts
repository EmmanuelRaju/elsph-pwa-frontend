import type { TSong } from '$lib/models/index.js';

export const load = async ({ parent, params }) => {
	const { bookData } = await parent();
	const { songNumber } = params;

	const _bookData = await bookData;
	const song: TSong = _bookData.find((it: TSong) => it.intSongNumber === +songNumber);

	return {
		song
	};
};
