import { render, screen } from '@testing-library/react';

import About from '@/pages/about';

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe('About page', () => {
  describe('Render method', () => {
    it('should say "About Me"`', () => {
      render(<About test />);

      const paragraph = screen.getByText(/About Me/);

      expect(paragraph).toBeInTheDocument();
    });
  });
});
