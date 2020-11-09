import App from './App.svelte';
import './bulma.scss';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;