import { render, screen } from '@testing-library/react';

import Index from '@/pages/index';

describe('Index page', () => {
  describe('Render method', () => {
    it('should say hi', () => {
      render(<Index />);

      const heading = screen.getByText(/Hi/);

      expect(heading).toBeInTheDocument();
    });
  });
});
