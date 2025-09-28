# E2E Tests - Digital Money House

## Overview

This test suite provides comprehensive End-to-End testing for the Digital Money House application, focusing on the card deposit functionality and card management features.

## Test Strategy

The tests follow **Martin Fowler's "Subcutaneous Testing"** approach:

- ✅ **Real E2E**: Uses actual backend, database, and UI
- ✅ **Smart Boundaries**: Stops before data modification to avoid complexity
- ✅ **State Agnostic**: Works with 0, some, or maximum (10) cards
- ✅ **Multi-browser**: Tests across Chrome, Firefox, Safari (desktop, tablet, mobile)

## Test Files

### Core Tests

#### `deposit-card-basic.spec.ts`

**Purpose**: Validates the complete card deposit flow from user perspective.

**What it tests**:

- User authentication
- Navigation to deposit page
- Card selection (when cards available)
- Amount entry with validation
- Confirmation step with data integrity checks
- Empty state handling (no cards)

**Key Features**:

- Tests full flow up to confirmation (avoids actual money transfer)
- Handles both scenarios: with cards and without cards
- Verifies Argentine currency formatting ($ 1.000,00)

#### `cards.spec.ts`

**Purpose**: Validates basic card management operations.

**What it tests**:

- Cards list display and navigation
- Add card form accessibility
- Client-side form validation
- Smart skipping when at card limit (10 cards max)

**Key Features**:

- State-agnostic design (works with any number of cards)
- Robust error handling for edge cases
- Intelligent test skipping based on application state

### Page Object Models

#### `pages/login.page.ts`

Encapsulates authentication flow:

- Two-step login process (email → continue → password → login)
- Error state verification
- Session validation

#### `pages/cards.page.ts`

Encapsulates card management interactions:

- Card counting with multiple selector strategies
- Add/delete card operations
- Form input handling
- Toast message verification

## Technical Implementation

### Key Problem Solved: Data-testid Issue

**Problem**: Tests couldn't find cards using `[data-testid="card-item"]`
**Root Cause**: `Container.Item` component wasn't passing through props
**Solution**: Modified `Container.Item` to spread `{...props}` to the underlying div

### Robust Card Detection

The `getCardsCount()` method uses multiple strategies:

1. `[data-testid="card-item"]` (primary, after fix)
2. CSS class selectors (fallback)
3. Text content pattern matching (most robust)

### State Management

Tests handle different application states gracefully:

- **0 cards**: Shows empty state message
- **1-9 cards**: Full functionality available
- **10 cards**: At limit, some tests skip appropriately

## Running Tests

```bash
# Run all E2E tests
npx playwright test

# Run specific test files
npx playwright test tests/e2e/deposit-card-basic.spec.ts
npx playwright test tests/e2e/cards.spec.ts

# Run with specific browser
npx playwright test --project=desktop-chrome

# Single worker (for stability)
npx playwright test --workers=1
```

## Test Results Interpretation

### Expected Outputs

**When cards are available (current state - 10 cards):**

```
🃏 Found 10 cards using selector: [data-testid="card-item"]
🃏 Cards found: 10
✅ Add card form is accessible
⚠️ Skipping validation test - at card limit
✅ Successfully completed deposit card flow up to confirmation step
```

**When no cards available:**

```
🃏 Cards found: 0
ℹ️ No cards found - verifying empty state
💳 Cannot access add card form - might be at card limit
```

## Best Practices Followed

### 1. **Page Object Model**

- Encapsulates UI interactions
- Provides reusable methods
- Separates test logic from UI details

### 2. **Arrange-Act-Assert Pattern**

```typescript
// Arrange
await loginPage.goto();
// Act
await loginPage.login(email, password);
// Assert
await expect(dashboardPage).toBeVisible();
```

### 3. **Defensive Programming**

- Graceful handling of different states
- Try-catch blocks for edge cases
- Smart test skipping when appropriate

### 4. **Clear Documentation**

- Comprehensive JSDoc comments
- Step-by-step test flow documentation
- Business logic explanations

## Future Enhancements

### Potential Additions (if needed)

1. **Network Request Validation**: Monitor API calls to verify correct request formatting
2. **Real Data Modification Test**: One test that actually adds/removes a card (with proper cleanup)
3. **Performance Testing**: Response time assertions for critical paths

### Not Recommended

- ❌ Complex data modification tests (high maintenance)
- ❌ Excessive mocking (defeats E2E purpose)
- ❌ Testing every edge case at E2E level (use unit tests instead)

## Troubleshooting

### Common Issues

1. **"No cards found" but cards exist in app**
   - Check if `Container.Item` component passes props correctly
   - Verify `data-testid="card-item"` is present in DOM

2. **Tests timing out**
   - Increase timeout values
   - Add explicit waits for dynamic content
   - Use `--workers=1` to avoid race conditions

3. **Form validation not working**
   - Verify form field selectors
   - Check if validation messages have correct text/selectors

## Contact

For questions about these tests or to report issues, please refer to the main project documentation or create an issue in the repository.
