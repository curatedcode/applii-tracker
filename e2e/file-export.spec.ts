import test, { expect } from "@playwright/test";

test("json file export", async ({ page }) => {
  await page.goto("/boards/settings");

  await page.waitForSelector("#loadingSettings", { state: "attached" });

  await page.getByRole("button", { name: "Export data", exact: true }).click();

  const downloadPromise = page.waitForEvent("download");

  await page.getByRole("button", { name: "Export", exact: true }).click();

  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("data-dev.json");
});

test("csv file export", async ({ page }) => {
  await page.goto("/boards/settings");

  await page.waitForSelector("#loadingSettings", { state: "attached" });

  await page.getByRole("button", { name: "Export data", exact: true }).click();

  const downloadPromise = page.waitForEvent("download");

  // switch file type to CSV
  await page.getByLabel("File type").click();
  await page.getByTestId("csv-option").click();

  await page.getByRole("button", { name: "Export", exact: true }).click();

  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("data-dev.csv");
});

test("exported json file matches custom name", async ({ page }) => {
  await page.goto("/boards/settings");

  await page.waitForSelector("#loadingSettings", { state: "attached" });

  await page.getByRole("button", { name: "Export data", exact: true }).click();

  const downloadPromise = page.waitForEvent("download");

  await page
    .getByRole("textbox", { name: "File name" })
    .fill("my-exported-data-in-json");

  await page.getByRole("button", { name: "Export", exact: true }).click();

  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("my-exported-data-in-json.json");
});

test("exported csv file matches custom name", async ({ page }) => {
  await page.goto("/boards/settings");

  await page.waitForSelector("#loadingSettings", { state: "attached" });

  await page.getByRole("button", { name: "Export data", exact: true }).click();

  const downloadPromise = page.waitForEvent("download");

  await page
    .getByRole("textbox", { name: "File name" })
    .fill("my-export-data-in-csv");

  await page.getByRole("button", { name: "Export", exact: true }).click();

  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("my-export-data-in-csv.json");
});
