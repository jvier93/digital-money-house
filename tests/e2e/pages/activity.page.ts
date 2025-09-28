import { Page, Locator } from "@playwright/test";

export class ActivityPage {
  readonly page: Page;

  // Navigation elements
  readonly breadcrumb: Locator;
  readonly pageTitle: Locator;

  // Search elements
  readonly searchInput: Locator;
  readonly searchForm: Locator;

  // Filter elements - Desktop
  readonly desktopFilterButton: Locator;

  // Filter elements - Mobile
  readonly mobileFilterButton: Locator;

  // Filter Modal elements
  readonly filterModal: Locator;
  readonly filterModalTitle: Locator;
  readonly filterClearButton: Locator;
  readonly filterApplyButton: Locator;
  readonly filterTodayOption: Locator;
  readonly filterYesterdayOption: Locator;
  readonly filterWeekOption: Locator;
  readonly filter15DaysOption: Locator;
  readonly filterMonthOption: Locator;
  readonly filterYearOption: Locator;
  readonly filterModalBackdrop: Locator;

  // Transaction elements
  readonly transactionsList: Locator;
  readonly transactionItems: Locator;
  readonly transactionDescriptions: Locator;
  readonly transactionAmounts: Locator;
  readonly transactionDates: Locator;

  // Pagination elements
  readonly paginationContainer: Locator;
  readonly paginationButtons: Locator;
  readonly firstPageButton: Locator;
  readonly secondPageButton: Locator;

  // Empty state
  readonly emptyState: Locator;
  readonly emptyStateMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation
    this.breadcrumb = page.locator("span").filter({ hasText: "Tu actividad" });
    this.pageTitle = page.getByRole("heading", { name: "Tu actividad" });

    // Search
    this.searchInput = page.getByTestId("activity-search-input");
    this.searchForm = page.getByTestId("activity-search-form");

    // Filter buttons
    this.desktopFilterButton = page.getByTestId("date-filter-desktop");
    this.mobileFilterButton = page.getByTestId("date-filter-mobile");

    // Filter Modal
    this.filterModal = page
      .locator('[class*="fixed"][class*="inset-0"][class*="z-50"]')
      .filter({ hasText: "Período" });
    this.filterModalTitle = page.getByText("Período");
    this.filterClearButton = page.getByText("Borrar filtros");
    this.filterApplyButton = page.getByRole("button", { name: "Aplicar" });
    this.filterModalBackdrop = page.locator(
      '[class*="fixed"][class*="inset-0"][class*="bg-black"]',
    );

    // Filter options in modal
    this.filterTodayOption = page.getByLabel("Hoy");
    this.filterYesterdayOption = page.getByLabel("Ayer");
    this.filterWeekOption = page.getByLabel("Última semana");
    this.filter15DaysOption = page.getByLabel("Últimos 15 días");
    this.filterMonthOption = page.getByLabel("Último mes");
    this.filterYearOption = page.getByLabel("Último año");

    // Transactions
    this.transactionsList = page
      .locator('[class*="space-y"]')
      .filter({ has: page.getByTestId("transaction-item") });
    this.transactionItems = page.getByTestId("transaction-item");
    this.transactionDescriptions = page.getByTestId("transaction-description");
    this.transactionAmounts = page.getByTestId("transaction-amount");
    this.transactionDates = page.getByTestId("transaction-date");

    // Pagination
    this.paginationContainer = page.getByTestId("pagination-container");
    this.paginationButtons = page
      .getByTestId("pagination-container")
      .locator("button");
    this.firstPageButton = page.getByRole("button", { name: "1" });
    this.secondPageButton = page.getByRole("button", { name: "2" });

