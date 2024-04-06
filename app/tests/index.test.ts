import { expect, test } from 'vitest';
import {
  convertToAxis,
  convertToPole,
  isCurrentIndexLost,
  movingAction,
  rotate,
} from '../utils/functions';

test('isCurrentIndexLost', () => {
  expect(isCurrentIndexLost([-1, -1], [9, 9])).toEqual(true);
  expect(isCurrentIndexLost([3, 3], [9, 9])).toEqual(false);
});

test('movingAction', () => {
  expect(movingAction('+y', [1, 1])).toStrictEqual([1, 2]);
  expect(movingAction('+x', [1, 1])).toStrictEqual([2, 1]);
  expect(movingAction('-x', [1, 1])).toStrictEqual([0, 1]);
  expect(movingAction('-y', [1, 1])).toStrictEqual([1, 0]);
});

test('rotate', () => {
  expect(rotate('L', '+y')).toEqual('-x');
  expect(rotate('R', '+y')).toEqual('+x');
  expect(rotate('L', '+x')).toEqual('+y');
  expect(rotate('R', '+x')).toEqual('-y');
  expect(rotate('L', '-y')).toEqual('+x');
  expect(rotate('R', '-y')).toEqual('-x');
  expect(rotate('L', '-x')).toEqual('-y');
  expect(rotate('R', '-x')).toEqual('+y');
});

test('convertToAxis', () => {
  expect(convertToAxis('N')).toEqual('+y');
  expect(convertToAxis('E')).toEqual('+x');
  expect(convertToAxis('S')).toEqual('-y');
  expect(convertToAxis('W')).toEqual('-x');
});

test('convertToPole', () => {
  expect(convertToPole('+y')).toEqual('N');
  expect(convertToPole('+x')).toEqual('E');
  expect(convertToPole('-y')).toEqual('S');
  expect(convertToPole('-x')).toEqual('W');
});
