# Accordion

Collapsible content sections for organizing information.

## Import

```tsx
import { Accordion } from 'tw-react-components';
```

## Basic Usage

### Single Mode

Only one item can be open at a time.

```tsx
<Accordion type="single" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>What is this library?</Accordion.Trigger>
    <Accordion.Content>
      A React component library built with TailwindCSS.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>How do I install it?</Accordion.Trigger>
    <Accordion.Content>
      Run npm install tw-react-components
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-3">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>
      Yes, it's built on Radix UI primitives for full accessibility.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>
```

### Multiple Mode

Multiple items can be open simultaneously.

```tsx
<Accordion type="multiple" defaultValue={['item-1']}>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>Content 1</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Section 2</Accordion.Trigger>
    <Accordion.Content>Content 2</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

## Props

### Accordion (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'single' \| 'multiple'` | - | Single or multiple open items |
| `collapsible` | `boolean` | `false` | Allow closing all items (single mode) |
| `defaultValue` | `string \| string[]` | - | Initially open items |
| `value` | `string \| string[]` | - | Open items (controlled) |
| `onValueChange` | `(value) => void` | - | Change handler |

### Accordion.Item

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Unique identifier (required) |
| `disabled` | `boolean` | Disable this item |

## Examples

### Controlled

```tsx
const [openItems, setOpenItems] = useState<string[]>(['faq-1']);

<Accordion 
  type="multiple" 
  value={openItems} 
  onValueChange={setOpenItems}
>
  {faqs.map((faq) => (
    <Accordion.Item key={faq.id} value={faq.id}>
      <Accordion.Trigger>{faq.question}</Accordion.Trigger>
      <Accordion.Content>{faq.answer}</Accordion.Content>
    </Accordion.Item>
  ))}
</Accordion>

// Expand all
<Button onClick={() => setOpenItems(faqs.map(f => f.id))}>
  Expand All
</Button>

// Collapse all
<Button onClick={() => setOpenItems([])}>
  Collapse All
</Button>
```

### FAQ Section

```tsx
const faqs = [
  {
    id: 'q1',
    question: 'How do I get started?',
    answer: 'Install the package and follow the setup guide.',
  },
  {
    id: 'q2',
    question: 'Is there TypeScript support?',
    answer: 'Yes, full TypeScript support with type definitions.',
  },
];

<Accordion type="single" collapsible>
  {faqs.map((faq) => (
    <Accordion.Item key={faq.id} value={faq.id}>
      <Accordion.Trigger>{faq.question}</Accordion.Trigger>
      <Accordion.Content>{faq.answer}</Accordion.Content>
    </Accordion.Item>
  ))}
</Accordion>
```

### With Rich Content

```tsx
<Accordion type="single" collapsible>
  <Accordion.Item value="features">
    <Accordion.Trigger>Features</Accordion.Trigger>
    <Accordion.Content>
      <ul className="list-disc pl-4 space-y-2">
        <li>Beautiful UI components</li>
        <li>Dark mode support</li>
        <li>Fully accessible</li>
        <li>TypeScript ready</li>
      </ul>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="code">
    <Accordion.Trigger>Code Example</Accordion.Trigger>
    <Accordion.Content>
      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded">
        {`import { Button } from 'tw-react-components';`}
      </pre>
    </Accordion.Content>
  </Accordion.Item>
</Accordion>
```

### Disabled Item

```tsx
<Accordion type="single" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Available Section</Accordion.Trigger>
    <Accordion.Content>This is accessible.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2" disabled>
    <Accordion.Trigger>Premium Section (Upgrade Required)</Accordion.Trigger>
    <Accordion.Content>This content is locked.</Accordion.Content>
  </Accordion.Item>
</Accordion>
```
