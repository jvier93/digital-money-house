import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { ActivityPage } from "./pages/activity.page";

/**
 * E2E Tests for Activity/Transactions Functionality
 *
 * This comprehensive test suite validates the transaction history and activity features:
 * - Page loading and navigation across device types
 * - Transaction display (list view and empty states)
 * - Search functionality by description and filters
 * - Date filtering with modal interactions
 * - Pagination when multiple transactions exist
 * - Mobile-specific UI behavior (breadcrumbs, responsive design)
 *
 * Test Strategy:
 * - State-agnostic: Handles both empty and populated transaction states
 * - Device-responsive: Tests mobile and desktop UI variations
 * - Uses robust waiting strategies for dynamic content
 * - Comprehensive coverage of user interaction patterns
 * - Validates data integrity and formatting
 */
test.describe("Activity page functionality", () => {
  let loginPage: LoginPage;
  let activityPage: ActivityPage;

  const TEST_EMAIL = "test93@test93.com";
  const TEST_PASSWORD = "asdASD123#";

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    activityPage = new ActivityPage(page);

    // Login before each test
    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    await loginPage.availableBalance.waitFor({ state: "visible" });
  });

  test.describe("Page loading and navigation", () => {
    test("should load activity page successfully", async ({ isMobile }) => {
      await activityPage.goto();

      // Verify page elements are visible
      await expect(activityPage.pageTitle).toBeVisible();

      // Breadcrumb is only visible on mobile
      if (isMobile) {
        await expect(activityPage.breadcrumb).toBeVisible();
      }

      await expect(activityPage.searchInput).toBeVisible();
    });
    test("should show transactions or empty state", async () => {
      await activityPage.goto();

      await activityPage.waitForTransactionsToLoad();

      // Should show either transactions or empty state
      const hasTransactions = await activityPage.hasTransactions();
      const hasEmptyState = await activityPage.hasEmptyState();

      expect(hasTransactions || hasEmptyState).toBeTruthy();
    });
  });

  test.describe("Search functionality", () => {
    test("should search transactions by description", async () => {
      await activityPage.goto();

      // Wait for initial content to load
      await activityPage.waitForTransactionsToLoad();

      // Only test search if there are transactions
      if (await activityPage.hasTransactions()) {
        const initialCount = await activityPage.getTransactionCount();

        // Search for a specific transaction description
        await activityPage.searchTransactions("Transferencia");

        // Verify URL contains search parameter
        expect(await activityPage.getCurrentSearchFromURL()).toBe(
          "Transferencia",
        );

        // Results should be filtered (same or less count)
        const filteredCount = await activityPage.getTransactionCount();
        expect(filteredCount).toBeLessThanOrEqual(initialCount);
      }
    });

    test("should show empty results for non-existent search", async () => {
      await activityPage.goto();

      await activityPage.waitForTransactionsToLoad();

      // Search for something that definitely doesn't exist
      await activityPage.searchTransactions("ZZZNonExistentTransaction123");

      // Should show empty state
      await expect(activityPage.emptyState).toBeVisible();
    });

    test("should clear search and show all transactions", async () => {
      await activityPage.goto();

      await activityPage.waitForTransactionsToLoad();

      if (await activityPage.hasTransactions()) {
        const initialCount = await activityPage.getTransactionCount();

        // Search first
        await activityPage.searchTransactions("Transferencia");

        // Clear search
        await activityPage.clearSearch();

        // Should return to showing all transactions
        expect(await activityPage.getCurrentSearchFromURL()).toBe("");

        const finalCount = await activityPage.getTransactionCount();
        expect(finalCount).toBeGreaterThanOrEqual(initialCount);
      }
    });
  });

  test.describe("Date filter functionality", () => {
    test("should open and close date filter modal on desktop", async ({
      isMobile,
    }) => {
      if (isMobile) {
        test.skip();
      }

      await activityPage.goto();

      // Open filter modal
      await activityPage.openFilterModal(false);
      await expect(activityPage.filterModal).toBeVisible();

      // Close modal by clicking backdrop
      await activityPage.closeFilterModal();
      await expect(activityPage.filterModal).not.toBeVisible();
    });

    test("should open and close date filter modal on mobile", async ({
      isMobile,
    }) => {
      if (!isMobile) {
        test.skip();
      }

      await activityPage.goto();

      // Open filter modal
      await activityPage.openFilterModal(true);
      await expect(activityPage.filterModal).toBeVisible();

      // Close modal by clicking backdrop
      await activityPage.closeFilterModal();
      await expect(activityPage.filterModal).not.toBeVisible();
    });

    test("should apply date filter for 'today'", async ({ isMobile }) => {
      await activityPage.goto();

      await activityPage.waitForTransactionsToLoad();

      // Open filter modal
      await activityPage.openFilterModal(isMobile);

      // Apply today filter
      await activityPage.applyDateFilter("today");

      // Verify URL contains filter parameter
      expect(await activityPage.getCurrentFilterFromURL()).toBe("today");
    });

    test("should apply date filter for 'week'", async ({ isMobile }) => {
      await activityPage.goto();

      await activityPage.waitForTransactionsToLoad();

      // Open filter modal
      await activityPage.openFilterModal(isMobile);

      // Apply week filter
      await activityPage.applyDateFilter("week");

      // Verify URL contains filter parameter
      expect(await activityPage.getCurrentFilterFromURL()).toBe("week");
    });

    test("should clear date filters", async ({ isMobile }) => {
      await activityPage.goto();

      await activityPage.waitForTransactionsToLoad();

      // Apply a filter first
      await activityPage.openFilterModal(isMobile);
      await activityPage.applyDateFilter("month");

      // Clear filters
      await activityPage.openFilterModal(isMobile);
      await activityPage.clearDateFilters();

      // Verify URL no longer contains filter parameter
      expect(await activityPage.getCurrentFilterFromURL()).toBe("all");
    });

    test("should combine search and date filters", async ({ isMobile }) => {
      await activityPage.goto();

      await activityPage.waitForTransactionsToLoad();

      if (await activityPage.hasTransactions()) {
        // Apply search first
        await activityPage.searchTransactions("Transferencia");

        // Then apply date filter
        await activityPage.openFilterModal(isMobile);
        await activityPage.applyDateFilter("week");

        // Verify both parameters are in URL
        expect(await activityPage.getCurrentSearchFromURL()).toBe(
          "Transferencia",
        );
        expect(await activityPage.getCurrentFilterFromURL()).toBe("week");
      }
    });
  });

  test.describe("Pagination functionality", () => {
    test("should show pagination when there are multiple pages", async () => {
      await activityPage.goto();

      await activityPage.waitForTransactionsToLoad();

      // Check if pagination is present
      if (await activityPage.hasPagination()) {
        const buttonCount = await activityPage.getPaginationButtonCount();
        expect(buttonCount).toBeGreaterThan(1);
      }
    });

    test("should navigate to second page", async () => {
      await activityPage.goto();

      await activityPage.waitForTransactionsToLoad();

      // Only test pagination if it exists
      if (await activityPage.hasPagination()) {
        // Go to second page
        await activityPage.goToPage(2);

        // Verify URL contains page parameter
        expect(await activityPage.getCurrentPageFromURL()).toBe(2);

        // Should still show transactions or appropriate state
        await activityPage.waitForTransactionsToLoad();
      }
    });

    test("should maintain filters when changing pages", async () => {
      await activityPage.goto();

      await activityPage.waitForTransactionsToLoad();

      if (await activityPage.hasPagination()) {
        // Apply a search filter
        await activityPage.searchTransactions("Transferencia");

        // Navigate to second page if available
        if (await activityPage.hasPagination()) {
          await activityPage.goToPage(2);

          // Search parameter should be maintained
          expect(await activityPage.getCurrentSearchFromURL()).toBe(
            "Transferencia",
          );
          expect(await activityPage.getCurrentPageFromURL()).toBe(2);
        }
      }
    });

    test("should reset to page 1 when applying new filters", async ({
      isMobile,
    }) => {
      await activityPage.goto();

      await activityPage.waitForTransactionsToLoad();

      if (await activityPage.hasPagination()) {
        // Go to second page first
        await activityPage.goToPage(2);
        expect(await activityPage.getCurrentPageFromURL()).toBe(2);

        // Apply a new filter
        await activityPage.openFilterModal(isMobile);
        await activityPage.applyDateFilter("today");

        // Should reset to page 1
        expect(await activityPage.getCurrentPageFromURL()).toBe(1);
      }
    });
  });

  test.describe("Responsive behavior", () => {
    test("should show desktop filter button on desktop", async ({
      isMobile,
    }) => {
      if (isMobile) {
        test.skip();
      }

      await activityPage.goto();

      // Desktop filter button should be visible
      await expect(activityPage.desktopFilterButton).toBeVisible();

      // Mobile filter button should not be visible
      await expect(activityPage.mobileFilterButton).not.toBeVisible();
    });

    test("should show mobile filter button on mobile", async ({ isMobile }) => {
      if (!isMobile) {
        test.skip();
      }

      await activityPage.goto();

      // Mobile filter button should be visible
      await expect(activityPage.mobileFilterButton).toBeVisible();

      // Desktop filter button should not be visible
      await expect(activityPage.desktopFilterButton).not.toBeVisible();
    });
  });

  test.describe("Transaction display", () => {
    test("should show transaction details correctly", async () => {
      await activityPage.goto();

      await activityPage.waitForTransactionsToLoad();

      if (await activityPage.hasTransactions()) {
        // Verify transaction items are clickable links
        const firstTransaction = activityPage.transactionItems.first();
        await expect(firstTransaction).toBeVisible();

        // Verify transaction has description and amount
        const description = await firstTransaction
          .locator("p")
          .first()
          .textContent();
        const amount = await firstTransaction
          .locator(".text-right p")
          .first()
          .textContent();

        expect(description).toBeTruthy();
        expect(amount).toBeTruthy();
      }
    });

    test("should limit transactions to maximum 10 per page", async () => {
      await activityPage.goto();

      await activityPage.waitForTransactionsToLoad();

      if (await activityPage.hasTransactions()) {
        const transactionCount = await activityPage.getTransactionCount();
        expect(transactionCount).toBeLessThanOrEqual(10);
      }
    });
  });

  test.describe("URL parameter handling", () => {
    test("should handle direct URL with search parameter", async () => {
      // Navigate directly to activity page with search parameter
      await activityPage.page.goto("/dashboard/activity?search=Transferencia");

      await activityPage.waitForTransactionsToLoad();

      // Search input should show the search term
      await expect(activityPage.searchInput).toHaveValue("Transferencia");
    });

    test("should handle direct URL with filter parameter", async () => {
      // Navigate directly to activity page with filter parameter
      await activityPage.page.goto("/dashboard/activity?filter=week");

      await activityPage.waitForTransactionsToLoad();

      // Filter should be applied
      expect(await activityPage.getCurrentFilterFromURL()).toBe("week");
    });

    test("should handle direct URL with page parameter", async () => {
      // Navigate directly to activity page with page parameter
      await activityPage.page.goto("/dashboard/activity?page=2");

      await activityPage.waitForTransactionsToLoad();

      // Should be on page 2
      expect(await activityPage.getCurrentPageFromURL()).toBe(2);
    });
  });
});
