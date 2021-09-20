import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import SignIn from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInForm', () => {
    it('submits data correctly', async () => {
      const onSubmit = jest.fn();

      const {
        getByPlaceholderText,
        getByTestId,
      } = render(<SignIn handleSubmit={onSubmit} />);
      const usernameInput = getByPlaceholderText('Username');
      const passwordInput = getByPlaceholderText('Password');
      const submitButton = getByTestId('signin-button');

      fireEvent.changeText(usernameInput, 'matti');
      fireEvent.changeText(passwordInput, 'password');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);

        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'matti',
          password: 'password',
        });
      });
    });
  });
});
