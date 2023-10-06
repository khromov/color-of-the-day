import colorNameList from 'color-name-list/dist/colornames.bestof.json';
import type { PageLoad } from './$types';
import tinycolor from 'tinycolor2';
import shuffle from 'fast-shuffle';

export const ssr = false;

const getColorForToday = () => {
    // Generate a seed based on the number of days since October 6, 2023
    function generateDaySeed(today: Date): number {
        const startDate = new Date(Date.UTC(2023, 9, 6)); // Month is 0-indexed, so 9 means October
        const difference = today.getTime() - startDate.getTime();
        return Math.floor(difference / (1000 * 60 * 60 * 24));
    }

    const today = new Date();
    const daySeed = generateDaySeed(today);
    const cyclesCompleted = Math.floor(daySeed / colorNameList.length);
    const CONSTANT_SEED = 5; // Changing this reshuffles the deterministic array
	

    // Using the constant seed, modified by the number of cycles completed, to shuffle colors
    const deterministicShuffle = shuffle(CONSTANT_SEED + cyclesCompleted);
    const shuffledColors = deterministicShuffle(colorNameList);

    return shuffledColors[daySeed % colorNameList.length];
}


export const load: PageLoad = () => {
	const color = getColorForToday();
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
