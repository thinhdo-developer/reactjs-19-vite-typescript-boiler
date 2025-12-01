# Common Utilities, Components & Hooks

This document provides an overview of all common utilities, components, and custom hooks available in this boilerplate.

## 📦 Utilities

### Validation (`src/utils/validation`)

```typescript
import { isValidEmail, isValidPhone, validatePassword } from '@utils/validation';

// Email validation
isValidEmail('user@example.com'); // true

// Phone validation
isValidPhone('+1 (555) 123-4567'); // true

// Password validation
const result = validatePassword('MyP@ssw0rd');
// { isValid: true, strength: 'strong', errors: [] }
```

**Available functions:**
- `isValidEmail(email: string)` - Validates email format
- `isValidPhone(phone: string)` - Validates phone number
- `isValidUrl(url: string)` - Validates URL
- `validatePassword(password: string)` - Validates password strength
- `isNotEmpty(value: string)` - Checks if string is not empty
- `isValidNumber(value)` - Validates number
- `isInRange(value, min, max)` - Checks if number is in range
- `isValidCreditCard(cardNumber: string)` - Validates credit card (Luhn algorithm)

### Formatting (`src/utils/format`)

```typescript
import { formatCurrency, formatNumber, truncate } from '@utils/format';

// Currency formatting
formatCurrency(1234.56, 'USD'); // "$1,234.56"

// Number formatting
formatNumber(1234567.89, 2); // "1,234,567.89"

// String truncation
truncate('Long text here', 10); // "Long text..."
```

**Available functions:**
- `formatNumber(value, decimals)` - Formats number with thousand separators
- `formatCurrency(value, currency, locale)` - Formats as currency
- `formatPercentage(value, decimals)` - Formats as percentage
- `truncate(str, length, suffix)` - Truncates string
- `capitalize(str)` - Capitalizes first letter
- `toTitleCase(str)` - Converts to title case
- `formatFileSize(bytes)` - Formats file size
- `formatPhoneNumber(phone)` - Formats phone number
- `maskString(str, start, end, maskChar)` - Masks sensitive info
- `camelToKebab(str)` - Converts camelCase to kebab-case
- `kebabToCamel(str)` - Converts kebab-case to camelCase

### Array Utilities (`src/utils/array`)

```typescript
import { unique, groupBy, chunk, shuffle } from '@utils/array';

// Remove duplicates
unique([1, 2, 2, 3]); // [1, 2, 3]

// Group by key
groupBy(users, 'role'); // { admin: [...], user: [...] }

// Chunk array
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

// Shuffle
shuffle([1, 2, 3, 4]); // [3, 1, 4, 2] (random)
```

**Available functions:**
- `unique(array)` - Removes duplicates
- `groupBy(array, key)` - Groups by key
- `chunk(array, size)` - Splits into chunks
- `flatten(array)` - Flattens nested array
- `difference(array1, array2)` - Finds difference
- `intersection(array1, array2)` - Finds intersection
- `shuffle(array)` - Shuffles array
- `sortBy(array, key, order)` - Sorts by key
- `random(array, count)` - Gets random items
- `remove(array, predicate)` - Removes matching items

### Debounce/Throttle (`src/utils/debounce`)

```typescript
import { debounce, throttle, debounceAsync } from '@utils/debounce';

// Debounce function
const debouncedSearch = debounce((query: string) => {
  console.log('Searching:', query);
}, 300);

// Throttle function
const throttledScroll = throttle(() => {
  console.log('Scrolled');
}, 100);

// Async debounce
const debouncedFetch = debounceAsync(async (url: string) => {
  return fetch(url).then(r => r.json());
}, 500);
```

## 🎣 Custom Hooks

### useDebounce

```typescript
import { useDebounce } from '@hooks/useDebounce';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    // This will only run after user stops typing for 500ms
    if (debouncedSearch) {
      performSearch(debouncedSearch);
    }
  }, [debouncedSearch]);
}
```

### useThrottle

```typescript
import { useThrottle } from '@hooks/useThrottle';

function ScrollComponent() {
  const [scrollY, setScrollY] = useState(0);
  const throttledScroll = useThrottle(scrollY, 100);

  // Updates at most once per 100ms
}
```

### useClickOutside

```typescript
import { useClickOutside } from '@hooks/useClickOutside';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div ref={ref}>
      {/* Dropdown content */}
    </div>
  );
}
```

### useMediaQuery

```typescript
import { useMediaQuery } from '@hooks/useMediaQuery';

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
}
```

### useLocalStorage

```typescript
import { useLocalStorage } from '@hooks/useLocalStorage';

function SettingsComponent() {
  const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </button>
  );
}
```

### useToggle

