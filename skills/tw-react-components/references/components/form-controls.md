# Form Controls

Form input components with two usage patterns: integrated with react-hook-form or standalone controlled components.

## Import

```tsx
// With react-hook-form
import { FormInputs } from 'tw-react-components';

// Standalone
import { 
  TextInput, 
  NumberInput, 
  EmailInput,
  PasswordInput,
  TextareaInput,
  CheckboxInput, 
  SelectInput, 
  DateTimeInput 
} from 'tw-react-components';
```

## With react-hook-form (Recommended)

Wrap your form with `FormProvider` and use `FormInputs.*` components.

```tsx
import { FormProvider, useForm } from 'react-hook-form';
import { Button, FormInputs } from 'tw-react-components';

type FormData = {
  username: string;
  email: string;
  password: string;
  age: number;
  bio: string;
  terms: boolean;
  birthDate: Date;
  country: string;
};

function MyForm() {
  const form = useForm<FormData>({ defaultValues: {} });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInputs.Text name="username" label="Username" required clearable />
        <FormInputs.Email name="email" label="Email" required />
        <FormInputs.Password name="password" label="Password" required />
        <FormInputs.Number name="age" label="Age" min={0} max={120} />
        <FormInputs.Textarea name="bio" label="Bio" />
        <FormInputs.Checkbox name="terms" label="Accept Terms" required />
        <FormInputs.DateTime 
          name="birthDate" 
          label="Birth Date" 
          displayFormat="DD-MM-YYYY" 
          clearable 
        />
        <FormInputs.Select
          name="country"
          label="Country"
          items={[
            { id: 'us', label: 'USA', value: 'us' },
            { id: 'uk', label: 'UK', value: 'uk' },
          ]}
          search
          clearable
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
}
```

### Available FormInputs

| Component | Description |
|-----------|-------------|
| `FormInputs.Text` | Text input |
| `FormInputs.Email` | Email input with validation |
| `FormInputs.Password` | Password input with toggle visibility |
| `FormInputs.Number` | Numeric input with min/max |
| `FormInputs.Textarea` | Multi-line text |
| `FormInputs.Checkbox` | Checkbox input |
| `FormInputs.DateTime` | Date and time picker |
| `FormInputs.Select` | Single or multi-select dropdown |

### Validation

```tsx
<FormInputs.Email
  name="email"
  label="Email"
  required
  validate={(value) => value.includes('@') || 'Invalid email'}
/>

<FormInputs.Number
  name="age"
  label="Age"
  min={18}
  max={100}
  validate={(value) => value >= 18 || 'Must be 18 or older'}
/>
```

## Standalone (Controlled)

For use without react-hook-form.

```tsx
const [text, setText] = useState('');
const [count, setCount] = useState(0);
const [checked, setChecked] = useState(false);
const [date, setDate] = useState<Date | null>(null);
const [selected, setSelected] = useState<string | undefined>();

<TextInput
  name="text"
  label="Text"
  value={text}
  onChange={(e) => setText(e.target.value)}
  size="medium"
  required
/>

<NumberInput
  name="count"
  label="Count"
  value={count}
  onChange={(e) => setCount(Number(e.target.value))}
  min={0}
  max={100}
/>

<CheckboxInput
  name="agree"
  label="I agree"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

<DateTimeInput
  name="date"
  label="Select Date"
  value={date}
  onChange={setDate}
  displayFormat="DD-MM-YYYY"
  clearable
/>

<SelectInput
  label="Country"
  value={selected}
  items={[
    { id: 'us', label: 'USA', value: 'us' },
    { id: 'uk', label: 'UK', value: 'uk' },
  ]}
  onChange={setSelected}
/>
```

## Common Props

All form inputs share these props:

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Field name (required for FormInputs.*) |
| `label` | `string` | Input label |
| `size` | `'small' \| 'medium'` | Input size |
| `required` | `boolean` | Mark as required |
| `disabled` | `boolean` | Disable input |
| `hasErrors` | `boolean` | Show error state (standalone only) |
| `clearable` | `boolean` | Show clear button |
| `dataTestId` | `string` | Testing attribute |

## SelectInput

### Basic

```tsx
<SelectInput
  label="Country"
  value={selected}
  items={[
    { id: 'us', label: 'USA', value: 'us' },
    { id: 'uk', label: 'UK', value: 'uk' },
  ]}
  onChange={setSelected}
/>
```

### Multi-select

```tsx
<SelectInput
  label="Countries"
  value={selectedCountries}
  items={countries}
  onChange={setSelectedCountries}
  multiple
/>
```

### With Search

```tsx
<SelectInput
  label="Country"
  items={countries}
  search
  placeholder="Search countries..."
/>
```

### Grouped Items

```tsx
const items = [
  {
    id: 'europe',
    label: 'Europe',
    group: true,
    items: [
      { id: 'fr', label: 'France', value: 'fr' },
      { id: 'de', label: 'Germany', value: 'de' },
    ],
  },
  {
    id: 'asia',
    label: 'Asia',
    group: true,
    items: [
      { id: 'jp', label: 'Japan', value: 'jp' },
      { id: 'kr', label: 'South Korea', value: 'kr' },
    ],
  },
];

<SelectInput label="Country" items={items} />
```

### Allow Adding New Items

```tsx
<FormInputs.Select
  name="tags"
  label="Tags"
  items={existingTags}
  multiple
  allowAddition
  onNewItemAdded={(newTag) => console.log('Added:', newTag)}
/>
```

## DateTimeInput

### Props

| Prop | Type | Description |
|------|------|-------------|
| `displayFormat` | `string` | dayjs format string |
| `minDate` | `Date` | Minimum selectable date |
| `maxDate` | `Date` | Maximum selectable date |
| `step` | `number` | Time step in minutes |

### Example

```tsx
<DateTimeInput
  name="appointment"
  label="Appointment"
  displayFormat="DD-MM-YYYY [at] HH:mm"
  minDate={new Date()}
  maxDate={new Date(2030, 11, 31)}
  step={15}
  clearable
/>
```
