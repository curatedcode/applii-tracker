/**
 * Takes a hex color and returns the best color for readability, either black or white
 * See https://en.wikipedia.org/wiki/YIQ for details
 */
function getContrastYIQ(hexcolor: string) {
	if (hexcolor[0] === "#") {
		throw new Error(
			"Incorrect hex color passed. Remove the # from the hex passed",
		);
	}
	const r = parseInt(hexcolor.substring(0, 2), 16);
	const g = parseInt(hexcolor.substring(2, 4), 16);
	const b = parseInt(hexcolor.substring(4, 6), 16);
	const yiq = (r * 299 + g * 587 + b * 114) / 1000;
	return yiq >= 128 ? "black" : "white";
}
export default getContrastYIQ;
