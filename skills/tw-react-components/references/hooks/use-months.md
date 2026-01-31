# useMonths

Get localized month names.

## Import

```tsx
import { useMonths } from 'tw-react-components';
```

## Usage

```tsx
const months = useMonths();
// ['January', 'February', 'March', ..., 'December']
```

## Return Value

| Type | Description |
|------|-------------|
| `string[]` | Array of 12 localized month names |

## Examples

### Month Picker Dropdown

```tsx
function MonthPicker({ value, onChange }) {
  const months = useMonths();

  return (
    <SelectInput
      label="Month"
      value={value}
      items={months.map((month, index) => ({
        id: index,
        label: month,
        value: index,
      }))}
      onChange={onChange}
    />
  );
}
```

### Calendar Header

```tsx
function CalendarHeader({ month, year, onPrev, onNext }) {
  const months = useMonths();

  return (
    <Flex justify="between" align="center">
      <Button prefixIcon={ChevronLeftIcon} variant="text" onClick={onPrev} />
      <span className="font-medium">
        {months[month]} {year}
      </span>
      <Button prefixIcon={ChevronRightIcon} variant="text" onClick={onNext} />
    </Flex>
  );
}
```

### Month/Year Selector

```tsx
function MonthYearSelector({ month, year, onMonthChange, onYearChange }) {
  const months = useMonths();

  return (
    <Flex gap={2}>
      <SelectInput
        value={month}
        items={months.map((m, i) => ({ id: i, label: m, value: i }))}
        onChange={onMonthChange}
      />
      <SelectInput
        value={year}
        items={Array.from({ length: 10 }, (_, i) => {
          const y = new Date().getFullYear() - 5 + i;
          return { id: y, label: String(y), value: y };
        })}
        onChange={onYearChange}
      />
    </Flex>
  );
}
```

### Display Month Name

```tsx
function DateDisplay({ date }) {
  const months = useMonths();

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return <span>{month} {day}, {year}</span>;
}
```

### Monthly Report Tabs

```tsx
function MonthlyReportTabs({ year }) {
  const months = useMonths();
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());

  return (
    <Tabs value={String(activeMonth)} onValueChange={v => setActiveMonth(Number(v))}>
      <Tabs.List>
        {months.map((month, index) => (
          <Tabs.Trigger key={index} value={String(index)}>
            {month.substring(0, 3)}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {months.map((month, index) => (
        <Tabs.Content key={index} value={String(index)}>
          <ReportContent month={index} year={year} />
        </Tabs.Content>
      ))}
    </Tabs>
  );
}
```

### Birth Month Input

```tsx
function BirthMonthInput({ value, onChange }) {
  const months = useMonths();

  return (
    <div>
      <label className="block text-sm mb-1">Birth Month</label>
      <div className="grid grid-cols-4 gap-2">
        {months.map((month, index) => (
          <Button
            key={index}
            size="small"
            variant={value === index ? 'filled' : 'outlined'}
            onClick={() => onChange(index)}
          >
            {month.substring(0, 3)}
          </Button>
        ))}
      </div>
    </div>
  );
}
```

## Notes

- Returns English month names by default
- Month names are full names (e.g., "January", not "Jan")
- Use `month.substring(0, 3)` for abbreviated names

## Related

- [useDays](./use-days.md) - Get days for calendar grid
- [DateTimeInput](../components/form-controls.md#datetimeinput) - Built-in date picker
