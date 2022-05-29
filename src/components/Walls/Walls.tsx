import React from 'react';
import { useRecoilValue } from 'recoil';

import { wallsSelector } from 'services/maze/wallsSelector';

const Walls = () => {
  const walls = useRecoilValue(wallsSelector);

  return (
    <>
      {Object.entries(walls).map(([key, wall]) => (
        <line
          key={key}
          x1={wall[0]}
          y1={wall[1]}
          x2={wall[2]}
          y2={wall[3]}
          strokeWidth="2"
          stroke="#212121"
        />
      ))}
    </>
  );
};

export default Walls;
