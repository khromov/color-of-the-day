# Color of the Day

Get inspired with a new color every day.

## Live URL

Visit the live site at https://color-of-the-day.khromov.se/

![Screenshot](/.github/screenshot.png)

## Running locally

```bash
nvm use
npm i
npm run dev
```

Then go to: http://localhost:5173

## Using Pantone colors

By default this project uses colors from the [color-name-list](https://www.npmjs.com/package/color-name-list) "best" colors. Pantone colors are not available due to licensing restrictions. If you have a `pantone-numbers.json` file with a list of Pantone colors in the format:

```json
{
	"12-3456": {
		"name": "color-name-kebab-case",
		"hex": "cccccc"
	}
}
```

Then you can edit the file `src/lib/pantone-numbers.json` and add them. Once you build this app the Pantone colors will be used instead of the default color list.
