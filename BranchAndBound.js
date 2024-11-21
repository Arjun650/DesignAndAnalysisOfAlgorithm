
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
      // solve() {
      //   const beginTime = new Date();
      //   const queue = [];
      //   const visited = new Set();
      
      //   for (let row = 0; row < this.#rowNumber; row++) {
      //     for (let col = 0; col < this.#colNumber; col++) {
      //       if (this.#grid[row][col] === this.#target[0]) {
      //         this.#state.set(`Adding (${row},${col}) to the queue as a potential start point`);
      //         queue.push({ row, col, index: 0, path: [{ row, col }] });
      //         visited.add(`${row},${col}`);
      //         this.#marker.queueMark({ row, col });
      //       }
      //     }
      //   }
      
      //   this.#marker.animate(); // Ensure animation is triggered here
      
      //   while (queue.length > 0) {
      //     const { row, col, index, path } = queue.shift();
      
      //     if (index === this.#targetLength - 1) {
      //       this.#state.set(`Found complete word starting at (${path[0].row},${path[0].col})`);
      //       this.#answer.push({ start: path[0], path });
      
      //       for (const cell of path) {
      //         this.#marker.queueMark({ row: cell.row, col: cell.col, answer: true });
      //       }
      //       this.#marker.animate(); // Animate final path
      //       continue;
      //     }
      
      //     for (const [deltaRow, deltaCol] of this.#directions) {
      //       const newRow = row + deltaRow;
      //       const newCol = col + deltaCol;
      
      //       if (
      //         this.traversable(newRow, newCol, visited) &&
      //         this.#grid[newRow][newCol] === this.#target[index + 1]
      //       ) {
      //         this.#state.set(`Adding (${newRow},${newCol}) to the queue, matches ${this.#target[index + 1]}`);
      //         const newPath = [...path, { row: newRow, col: newCol }];
      //         queue.push({ row: newRow, col: newCol, index: index + 1, path: newPath });
      //         visited.add(`${newRow},${newCol}`);
      //         this.#marker.queueMark({ row: newRow, col: newCol });
      //       }
      //     }
      
      //     this.#marker.animate(); // Trigger animation after each step
      //   }
      
      //   const endTime = new Date();
      //   this.#elapsedTime = endTime - beginTime;
      //   this.#state.set(`Search completed. Found ${this.#answer.length} matches.`);
      // }
      
    
      get answer() {
        return this.#answer;
      }
    
      get elapsedTime() {
        return this.#elapsedTime;
      }
    }
    