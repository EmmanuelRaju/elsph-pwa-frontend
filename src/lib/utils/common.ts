import { showPageLoader } from '$lib/stores/page-loader-store';

export const hidePageLoader: () => Promise<{ status: 'success' | 'failure' }> = () => {
	return new Promise((resolve, reject) => {
		try {
			if (document.readyState === 'complete') {
				console.log('Document ready state complete in IF block');
				showPageLoader.set(false);
				resolve({ status: 'success' });
			} else {
				document.addEventListener('readystatechange', () => {
					if (document.readyState === 'complete') {
						console.log('Document ready state complete in ELSE block');
						showPageLoader.set(false);
						resolve({ status: 'success' });
					}
				});
			}
		} catch (error) {
			reject(error);
		}
	});
};

/**
 * Stops body scrolling when components are displayed
 * @param allowScroll Whether background scroll is allowed or not
 */
export const bodyScrollHandler = (allowScroll: boolean) => {
	if (!allowScroll) {
		document.body.classList.add('!overflow-hidden');
		document.body.classList.add('h-screen');
	} else {
		document.body.classList.remove('!overflow-hidden');
		document.body.classList.remove('h-screen');
	}
};
