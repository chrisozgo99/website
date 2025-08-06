import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Main } from './Main';

describe('Main Component', () => {
  it('renders with React component children', () => {
    render(
      <Main meta={null}>
        <div data-testid="test-children">Children node</div>
      </Main>
    );

    expect(screen.getByTestId('test-children')).toBeInTheDocument();
  });

  it('renders with string children', () => {
    render(<Main meta={null}>String</Main>);

    expect(screen.getByText('String')).toBeInTheDocument();
  });

  it('has a home link that can be clicked', async () => {
    render(<Main meta={null}>Test content</Main>);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();

    // Test that the link is clickable (this would be the equivalent of the play test)
    await userEvent.click(homeLink);
  });
});
