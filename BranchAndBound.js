// class BranchAndBoundSolver {
//     #grid;
//     #rowNumber;
//     #colNumber;
//     #target;
//     #targetLength;
//     #marker;
//     #directions;
//     #answer;
//     #state;
//     #elapsedTime;
  
//     constructor({ grid, target, marker, directions, state } = {}) {
//       this.#grid = grid;
//       this.#rowNumber = grid.length;
//       this.#colNumber = grid[0].length;
//       this.#target = target;
//       this.#targetLength = target.length;
//       this.#marker = marker;
//       this.#directions = directions;
//       this.#answer = Array();
//       this.#state = state;
//       this.#elapsedTime = 0;
//     }
  
//     indexable(index) {
//       return 0 <= index && index < this.#targetLength;
//     }
  
//     traversable(row, col) {
//       return (0 <= row && row < this.#rowNumber) && (0 <= col && col < this.#colNumber);
//     }
  
//     // Create a bounding function that checks the partial solution
//     boundingFunction(currentRow, currentCol, index, deltaRow, deltaCol) {
//       // If we're matching the target so far, or if we know a match won't happen, we prune
//       return this.#grid[currentRow][currentCol] === this.#target[index];
//     }
  
//     // Branch and Bound: explore the partial solutions using a queue and bounds
//     solve() {
//       const beginTime = new Date();
//       let queue = [];
  
//       // Initialize the queue with possible starting positions (first character matching the target)
//       for (let row = 0; row < this.#rowNumber; row++) {
//         for (let col = 0; col < this.#colNumber; col++) {
//           if (this.#grid[row][col] === this.#target[0]) {
//             queue.push({ row, col, index: 0 });
//           }
//         }
//       }
  
//       // Start solving by exploring each node in the queue
//       while (queue.length > 0) {
//         let { row, col, index } = queue.shift();  // Get the next node from the queue
  
//         if (index === this.#targetLength - 1) {
//           // If we've found the target word, store the result
//           this.#answer.push({ row, col, dir: 'found' });
//           continue;
//         }
  
//         // Explore all possible directions from the current position
//         for (let dir = 0; dir < this.#directions.length; dir++) {
//           const [deltaRow, deltaCol] = this.#directions[dir];
//           const newRow = row + deltaRow;
//           const newCol = col + deltaCol;
  
//           // Apply the bounding function to check if we should explore this path
//           if (this.traversable(newRow, newCol) && this.boundingFunction(newRow, newCol, index + 1, deltaRow, deltaCol)) {
//             queue.push({ row: newRow, col: newCol, index: index + 1 });  // Add the new state to the queue
//           }
//         }
//       }
  
//       const endTime = new Date();
//       this.#elapsedTime = endTime - beginTime;
  
//       this.#state.set(`done searching. found ${this.#answer.length} words`);
//     }
  
//     get answer() {
//       return this.#answer;
//     }
  
//     get elapsedTime() {
//       return this.#elapsedTime;
//     }
//   }
  

// class BranchAndBoundSolver {
//     #grid;
//     #rowNumber;
//     #colNumber;
//     #target;
//     #targetLength;
//     #marker;
//     #directions;
//     #answer;
//     #state;
//     #elapsedTime;
  
//     constructor({ grid, target, marker, directions, state } = {}) {
//       this.#grid = grid;
//       this.#rowNumber = grid.length;
//       this.#colNumber = grid[0].length;
//       this.#target = target;
//       this.#targetLength = target.length;
//       this.#marker = marker;
//       this.#directions = directions;
//       this.#answer = [];
//       this.#state = state;
//       this.#elapsedTime = 0;
//     }
  
//     indexable(index) {
//       return 0 <= index && index < this.#targetLength;
//     }
  
//     traversable(row, col) {
//       return 0 <= row && row < this.#rowNumber && 0 <= col && col < this.#colNumber;
//     }
  
//     // Better bounding function that estimates if a path could possibly match the target
//     boundingFunction(currentRow, currentCol, index) {
//       // If the current character matches the target, it's a valid step in the path
//       return this.#grid[currentRow][currentCol] === this.#target[index];
//     }
  
//     // Explore partial solutions using a queue for branching
//     solve() {
//       const beginTime = new Date();
//       let queue = [];
  
