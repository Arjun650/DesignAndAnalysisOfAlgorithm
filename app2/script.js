// Navigation Function
function navigateTo(page) {
    window.location.href = page;
}
// Generate a random IP address
function generateRandomIP() {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

// Populate initial IP list
function populateIPList() {
    const ipList = document.getElementById("ip-list");
    ipList.innerHTML = "";
    for (let i = 0; i < 20; i++) {
        const ipDiv = document.createElement("div");
        ipDiv.classList.add("ip-address");
        ipDiv.textContent = generateRandomIP();
        ipList.appendChild(ipDiv);
    }
}

// Word Search (Dummy Implementation for Visualization)
function startWordSearch() {
    const word = document.getElementById("word").value;
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);
    const result = document.getElementById("result");
    const grid = document.getElementById("grid");

    if (!word || rows <= 0 || cols <= 0) {
        result.innerText = "Please fill out all fields correctly.";
        return;
    }

    // Generate random grid
    grid.innerHTML = "";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const wordSearchGrid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        const rowDiv = document.createElement("div");
        for (let j = 0; j < cols; j++) {
            const char = alphabet[Math.floor(Math.random() * alphabet.length)];
            row.push(char);
            rowDiv.textContent += char + " ";
        }
        wordSearchGrid.push(row);
        grid.appendChild(rowDiv);
    }

    result.innerText = `Word "${word}" searched using selected algorithm! Time: 123ms`;
}

// IP Address Search (Dummy Implementation for Visualization)
// function startIPSearch() {
//     const ip = document.getElementById("ip").value;
//     const ipList = document.getElementById("ip-list");
//     const ipResult = document.getElementById("ip-result");

//     if (!ip) {
//         ipResult.innerText = "Please enter a valid IP address.";
//         return;
//     }

//     // Generate a random list of IPs
//     const ips = [];
//     for (let i = 0; i < 20; i++) {
//         ips.push(
//             `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`
//         );
//     }
//     ips.push(ip); // Add the user-provided IP
//     ipList.innerText = `Generated IP List: ${ips.join(", ")}`;

//     // Simulate search
//     const startTime = performance.now();
//     const found = ips.includes(ip);
//     const endTime = performance.now();

//     ipResult.innerText = found
//         ? `IP "${ip}" found! Time: ${(endTime - startTime).toFixed(2)}ms`
//         : `IP "${ip}" not found. Time: ${(endTime - startTime).toFixed(2)}ms`;
// }
function startSearch() {
    const userIP = document.getElementById("ip-input").value;
    const algorithm = document.getElementById("algorithm-select").value;

    if (!userIP) {
        alert("Please enter a valid IP address.");
        return;
    }

    const ipList = document.getElementById("ip-list");
    const ips = Array.from(ipList.children).map((ipDiv) => ipDiv.textContent);

    const randomIndex = Math.floor(Math.random() * ips.length);
    ips[randomIndex] = userIP; // Randomly place the user IP in the chunk

    ipList.innerHTML = "";
    ips.forEach((ip) => {
        const ipDiv = document.createElement("div");
        ipDiv.classList.add("ip-address");
        ipDiv.textContent = ip;
        ipList.appendChild(ipDiv);
    });

    const startTime = performance.now();
    window[algorithm](ips, userIP, (index) => {
        const ipDivs = ipList.children;
        for (let i = 0; i < ipDivs.length; i++) {
            ipDivs[i].classList.remove("checking");
        }
        ipDivs[index].classList.add("checking");
    }).then((result) => {
        const endTime = performance.now();
        const ipDivs = ipList.children;

        if (result !== -1) {
            ipDivs[result].classList.add("found");
            document.getElementById("result").textContent = `IP found at index ${result}. Time: ${(endTime - startTime).toFixed(2)} ms`;
        } else {
            document.getElementById("result").textContent = `IP not found. Time: ${(endTime - startTime).toFixed(2)} ms`;
        }
    });
}
window.onload = populateIPList;
