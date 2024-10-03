// src/components/UserList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import UserList from './UserList';

jest.mock('axios');

test('fetches and displays users', async () => {
  const users = [
    { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    { _id: '2', firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' },
  ];

  axios.get.mockResolvedValue({ data: users });

  render(<UserList />);

  const userItems = await screen.findAllByRole('listitem');
  expect(userItems).toHaveLength(2);
  expect(userItems[0]).toHaveTextContent('John Doe - john.doe@example.com');
  expect(userItems[1]).toHaveTextContent('Jane Doe - jane.doe@example.com');
});
