import NetInfo from '@react-native-community/netinfo';
import { checkInternet } from '../checkInternet';

// Mock NetInfo module
jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(),
}));

describe('checkInternet', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns true when device is connected and internet is reachable', async () => {
    (NetInfo.fetch as jest.Mock).mockResolvedValue({
      isConnected: true,
      isInternetReachable: true,
    });

    const result = await checkInternet();

    expect(result).toBe(true);
    expect(NetInfo.fetch).toHaveBeenCalledTimes(1);
  });

  it('returns false when device is not connected', async () => {
    (NetInfo.fetch as jest.Mock).mockResolvedValue({
      isConnected: false,
      isInternetReachable: true,
    });

    const result = await checkInternet();

    expect(result).toBe(false);
  });

  it('returns false when internet is not reachable', async () => {
    (NetInfo.fetch as jest.Mock).mockResolvedValue({
      isConnected: true,
      isInternetReachable: false,
    });

    const result = await checkInternet();

    expect(result).toBe(false);
  });

  it('returns true when isInternetReachable is null but connected', async () => {
    (NetInfo.fetch as jest.Mock).mockResolvedValue({
      isConnected: true,
      isInternetReachable: null,
    });

    const result = await checkInternet();

    expect(result).toBe(true);
  });
});
