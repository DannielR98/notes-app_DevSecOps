import { test, expect } from "@playwright/test";

test("user can create a note", async ({
  page,
}) => {
  const uniqueTitle =
    "Playwright-" + Date.now();  // Ensure unique title for test  (coolt att t.om kommentarer auto-genereras nu)

  await page.goto("/");

  await page
    .getByPlaceholder("Title")
    .fill(uniqueTitle);

  await page
    .getByPlaceholder("Content")
    .fill("Testing notes");

  await page
    .getByRole("button", {
      name: "Add Note",
    })
    .click();

  await expect(
    page.getByRole("heading", {
      name: uniqueTitle,
    })
  ).toBeVisible();
});

test("shows validation error", async ({
  page,
}) => {
  await page.goto("/");

  await page
    .getByRole("button", {
      name: "Add Note",
    })
    .click();

  await expect(
    page.getByText("Title is required")
  ).toBeVisible();
});


test("user can delete note", async ({
  page,
}) => {
  await page.goto("/");

  await page
    .getByText("Delete")
    .first()
    .click();

  page.on("dialog", (dialog) =>
    dialog.accept()
  );
});

test("user can edit note", async ({
  page,
}) => {
  await page.goto("/");

  await page
    .getByText("Edit")
    .first()
    .click();

  await expect(
    page.getByRole("heading", { name: "Edit Note" })
  ).toBeVisible();
});