import { test, describe, expect } from 'vitest';
import { getHeroAction } from './get-hero.action';

describe('getHeroAction', () => {
  test('should fetch hero data and return with complete image url', async () => {
    const result = await getHeroAction('clark-kent');

    expect(result.image).toContain('http');
    expect(Array.isArray(result.powers)).toBe(true);
    expect(result).toStrictEqual({
      id: expect.any(String),
      name: expect.any(String),
      slug: expect.any(String),
      alias: 'Superman',
      powers: expect.any(Array),
      description:
        'El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.',
      strength: 10,
      intelligence: 8,
      speed: 9,
      durability: 10,
      team: 'Liga de la Justicia',
      image: 'http://localhost:3001/images/1.jpeg',
      firstAppearance: '1938',
      status: 'Active',
      category: 'Hero',
      universe: 'DC',
    });
  });

  test('should throw an error if hero is not founds', async () => {
    const idSlug = 'batman-2';
    const result = await getHeroAction(idSlug).catch((error) => {
      expect(error).toBeDefined();
      expect(error.message).toBe('Request failed with status code 404');
    });

    expect(result).toBeUndefined();
  });
});
