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

Let's say you have a separate repo with the `pantone-numbers.json` file. Create a GitHub workflow that looks like this in `.github/workflows/build.yml`:

```yaml
name: build

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout parent repo
        uses: actions/checkout@v2
        with:
          repository: khromov/color-of-the-day
      - name: Checkout current repo
        uses: actions/checkout@v4
        with:
          path: colors
      - name: Add pantone-numbers.json
        run: cp colors/pantone-numbers.json src/lib/pantone-numbers.json
      - name: Publish Docker Image
        uses: matootie/github-docker@v3.1.0
        with:
          accessToken: ${{ github.token }}
          containerRegistry: true
```

Now you will have a Docker image with your Pantone colors.
