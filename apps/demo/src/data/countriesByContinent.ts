import { SelectItem } from 'tw-react-components';

export const countriesByContinent = {
  Asia: ['Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh'],
  Europe: ['Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium'],
  Africa: ['Algeria', 'Angola', 'Benin', 'Botswana', 'British Indian Ocean Territory'],
  Oceania: [
    'American Samoa',
    'Australia',
    'Christmas Island',
    'Cocos (Keeling) Islands',
    'Cook Islands',
  ],
  'North America': ['Anguilla', 'Antigua and Barbuda', 'Aruba', 'Bahamas', 'Barbados', 'Belize'],
  Antarctica: [
    'Antarctica',
    'Bouvet Island',
    'French Southern territories',
    'Heard Island and McDonald Islands',
    'South Georgia and the South Sandwich Islands',
  ],
  'South America': ['Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia'],
};

export const countriesItems: SelectItem<string, true>[] = Object.entries(countriesByContinent).map(
  ([continent, countries]) => ({
    id: continent,
    label: continent,
    group: true,
    items: countries.map((country) => ({ id: country, value: country, label: country })),
  }),
);
