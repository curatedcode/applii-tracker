import getRandomMotivationalQuote from "@/src/components/Motivational/getRandomMotivationalQuote";
import { expect, test } from "vitest";

test("gets a quote back", () => {
	const result = getRandomMotivationalQuote();

	expect(typeof result).toStrictEqual("string");
});