//       // Initialize the queue with possible starting positions (first character matching the target)
//       for (let row = 0; row < this.#rowNumber; row++) {
//         for (let col = 0; col < this.#colNumber; col++) {
//           if (this.#grid[row][col] === this.#target[0]) {
//             queue.push({ row, col, index: 0, path: [{ row, col }] });
//           }
//         }
//       }
  
//       // Process each item in the queue (as a branch and bound exploration)
//       while (queue.length > 0) {
//         // Dequeue the next state (row, col, index of the target word)
//         let { row, col, index, path } = queue.shift();
  
//         if (index === this.#targetLength - 1) {
//           // If we've found the target word, store the result
//           this.#answer.push({ path });
//           continue;
//         }
  
//         // Explore all possible directions from the current position
//         for (let dir = 0; dir < this.#directions.length; dir++) {
//           const [deltaRow, deltaCol] = this.#directions[dir];
//           const newRow = row + deltaRow;
//           const newCol = col + deltaCol;
  
//           // Apply the bounding function to check if we should explore this path
//           if (this.traversable(newRow, newCol) && this.boundingFunction(newRow, newCol, index + 1)) {
//             // If bounding is successful, push the new state onto the queue
//             queue.push({
//               row: newRow,
//               col: newCol,
//               index: index + 1,
//               path: [...path, { row: newRow, col: newCol }],
//             });
//           }
//         }
//       }
  
//       const endTime = new Date();
//       this.#elapsedTime = endTime - beginTime;
  
//       this.#state.set(`done searching. found ${this.#answer.length} words`);
//     }
  
//     get answer() {
//       return this.#answer;
//     }
  
//     get elapsedTime() {
//       return this.#elapsedTime;
//     }
//   }


  
  

// class BranchAndBoundSolver {
//     #grid;
//     #rowNumber;
//     #colNumber;
//     #target;
//     #targetLength;
//     #marker;
//     #directions;
//     #answer;
//     #state;
//     #elapsedTime;
  
//     constructor({ grid, target, marker, directions, state } = {}) {
//       this.#grid = grid;
//       this.#rowNumber = grid.length;
//       this.#colNumber = grid[0].length;
//       this.#target = target;
//       this.#targetLength = target.length;
//       this.#marker = marker;
//       this.#directions = directions;
//       this.#answer = Array();
//       this.#state = state;
//       this.#elapsedTime = 0;
//     }
  
//     indexable(index) {
//       return 0 <= index && index < this.#targetLength;
//     }
  
//     traversable(row, col) {
//       return (0 <= row && row < this.#rowNumber) && (0 <= col && col < this.#colNumber);
//     }
  
//     recurse(currentRow, currentCol, deltaRow, deltaCol, index) {
//       if (!this.traversable(currentRow, currentCol) || !this.indexable(index)) {
//         return false;
//       }
  
//       this.#marker.queueMark({ row: currentRow, col: currentCol });
//       if (index > 1) {
//         this.#marker.queueRevert({ row: currentRow + (deltaRow * -1), col: currentCol + (deltaCol * -1) });
//       }
//       this.#marker.animate();
  
//       if (this.#grid[currentRow][currentCol] !== this.#target[index]) {
//         this.#state.set(`${this.#grid[currentRow][currentCol]} vs ${this.#target[index]} (doesn't match)`);
//         return false;
//       }
  
//       if (index === this.#targetLength - 1) {
//         this.#state.set(`${this.#grid[currentRow][currentCol]} vs ${this.#target[index]} (matches so far)`);
//         return true;
//       }
  
//       this.#state.set(`${this.#grid[currentRow][currentCol]} vs ${this.#target[index]} (matches so far)`);
  
//       return this.recurse(currentRow + deltaRow, currentCol + deltaCol, deltaRow, deltaCol, index + 1);
//     }
  
//     solve() {
//       const beginTime = new Date();
  
//       for (let row = 0; row < this.#rowNumber; row += 1) {
//         for (let col = 0; col < this.#colNumber; col += 1) {
//           if (this.#grid[row][col] !== this.#target[0]) {
//             this.#marker.queueMark({ row, col });
//             this.#marker.animate();
//             this.#state.set(`checking (${row},${col}): ${this.#grid[row][col]} vs ${this.#target[0]} (doesn't match)`);
//             this.#marker.queueRevert({ row, col });
//             this.#marker.animate();
//             this.#state.set(`move to the next!`);
//             continue;
//           }
  
