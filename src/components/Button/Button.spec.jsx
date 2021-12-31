import { Button } from '.';

import userEvents from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('<Button />', () => {
  it('should render the button with the text "Load more"', () => {
    const fn = jest.fn();
    // Render an component in test DOM
    render(<Button text="Load more" onClick={fn} />);
    // Numbers of cases that should be run in this test
    expect.assertions(1);

    // Get an element from test DOM
    const button = screen.getByRole('button', { name: /load more/i });

    // Verify if the values match, if not it will fail this test
    expect(button).toHaveAttribute('class', 'button');
  });

  it('should call function on button click', () => {
    // Create an mock function to be used in tests
    const fn = jest.fn();

    render(<Button text="Load more" onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more/i });

    // It fire an event in a element to be tested there two ways
    // fireEvent.click(button); Way 1
    userEvents.click(button); // Way 2

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    const fn = jest.fn();
    render(<Button text="Load more" disabled={true} onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeDisabled();
  });

  it('should be enabled when disabled is false', () => {
    const fn = jest.fn();
    render(<Button text="Load more" disabled={false} onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeEnabled();
  });

  it('should match snapshot', () => {
    const fn = jest.fn();

    const { container } = render(<Button text="Load more" onClick={fn} disabled={false} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
