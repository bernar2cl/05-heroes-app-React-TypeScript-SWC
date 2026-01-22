import { CustomJumbotrom } from '@/components/custom/CustomJumbotrom';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { useSearchParams } from 'react-router';
import { useSearch } from '@/heroes/hooks/useSearch';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') ?? '';
  const strength = searchParams.get('strength') ?? '';

  const { data: heroSearch = [] } = useSearch({
    name: name,
    strength: strength,
  });

  return (
    <>
      <CustomJumbotrom
        title="Búsqueda de SuperHéroes"
        description="Descubre, explora y administra super héroes"
      />
      <CustomBreadcrumbs
        currentPage="Buscador de Héroes"
        // breadcrumb={[
        //   { label: 'Home1', to: '/' },
        //   { label: 'Home2', to: '/' },
        //   { label: 'Home3', to: '/' },
        // ]}
      />

      {/* State Dashboard */}
      <HeroStats />

      {/* Filter and search */}
      <SearchControls />

      <HeroGrid heroes={heroSearch} />
    </>
  );
};

export default SearchPage;