//           for (let dir = 0; dir < this.#directions.length; dir += 1) {
//             const [deltaRow, deltaCol] = this.#directions[dir];
  
//             this.#marker.queueMark({ row, col });
//             this.#marker.animate();
//             this.#state.set(`checking (${row},${col}) with (${deltaRow},${deltaCol}) direction`);
  
//             const matches = this.recurse(row, col, deltaRow, deltaCol, 0);
  
//             if (matches) {
//               this.#answer.push({ row, col, dir: [deltaRow, deltaCol] });
  
//               let index = 0;
//               let currentRow = row;
//               let currentCol = col;
  
//               while (this.traversable(currentRow, currentCol) && this.indexable(index)) {
//                 this.#marker.queueMark({ row: currentRow, col: currentCol, answer: true });
//                 this.#marker.animate();
//                 this.#state.set("correct words. mark solution!");
//                 index += 1;
//                 currentRow += deltaRow;
//                 currentCol += deltaCol;
//               }
//             } else {
//               let index = 0;
//               let currentRow = row;
//               let currentCol = col;
  
//               while (this.traversable(currentRow, currentCol) && this.indexable(index)) {
//                 this.#marker.queueRevert({ row: currentRow, col: currentCol });
//                 index += 1;
//                 currentRow += deltaRow;
//                 currentCol += deltaCol;
//               }
  
//               this.#marker.animate();
//               this.#state.set("move to the next!");
//             }
//           }
//         }
//       }
  
//       const endTime = new Date();
//       this.#elapsedTime = endTime - beginTime;
  
//       this.#state.set(`done searching. found ${this.#answer.length} words`);
//     }
  
//     get answer() {
//       return this.#answer;
//     }
  
//     get elapsedTime() {
//       return this.#elapsedTime;
//     }
//   }
  


class BranchAndBoundSolver {
    #grid;
    #rowNumber;
    #colNumber;
    #target;
    #targetLength;
    #marker;
    #directions;
    #answer;
    #state;
    #elapsedTime;
  
    constructor({ grid, target, marker, directions, state } = {}) {
      this.#grid = grid;
      this.#rowNumber = grid.length;
      this.#colNumber = grid[0].length;
      this.#target = target;
      this.#targetLength = target.length;
      this.#marker = marker;
      this.#directions = directions;
      this.#answer = Array();
      this.#state = state;
      this.#elapsedTime = 0;
    }
  
