import { faker } from '@faker-js/faker';
import companyData from '../test-data/companyData.json';

export interface CompanyData {
  name: string;
  website: string;
  street: string;
  city: string;
  state: string;
  postCode: string;
  phone: string;
  email: string;
  description: string;
  industry: string;
  employees: string;
}

//create new company data
export const generateCompanyData = (): CompanyData => {
  return {
    ...companyData,

    name: faker.company.name(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
  };
};

//update company data
export const generateUpdatedCompanyData = (): Partial<CompanyData> => {
  return {
    website: faker.internet.url(),
    description: faker.company.catchPhrase(),

    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    postCode: faker.location.zipCode(),
  };
};