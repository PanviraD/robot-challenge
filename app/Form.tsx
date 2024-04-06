'use client';
import { Button, RadioGroup, TextField } from '@radix-ui/themes';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Index, Move, Robot } from './utils/types';

interface Props {
  grid: Index;
  setGrid: Dispatch<SetStateAction<Index>>;
  robots: Robot[];
  setRobots: Dispatch<SetStateAction<Robot[]>>;
}

const Form = ({ grid, setGrid, robots, setRobots }: Props) => {
  const [gridXAxis, setGridXAxis] = useState<number>(0);
  const [gridYAxis, setGridYAxis] = useState<number>(0);
  const [dropXAxis, setDropXAxis] = useState<string>('');
  const [dropYAxis, setDropYAxis] = useState<string>('');
  const [robotDirection, setRobotDirection] = useState<string>('');
  const [robotMoves, setRobotMoves] = useState<string>('');

  function handleGrid() {
    const x = gridXAxis;
    const y = gridYAxis;
    if (x > 100 || y > 100) {
      alert('Both X and Y axis cannot be more than 100.');
    } else if (x > 0 && y > 0) {
      setGrid([x, y]);
    } else {
      alert('Both X and Y axis needs to be more than 0.');
    }
  }
  function handleRobot(
    dropXAxis: string,
    dropYAxis: string,
    direction: string,
    moves: string
  ) {
    const isMovesCorrect = moves
      ?.split('')
      .find((x) => x !== 'F' && x !== 'L' && x !== 'R');
    const x = Number(dropXAxis);
    const y = Number(dropYAxis);
    if (!grid[0] || !grid[1]) {
      alert('Please define grid area first.');
    } else if (x > grid[0] || y > grid[1]) {
      alert('Both X and Y axis cannot be greater than Grid Area.');
    } else if (x < 0 || y < 0) {
      alert('Both X and Y axis cannot be less than 0.');
    } else if (!direction) {
      alert('Please choose starting direction.');
    } else if (!moves) {
      alert('Please type robot moves');
    } else if (isMovesCorrect) {
      alert('Moves need to be just letter: L / R / F.');
    } else {
      setRobots([...robots, { x, y, direction, move: moves }]);
      setDropXAxis('');
      setDropYAxis('');
      setRobotMoves('');
    }
  }

  return (
    <div>
      <div className='flex'>
        <div className='flex  flex-col space-y-2 '>
          <div>
            <div className='font-semibold'>Grid Area</div>
            <div className='flex'>
              <TextField.Root
                placeholder='X Axis'
                className='w-1/2'
                required
                disabled={grid[0] && grid[1] ? true : false}
                type='number'
                onChange={(e) => setGridXAxis(Number(e.target.value))}
              >
                <TextField.Slot>
                  <svg
                    width='15'
                    height='15'
                    viewBox='0 0 15 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M3.87935 1H3.9H11.1H11.1207C11.5231 0.999994 11.8553 0.999989 12.1259 1.0221C12.407 1.04506 12.6653 1.09434 12.908 1.21799C13.2843 1.40973 13.5903 1.7157 13.782 2.09202C13.9057 2.33469 13.9549 2.59304 13.9779 2.87409C14 3.14468 14 3.47686 14 3.87934V3.9V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H3.9H3.87934C3.47686 14 3.14468 14 2.87409 13.9779C2.59304 13.9549 2.33469 13.9057 2.09202 13.782C1.7157 13.5903 1.40973 13.2843 1.21799 12.908C1.09434 12.6653 1.04506 12.407 1.0221 12.1259C0.999989 11.8553 0.999994 11.5231 1 11.1207V11.1207V11.1V3.9V3.87935V3.87934C0.999994 3.47686 0.999989 3.14468 1.0221 2.87409C1.04506 2.59304 1.09434 2.33469 1.21799 2.09202C1.40973 1.7157 1.7157 1.40973 2.09202 1.21799C2.33469 1.09434 2.59304 1.04506 2.87409 1.0221C3.14469 0.999989 3.47687 0.999994 3.87935 1ZM2.95552 2.01878C2.73631 2.03669 2.62421 2.06915 2.54601 2.10899C2.35785 2.20487 2.20487 2.35785 2.10899 2.54601C2.06915 2.62421 2.03669 2.73631 2.01878 2.95552C2.00039 3.18056 2 3.47171 2 3.9V7H7V2H3.9C3.47171 2 3.18056 2.00039 2.95552 2.01878ZM7 8H2V11.1C2 11.5283 2.00039 11.8194 2.01878 12.0445C2.03669 12.2637 2.06915 12.3758 2.10899 12.454C2.20487 12.6422 2.35785 12.7951 2.54601 12.891C2.62421 12.9309 2.73631 12.9633 2.95552 12.9812C3.18056 12.9996 3.47171 13 3.9 13H7V8ZM8 8H13V11.1C13 11.5283 12.9996 11.8194 12.9812 12.0445C12.9633 12.2637 12.9309 12.3758 12.891 12.454C12.7951 12.6422 12.6422 12.7951 12.454 12.891C12.3758 12.9309 12.2637 12.9633 12.0445 12.9812C11.8194 12.9996 11.5283 13 11.1 13H8V8ZM13 7H8V2H11.1C11.5283 2 11.8194 2.00039 12.0445 2.01878C12.2637 2.03669 12.3758 2.06915 12.454 2.10899C12.6422 2.20487 12.7951 2.35785 12.891 2.54601C12.9309 2.62421 12.9633 2.73631 12.9812 2.95552C12.9996 3.18056 13 3.47171 13 3.9V7Z'
                      fill='currentColor'
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                </TextField.Slot>
              </TextField.Root>
              <TextField.Root
                placeholder='Y Axis'
                className='w-1/2'
                required
                disabled={grid[0] && grid[1] ? true : false}
                type='number'
                onChange={(e) => setGridYAxis(Number(e.target.value))}
              >
                <TextField.Slot>
                  <svg
                    width='15'
                    height='15'
                    viewBox='0 0 15 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M3.87935 1H3.9H11.1H11.1207C11.5231 0.999994 11.8553 0.999989 12.1259 1.0221C12.407 1.04506 12.6653 1.09434 12.908 1.21799C13.2843 1.40973 13.5903 1.7157 13.782 2.09202C13.9057 2.33469 13.9549 2.59304 13.9779 2.87409C14 3.14468 14 3.47686 14 3.87934V3.9V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H3.9H3.87934C3.47686 14 3.14468 14 2.87409 13.9779C2.59304 13.9549 2.33469 13.9057 2.09202 13.782C1.7157 13.5903 1.40973 13.2843 1.21799 12.908C1.09434 12.6653 1.04506 12.407 1.0221 12.1259C0.999989 11.8553 0.999994 11.5231 1 11.1207V11.1207V11.1V3.9V3.87935V3.87934C0.999994 3.47686 0.999989 3.14468 1.0221 2.87409C1.04506 2.59304 1.09434 2.33469 1.21799 2.09202C1.40973 1.7157 1.7157 1.40973 2.09202 1.21799C2.33469 1.09434 2.59304 1.04506 2.87409 1.0221C3.14469 0.999989 3.47687 0.999994 3.87935 1ZM2.95552 2.01878C2.73631 2.03669 2.62421 2.06915 2.54601 2.10899C2.35785 2.20487 2.20487 2.35785 2.10899 2.54601C2.06915 2.62421 2.03669 2.73631 2.01878 2.95552C2.00039 3.18056 2 3.47171 2 3.9V7H7V2H3.9C3.47171 2 3.18056 2.00039 2.95552 2.01878ZM7 8H2V11.1C2 11.5283 2.00039 11.8194 2.01878 12.0445C2.03669 12.2637 2.06915 12.3758 2.10899 12.454C2.20487 12.6422 2.35785 12.7951 2.54601 12.891C2.62421 12.9309 2.73631 12.9633 2.95552 12.9812C3.18056 12.9996 3.47171 13 3.9 13H7V8ZM8 8H13V11.1C13 11.5283 12.9996 11.8194 12.9812 12.0445C12.9633 12.2637 12.9309 12.3758 12.891 12.454C12.7951 12.6422 12.6422 12.7951 12.454 12.891C12.3758 12.9309 12.2637 12.9633 12.0445 12.9812C11.8194 12.9996 11.5283 13 11.1 13H8V8ZM13 7H8V2H11.1C11.5283 2 11.8194 2.00039 12.0445 2.01878C12.2637 2.03669 12.3758 2.06915 12.454 2.10899C12.6422 2.20487 12.7951 2.35785 12.891 2.54601C12.9309 2.62421 12.9633 2.73631 12.9812 2.95552C12.9996 3.18056 13 3.47171 13 3.9V7Z'
                      fill='currentColor'
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                </TextField.Slot>
              </TextField.Root>
            </div>
          </div>
          <Button
            my='5px'
            disabled={grid[0] && grid[1] ? true : false}
            onClick={() => handleGrid()}
          >
            Set Grid
          </Button>
          <div>
            <div className='font-semibold'>Drop Point</div>
            <div className='flex'>
              <TextField.Root
                placeholder='X Axis'
                className='w-1/2'
                required
                type='number'
                onChange={(e) => setDropXAxis(e.target.value)}
                value={dropXAxis}
              >
                <TextField.Slot>
                  <svg
                    width='15'
                    height='15'
                    viewBox='0 0 15 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6 3.5C6 2.67157 6.67157 2 7.5 2C8.32843 2 9 2.67157 9 3.5C9 4.32843 8.32843 5 7.5 5C6.67157 5 6 4.32843 6 3.5ZM8 5.94999C9.14112 5.71836 10 4.70948 10 3.5C10 2.11929 8.88071 1 7.5 1C6.11929 1 5 2.11929 5 3.5C5 4.70948 5.85888 5.71836 7 5.94999V13.5C7 13.7761 7.22386 14 7.5 14C7.77614 14 8 13.7761 8 13.5V5.94999Z'
                      fill='currentColor'
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                </TextField.Slot>
              </TextField.Root>
              <TextField.Root
                placeholder='Y Axis'
                className='w-1/2'
                required
                type='number'
                onChange={(e) => setDropYAxis(e.target.value)}
                value={dropYAxis}
              >
                <TextField.Slot>
                  <svg
                    width='15'
                    height='15'
                    viewBox='0 0 15 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6 3.5C6 2.67157 6.67157 2 7.5 2C8.32843 2 9 2.67157 9 3.5C9 4.32843 8.32843 5 7.5 5C6.67157 5 6 4.32843 6 3.5ZM8 5.94999C9.14112 5.71836 10 4.70948 10 3.5C10 2.11929 8.88071 1 7.5 1C6.11929 1 5 2.11929 5 3.5C5 4.70948 5.85888 5.71836 7 5.94999V13.5C7 13.7761 7.22386 14 7.5 14C7.77614 14 8 13.7761 8 13.5V5.94999Z'
                      fill='currentColor'
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                </TextField.Slot>
              </TextField.Root>
            </div>
          </div>
          <div>
            <div className='font-semibold'>Robot Commands</div>
            <div className='space-y-1 text-gray-500'>
              <div className='text-sm'>Choose starting direction</div>
              <RadioGroup.Root
                name='Direction'
                required
                onValueChange={(e) => setRobotDirection(e)}
              >
                <RadioGroup.Item value='N'>North</RadioGroup.Item>
                <RadioGroup.Item value='E'>East</RadioGroup.Item>
                <RadioGroup.Item value='S'>South</RadioGroup.Item>
                <RadioGroup.Item value='W'>West</RadioGroup.Item>
              </RadioGroup.Root>
              <div className='text-sm text-gray-500'>
                Type robot moves: L = left, R = right, F = front
              </div>
              <TextField.Root
                placeholder='Example: FLRFFFLLL...'
                required
                onChange={(e) => setRobotMoves(e.target.value.toUpperCase())}
                value={robotMoves}
              >
                <TextField.Slot>
                  <svg
                    width='15'
                    height='15'
                    viewBox='0 0 15 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z'
                      fill='currentColor'
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                </TextField.Slot>
              </TextField.Root>
            </div>
          </div>
          <Button
            onClick={() =>
              handleRobot(dropXAxis, dropYAxis, robotDirection, robotMoves)
            }
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
