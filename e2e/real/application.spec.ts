import test, { expect } from "@playwright/test";
import dayjs from "dayjs";

test("create application", async ({ page }) => {
	await page.goto("/boards");

	await page.getByRole("link", { name: "Create", exact: true }).click();

	// fill out main fields
	await page
		.getByRole("textbox", { name: "Position" })
		.first()
		.fill("Software Engineer");
	await page.getByRole("textbox", { name: "Company" }).fill("Microsoft");
	await page
		.getByRole("textbox", { name: "Posting URL" })
		.fill("www.youtube.com");
	await page.getByLabel("Status").click();
	await page.getByTestId("applied-option").click();
	await page.getByLabel("Date Applied").fill("2023-10-10");

	// fill out contact fields
	await page.getByRole("button", { name: "Add Contact" }).click();
	await page.getByRole("textbox", { name: "Name" }).fill("John Smith");
	await page
		.getByRole("textbox", { name: "Position" })
		.nth(1)
		.fill("Recruiter");
	await page.getByRole("textbox", { name: "Phone" }).fill("123-456-7890");
	await page
		.getByRole("textbox", { name: "Email" })
		.fill("johnsmith@gmail.com");

	// fill out note fields
	await page.getByRole("button", { name: "Add Note" }).click();
	await page
		.getByRole("textbox", { name: "Body" })
		.fill("This is the body text of my first note");

	// submit
	await page.getByRole("button", { name: "Submit" }).click();
	await page
		.getByLabel("Application created")
		.getByRole("link", { name: "Home" })
		.click();
	await page.getByTestId("board-section-card").click();
	await page.waitForSelector("#loadingApplication", { state: "attached" });

	// verify application data is correct

	// main fields
	expect(page.getByText("Software Engineer", { exact: true })).toBeVisible();
	expect(page.getByText("Microsoft", { exact: true })).toBeVisible();
	expect(page.getByText("www.youtube.com", { exact: true })).toBeVisible();
	expect(page.getByText("Applied", { exact: true })).toBeVisible();
	// if current year is same as date year then it will show a shortened version
	if (dayjs().year() === 2023) {
		expect(page.getByText("10/10", { exact: true })).toBeVisible();
	} else {
		expect(page.getByText("10/10/2023", { exact: true })).toBeVisible();
	}

	// contact fields
	expect(page.getByText("John Smith", { exact: true })).toBeVisible();
	expect(page.getByText("Recruiter", { exact: true })).toBeVisible();
	expect(page.getByText("123-456-7890", { exact: true })).toBeVisible();
	expect(page.getByText("johnsmith@gmail.com", { exact: true })).toBeVisible();

	// note field
	expect(
		page.getByText("This is the body text of my first note", { exact: true }),
	).toBeVisible();
});

