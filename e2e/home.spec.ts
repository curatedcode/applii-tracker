import { test, expect } from "@playwright/test";

test("create application", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "New Application" }).click();

  // fill out all fields
  await page.getByLabel("Position").fill("Software Engineer");
  await page.getByLabel("Company").fill("Microsoft");
  await page.getByLabel("Posting URL").fill("https://youtube.com");
  await page.getByLabel("Status").selectOption("applied");
  await page.getByLabel("Date Applied").fill("2023-09-21");

  // submit form
  await page.getByRole("button", { name: "Done" }).click();
  await new Promise((resolve) => {
    setTimeout(() => resolve(null), 100);
  });

  // make sure the card is in the Applied board section
  const sectionEl = page.getByTestId("Applied section");
  const applicationCardEl = page.getByTestId("board-section-card");

  expect(sectionEl).toBeVisible();
  expect(applicationCardEl).toBeVisible();

  expect(sectionEl.getByTestId("board-section-card")).toBeVisible();

  // check that the info is correct and visible
  const positionEl = page.getByText("Software Engineer");
  expect(positionEl).toBeVisible();

  const companyEl = page.getByText("Microsoft");
  expect(companyEl).toBeVisible();

  const dateEl = page.getByTitle("Last updated 1m ago");
  expect(await dateEl.textContent()).toBe("1m");
});

test("update application", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "New Application" }).click();

  // fill out all fields
  await page.getByLabel("Position").fill("Software Engineer");
  await page.getByLabel("Company").fill("Microsoft");
  await page.getByLabel("Posting URL").fill("https://youtube.com");
  await page.getByLabel("Status").selectOption("applied");
  await page.getByLabel("Date Applied").fill("2023-09-21");

  // submit form
  await page.getByRole("button", { name: "Done" }).click();

  const applicationCardEl = page.getByTestId("board-section-card");
  await applicationCardEl.getByRole("button", { name: "Edit" }).click();

  // update fields
  await page.getByLabel("Position").fill("Software Developer");
  await page.getByLabel("Company").fill("Google");
  await page.getByLabel("Posting URL").fill("https://google.com");
  await page.getByLabel("Status").selectOption("interviewing");
  await page.getByLabel("Date Interviewing").fill("2023-09-22");

  // submit form
  await page.getByRole("button", { name: "Done" }).click();
  await new Promise((resolve) => {
    setTimeout(() => resolve(null), 100);
  });

  // verify card updated
  const positionEl = page.getByText("Software Developer");
  expect(positionEl).toBeVisible();

  const companyEl = page.getByText("Google");
  expect(companyEl).toBeVisible();

  const dateEl = page.getByTitle("Last updated 1m ago");
  expect(await dateEl.textContent()).toBe("1m");
});

test("delete application", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "New Application" }).click();

  // fill out all fields
  await page.getByLabel("Position").fill("Software Engineer");
  await page.getByLabel("Company").fill("Microsoft");
  await page.getByLabel("Posting URL").fill("https://youtube.com");
  await page.getByLabel("Status").selectOption("applied");
  await page.getByLabel("Date Applied").fill("2023-09-21");

  // submit form
  await page.getByRole("button", { name: "Done" }).click();
  await new Promise((resolve) => {
    setTimeout(() => resolve(null), 100);
  });

  const applicationCardEl = page.getByTestId("board-section-card");
  await applicationCardEl.getByRole("button", { name: "Delete" }).click();
});
