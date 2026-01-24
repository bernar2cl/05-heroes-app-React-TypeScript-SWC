import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { CustomPagination } from './CustomPagination';
import { MemoryRouter } from 'react-router';
import type { PropsWithChildren } from 'react';

vi.mock('../ui/button', () => ({
  Button: ({ children, ...props }: PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}));

const renderWithRouter = (
  component: React.ReactElement,
  initialEntries?: string[],
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>,
  );
};

describe('CustomPagination', () => {
  test('should render component with default values', () => {
    renderWithRouter(<CustomPagination totalPages={5} />);

    expect(screen.getByText('Anteriores')).toBeDefined();
    expect(screen.getByText('Siguientes')).toBeDefined();

    const pag = [1, 2, 3, 4, 5];
    pag.forEach((p) => expect(screen.getByText(p.toString())).toBeDefined());
  });

  test('should disabled previous button when page is 1', () => {
    renderWithRouter(<CustomPagination totalPages={5} />);

    const previosButton = screen.getByText('Anteriores');
    expect(previosButton.getAttributeNames()).toContain('disabled');
  });

  test('should disabled next button when we are in the last page', () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=5']);

    const nextButton = screen.getByText('Siguientes');

    expect(nextButton.getAttributeNames()).toContain('disabled');
  });

  test('should disabled button 3 when we are in page 3', () => {
    renderWithRouter(<CustomPagination totalPages={10} />, ['/?page=3']);

    const Button2 = screen.getByText('2');
    const Button3 = screen.getByText('3');

    expect(Button2.getAttribute('variant')).toBe('outline');
    expect(Button3.getAttribute('variant')).toBe('default');
  });

  test('should change page when click on number button', () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=3']);

    const Button2 = screen.getByText('2');
    const Button3 = screen.getByText('3');

    expect(Button2.getAttribute('variant')).toBe('outline');
    expect(Button3.getAttribute('variant')).toBe('default');

    fireEvent.click(Button2);

    expect(Button2.getAttribute('variant')).toBe('default');
    expect(Button3.getAttribute('variant')).toBe('outline');
  });
});
