'use client';
import { Badge, Flex } from '@radix-ui/themes';
import React from 'react';
import { LostIndex, Index, Move, Axis, Pole, Robot } from './utils/types';
import {
  convertToAxis,
  isCurrentIndexLost,
  convertToPole,
  movingAction,
  rotate,
} from './utils/functions';

export type Props = {
  gridArea: Index;
  robots: Robot[];
};

const FindRobots = ({ gridArea, robots }: Props): JSX.Element => {
  const lostIndexs: LostIndex[] = [];
  const result = new Array(robots.length);

  for (let i = 0; i < robots.length; i++) {
    let actions = robots[i].move.split('');
    let currIndex: Index = [robots[i].x, robots[i].y];
    let currAxis = convertToAxis(robots[i].direction);

    for (let j = 0; j < actions.length; j++) {
      let currAction = actions[j] as Move | 'F';
      const isScentIndexWithSameAxis = lostIndexs.find(
        (robot) =>
          robot.index[0] === currIndex[0] &&
          robot.index[1] === currIndex[1] &&
          robot.axis === currAxis
      );

      if (isCurrentIndexLost(currIndex, gridArea)) {
        const lastValidIndex: Index = [
          Math.min(Math.max(currIndex[0], 0), gridArea[0]),
          Math.min(Math.max(currIndex[1], 0), gridArea[1]),
        ];
        lostIndexs.push({ robotId: i, index: lastValidIndex, axis: currAxis });
        result[i] = {
          robotId: i,
          index: lastValidIndex,
          direction: convertToPole(currAxis),
          lost: true,
        };

        break;
      } else if (currAction === 'F') {
        if (isScentIndexWithSameAxis) {
          continue;
        }
        currIndex = movingAction(currAxis, currIndex);
      } else {
        currAxis = rotate(currAction, currAxis);
      }
      result[i] = {
        robotId: i,
        index: currIndex,
        direction: convertToPole(currAxis),
      };
    }
  }

  return (
    <div>
      <div>
        <Badge variant='solid' size='3'>
          Current Grid Area: {gridArea[0]}, {gridArea[1]}
        </Badge>
        {result.map((x) => {
          return (
            <Flex key={x.robotId} className='py-4 flex-col'>
              <Badge variant='surface' size='2'>
                Robot Number: {x.robotId + 1}
              </Badge>
              <div className='flex'>
                <div className='pr-4'>X: {x.index[0]}</div>
                <div className='pr-4'>Y: {x.index[1]}</div>
                <div className='pr-4'>Direction: {x.direction}</div>
                {x.lost && (
                  <div className='font-semibold text-red-700'>Lost</div>
                )}
              </div>
            </Flex>
          );
        })}
      </div>
    </div>
  );
};

export default FindRobots;
