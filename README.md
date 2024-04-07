## About This App

This app is deployed on Azure container app, access through this link: [https://robot-challenge.delightfulmeadow-d868028b.uksouth.azurecontainerapps.io](https://robot-challenge.delightfulmeadow-d868028b.uksouth.azurecontainerapps.io)
(This is serverless container app, might take sometimes to start.)

Here you can create you grid area on Mars for your robot research. You can assign robot drop point on the grid, and assign which pole it is facing ( North/ East/ South/ West ). You can move the robot by console its rotation using L and R ( Left/ Right), and use F ( Front ) to let the robot move forward by 1 grid box.

Beaware that robot will be lost if it moves out of the grid area. However the spot the previous robot was lost will leave some scent for next robot to not get lost at the same spot.

\*Grid area can be define only once, please refresh to restart.

![preview](/images/Screenshot%202024-04-07%20at%2002.27.59.png)

## Getting Started

To install:

`pnpm install`

To run the app using docker image (build and run):

`pnpm run docker:run`

To run the development server:

`pnpm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Test

To run test against port 3000:

`pnpm run test`

## Tech Stack

- Next.js
- React
- Taiwind CSS
- RadixUI - UI component
- Vitest - Unit Testing
- Docker - Container repository
- Azure Container App - Deployment
- Github Action - CI/CD - coming soon