    traversable(row, col) {
      return (0 <= row && row < this.#rowNumber) && (0 <= col && col < this.#colNumber);
    }
  
    solve() {
      const beginTime = new Date();
  
      const queue = []; // Queue for branch and bound search
      for (let row = 0; row < this.#rowNumber; row += 1) {
        for (let col = 0; col < this.#colNumber; col += 1) {
          if (this.#grid[row][col] === this.#target[0]) {
            this.#marker.queueMark({ row, col });
            this.#marker.animate();
            this.#state.set(`Adding (${row},${col}) to the queue as a potential start point`);
            queue.push({ row, col, index: 0, path: [{ row, col }] });
          }
        }
      }
  
      while (queue.length > 0) {
        const current = queue.shift();
        const { row, col, index, path } = current;
  
        if (index === this.#targetLength - 1) {
          this.#state.set(`Found complete word starting at (${row},${col})`);
          this.#answer.push({ start: path[0], path });
  
          for (const cell of path) {
            this.#marker.queueMark({ row: cell.row, col: cell.col, answer: true });
            this.#marker.animate();
          }
          continue;
        }
  
        for (const [deltaRow, deltaCol] of this.#directions) {
          const newRow = row + deltaRow;
          const newCol = col + deltaCol;
  
          if (this.traversable(newRow, newCol) && this.#grid[newRow][newCol] === this.#target[index + 1]) {
            const newPath = [...path, { row: newRow, col: newCol }];
            this.#state.set(`Adding (${newRow},${newCol}) to the queue, matches ${this.#target[index + 1]}`);
            this.#marker.queueMark({ row: newRow, col: newCol });
            this.#marker.animate();
            queue.push({ row: newRow, col: newCol, index: index + 1, path: newPath });
          } else {
            this.#marker.queueRevert({ row: newRow, col: newCol });
            this.#marker.animate();
            this.#state.set(`(${newRow},${newCol}) does not match or is not traversable`);
          }
        }
      }
  
      const endTime = new Date();
      this.#elapsedTime = endTime - beginTime;
  
      this.#state.set(`Search completed. Found ${this.#answer.length} matches.`);
    }
  
    get answer() {
      return this.#answer;
    }
  
    get elapsedTime() {
      return this.#elapsedTime;
    }
  }
  

// class BranchAndBoundSolver {
//     #grid;
//     #rowNumber;
//     #colNumber;
//     #target;
//     #targetLength;
//     #marker;
//     #directions;
//     #answer;
//     #state;
//     #elapsedTime;
  
//     constructor({ grid, target, marker, directions, state } = {}) {
//       this.#grid = grid;
//       this.#rowNumber = grid.length;
//       this.#colNumber = grid[0].length;
//       this.#target = target;
//       this.#targetLength = target.length;
//       this.#marker = marker;
//       this.#directions = directions;
//       this.#answer = Array();
//       this.#state = state;
//       this.#elapsedTime = 0;
//     }
  
//     traversable(row, col) {
//       return (0 <= row && row < this.#rowNumber) && (0 <= col && col < this.#colNumber);
//     }
  
//     uncolorGrid() {
//       for (let row = 0; row < this.#rowNumber; row += 1) {
//         for (let col = 0; col < this.#colNumber; col += 1) {
//           this.#marker.queueRevert({ row, col });
//         }
//       }
//       this.#marker.animate();
//       this.#state.set("Resetting all unmatched cells.");
//     }
  
//     solve() {
//       const beginTime = new Date();
  
//       const queue = []; // Queue for branch and bound search
//       for (let row = 0; row < this.#rowNumber; row += 1) {
//         for (let col = 0; col < this.#colNumber; col += 1) {
//           if (this.#grid[row][col] === this.#target[0]) {
//             this.#marker.queueMark({ row, col });
//             this.#marker.animate();
//             this.#state.set(`Adding (${row},${col}) to the queue as a potential start point`);
//             queue.push({ row, col, index: 0, path: [{ row, col }] });
//           }
//         }
//       }
  
//       while (queue.length > 0) {
//         const current = queue.shift();
//         const { row, col, index, path } = current;
  
//         if (index === this.#targetLength - 1) {
//           this.#state.set(`Found complete word starting at (${row},${col})`);
//           this.#answer.push({ start: path[0], path });
  
//           for (const cell of path) {
//             this.#marker.queueMark({ row: cell.row, col: cell.col, answer: true });
//             this.#marker.animate();
//           }
//           continue;
//         }
  
//         let hasValidPath = false;
  
//         for (const [deltaRow, deltaCol] of this.#directions) {
//           const newRow = row + deltaRow;
//           const newCol = col + deltaCol;
  
//           if (this.traversable(newRow, newCol) && this.#grid[newRow][newCol] === this.#target[index + 1]) {
//             hasValidPath = true;
//             const newPath = [...path, { row: newRow, col: newCol }];
//             this.#state.set(`Adding (${newRow},${newCol}) to the queue, matches ${this.#target[index + 1]}`);
//             this.#marker.queueMark({ row: newRow, col: newCol });
//             this.#marker.animate();
//             queue.push({ row: newRow, col: newCol, index: index + 1, path: newPath });
//           }
//         }
  
//         if (!hasValidPath) {
//           this.#state.set("No valid path found from this branch. Uncoloring unmatched cells.");
//           this.uncolorGrid();
//         }
//       }
  
//       const endTime = new Date();
//       this.#elapsedTime = endTime - beginTime;
  
//       this.#state.set(`Search completed. Found ${this.#answer.length} matches.`);
//     }
  
//     get answer() {
//       return this.#answer;
//     }
  
//     get elapsedTime() {
//       return this.#elapsedTime;
//     }
//   }
  