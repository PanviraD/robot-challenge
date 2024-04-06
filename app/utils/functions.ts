import { Index, Axis, Move, Pole } from './types';

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

export function convertToPole(axis: Axis): Pole {
  if (axis === '+y') {
    return 'N';
  } else if (axis === '+x') {
    return 'E';
  } else if (axis === '-y') {
    return 'S';
  } else {
    return 'W';
  }
}
