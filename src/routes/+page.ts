import colorNameList from 'color-name-list/dist/colornames.bestof.json';
import type { PageLoad } from './$types';
import tinycolor from 'tinycolor2';

export const ssr = false;

export const load: PageLoad = () => {
	const color = colorNameList[Math.floor(Math.random() * colorNameList.length)];
	const colorMeta = tinycolor(color.hex);

	return {
		date: new Date().toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		}),
		color,
		lightColor: colorMeta.isLight()
	};
};
