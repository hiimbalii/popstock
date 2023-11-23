import Tile, {TileProps, TileTitle} from './tile';
import {render, screen} from '@testing-library/react';

describe('<Tile />', () => {
  const defaultProps: TileProps = {
    children: (
      <>
        <p>Child 1</p>
        <p>Child 2</p>
      </>
    ),
  };
  it('should render children', () => {
    render(<Tile {...defaultProps} />);

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
  it('should render with default classes without passing in anything', () => {
    render(<Tile {...defaultProps} />);

    expect(screen.getByTestId('tile')).toHaveClass('bg-gray-800');
  });
  it('should render with default and passed in classes', () => {
    render(<Tile {...defaultProps} className='test-class' />);

    expect(screen.getByTestId('tile')).toHaveClass('bg-gray-800');
    expect(screen.getByTestId('tile')).toHaveClass('test-class');
  });
});

/// Criterias
/// * Render child (mostly sanity check)
describe('<TileTitle />', () => {
  it('should render children', () => {
    render(
      <TileTitle>
        <span data-testid='child' />
        Title
      </TileTitle>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
  });
});
