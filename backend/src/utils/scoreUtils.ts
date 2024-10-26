const invertScore = (score: number): number => {
  const inversionMap: { [key: number]: number } = {
      1: 6,
      2: 5,
      3: 4,
      4: 3,
      5: 2,
      6: 1,
  };
  return inversionMap[score] || score;
};

const calculateScore = (responses: number[]): number => {
  const invertIndices = [0, 4, 5, 9, 12, 13, 18, 22, 23, 26, 27, 28];
  let total = 0;

  responses.forEach((response, index) => {
      if (invertIndices.includes(index)) {
          total += invertScore(response);
      } else {
          total += response;
      }
  });

  return total / responses.length;
};

export { calculateScore };