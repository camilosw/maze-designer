import { GetRecoilValue, selector } from 'recoil';

import { getColorId } from 'services/color';
import { MazeNode, nodeAtom } from 'services/maze';
import { nodesAtom } from './nodesAtom';
import { startNodeAtom } from './startNodeAtom';

type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width: number;
};

const makeLine = (
  currentNode: MazeNode,
  get: GetRecoilValue,
  colorId: number = 0,
  previousNodeId?: string,
): Line[] => {
  const hasBranch =
    currentNode.connections.length >= (currentNode.isStart ? 2 : 3);
  let nextColorId = colorId;
  const lines = currentNode.connections
    .filter((connection) => connection !== previousNodeId)
    .map((connection) => {
      const nextNode = get(nodeAtom(connection));
      nextColorId = hasBranch ? nextColorId + 1 : nextColorId;
      const nextLines = makeLine(nextNode, get, nextColorId, currentNode.id);
      const line = {
        x1: currentNode.x,
        y1: currentNode.y,
        x2: nextNode.x,
        y2: nextNode.y,
        color: getColorId(nextColorId),
        width: nextNode.isExitPath ? 4 : 2,
      };
      return [...nextLines, line];
    })
    .flat();

  return lines;
};

export const linesSelector = selector({
  key: 'linesSelector',
  get: ({ get }) => {
    get(nodesAtom);
    const startNode = get(startNodeAtom);
    if (startNode) {
      return makeLine(startNode, get);
    }
  },
});
