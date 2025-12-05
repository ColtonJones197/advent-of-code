//import combinationData from './combination.txt?raw';
import combinationData from './combination.txt?raw';

/**
 * This contains all the logic for solving problem 1.
 * countStops is here for part 2 of the problem. If the pointer ever passes 0 it should count it as a zero.
*/
function figureOutProblem1(countStops: boolean = false): number {
   const combination = readTheCombination();
   let position = 50;
   let zeroCount = 0;
   let floor = 0;
   let ceiling = 99;
   for (const instruction of combination) {
      const turn = parseInstruction(instruction);
      position += turn;
      while(position < floor) {
         position += ceiling + 1;
         if(countStops && position !== 0) zeroCount++;
      }
      while(position > ceiling) {
         position -= ceiling + 1;
         if(countStops && position !== 0) zeroCount++;
      }
      if(position === 0) {
         zeroCount++;
      }
   }
   return zeroCount;
}

function readTheCombination(): string[] {
   return combinationData.replaceAll('\r', '').trim().split('\n');
}

function parseInstruction(instruction: string): number {
   const direction = instruction.charAt(0);
   const amount = parseInt(instruction.slice(1));
   switch (direction){
      case 'R':
         return amount;
      case 'L':
         return -amount;
      default:
         throw new Error(`Unknown direction: ${direction}`);
   }
}

/**
 * This displays the answer to problem 1.
 */
export const Problem1: React.FC = () => {

   const answer = figureOutProblem1();
   const hardAnswer = figureOutProblem1(true);


   return (
      <div>
         <h2>Problem 1</h2>
         <p>Part 1: {answer}</p>
         <p>Part 2: {hardAnswer}</p>
      </div>
   );
}