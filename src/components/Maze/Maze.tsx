import { useRecoilValue } from 'recoil';

import Depth from 'components/Depth';
import Grid from 'components/Grid';
import Lines from 'components/Lines';
import Nodes from 'components/Nodes';
import Walls from 'components/Walls';
import { configAtom } from 'services/config';

const Maze = () => {
  const config = useRecoilValue(configAtom);

  return (
    <svg width={config.width} height={config.height}>
      <Grid />
      <Depth />
      <Lines />
      <Nodes />
      <Walls />
    </svg>
  );
};

export default Maze;
