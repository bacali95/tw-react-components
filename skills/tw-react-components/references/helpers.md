# Helpers

Utility functions exported by tw-react-components.

## Import

```tsx
import { cn, getDisplayDate, compareDates, isEmpty, generalComparator } from 'tw-react-components';
```

## cn

Tailwind class merging utility (clsx + tailwind-merge).

```tsx
import { cn } from 'tw-react-components';

<div className={cn('base-class', condition && 'conditional-class', className)} />

// Merge conflicting classes
cn('p-4', 'p-2')  // => 'p-2'
cn('text-red-500', 'text-blue-500')  // => 'text-blue-500'

// Conditional classes
cn('btn', {
  'btn-primary': isPrimary,
  'btn-disabled': isDisabled,
})
```

---

## getDisplayDate

Format dates using dayjs.

```tsx
import { getDisplayDate } from 'tw-react-components';

getDisplayDate(new Date());
// "January 31, 2026"

getDisplayDate(new Date(), { format: 'LL' });
// "January 31, 2026"

getDisplayDate(new Date(), { format: 'DD-MM-YYYY' });
// "31-01-2026"

getDisplayDate(new Date(), { format: 'DD-MM-YYYY [at] HH:mm' });
// "31-01-2026 at 14:30"
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `date` | `Date` | Date to format |
| `options` | `{ format?: string }` | dayjs format string |

### Common Formats

| Format | Example |
|--------|---------|
| `LL` | January 31, 2026 |
| `LLL` | January 31, 2026 2:30 PM |
| `DD-MM-YYYY` | 31-01-2026 |
| `YYYY-MM-DD` | 2026-01-31 |
| `HH:mm` | 14:30 |
| `DD/MM/YYYY HH:mm` | 31/01/2026 14:30 |

---

## compareDates

Compare two Date objects.

```tsx
import { compareDates } from 'tw-react-components';

compareDates(date1, date2);
// -1 if date1 < date2
//  0 if date1 === date2
//  1 if date1 > date2
```

### Usage with Sort

```tsx
const sortedDates = dates.sort(compareDates);

// Descending
const sortedDesc = dates.sort((a, b) => compareDates(b, a));
```

---

## isEmpty

Check if a value is empty.

```tsx
import { isEmpty } from 'tw-react-components';

isEmpty(null);      // true
isEmpty(undefined); // true
isEmpty('');        // true
isEmpty([]);        // true
isEmpty({});        // true

isEmpty('hello');   // false
isEmpty([1, 2]);    // false
isEmpty({ a: 1 });  // false
isEmpty(0);         // false (numbers are not empty)
```

---

## generalComparator

Generic comparator for sorting any values.

```tsx
import { generalComparator } from 'tw-react-components';

// Sort strings
['banana', 'apple', 'cherry'].sort(generalComparator);
// ['apple', 'banana', 'cherry']

// Sort numbers
[3, 1, 2].sort(generalComparator);
// [1, 2, 3]

// Used internally by DataTable for sorting
```

---

## resolveTargetObject

Access nested object properties by path.

```tsx
import { resolveTargetObject } from 'tw-react-components';

const obj = {
  user: {
    profile: {
      name: 'John'
    }
  }
};

resolveTargetObject(obj, ['user', 'profile', 'name']);
// 'John'

resolveTargetObject(obj, ['user', 'missing'], '-');
// '-' (default value)
```

Used internally by DataTable for nested field access.

---

## getValueFromCookie

Extract value from cookie string.

```tsx
import { getValueFromCookie } from 'tw-react-components';

const theme = getValueFromCookie('theme', document.cookie);
// Returns the value of 'theme' cookie or undefined
```
