'use client';
import React from 'react';

interface Robot {
  x: number;
  y: number;
  direction: string;
  move: string;
}

interface Stack {
  robotNo: number;
  xAxis: number;
  yAxis: number;
  direction: string;
}

type Props = {
  gridArea: Index;
  robots: Robot[];
};
type Move = 'L' | 'R';
type Axis = '+y' | '-y' | '+x' | '-x';
type Index = [number, number];
type LostIndex = {
  robotId: number;
  index: Index;
  axis: Axis;
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
          direction: currAxis,
          lost: true,
        };
        result[i] = {
          robotId: i,
          index: lastValidIndex,
          direction: currAxis,
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
        direction: currAxis,
      };
    }
  }

  return (
    <div>
      {result.map((x) => {
        return (
          <div key={x.robotId} className='py-4'>
            <div>Robot Id: {x.robotId}</div>
            <div className='flex'>
              <div className='pr-4'>X Axis: {x.index[0]}</div>
              <div className='pr-4'>Y Axis: {x.index[1]}</div>
              {x.lost && <div>Lost: true</div>}
            </div>
            <div>Direction: {x.direction}</div>
          </div>
        );
      })}
    </div>
  );
};

export default FindRobots;

export function isCurrentIndexLost(index: Index, gridArea: Index): boolean {
  if (
    index[0] > gridArea[0] ||
    index[1] > gridArea[1] ||
    index[0] < 0 ||
    index[1] < 0
  ) {
    return true;
  }
  return false;
}

export function movingAction(currAxis: Axis, index: Index): Index {
  let newIndex: Index = [...index];

  if (currAxis === '+y') {
    newIndex[1]++;
  } else if (currAxis === '+x') {
    newIndex[0]++;
  } else if (currAxis === '-y') {
    newIndex[1]--;
  } else if (currAxis === '-x') {
    newIndex[0]--;
  }
  return newIndex;
}

export function rotate(move: Move, currAxis: Axis): Axis {
  //this rotate will take command of Axis
  if (currAxis === '+y') {
    if (move === 'L') {
      currAxis = '-x';
    } else if (move === 'R') {
      currAxis = '+x';
    }
  } else if (currAxis === '+x') {
    if (move === 'L') {
      currAxis = '+y';
    } else if (move === 'R') {
      currAxis = '-y';
    }
  } else if (currAxis === '-y') {
    if (move === 'L') {
      currAxis = '+x';
    } else if (move === 'R') {
      currAxis = '-x';
    }
  } else if (currAxis === '-x') {
    if (move === 'L') {
      currAxis = '-y';
    } else if (move === 'R') {
      currAxis = '+y';
    }
  }
  return currAxis;
}

export function convertToAxis(pole: string): Axis {
  if (pole === 'N') {
    return '+y';
  } else if (pole === 'E') {
    return '+x';
  } else if (pole === 'S') {
    return '-y';
  } else {
    return '-x';
  }
}
