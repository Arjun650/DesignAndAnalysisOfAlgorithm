document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("grid-container");
    const resultDisplay = document.getElementById("result");
    const ipInput = document.getElementById("ip-input");
    const algorithmSelect = document.getElementById("algorithm-select");
    const startButton = document.getElementById("start-button");

    const ips = []; // IP grid
    let targetIP = ""; // Input IP to search
    let targetIndex = -1; // Position of the target IP

    // Generate 100 random IP addresses
    const generateRandomIPs = () => {
        const randomIPs = [];
        for (let i = 0; i < 100; i++) {
            const ip = `${randomInt(1, 255)}.${randomInt(1, 255)}.${randomInt(1, 255)}.${randomInt(1, 255)}`;
            randomIPs.push(ip);
        }
        return randomIPs;
    };

    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const renderGrid = () => {
        gridContainer.innerHTML = "";
        ips.forEach((ip) => {
            const cell = document.createElement("div");
            cell.className = "ip-cell";
            cell.textContent = ip;
            gridContainer.appendChild(cell);
        });
    };

    const placeTargetIP = () => {
        if (targetIP && targetIndex === -1) {
            targetIndex = randomInt(0, ips.length - 1); // Assign position only once
            ips[targetIndex] = targetIP;
        }
    };

    const resetStyles = () => {
        const cells = Array.from(document.getElementsByClassName("ip-cell"));
        cells.forEach((cell) => {
            cell.classList.remove("checking", "found");
        });
    };

    // Initialize grid
    const initializeGrid = () => {
        ips.length = 0; // Clear the grid
        ips.push(...generateRandomIPs()); // Generate new IPs
        targetIndex = -1; // Reset target position
        placeTargetIP(); // Place target IP if any
        renderGrid(); // Render the grid
    };

    // Start Search
    startButton.addEventListener("click", () => {
        const userIP = ipInput.value.trim();
        if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(userIP)) {
            alert("Invalid IP Address format. Please enter a valid IPv4 address.");
            return;
        }

        if (userIP !== targetIP) {
            targetIP = userIP; // Update the target IP
            initializeGrid(); // Regenerate grid
        } else {
            resetStyles(); // Reset styles for another algorithm run
        }

        const cells = Array.from(document.getElementsByClassName("ip-cell"));
        const algorithm = window[algorithmSelect.value];

        const startTime = performance.now();
        algorithm(ips, targetIP, async (index) => {
            if (index !== -1) {
                cells[index].classList.add("checking");
                await new Promise((resolve) => setTimeout(resolve, 200)); // Visual delay
                cells[index].classList.remove("checking");
            }
        }).then((foundIndex) => {
            const endTime = performance.now();
            if (foundIndex !== -1) {
                cells[foundIndex].classList.add("found");
                resultDisplay.textContent = `IP Found at index ${foundIndex} in ${(endTime - startTime).toFixed(2)} ms`;
            } else {
                resultDisplay.textContent = "IP not found.";
            }
        });
    });

    // Initial Grid Setup
    initializeGrid();
});
