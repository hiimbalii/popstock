import {useDebounce} from './useDebounce';
import {act, renderHook, waitFor} from '@testing-library/react';

describe('useDebounce', () => {
  const mockCallback = jest.fn().mockImplementation(newValue => newValue);
  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetAllMocks();
  });
  it('should not call callback immediately', async () => {
    const {
      result: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        current: [_, debouncedRun],
      },
    } = renderHook(() => useDebounce('' as string, mockCallback));
    await act(async () => debouncedRun('test'));
    jest.advanceTimersByTime(300);
    expect(mockCallback).not.toHaveBeenCalled();
  });
  it('should call callback after debounce time (500ms)', async () => {
    const {
      result: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        current: [_, debouncedRun],
      },
    } = renderHook(() => useDebounce('' as string, mockCallback));
    await act(async () => {
      debouncedRun('test');
      jest.advanceTimersByTime(500);
      expect(mockCallback).toHaveBeenCalled();
    });
  });
  it('should only call callback once after debounce period finished', async () => {
    const {
      result: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        current: [_, debouncedRun],
      },
    } = renderHook(() => useDebounce('' as string, mockCallback));
    await act(async () => {
      debouncedRun('test');
      debouncedRun('test2');
      debouncedRun('test3');
      debouncedRun('test4');
    });
    jest.advanceTimersByTime(600);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('test4');
  });
  it('should return the up to date value and a method to set the inner value', async () => {
    const {result} = renderHook(() => useDebounce('' as string, mockCallback));
    const debouncedRun = result.current[1];
    await act(async () => {
      debouncedRun('test');
      debouncedRun('test2');
    });
    await waitFor(() => {
      expect(result.current[0]).toBe('test2');
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });
  });
});
