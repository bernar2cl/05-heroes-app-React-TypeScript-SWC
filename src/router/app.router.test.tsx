import { describe, test, expect, vi } from 'vitest';
import { appRouter } from './app.router';
import { render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useParams,
} from 'react-router';

// import { AdminLayout } from '@/admin/layouts/AdminLayout';
// import { AdminPage } from '@/admin/pages/AdminPage';
// import { HeroesLayout } from '@/heroes/layouts/HeroesLayout';
// import { HeroPage } from '@/heroes/pages/hero/HeroPage';
// import { HomePage } from '@/heroes/pages/home/HomePage';

vi.mock('@/heroes/layouts/HeroesLayout', () => ({
  HeroesLayout: () => (
    <div data-testid="heroes-layout">
      <Outlet />
    </div>
  ),
}));

vi.mock('@/heroes/pages/home/HomePage', () => ({
  HomePage: () => <div data-testid="home-page"></div>,
}));

vi.mock('@/heroes/pages/hero/HeroPage', () => ({
  HeroPage: () => {
    const { idSlug = '' } = useParams();

    return <div data-testid="hero-page">Heropage - {idSlug}</div>;
  },
}));

vi.mock('@/heroes/pages/search/SearchPage', () => ({
  default: () => <div data-testid="search-page"></div>,
}));

describe('appRouter', () => {
  test('should be configurted as expected', () => {
    expect(appRouter.routes).toMatchSnapshot();
  });

  test('should render home page at root path', () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('home-page')).toBeDefined();
  });

  test('should render hero page at /heroes/:idSlug path', () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/heroes/superman'],
    });

    render(<RouterProvider router={router} />);

    //screen.debug();
    expect(screen.getByTestId('hero-page').innerHTML).toContain('superman');
  });

  test('should render search page at /search path', async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/search'],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByTestId('search-page')).toBeDefined();

    //screen.debug();
  });
  test('should redirect to home page for unknown routes', async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/otra-pagina-rara'],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByTestId('home-page')).toBeDefined();

    //screen.debug();
  });
});
