import getContrastingColor from "@/src/components/Fn/getContrastingColor";
import { describe, expect, test } from "vitest";

describe("is black text readable", () => {
	test("returns black", () => {
		const result = getContrastingColor("ffffff");

		expect(result).toEqual("black");
	});

	test("returns white", () => {
		const result = getContrastingColor("000000");

		expect(result).toEqual("white");
	});

	test("returns white", () => {
		const result = getContrastingColor("EF4444");

		expect(result).toEqual("white");
	});

	test("returns black", () => {
		const result = getContrastingColor("FAA31B");

		expect(result).toEqual("black");
	});

	test("returns black", () => {
		const result = getContrastingColor("FFF000");

		expect(result).toEqual("black");
	});

	test("returns black", () => {
		const result = getContrastingColor("82C341");

		expect(result).toEqual("black");
	});

	test("returns white", () => {
		const result = getContrastingColor("009F75");

		expect(result).toEqual("white");
	});

	test("returns black", () => {
		const result = getContrastingColor("88C6ED");

		expect(result).toEqual("black");
	});

	test("returns white", () => {
		const result = getContrastingColor("394BA0");

		expect(result).toEqual("white");
	});

	test("returns white", () => {
		const result = getContrastingColor("D54799");

		expect(result).toEqual("white");
	});
});
