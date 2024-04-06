export interface Robot {
  x: number;
  y: number;
  direction: string;
  move: string;
}

export interface Stack {
  robotNo: number;
  xAxis: number;
  yAxis: number;
  direction: string;
}

export type Move = 'L' | 'R';
export type Axis = '+y' | '-y' | '+x' | '-x';
export type Pole = 'N' | 'E' | 'S' | 'W';
export type Index = [number, number];
export type LostIndex = {
  robotId: number;
  index: Index;
  axis: Axis;
};
