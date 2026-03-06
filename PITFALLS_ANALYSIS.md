# Pitfalls Analysis: Pagination, TableFilters, UserProfile, Dropdown, Typeahead

## Pagination Component

### 1. **PaginationContextProvider doesn't sync `selectedPage` prop changes**
**Location:** `packages/core/src/components/Pagination/PaginationContext.tsx:50`
```typescript
const [page, setPage] = useState(selectedPage);
```
**Issue:** If `selectedPage` prop changes after initial mount, the internal state doesn't update. This means controlled pagination won't work correctly.
**Impact:** Medium - Parent can't control pagination state after initial render
**Fix:** Add `useEffect` to sync when `selectedPage` changes:
```typescript
useEffect(() => {
  setPage(selectedPage);
}, [selectedPage]);
```

### 2. **No error handling for missing context**
**Location:** `packages/core/src/components/Pagination/Pagination.tsx:107`
```typescript
const { page, setPage } = usePaginationContext();
```
**Issue:** `usePaginationContext` returns empty object `{}` if used outside provider, but no error is thrown. This will cause runtime errors when trying to use `setPage`.
**Impact:** High - Silent failure, runtime errors
**Fix:** Add error check in `usePaginationContext`:
```typescript
export const usePaginationContext = () => {
  const context = useContext(PaginationContext);
  if (!context || !context.setPage) {
    throw new Error('usePaginationContext must be used within PaginationContextProvider');
  }
  return context;
};
```

### 3. **Input validation doesn't handle edge cases**
**Location:** `packages/core/src/components/Pagination/Pagination.tsx:113-116`
```typescript
const newPageNumber = Number(inputValue);
if (newPageNumber > 0 && newPageNumber <= pagesCount) {
  setPage(Number(inputValue));
}
```
**Issue:** Doesn't handle:
- `NaN` (empty string, non-numeric input)
- Decimal numbers (e.g., "1.5")
- Negative numbers (only checks `> 0`, but `Number("-1")` is `-1`)
**Impact:** Medium - Invalid page numbers can be set
**Fix:** Add validation:
```typescript
const newPageNumber = Number(inputValue);
if (!isNaN(newPageNumber) && Number.isInteger(newPageNumber) && newPageNumber > 0 && newPageNumber <= pagesCount) {
  setPage(newPageNumber);
}
```

### 4. **Arrow buttons don't validate bounds before setting page**
**Location:** `packages/core/src/components/Pagination/Pagination.tsx:154-156, 176-178`
```typescript
onClick={() => {
  if (page) {
    setPage(page - 1);  // Could go below 1
  }
}}
```
**Issue:** Only checks if `page` exists, but doesn't validate it's within bounds before decrementing/incrementing.
**Impact:** Low - Disabled state should prevent this, but defensive coding is better
**Fix:** Add bounds check:
```typescript
onClick={() => {
  if (page && page > 1) {
    setPage(page - 1);
  }
}}
```

### 5. **PaginationButtons returns false instead of null/empty array**
**Location:** `packages/core/src/components/Pagination/PaginationButtons.tsx:100`
```typescript
return (
  Array.isArray(range) &&
  range.map((page, index) => {
```
**Issue:** If `range` is not an array, returns `false` instead of `null` or empty array. This could cause React rendering issues.
**Impact:** Low - Shouldn't happen in normal usage, but defensive
**Fix:** Return `null`:
```typescript
if (!Array.isArray(range)) return null;
return range.map((page, index) => {
```

### 6. **Shows "0" when page is undefined**
**Location:** `packages/core/src/components/Pagination/Pagination.tsx:145`
```typescript
{page || 0} / {pagesCount}
```
**Issue:** Shows "0 / 10" when page is undefined, which might be confusing. Should show "1" or "-" or nothing.
**Impact:** Low - UX issue
**Fix:** Show default or placeholder:
```typescript
{page ?? 1} / {pagesCount}
```

## TableFilters Component

### 1. **useEffect dependency on checkboxData could cause unnecessary re-renders**
**Location:** `packages/core/src/components/TableFilters/TableFilters.tsx:129-131`
```typescript
useEffect(() => {
  setLocalCheckboxData(checkboxData);
}, [checkboxData]);
```
**Issue:** If parent passes new object reference on every render (even with same data), this will reset local state and lose draft changes.
**Impact:** Medium - Could lose user's draft selections
**Fix:** Use deep comparison or memoize `checkboxData` in parent

