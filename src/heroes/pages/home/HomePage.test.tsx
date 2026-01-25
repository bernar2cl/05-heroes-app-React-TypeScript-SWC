import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { HomePage } from './HomePage';
import { MemoryRouter } from 'react-router';
import { usePaginatedHero } from '@/heroes/hooks/usePaginatedHero';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoriteHeroProvider } from '@/heroes/context/FavoriteHeroContext';

vi.mock('@/heroes/hooks/usePaginatedHero');
const mockUsePaginatedHero = vi.mocked(usePaginatedHero);

mockUsePaginatedHero.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true,
} as unknown as ReturnType<typeof usePaginatedHero>);

const queryCliente = new QueryClient();

const renderHomePage = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <FavoriteHeroProvider>
        <QueryClientProvider client={queryCliente}>
          <HomePage />
        </QueryClientProvider>
      </FavoriteHeroProvider>
    </MemoryRouter>,
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render HomePage with default values', () => {
    const { container } = renderHomePage();
    expect(container).toMatchSnapshot();
  });

  test('should call usePaginatedHero with default values', () => {
    renderHomePage();
    expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 6, 'all');
  });

  test('should call usePaginatedHero with custom query params', () => {
    renderHomePage(['/?page=2&limit=10&category=villains']);
    expect(mockUsePaginatedHero).toHaveBeenCalledWith(2, 10, 'villains');
  });

  test('should called usePaginatedHero with default page and same limit on tab', () => {
    renderHomePage(['/?tab=favorites&page=2&limit=10']);
    // expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 6, 'all');
    const [, , , villainsTab] = screen.getAllByRole('tab');

    fireEvent.click(villainsTab);

    expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 10, 'villain');
  });
});
