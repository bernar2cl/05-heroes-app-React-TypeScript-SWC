import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import SearchPage from './SearchPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import { useSearch } from '@/heroes/hooks/useSearch';
import type { Hero } from '@/heroes/types/hero.interface';

vi.mock('@/heroes/hooks/useSearch');
const mockUseSearch = vi.mocked(useSearch);

vi.mock('@/components/custom/CustomJumbotrom', () => ({
  CustomJumbotrom: () => <div data-testid="custom-jumbotrom"></div>,
}));

vi.mock('./ui/SearchControls', () => ({
  SearchControls: () => <div data-testid="search-controls"></div>,
}));

vi.mock('@/heroes/components/HeroGrid', () => ({
  HeroGrid: ({ heroes }: { heroes: Hero[] }) => (
    <div data-testid="hero-grid">
      {heroes.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </div>
  ),
}));

mockUseSearch.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true,
} as unknown as ReturnType<typeof useSearch>);

const queryCliente = new QueryClient();

const renderSearchPage = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryCliente}>
        <SearchPage />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

describe('SearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render SearchPage with default values', () => {
    renderSearchPage();

    expect(mockUseSearch).toHaveBeenCalled();
    expect(mockUseSearch).toHaveBeenCalledWith({
      name: '',
      strength: '',
    });
  });

  test('should render CustomJumbotrom with default values', () => {
    renderSearchPage();

    expect(screen.getByTestId('custom-jumbotrom')).toBeDefined();
  });

  test('should create a MatchSnapshot to SearchPage', () => {
    const { container } = renderSearchPage();

    expect(container).toMatchSnapshot();
  });

  test('should call search action with name parameter', () => {
    const { container } = renderSearchPage(['/search?name=superman']);

    expect(mockUseSearch).toHaveBeenCalled();
    expect(mockUseSearch).toHaveBeenCalledWith({
      name: 'superman',
      strength: '',
    });

    expect(container).toMatchSnapshot();
  });

  test('should call search action with strength parameter', () => {
    const { container } = renderSearchPage(['/search?strength=5']);

    expect(mockUseSearch).toHaveBeenCalled();
    expect(mockUseSearch).toHaveBeenCalledWith({
      name: '',
      strength: '5',
    });

    expect(container).toMatchSnapshot();
  });

  test('should call search action with strength and name parameter', () => {
    const { container } = renderSearchPage(['/search?strength=4&name=batman']);

    expect(mockUseSearch).toHaveBeenCalled();
    expect(mockUseSearch).toHaveBeenCalledWith({
      name: 'batman',
      strength: '4',
    });

    expect(container).toMatchSnapshot();
  });

  test('should render HeroGrid with search results', async () => {
    const mockHeroes = [
      { id: 1, name: 'Clark Kent' } as unknown as Hero,
      { id: 2, name: 'Bruce Wayne' } as unknown as Hero,
    ];

    mockUseSearch.mockReturnValue({
      data: mockHeroes,
      isLoading: false,
      isError: false,
      isSuccess: true,
    } as unknown as ReturnType<typeof useSearch>);

    renderSearchPage();

    await waitFor(() => {
      expect(screen.getByText('Clark Kent')).toBeDefined();
      expect(screen.getByText('Bruce Wayne')).toBeDefined();
    });
  });
});
