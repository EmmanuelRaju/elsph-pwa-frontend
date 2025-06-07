import { booksData } from '$lib/data/song-lyrics/books.js';

const allComponents = import.meta.glob('/**/data/song-lyrics/**/*.json');

const lyricBooks = Object.entries(allComponents);

const getBookData = async (filename: string) => {
	try {
		const item = lyricBooks.find(([_path]) => {
			return _path.includes(`${filename}`);
		});
		if (item) {
			const module = await allComponents[item[0]]();
			//@ts-expect-error As we are importing svelte component, there will be default
			return module.default;
		}
	} catch (error) {
		console.error(`Unable to dynamically import ${filename}`, error);
	}
};

export const load = ({ params }) => {
	const { book: bookSlug } = params;
	const book = booksData.find((it) => it.slug === bookSlug);
	if (book) {
		return {
			book,
			bookData: getBookData(book.fileName)
		};
	}
};
