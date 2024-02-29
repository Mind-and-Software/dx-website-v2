import {
  fireEvent,
  render,
  type RenderResult,
  waitFor,
} from '@testing-library/react';
import * as React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { AuthContext, AuthProvider } from './AuthContext';
import { AUTHORIZE } from '../../graphql/mutations';

/* eslint-disable no-unused-expressions */

const mocks = [
  {
    request: {
      query: AUTHORIZE,
      variables: { email: 'test@gmail.com', password: 'password' },
    },
    result: {
      data: {
        authorizeResearcher: {
          accessToken: 'test_token1234',
          expiresAt: '2022-09-22T08:30:40.529Z',
          email: 'test@gmail.com',
          user: {
            id: 'testId',
            email: 'test@gmail.com',
            role: 'RESEARCHER',
            researcherGroups: [],
          },
        },
      },
    },
  },
];

jest.spyOn(Storage.prototype, 'setItem');
jest.spyOn(Storage.prototype, 'removeItem');

const TestingComponent = () => {
  const context = React.useContext(AuthContext);
  if (!context || Object.keys(context).length === 0) {
    return <div>No context</div>;
  }
  return <div>Context succesfully detected</div>;
};

describe('testing AuthContext', () => {
  let component: RenderResult;

  it('provides expected AuthContext to child elements', async () => {
    await waitFor(() => {
      component = render(
        <MockedProvider mocks={mocks}>
          <AuthProvider>
            <TestingComponent />
          </AuthProvider>
        </MockedProvider>,
      );
    });
    await waitFor(() => {
      expect(component.getByText('Context succesfully detected')).toBeDefined;
    });
  });

  it('doesnt provide context if component is not wrapped in provider', async () => {
    await waitFor(() => {
      component = render(<TestingComponent />);
    });
    await waitFor(() => {
      expect(component.getByText('No context')).toBeDefined;
    });
  });
});

describe('testing context methods', () => {
  let component: RenderResult;

  const TestComponent = () => {
    const { signIn, signOut, authData } = React.useContext(AuthContext);

    const handleSignIn = async () => {
      await signIn('test@gmail.com', 'password');
    };

    const handleSignOut = () => {
      signOut();
    };

    return (
      <div>
        {authData && <p>{authData.email}</p>}
        <button type="button" onClick={handleSignIn}>
          signIn
        </button>
        <button type="button" onClick={handleSignOut}>
          signOut
        </button>
      </div>
    );
  };

  beforeEach(async () => {
    await waitFor(() => {
      component = render(
        <MockedProvider mocks={mocks}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </MockedProvider>,
      );
    });
  });

  it('adds user to asyncstorage with sign in', async () => {
    const button = await component.getByText('signIn');
    await waitFor(() => fireEvent.click(button));
    await waitFor(
      () => expect(component.getByText('test@gmail.com')).toBeDefined,
      { timeout: 2000 },
    );
    await waitFor(() =>
      expect(localStorage.setItem).toBeCalledWith(
        '@AuthData',
        '{"token":"test_token1234","id":"testId","email":"test@gmail.com","researcherGroups":[],"role":"RESEARCHER"}',
      ),
    );
  });

  it('removes user token from async storage on log out', async () => {
    const button = await component.getByText('signOut');
    await waitFor(() => fireEvent.click(button));
    await waitFor(
      () => expect(localStorage.removeItem).toBeCalledWith('@AuthData'),
      { timeout: 2000 },
    );
  });
});