```typescript
import { useToggle } from '@hooks/useToggle';

function ToggleComponent() {
  const [isOpen, toggle, setOpen] = useToggle(false);

  return (
    <button onClick={toggle}>
      {isOpen ? 'Close' : 'Open'}
    </button>
  );
}
```

### useCopyToClipboard

```typescript
import { useCopyToClipboard } from '@hooks/useCopyToClipboard';

function CopyButton() {
  const [copied, copy, error] = useCopyToClipboard();

  return (
    <button onClick={() => copy('Text to copy')}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
```

## 🧩 Components

### Card

```typescript
import { Card } from '@components';

<Card padding="lg" shadow="md" hover>
  <h2>Card Title</h2>
  <p>Card content</p>
</Card>
```

**Props:**
- `padding`: "none" | "sm" | "md" | "lg"
- `shadow`: "none" | "sm" | "md" | "lg"
- `rounded`: "none" | "sm" | "md" | "lg" | "xl"
- `bordered`: boolean
- `hover`: boolean
- `onClick`: () => void

### Badge

```typescript
import { Badge } from '@components';

<Badge variant="success" size="md">New</Badge>
```

**Props:**
- `variant`: "primary" | "secondary" | "success" | "warning" | "danger" | "info"
- `size`: "sm" | "md" | "lg"
- `rounded`: boolean

### Avatar

```typescript
import { Avatar } from '@components';

<Avatar src="/user.jpg" name="John Doe" size="lg" />
<Avatar name="Jane Smith" size="md" /> {/* Shows initials */}
```

**Props:**
- `src`: string (image URL)
- `name`: string (for initials fallback)
- `size`: "xs" | "sm" | "md" | "lg" | "xl"
- `rounded`: boolean
- `onClick`: () => void

### Tooltip

```typescript
import { Tooltip } from '@components';

<Tooltip content="Tooltip text" position="top">
  <button>Hover me</button>
</Tooltip>
```

**Props:**
- `content`: ReactNode
- `position`: "top" | "bottom" | "left" | "right"
- `delay`: number (milliseconds)

### Skeleton

```typescript
import { Skeleton } from '@components';

<Skeleton width="100%" height={20} />
<Skeleton width={200} height={200} rounded />
```

**Props:**
- `width`: string | number
- `height`: string | number
- `rounded`: boolean

### Divider

```typescript
import { Divider } from '@components';

<Divider orientation="horizontal" spacing="md" />
<Divider orientation="vertical" spacing="lg" />
```

**Props:**
- `orientation`: "horizontal" | "vertical"
- `spacing`: "sm" | "md" | "lg"

## 📚 Usage Examples

### Complete Example: Search with Debounce

```typescript
import { useState, useEffect } from 'react';
import { useDebounce } from '@hooks/useDebounce';
import { InputField } from '@components';
import { isValidEmail } from '@utils/validation';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery && isValidEmail(debouncedQuery)) {
      // Perform search
      fetchResults(debouncedQuery).then(setResults);
    }
  }, [debouncedQuery]);

  return (
    <InputField
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### Complete Example: Modal with Click Outside

```typescript
import { useState } from 'react';
import { useClickOutside } from '@hooks/useClickOutside';
import { Modal, Button } from '@components';

function MyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useClickOutside(() => setIsOpen(false));

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      {isOpen && (
        <Modal ref={modalRef}>
          <h2>Modal Content</h2>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </Modal>
      )}
    </>
  );
}
```

### Complete Example: Responsive Layout

```typescript
import { useMediaQuery } from '@hooks/useMediaQuery';
import { Card, Badge } from '@components';

function ResponsiveCard() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  return (
    <Card padding={isMobile ? 'sm' : 'lg'}>
      <Badge variant={isMobile ? 'primary' : 'success'}>
        {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
      </Badge>
      {/* Content */}
    </Card>
  );
}
```

## 🎯 Best Practices

1. **Use debounce for search inputs** - Prevents excessive API calls
2. **Use throttle for scroll/resize events** - Improves performance
3. **Use useClickOutside for dropdowns/modals** - Better UX
4. **Use useMediaQuery for responsive design** - Cleaner than CSS-only
5. **Use validation utilities** - Consistent validation across the app
6. **Use formatting utilities** - Consistent number/currency display
7. **Use Card component** - Consistent card styling
8. **Use Skeleton for loading states** - Better UX than spinners

## 📝 Notes

- All utilities are tree-shakeable - only import what you need
- All hooks follow React hooks rules
- All components are TypeScript typed
- All utilities are well-documented with JSDoc
- Components use Tailwind CSS for styling

---

For more details, check the source code in:
- Utilities: `src/utils/`
- Hooks: `src/hooks/`
- Components: `src/components/`

