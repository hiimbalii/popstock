import TrackSummary from './track';
import {renderWithProvider, trackMock} from '../../common/utils/test-utils';
import {screen} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

jest.mock('nanoid', () => ({
  nanoid: () => 1,
}));
describe('<TrackSummary />', () => {
  it('should render track data out correcctly', () => {
    renderWithProvider(<TrackSummary {...trackMock} />);

    expect(screen.getByText('song-title')).toBeInTheDocument();
    expect(screen.getByText(/artist-name -.*/i)).toBeInTheDocument();
    expect(screen.getByText(/.*- album-name/i)).toBeInTheDocument();
  });
  it('should render cover art with aria-hidden', () => {
    renderWithProvider(<TrackSummary {...trackMock} />);

    expect(screen.getByAltText('album cover art')).toBeInTheDocument();
    expect(screen.getByAltText('album cover art')).toHaveAttribute(
      'aria-hidden',
    );
  });

  it('should derive price from popularity', () => {
    renderWithProvider(<TrackSummary {...trackMock} />);

    expect(screen.getByTestId('price')).toHaveTextContent(
      trackMock.popularity.toString(),
    );
  });
  // TODO: Move this functionality somewhere outside of presenation layer
  it('should have price tag of at least 1', () => {
    const zeroPopularity = {...trackMock, popularity: 0};
    renderWithProvider(<TrackSummary {...zeroPopularity} />);

    expect(screen.getByTestId('price')).toHaveTextContent('1');
  });

  it('should not have modal open by default', () => {
    renderWithProvider(<TrackSummary {...trackMock} />);

    expect(screen.queryByRole('dialog')).toBeNull();
  });
  it('should open buy modal on clicking the button', async () => {
    renderWithProvider(<TrackSummary {...trackMock} />);

    await userEvent.click(screen.getByText('Buy'));

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });
});
