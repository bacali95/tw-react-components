import { fireEvent } from '@testing-library/dom';
import { renderHook } from '@testing-library/react';
import { createRef } from 'react';

import { useOutsideClick } from '../useOutsideClick';

describe('useOutsideClick hook', () => {
  let containerRef: React.RefObject<HTMLDivElement | null>;
  let containerElement: HTMLDivElement;
  let outsideElement: HTMLDivElement;
  let callbackMock: jest.Mock;

  beforeEach(() => {
    // Create DOM elements for testing
    containerElement = document.createElement('div');
    containerElement.setAttribute('data-testid', 'container');
    document.body.appendChild(containerElement);

    // Create an element outside the container
    outsideElement = document.createElement('div');
    outsideElement.setAttribute('data-testid', 'outside');
    document.body.appendChild(outsideElement);

    // Create a ref that points to the container
    containerRef = createRef();
    containerRef.current = containerElement;

    // Create a mock for the callback
    callbackMock = jest.fn();
  });

  afterEach(() => {
    // Clean up DOM
    if (containerElement.parentNode) {
      containerElement.parentNode.removeChild(containerElement);
    }
    if (outsideElement.parentNode) {
      outsideElement.parentNode.removeChild(outsideElement);
    }
    jest.clearAllMocks();
  });

  it('adds mousedown event listener to document', () => {
    // Spy on addEventListener
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');

    // Render the hook
    renderHook(() => useOutsideClick(containerRef, callbackMock));

    // Verify event listener was added
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));

    addEventListenerSpy.mockRestore();
  });

  it('removes event listener on unmount', () => {
    // Spy on removeEventListener
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    // Render the hook and get the unmount function
    const { unmount } = renderHook(() => useOutsideClick(containerRef, callbackMock));

    // Unmount the hook
    unmount();

    // Verify event listener was removed
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });

  it('calls callback when clicking outside the referenced element', () => {
    // Render the hook
    renderHook(() => useOutsideClick(containerRef, callbackMock));

    // Simulate a click on the outside element
    fireEvent.mouseDown(outsideElement);

    // Verify callback was called
    expect(callbackMock).toHaveBeenCalledTimes(1);
  });

  it('does not call callback when clicking inside the referenced element', () => {
    // Render the hook
    renderHook(() => useOutsideClick(containerRef, callbackMock));

    // Simulate a click on the container element
    fireEvent.mouseDown(containerElement);

    // Verify callback was not called
    expect(callbackMock).not.toHaveBeenCalled();
  });

  it('does not call callback when clicking on a child of the referenced element', () => {
    // Create a child element inside the container
    const childElement = document.createElement('div');
    childElement.setAttribute('data-testid', 'child');
    containerElement.appendChild(childElement);

    // Render the hook
    renderHook(() => useOutsideClick(containerRef, callbackMock));

    // Simulate a click on the child element
    fireEvent.mouseDown(childElement);

    // Verify callback was not called
    expect(callbackMock).not.toHaveBeenCalled();
  });

  it('handles null ref correctly', () => {
    // Create a ref without a current value
    const nullRef = createRef<HTMLDivElement>();

    // Render the hook with a null ref
    renderHook(() => useOutsideClick(nullRef, callbackMock));

    // Simulate a click on the document
    fireEvent.mouseDown(document.body);

    // Since the ref is null, the callback should not be called
    expect(callbackMock).not.toHaveBeenCalled();
  });

  it('handles different events within the same component', () => {
    // Render the hook
    renderHook(() => useOutsideClick(containerRef, callbackMock));

    // Simulate multiple different events
    fireEvent.mouseUp(outsideElement); // Not mousedown, so callback shouldn't be called
    expect(callbackMock).not.toHaveBeenCalled();

    fireEvent.click(outsideElement); // Not mousedown, so callback shouldn't be called
    expect(callbackMock).not.toHaveBeenCalled();

    fireEvent.mouseDown(outsideElement); // This should trigger the callback
    expect(callbackMock).toHaveBeenCalledTimes(1);
  });
});
