function getRandomHexColor() {
	let hexColor = "";

	for (let i = 0; i < 6; i++) {
		const index = Math.floor(Math.random() * 16);
		const digit = index.toString(16);

		hexColor = `${hexColor}${digit}`;
	}

	return `#${hexColor}`;
}

export default getRandomHexColor;