### 2. **useLayoutEffect runs on every localCheckboxData change - performance issue**
**Location:** `packages/core/src/components/TableFilters/TableFilters.tsx:133-151`
```typescript
useLayoutEffect(() => {
  let counter = 0;
  Object.keys(localCheckboxData).forEach((groupName) => {
    // ... expensive computation
  });
  // ...
}, [localCheckboxData]);
```
**Issue:** Runs synchronously on every state change, including during render. With large filter datasets, this could cause performance issues.
**Impact:** Medium - Performance degradation with large datasets
**Fix:** Consider using `useMemo` for computed values, or `useEffect` instead of `useLayoutEffect` if synchronous execution isn't required

### 3. **Missing dependency in useEffect**
**Location:** `packages/core/src/components/TableFilters/TableFilters.tsx:153-155`
```typescript
useEffect(() => {
  handleMoreButtonVisibleChange?.(isMoreButtonVisible);
}, [isMoreButtonVisible]);
```
**Issue:** `handleMoreButtonVisibleChange` is not in dependency array. If it changes, stale closure could be used.
**Impact:** Low - Usually stable, but could cause issues if callback changes
**Fix:** Add to dependencies or use `useCallback` in parent

### 4. **Potential null/undefined access after optional chaining**
**Location:** `packages/core/src/components/TableFilters/TableFilters.tsx:223-225`
```typescript
const currentState = !!localCheckboxData?.[
  accordionInfo.id
].selectedItemsDraft?.includes(info.name);
```
**Issue:** Optional chaining on `localCheckboxData?.[accordionInfo.id]` but then directly accesses `.selectedItemsDraft` without checking if the result is defined.
**Impact:** Medium - Runtime error if `localCheckboxData[accordionInfo.id]` is undefined
**Fix:** Add optional chaining:
```typescript
const currentState = !!localCheckboxData?.[accordionInfo.id]?.selectedItemsDraft?.includes(info.name);
```

### 5. **No validation of checkboxData structure**
**Location:** `packages/core/src/components/TableFilters/TableFilters.tsx:110-119`
```typescript
const [localCheckboxData, setLocalCheckboxData] =
  useState<TableFilterConfig>(checkboxData);
```
**Issue:** No runtime validation that `checkboxData` matches expected `TableFilterConfig` structure. Invalid data could cause runtime errors.
**Impact:** Medium - Runtime errors with invalid data
**Fix:** Add validation or use TypeScript more strictly

## UserProfile Component

### 1. **Using index as key in map**
**Location:** `packages/core/src/components/UserProfile/UserProfile.tsx:126-128`
```typescript
{additionalInfo.map((item, index) => (
  <div key={index}>{item}</div>
))}
```
**Issue:** Using array index as key. If items are reordered, removed, or added, React will have issues with reconciliation and component state.
**Impact:** Medium - React reconciliation issues, potential state bugs
**Fix:** Use stable unique keys:
```typescript
{additionalInfo.map((item, index) => (
  <div key={item.key || `info-${index}`}>{item}</div>
))}
```
Or if items are React elements, extract key from them

### 2. **No validation that trigger is valid React element**
**Location:** `packages/core/src/components/UserProfile/UserProfile.tsx:112`
```typescript
<PopoverTrigger css={ResetBtnStyles}>{trigger}</PopoverTrigger>
```
**Issue:** `trigger` can be `string | React.JSX.Element`, but no validation that it's actually a valid React element. String triggers might not work correctly with PopoverTrigger.
**Impact:** Low - TypeScript should catch this, but runtime validation is safer
**Fix:** Add validation or ensure PopoverTrigger handles strings correctly

### 3. **No error boundary or error handling**
**Location:** `packages/core/src/components/UserProfile/UserProfile.tsx:110-143`
**Issue:** No error handling if Popover fails, or if trigger is invalid, or if onClick throws.
**Impact:** Low - Could crash component tree
**Fix:** Add error boundary or try-catch for critical operations

### 4. **Performance with large additionalInfo arrays**
**Location:** `packages/core/src/components/UserProfile/UserProfile.tsx:124-129`
```typescript
{additionalInfo && additionalInfo.length > 0 && (
  <AdditionalInfoWrapper>
    {additionalInfo.map((item, index) => (
      <div key={index}>{item}</div>
    ))}
  </AdditionalInfoWrapper>
)}
```
**Issue:** If `additionalInfo` array is very large, rendering all items could cause performance issues. No virtualization or limiting.
**Impact:** Low - Unlikely to have large arrays, but possible
**Fix:** Add limit or virtualization if needed

