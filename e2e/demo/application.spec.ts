import test, { expect } from "@playwright/test";
import dayjs from "dayjs";

test("create application", async ({ page }) => {
  await page.goto("/demo");

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

  // fill out note field
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

  await page.getByRole("link", { name: "Software Engineer" }).click();
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
