// This file is automatically included by Jest when running tests
import '@testing-library/jest-dom';

global.structuredClone = (v) => JSON.parse(JSON.stringify(v));

// Mock ResizeObserver for react-resizable-panels
global.ResizeObserver = class ResizeObserver {
  constructor(cb: ResizeObserverCallback) {
    // Store callback for potential future use
    (this as any).cb = cb;
  }
  observe() {
    // Mock implementation
  }
  unobserve() {
    // Mock implementation
  }
  disconnect() {
    // Mock implementation
  }
} as typeof ResizeObserver;