## Dropdown Component

### 1. **selectedItem type limitation**
**Location:** `packages/core/src/components/Dropdown/Dropdown.tsx:107`
```typescript
const Dropdown = <T extends DropdownOptionProps>({
  selectedItem,
```
**Issue:** `selectedItem` only accepts `DropdownOptionProps`, but it would be more flexible to also accept `React.ReactNode` for custom display values.
**Impact:** Low - Type limitation, but current API works
**Fix:** Extend type to allow `React.ReactNode` as well

### 2. **Options array populated during render phase**
**Location:** `packages/core/src/components/Dropdown/Dropdown.tsx:122-124`
```typescript
const options: T[] = [];
```
**Issue:** The `options` array is populated during the render phase by iterating over children. This is fragile and could break if children processing logic changes. Options are pushed to the array inside the map function.
**Impact:** Medium - Fragile pattern, could break with refactoring
**Fix:** Use `useMemo` to compute options from children, or store in state/ref

### 3. **Prevents re-selecting the same item**
**Location:** `packages/core/src/components/Dropdown/Dropdown.tsx:140-144`
```typescript
if (innerItem.value === activeItem?.value) {
  return;
}
```
**Issue:** When user clicks the same item that's already selected, nothing happens. Users might expect the dropdown to close or `onChange` to be triggered.
**Impact:** Low - UX consideration
**Fix:** Verify if this is intended behavior, or allow re-selection

### 4. **selectedItem sync without validation**
**Location:** `packages/core/src/components/Dropdown/Dropdown.tsx:164-169`
```typescript
useEffect(() => {
  setActiveItem(selectedItem);
}, [selectedItem]);
```
**Issue:** If `selectedItem` is set to a value not present in the children options, the component will still display it. This could lead to inconsistent state.
**Impact:** Medium - Could display invalid items
**Fix:** Validate that `selectedItem` exists in options before syncing

### 5. **Incorrect .bind(this) usage in function component**
**Location:** `packages/core/src/components/Dropdown/Dropdown.tsx:186-188`
```typescript
onClick: onChange.bind(this),
```
**Issue:** Using `.bind(this)` in a function component is incorrect (there's no `this`). Should use `.bind(null, ...)` or `useCallback`. However, this onClick is likely overwritten by DropdownOptions.
**Impact:** Low - Code is incorrect but may not cause issues if overwritten
**Fix:** Use `.bind(null, ...)` or `useCallback` for proper binding

### 6. **Ineffective memoization**
**Location:** `packages/core/src/components/Dropdown/Dropdown.tsx:194-200`
```typescript
const contextValue: DropdownContextType = React.useMemo(
  () => ({ onChange, activeItem }),
  [onChange, activeItem],
);
```
**Issue:** `onChange` is recreated on every render, making the `useMemo` ineffective. This causes all context consumers to re-render on every parent render.
**Impact:** Medium - Performance issue, unnecessary re-renders
**Fix:** Memoize `onChange` with `useCallback`, or memoize `contextValue` based only on `activeItem`

## Typeahead Component

### 1. **useController defaultValue depends on changing state**
**Location:** `packages/core/src/components/Typeahead/useTypeahead.tsx:89-98`
```typescript
useController({
  control: form.control,
  name,
  rules: validationSchema,
  defaultValue: isMultiple ? selectedItems : selectedItems[0],
});
```
**Issue:** `useController`'s `defaultValue` depends on `selectedItems` state which changes. `defaultValue` should only be used on initial mount with a stable value. Using changing state here can cause issues with React Hook Form.
**Impact:** Medium - Could cause issues with form state management
**Fix:** Memoize initial `defaultValue` based on `defaultSelectedItems` prop instead

### 2. **Effect filters selectedItems - may conflict with controlled mode**
**Location:** `packages/core/src/components/Typeahead/useTypeahead.tsx:112-125`
```typescript
useEffect(() => {
  const validSelected = selectedItems.filter((item) => optionsWithKey[item]);
  if (validSelected.length !== selectedItems.length) {
    setSelected(validSelected);
    // ... updates form value
  }
}, [optionsWithKey, selectedItems]);
```
**Issue:** This effect filters `selectedItems` when options change. If `selectedItems` is controlled (via `providedSelectedItems`), this could override parent state and cause conflicts.
**Impact:** Medium - Could override controlled state
**Fix:** Add check: `if (providedSelectedItems !== undefined) return;` to skip filtering in controlled mode
