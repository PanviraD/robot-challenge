import Image from 'next/image';
import FindRobots from './FindRobots';

export default function Home() {
  //pole = N, E, S, W
  //axis = +x, -x, +y, -y
  const x = 5;
  const y = 3;
  const robots = [
    { x: 1, y: 1, direction: 'E', move: 'RFRFRFRF' },
    { x: 3, y: 2, direction: 'N', move: 'FRRFLLFFRRFLL' },
    { x: 0, y: 3, direction: 'W', move: 'LLFFFLFLFL' },
  ];
  return <FindRobots gridArea={[x, y]} robots={robots} />;
}
