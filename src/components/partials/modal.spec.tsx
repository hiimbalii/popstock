import Modal from './modal';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';

/// Dialog is tested by the radix team so here we only test if the props are gucci
/// criteria:
/// * should render button
/// * on click should render modal
/// * modal should have expected content and title

describe('<Modal />', () => {
  const modal = (
    <Modal openButton={<button>open</button>} title='modal'>
      <p>child</p>
    </Modal>
  );
  it('should render out only the button by default', () => {
    render(modal);

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button')).toHaveTextContent('open');
  });
  it('should render dialog after button is clicked', async () => {
    render(modal);

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
  it('should have expected title and content', async () => {
    render(modal);

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('modal')).toBeInTheDocument();
    expect(screen.getByText('child')).toBeInTheDocument();
  });
});
