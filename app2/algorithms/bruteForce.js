async function bruteForceSearch(ips, target, visualize) {
  const rows = 10; // Assume grid is 10x10
  const cols = 10;
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const index = r * cols + c;
      await visualize(index); // Highlight the current cell
      if (ips[index] === target) return index; // Target found
    }
  }
  return -1; // Target not found
}

window.algorithm1 = bruteForceSearch;

