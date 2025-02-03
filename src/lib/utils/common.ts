import { showPageLoader } from '$lib/stores/page-loader-store';

export const hidePageLoader: () => Promise<{ status: number }> = () => {
	return new Promise((resolve, reject) => {
		try {
			if (document.readyState === 'complete') {
				console.log('Document ready state complete in IF block');
				showPageLoader.set(false);
				resolve({ status: 200 });
			} else {
				document.addEventListener('readystatechange', () => {
					if (document.readyState === 'complete') {
						console.log('Document ready state complete in ELSE block');
						showPageLoader.set(false);
						resolve({ status: 200 });
					}
				});
			}
		} catch (error) {
			reject(error);
		}
	});
};
