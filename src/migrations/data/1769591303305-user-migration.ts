import { IAddress } from '../../person/model/address.model';
import { IPerson } from '../../person/model/person.model';

interface UserMockData {
  email: string;
  password: string;
  role: string;
  person: IPerson;
  address: IAddress;
}

export const users: UserMockData[] = [
  {
    email: 'marcin@gmail.com',
    password: 'Pass123#',
    role: 'admin',
    person: {
      name: 'John',
      surname: 'Doe',
      phone: 123456789,
      photo: 'photo.jpg',
    },
    address: {
      street: '123 Main St',
      city: 'New York',
      country: 'USA',
      number: '123',
      zipCode: '10001',
    },
  },
  {
    email: 'gajda@gmail.com',
    password: 'Pass123#',
    role: 'user',
    person: {
      name: 'Gajda',
      surname: 'Gajda',
      phone: 123456789,
      photo: 'photo.jpg',
    },
    address: {
      street: 'młynarska',
      city: 'warszawa',
      country: 'Polska',
      number: '123',
      zipCode: '10001',
    },
  },
  {
    email: 'irena@gmail.com',
    password: 'Pass123#',
    role: 'teacher',
    person: {
      name: 'Irena',
      surname: 'Gajda',
      phone: 123456789,
      photo: 'photo.jpg',
    },
    address: {
      street: 'sufczyn',
      city: 'sufczyn',
      country: 'Polska',
      number: '123',
      zipCode: '10001',
    },
  },
  {
    email: 'zuza@gmail.com',
    password: 'Pass123#',
    role: 'student',
    person: {
      name: 'Zuzannna',
      surname: 'Gajda',
      phone: 123456789,
      photo: 'photo.jpg',
    },
    address: {
      street: 'krzywaczka',
      city: 'krzywaczka',
      country: 'Polska',
      number: '123',
      zipCode: '10001',
    },
  },
];
