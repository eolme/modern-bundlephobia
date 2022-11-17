import { default as timezones } from 'timezones.json';
import { default as countries } from 'country-json/src/country-by-capital-city.json';

const findPossible = (possible: string) => {
  return timezones.find((info) => info.utc.includes(possible));
};

const findCity = (city: string) => {
  return timezones.find((info) =>
    info.text.includes(city) ||
    info.utc.some((utc) => utc.includes(city)));
};

const findCountry = (country: string) => {
  return countries.find((info) => info.country === country);
};

export const timezone = (possible = '', city = '', country = '') => {
  if (possible.length > 0) {
    const byPossible = findPossible(possible);

    if (typeof byPossible !== 'undefined') {
      return byPossible.offset;
    }
  }

  if (city.length > 0) {
    const byCity = findCity(city);

    if (typeof byCity !== 'undefined') {
      return byCity.offset;
    }
  }

  if (country.length > 0) {
    const byCountry = findCountry(country);

    if (
      typeof byCountry === 'undefined' ||
    byCountry.city === null
    ) {
      return 0;
    }

    const byCapital = findCity(byCountry.city);

    if (typeof byCapital !== 'undefined') {
      return byCapital.offset;
    }
  }

  return 0;
};
