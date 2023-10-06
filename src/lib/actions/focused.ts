export default function focused(node: HTMLElement, callback: (event: Event) => void) {
	const handleFocusEvents = (event: Event) => {
		callback(event);
	};

	window.addEventListener('online', handleFocusEvents);
	window.addEventListener('focus', handleFocusEvents);

	return {
		destroy() {
			window.removeEventListener('online', handleFocusEvents);
			window.removeEventListener('focus', handleFocusEvents);
		}
	};
}