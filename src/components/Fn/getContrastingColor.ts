/**
 * Takes a hex color and returns the best text color for accessability, either black or white
 */
function getContrastingColor(hexColor: string) {
	if (hexColor[0] === "#") {
		throw new Error(
			"Incorrect hex color passed. Remove the # from the hex passed",
		);
	}

	const r = parseInt(hexColor.substring(0, 2), 16);
	const g = parseInt(hexColor.substring(2, 4), 16);
	const b = parseInt(hexColor.substring(4, 6), 16);

	const uiColors = [r / 255, g / 255, b / 255];

	const contrast = uiColors.map((col) => {
		if (col <= 0.03928) {
			return col / 12.92;
		}
		return ((col + 0.055) / 1.055) ** 2.4;
	});

	const lum =
		0.2126 * contrast[0] + 0.7152 * contrast[1] + 0.0722 * contrast[2];

	return lum > 0.179 ? "black" : "white";
}
export default getContrastingColor;
