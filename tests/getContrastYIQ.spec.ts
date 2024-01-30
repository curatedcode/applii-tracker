import getContrastYIQ from "@/src/components/Fn/getContrastYIQ";
import { describe, expect, test } from "vitest";

describe("is black text readable", () => {
	test("returns black", () => {
		const result = getContrastYIQ("ffffff");

		expect(result).toEqual("black");
	});

	test("returns white", () => {
		const result = getContrastYIQ("000000");

		expect(result).toEqual("white");
	});

	test("returns white", () => {
		const result = getContrastYIQ("EF4444");

		expect(result).toEqual("white");
	});

	test("returns black", () => {
		const result = getContrastYIQ("FAA31B");

		expect(result).toEqual("black");
	});

	test("returns black", () => {
		const result = getContrastYIQ("FFF000");

		expect(result).toEqual("black");
	});

	test("returns black", () => {
		const result = getContrastYIQ("82C341");

		expect(result).toEqual("black");
	});

	test("returns white", () => {
		const result = getContrastYIQ("009F75");

		expect(result).toEqual("white");
	});

	test("returns black", () => {
		const result = getContrastYIQ("88C6ED");

		expect(result).toEqual("black");
	});

	test("returns white", () => {
		const result = getContrastYIQ("394BA0");

		expect(result).toEqual("white");
	});

	test("returns white", () => {
		const result = getContrastYIQ("D54799");

		expect(result).toEqual("white");
	});
});
