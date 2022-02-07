export const createWaitPromise = (action, waitBeforeMsecs, waitAfterMsecs?): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ret = action();
      if (waitAfterMsecs) {
        setTimeout(() => resolve(ret), waitAfterMsecs);
      } else {
        resolve(ret);
      }
    }, waitBeforeMsecs);
  });
};
