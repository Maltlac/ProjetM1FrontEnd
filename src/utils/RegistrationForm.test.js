// src/components/RegistrationForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationForm from './RegistrationForm';

test('renders form and validates inputs', () => {
  render(<RegistrationForm refreshUsers={() => {}} />);

  const firstNameInput = screen.getByLabelText(/First Name/i);
  fireEvent.change(firstNameInput, { target: { value: 'John' } });
  expect(firstNameInput.value).toBe('John');

  const submitButton = screen.getByText(/Save/i);
  expect(submitButton).toBeDisabled();

  const lastNameInput = screen.getByLabelText(/Last Name/i);
  fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

  const emailInput = screen.getByLabelText(/Email/i);
  fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

  const birthDateInput = screen.getByLabelText(/Birth Date/i);
  fireEvent.change(birthDateInput, { target: { value: '2000-01-01' } });

  const cityInput = screen.getByLabelText(/City/i);
  fireEvent.change(cityInput, { target: { value: 'Paris' } });

  const postalCodeInput = screen.getByLabelText(/Postal Code/i);
  fireEvent.change(postalCodeInput, { target: { value: '75001' } });

  expect(submitButton).not.toBeDisabled();
});
