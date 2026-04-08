const sleep = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export const fakeApi = {
  get: async <T>(factory: () => T, delayMs = 400): Promise<T> => {
    await sleep(delayMs);
    return factory();
  },
  post: async <T>(factory: () => T, delayMs = 600): Promise<T> => {
    await sleep(delayMs);
    return factory();
  },
};