    // Empty state
    this.emptyState = page.getByTestId("empty-state");
    this.emptyStateMessage = page.getByTestId("empty-state");
  }

  async goto() {
    await this.page.goto("/dashboard/activity", {
      waitUntil: "domcontentloaded",
      timeout: 10000,
    });

    // Wait for the page to be hydrated and content loaded
    await this.pageTitle.waitFor({ state: "visible", timeout: 10000 });

    // Wait for network to be idle (ensures hydration is complete)
    await this.page.waitForLoadState("networkidle");

    // Give extra time for React hydration to complete
    await this.page.waitForTimeout(2000);
  }

  async waitForTransactionsToLoad() {
    // Wait for either transactions to appear or empty state
    try {
      await Promise.race([
        this.transactionItems
          .first()
          .waitFor({ state: "visible", timeout: 5000 }),
        this.emptyState.waitFor({ state: "visible", timeout: 5000 }),
      ]);
    } catch {
      // If nothing is found, wait for network to be idle
      await this.page.waitForLoadState("networkidle");
    }
  }

  async waitForSearchToUpdate(expectedQuery: string) {
    // Wait for URL to update with search parameter, similar to waitForError pattern
    await this.page.waitForFunction(
      (query) => {
        const url = new URL(window.location.href);
        const currentQuery = url.searchParams.get("search");
        // Handle empty query case
        return query === "" ? !currentQuery : currentQuery === query;
      },
      expectedQuery,
      { timeout: 10000 },
    );
  }

  async waitForFilterToUpdate(expectedFilter: string) {
    // Wait for URL to update with filter parameter
    await this.page.waitForFunction(
      (filter) => {
        const url = new URL(window.location.href);
        const currentFilter = url.searchParams.get("filter");
        // Handle 'all' case (no filter parameter)
        return filter === "all" ? !currentFilter : currentFilter === filter;
      },
      expectedFilter,
      { timeout: 10000 },
    );
  }

  async waitForPageToUpdate(expectedPage: number) {
    // Wait for URL to update with page parameter
    await this.page.waitForFunction(
      (page) => {
        const url = new URL(window.location.href);
        const urlPage = url.searchParams.get("page");
        return urlPage === page.toString() || (page === 1 && !urlPage);
      },
      expectedPage,
      { timeout: 10000 },
    );
  }

  async searchTransactions(query: string) {
    // Fill the search input
    await this.searchInput.fill(query);

    // Submit the form
    await this.searchInput.press("Enter");

    // Wait for URL to update with search parameter (similar to waitForError pattern)
    await this.page.waitForFunction(
      (expectedQuery) => {
        const url = new URL(window.location.href);
        const currentQuery = url.searchParams.get("search");
        return expectedQuery === ""
          ? !currentQuery
          : currentQuery === expectedQuery;
      },
      query,
      { timeout: 10000 },
    );

    // Wait for search results to load
    await this.waitForTransactionsToLoad();
  }

  async clearSearch() {
    // Clear the search input
    await this.searchInput.clear();

    // Submit the form
    await this.searchInput.press("Enter");

    // Wait for URL to clear search parameter (similar to waitForError pattern)
    await this.page.waitForFunction(
      () => {
        const url = new URL(window.location.href);
        return !url.searchParams.get("search");
      },
      undefined,
      { timeout: 10000 },
    );

    // Wait for search results to load
    await this.waitForTransactionsToLoad();
  }

  async openFilterModal(isMobile: boolean = false) {
    const filterButton = isMobile
      ? this.mobileFilterButton
      : this.desktopFilterButton;

    // Wait for button to be available and clickable
    await filterButton.waitFor({ state: "visible", timeout: 10000 });

    await filterButton.click();

    // Wait for modal to appear (similar to waitForError pattern)
    await this.filterModal.waitFor({ state: "visible", timeout: 5000 });
  }

  async closeFilterModal() {
    // Wait for modal to be fully visible and hydrated (similar to waitForError pattern)
    await this.page.waitForFunction(
      () => {
        const modal = document.querySelector(
          '[class*="fixed"][class*="inset-0"][class*="z-50"]',
        );
        const backdrop = document.querySelector(
          '[class*="fixed"][class*="inset-0"][class*="bg-black"]',
        );
        return modal && backdrop;
      },
      { timeout: 5000 },
    );

    // Give time for event handlers to be attached after hydration
    await this.page.waitForTimeout(1000);

    // Click on "Borrar filtros" button which closes the modal reliably
    const clearButton = this.page.getByText("Borrar filtros");
    await clearButton.click();

    // Wait for modal to disappear (similar to waitForError pattern)
    await this.filterModal.waitFor({ state: "hidden", timeout: 5000 });
  }

  async applyDateFilter(
    filterType: "today" | "yesterday" | "week" | "15days" | "month" | "year",
  ) {
    // Ensure modal is open
    await this.filterModal.waitFor({ state: "visible" });

    // Select the appropriate filter option
    switch (filterType) {
      case "today":
        await this.filterTodayOption.click();
        break;
      case "yesterday":
        await this.filterYesterdayOption.click();
        break;
      case "week":
        await this.filterWeekOption.click();
        break;
      case "15days":
        await this.filter15DaysOption.click();
        break;
      case "month":
        await this.filterMonthOption.click();
        break;
      case "year":
        await this.filterYearOption.click();
        break;
    }

    // Apply the filter
    await this.filterApplyButton.click();

    // Wait for modal to close and URL to update (similar to waitForError pattern)
    await this.filterModal.waitFor({ state: "hidden", timeout: 5000 });

    await this.page.waitForFunction(
      (expectedFilter) => {
        const url = new URL(window.location.href);
        return url.searchParams.get("filter") === expectedFilter;
      },
      filterType,
      { timeout: 10000 },
    );

    await this.waitForTransactionsToLoad();
  }

  async clearDateFilters() {
    // Ensure modal is open
    await this.filterModal.waitFor({ state: "visible" });

    // Clear filters
    await this.filterClearButton.click();

    // Wait for modal to close
    await this.filterModal.waitFor({ state: "hidden", timeout: 5000 });

    // Wait for URL to clear filter parameter
    await this.waitForFilterToUpdate("all");

    await this.waitForTransactionsToLoad();
  }

  async goToPage(pageNumber: number) {
    const pageButton = this.page.getByRole("button", {
      name: pageNumber.toString(),
    });

    // Wait for button to be available and clickable
    await pageButton.waitFor({ state: "visible", timeout: 10000 });

    await pageButton.click();

    // Wait for URL to update with page parameter (similar to waitForError pattern)
    await this.page.waitForFunction(
      (expectedPage) => {
        const url = new URL(window.location.href);
        const currentPage = url.searchParams.get("page");
        return expectedPage === 1
          ? !currentPage
          : currentPage === expectedPage.toString();
      },
      pageNumber,
      { timeout: 10000 },
    );

    // Wait for new page content to load
    await this.waitForTransactionsToLoad();
  }

  async getTransactionCount() {
    await this.waitForTransactionsToLoad();

    // Check if empty state is visible
    if (await this.emptyState.isVisible()) {
      return 0;
    }

    return await this.transactionItems.count();
  }

  async getTransactionDescriptions() {
    const descriptions: string[] = [];
    const count = await this.transactionItems.count();

    for (let i = 0; i < count; i++) {
      const description = await this.transactionItems
        .nth(i)
        .locator("p")
        .first()
        .textContent();
      if (description) {
        descriptions.push(description);
      }
    }

    return descriptions;
  }

  async getPaginationButtonCount() {
    if (!(await this.paginationContainer.isVisible())) {
      return 0;
    }

    return await this.paginationButtons.count();
  }

  async hasTransactions() {
    return (await this.getTransactionCount()) > 0;
  }

  async hasEmptyState() {
    return await this.emptyState.isVisible();
  }

  async hasPagination() {
    return await this.paginationContainer.isVisible();
  }

  async getCurrentPageFromURL() {
    const url = this.page.url();
    const urlParams = new URLSearchParams(url.split("?")[1] || "");
    return parseInt(urlParams.get("page") || "1");
  }

  async getCurrentSearchFromURL() {
    const url = this.page.url();
    const urlParams = new URLSearchParams(url.split("?")[1] || "");
    return urlParams.get("search") || "";
  }

  async getCurrentFilterFromURL() {
    const url = this.page.url();
    const urlParams = new URLSearchParams(url.split("?")[1] || "");
    return urlParams.get("filter") || "all";
  }
}
