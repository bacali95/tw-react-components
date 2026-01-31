# useDays

Get days for a calendar month view, including padding days from adjacent months.

## Import

```tsx
import { useDays } from 'tw-react-components';
```

## Usage

```tsx
const days = useDays(month, year);
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `month` | `number` | Month (0-11, where 0 = January) |
| `year` | `number` | Full year (e.g., 2026) |

## Return Value

Array of day objects for rendering a calendar grid (typically 35 or 42 days to fill 5-6 weeks).

## Examples

### Basic Calendar

```tsx
function Calendar() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  
  const days = useDays(month, year);
  const months = useMonths();

  const goToPreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="w-72">
      {/* Header */}
      <Flex justify="between" align="center" className="mb-4">
        <Button 
          prefixIcon={ChevronLeftIcon} 
          variant="text" 
          size="small"
          onClick={goToPreviousMonth}
        />
        <span className="font-medium">
          {months[month]} {year}
        </span>
        <Button 
          prefixIcon={ChevronRightIcon} 
          variant="text" 
          size="small"
          onClick={goToNextMonth}
        />
      </Flex>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs text-slate-500">
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            className={cn(
              'h-8 w-8 rounded text-sm',
              day.isCurrentMonth 
                ? 'hover:bg-slate-100' 
                : 'text-slate-300',
              day.isToday && 'bg-blue-500 text-white hover:bg-blue-600'
            )}
          >
            {day.date}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### Date Picker

```tsx
function DatePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? new Date().getMonth());
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? new Date().getFullYear());
  
  const days = useDays(viewMonth, viewYear);
  const months = useMonths();

  const handleSelectDate = (day) => {
    if (day.isCurrentMonth) {
      onChange(new Date(viewYear, viewMonth, day.date));
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <Button variant="outlined">
          {value ? value.toLocaleDateString() : 'Select date'}
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="p-2">
          {/* Month/Year navigation */}
          <Flex justify="between" align="center" className="mb-2">
            <Button 
              prefixIcon={ChevronLeftIcon} 
              size="small" 
              variant="text"
              onClick={() => {
                if (viewMonth === 0) {
                  setViewMonth(11);
                  setViewYear(viewYear - 1);
                } else {
                  setViewMonth(viewMonth - 1);
                }
              }}
            />
            <span>{months[viewMonth]} {viewYear}</span>
            <Button 
              prefixIcon={ChevronRightIcon} 
              size="small" 
              variant="text"
              onClick={() => {
                if (viewMonth === 11) {
                  setViewMonth(0);
                  setViewYear(viewYear + 1);
                } else {
                  setViewMonth(viewMonth + 1);
                }
              }}
            />
          </Flex>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => handleSelectDate(day)}
                disabled={!day.isCurrentMonth}
                className={cn(
                  'h-8 w-8 rounded text-sm',
                  day.isCurrentMonth 
                    ? 'hover:bg-slate-100 cursor-pointer' 
                    : 'text-slate-300 cursor-not-allowed',
                  value?.getDate() === day.date && 
                  value?.getMonth() === viewMonth && 
                  value?.getFullYear() === viewYear &&
                    'bg-blue-500 text-white'
                )}
              >
                {day.date}
              </button>
            ))}
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );
}
```

### Event Calendar

```tsx
function EventCalendar({ events }) {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  
  const days = useDays(month, year);

  const getEventsForDate = (date: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date &&
             eventDate.getMonth() === month &&
             eventDate.getFullYear() === year;
    });
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day, index) => {
        const dayEvents = day.isCurrentMonth ? getEventsForDate(day.date) : [];
        
        return (
          <div 
            key={index}
            className={cn(
              'min-h-24 p-2 border rounded',
              !day.isCurrentMonth && 'bg-slate-50 text-slate-400'
            )}
          >
            <div className="font-medium mb-1">{day.date}</div>
            {dayEvents.map(event => (
              <div 
                key={event.id}
                className="text-xs p-1 bg-blue-100 rounded truncate"
              >
                {event.title}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
```

## Related

- [useMonths](./use-months.md) - Get month names
- [DateTimeInput](../components/form-controls.md#datetimeinput) - Built-in date picker component
