// https://gist.github.com/vlio20/ba129972980c4d3474a551d8ee8e3d8e/revisions

function batchPromise(
  proms: (() => Promise<any>)[],
  batchSize: number
): Promise<void> {
  return chunck(proms, batchSize).reduce((step: Promise<any>, chunck) => {
    return step.then(() => {
      return Promise.all(chunck.map(fp => fp()));
    });
  }, Promise.resolve());
}

function chunck<T>(array: T[], batchSize = 5): T[][] {
  const chunked = [];
  for (let i = 0; i < array.length; i += batchSize) {
    chunked.push(array.slice(i, i + batchSize));
  }

  return chunked;
}

export default batchPromise;
