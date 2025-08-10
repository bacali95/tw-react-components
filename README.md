# TailwindCSS React Components

![NPM Version](https://img.shields.io/npm/v/tw-react-components)
[![codecov](https://codecov.io/gh/bacali95/tw-react-components/graph/badge.svg?token=Z5ER12459R)](https://codecov.io/gh/bacali95/tw-react-components)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A comprehensive library of React components built with TailwindCSS for creating beautiful and responsive dashboards.

## Demo

Check out the [live demo](https://bacali95.github.io/tw-react-components) to see the components in action.

## Features

- 🎨 Beautiful UI components built with TailwindCSS
- 🌙 Light and dark mode support
- 📱 Fully responsive design
- ♿ Accessible components using Radix UI
- 🧩 Customizable and extensible
- 🧪 Well-tested with comprehensive test coverage

## Installation

```bash
# Using npm
npm install tw-react-components

# Using yarn
yarn add tw-react-components

# Using pnpm
pnpm add tw-react-components
```

## Requirements

- React 18 or later
- TailwindCSS 3

## Setup

### 1. Configure TailwindCSS

Add the required plugins to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    // ...
    './node_modules/tw-react-components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    // Include the custom plugin from tw-react-components (optional)
    require('tw-react-components/tailwindcss-plugin'),
  ],
};
```

### 2. Import the CSS

Add the following import to your main CSS file:

```css
@import 'tw-react-components/index.css';
```

## Available Components

This library provides a wide range of components:

- **Layout:** Building blocks for page layouts
  - `Layout` - Main container for your application
  - `Flex` - Flexible box layout component
  - `Block` - Block-level layout component
  - `Card` - Container with styling and functionality

- **Navigation:**
  - `Navbar` - Top navigation bar
  - `Sidebar` - Side navigation component
  - `Tabs` - Tabbed interface component

- **Data Display:**
  - `Table` - Regular table component
  - `DataTable` - Advanced data table with sorting and filtering
  - `List` - Displaying lists of data
  - `ListSorter` - Sortable list component
  - `Badge` - Small status indicator

- **Input & Form:**
  - `Button` - Various button styles
  - `Form` - Form controls and helpers
  - `Switch` - Toggle switch component

- **Feedback & Overlay:**
  - `Dialog` - Modal dialog boxes
  - `Popover` - Content that appears over the UI
  - `Tooltip` - Information shown on hover
  - `Sheet` - Slide-in panels
  - `Skeleton` - Loading placeholders
  - `Spinner` - Loading indicator
  - `Hint` - Contextual hints and tips

- **Utilities:**
  - `Separator` - Visual dividers
  - `Collapsible` - Expandable/collapsible content
  - `DropdownMenu` - Menu that appears on click
  - `Pagination` - Navigate through pages of content
  - `ThemeSelector` - Toggle between light and dark themes

## Usage

```jsx
import React from 'react';

import { Button, Card, Flex } from 'tw-react-components';

function MyComponent() {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-medium">Card Title</h2>
      <p className="mt-2 text-sm text-gray-500">Card content goes here</p>

      <Flex className="mt-4 justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </Flex>
    </Card>
  );
}
```

## Development

This project uses [Nx](https://nx.dev) as a build system and [Yarn](https://yarnpkg.com/) as a package manager.

```bash
# Install dependencies
yarn

# Start the development server
yarn start

# Build the library
yarn build

# Run tests
yarn test

# Lint the code
yarn lint

# Format the code
yarn prettier:fix
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
