import Button, {ButtonProps} from './button';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/// Acceptance criterias:
/// * Render HTML button with text or component as child
/// * Handle events like a <button> element
/// * Render different styles for different versions

describe('<Button />', () => {
  const clickListener = jest.fn();
  const defaultProps: ButtonProps = {
    children: 'button',
    onClick: clickListener,
  };
  const arbitraryButton: ButtonProps = {
    ...defaultProps,
    children: (
      <img
        src='https://placehold.co/400'
        alt='placeholder'
        data-testid='random-content'
      />
    ),
  };

  it('should render element with a plain string as child', () => {
    render(<Button {...defaultProps} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
    expect(screen.getByRole('button')).toHaveTextContent('button');
  });
  it('should render element with arbitrary HTML element as child', () => {
    render(<Button {...arbitraryButton} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
    expect(screen.getByTestId('random-content')).toBeInTheDocument();
  });
  it('should listen to clicks', async () => {
    render(<Button {...defaultProps} />);

    userEvent.click(screen.getByRole('button'));

    expect(clickListener).toBeCalledTimes(1);
  });

  it('should render secondary style by default', () => {
    render(<Button {...defaultProps} />);

    expect(screen.getByRole('button')).toHaveClass('bg-gray-600');
  });
  it('should render primary style', () => {
    render(<Button {...defaultProps} color='primary' />);

    expect(screen.getByRole('button')).toHaveClass('bg-green-500');
  });
});