test("update application", async ({ page }) => {
	await page.goto("/boards");

	await page.getByRole("link", { name: "Create", exact: true }).click();

	// fill out main fields
	await page
		.getByRole("textbox", { name: "Position" })
		.first()
		.fill("Software Engineer");
	await page.getByRole("textbox", { name: "Company" }).fill("Microsoft");
	await page
		.getByRole("textbox", { name: "Posting URL" })
		.fill("www.youtube.com");
	await page.getByLabel("Status").click();
	await page.getByTestId("applied-option").click();
	await page.getByLabel("Date Applied").fill("2023-10-10");

	// fill out contact fields
	await page.getByRole("button", { name: "Add Contact" }).click();
	await page.getByRole("textbox", { name: "Name" }).fill("John Smith");
	await page
		.getByRole("textbox", { name: "Position" })
		.nth(1)
		.fill("Recruiter");
	await page.getByRole("textbox", { name: "Phone" }).fill("123-456-7890");
	await page
		.getByRole("textbox", { name: "Email" })
		.fill("johnsmith@gmail.com");

	// fill out note fields
	await page.getByRole("button", { name: "Add Note" }).click();
	await page
		.getByRole("textbox", { name: "Body" })
		.fill("This is the body text of my first note");

	// submit and go to edit application page
	await page.getByRole("button", { name: "Submit" }).click();
	await page.getByRole("link", { name: "View" }).click();
	await page.waitForSelector("#loadingApplication", { state: "attached" });
	await page.getByRole("link", { name: "Edit" }).click();
	await page.waitForSelector("#loadingEdit", { state: "attached" });

	// edit main fields
	await page
		.getByRole("textbox", { name: "Position" })
		.first()
		.fill("Software Developer");
	await page.getByRole("textbox", { name: "Company" }).fill("Microsoft Deluxe");
	await page
		.getByRole("textbox", { name: "Posting URL" })
		.fill("www.google.com");
	await page.getByLabel("Status").click();
	await page.getByTestId("interviewing-option").click();
	await page.getByLabel("Date Interviewing").fill("2023-10-11");

	// edit contact fields
	await page.getByRole("textbox", { name: "Name" }).fill("Jack Black");
	await page
		.getByRole("textbox", { name: "Position" })
		.nth(1)
		.fill("Receptionist");
	await page.getByRole("textbox", { name: "Phone" }).fill("098-765-4321");
	await page
		.getByRole("textbox", { name: "Email" })
		.fill("jackblack@hotmail.com");

	// edit note fields
	await page
		.getByRole("textbox", { name: "Body" })
		.fill("This is the edited body text of my first note");

	// submit
	await page.getByRole("button", { name: "Submit" }).click();
	await page.getByRole("link", { name: "View" }).click();
	await page.waitForSelector("#loadingApplication", { state: "attached" });

	// verify application data is correct
	expect(page.getByText("Software Developer", { exact: true })).toBeVisible();
	expect(page.getByText("Microsoft Deluxe", { exact: true })).toBeVisible();
	expect(page.getByText("www.google.com", { exact: true })).toBeVisible();
	expect(page.getByText("Interviewing", { exact: true })).toBeVisible();
	// if current year is same as date year then it will show a shortened version
	if (dayjs().year() === 2023) {
		expect(page.getByText("10/11", { exact: true })).toBeVisible();
	} else {
		expect(page.getByText("10/11/2023", { exact: true })).toBeVisible();
	}

	// contact fields
	expect(page.getByText("Jack Black", { exact: true })).toBeVisible();
	expect(page.getByText("Receptionist", { exact: true })).toBeVisible();
	expect(page.getByText("098-765-4321", { exact: true })).toBeVisible();
	expect(
		page.getByText("jackblack@hotmail.com", { exact: true }),
	).toBeVisible();

	// note field
	expect(
		page.getByText("This is the edited body text of my first note", {
			exact: true,
		}),
	).toBeVisible();
});

test("delete application", async ({ page }) => {
	await page.goto("/boards");

	await page.getByRole("link", { name: "Create", exact: true }).click();

	// fill out main fields
	await page
		.getByRole("textbox", { name: "Position" })
		.first()
		.fill("Software Engineer");
	await page.getByRole("textbox", { name: "Company" }).fill("Microsoft");
	await page
		.getByRole("textbox", { name: "Posting URL" })
		.fill("www.youtube.com");
	await page.getByLabel("Status").click();
	await page.getByTestId("applied-option").click();
	await page.getByLabel("Date Applied").fill("2023-10-10");

	// submit
	await page.getByRole("button", { name: "Submit" }).click();
	await page
		.getByLabel("Application created")
		.getByRole("link", { name: "Home" })
		.click();
	await page.waitForSelector("#loadingHome", { state: "attached" });

	// delete
	await page.getByTestId("board-section-card").click();
	await page.getByRole("button", { name: "Delete" }).click();

	// check that application is deleted
	expect(await page.getByTestId("board-section-card").count()).toEqual(0);
});
