import colorNameList from 'color-name-list/dist/colornames.bestof.json';
import pantones from '$lib/pantone-numbers.json';
import type { PageLoad } from './$types';
import tinycolor from 'tinycolor2';
import shuffle from 'fast-shuffle';

export const ssr = false;

type Color = {
	name: string,
	hex: string;
	pantone?: string 
}

const kebabToTitleCase = (str: string) => {
	const words = str.split('-');

	const titleWords = words.map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	});

	return titleWords.join(' ');
};

const convertPantonesFormat = (pantones: { [key: string]: { hex: string; name: string } }) => {
	return Object.entries(pantones).map((pantone) => {
		return {
			pantone: pantone[0],
			hex: `#${pantone[1].hex}`,
			name: kebabToTitleCase(pantone[1].name)
		};
	});
};

const getColorForToday = (usePantones = false) => {
	const colors = usePantones ? convertPantonesFormat(pantones) : colorNameList;

	// Debug
	// const randomIndex = Math.floor(Math.random() * colors.length);
	// return colors[randomIndex];

	// Generate a seed based on the number of days since October 6, 2023
	function generateDaySeed(today: Date): number {
		const startDate = new Date(2023, 9, 6); // Month is 0-indexed, so 9 means October
		const difference = today.getTime() - startDate.getTime();
		return Math.floor(difference / (1000 * 60 * 60 * 24));
	}

	const today = new Date();
	const daySeed = generateDaySeed(today);
	const cyclesCompleted = Math.floor(daySeed / colors.length);
	const CONSTANT_SEED = 5; // Changing this reshuffles the deterministic array

	// Using the constant seed, modified by the number of cycles completed, to shuffle colors
	const deterministicShuffle = shuffle(CONSTANT_SEED + cyclesCompleted);
	const shuffledColors = deterministicShuffle(colors);

	return shuffledColors[daySeed % colors.length];
};

export const load: PageLoad = () => {
	const usePantones = Object.keys(pantones).length > 0;

	const color = getColorForToday(usePantones);

	const colorMeta = tinycolor(color.hex);

	console.log('Got color', color);

	return {
		date: new Date().toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		}),
		color: color as Color,
		lightColor: colorMeta.isLight()
	};
};
