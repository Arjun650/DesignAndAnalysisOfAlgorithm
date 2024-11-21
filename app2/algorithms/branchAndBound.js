async function branchAndBoundSearch(ips, target, visualize) {
  const rows = 10; // Grid dimensions
  const cols = 10;
  
  let low = 0;
  let high = ips.length - 1;
  const sortedIps = [...ips]; // Sort the IPs to apply binary-like search for pruning
  sortedIps.sort();

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    await visualize(mid); // Highlight the middle cell
    if (sortedIps[mid] === target) {
      return ips.indexOf(target); // Return original index of found IP
    } else if (sortedIps[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1; // Target not found
}

window.algorithm4 = branchAndBoundSearch;
