import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import NavigationDropdown from '@/components/NavigationDropdown';
import * as api from '@/lib/api';
import { BrowserRouter } from 'react-router-dom';

describe('NavigationDropdown', () => {
  it('renders loading state and then tour items', async () => {
    const mockTours = [
      { id: '1', title: 'Test Tour', description: '', category: 'kerala travels', duration: 3, image: '', slug: 'test-tour' }
    ];

    jest.spyOn(api, 'getToursByCategory').mockResolvedValueOnce(mockTours as any);

    render(
      <BrowserRouter>
        <NavigationDropdown name="Kerala Travels" href="/tours?category=kerala" category="kerala travels" />
      </BrowserRouter>
    );

    // Hover to open dropdown
    const link = screen.getByText('Kerala Travels');
    link.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

    await waitFor(() => expect(api.getToursByCategory).toHaveBeenCalled());

    expect(await screen.findByText('Test Tour')).toBeInTheDocument();
  });
});


