const apiKey = "YOUR_STEAM_API_KEY"; // Replace with your Steam API key

async function processFile() {
    const fileInput = document.getElementById("fileInput").files[0];
    if (!fileInput) {
        alert("Please select a file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = async function(event) {
        const urls = event.target.result.split(/\r?\n/).map(url => url.trim()).filter(url => url);
        await processURLs(urls);
    };
    reader.readAsText(fileInput);
}

async function processManualInput() {
    const url = document.getElementById("manualInput").value.trim();
    if (url) {
        await processURLs([url]);
    } else {
        alert("Please enter a Steam profile URL.");
    }
}

async function processURLs(urls) {
    let results = [];
    const showOnlySteamID3 = document.getElementById("showSteamID3").checked;

    for (let url of urls) {
        let steamID64 = await getSteamID(url);
        if (steamID64) {
            let steamID3 = convertToSteamID3(steamID64);
            if (showOnlySteamID3) {
                results.push(`${steamID3}`);
            } else {
                results.push(`${steamID64} \n ${steamID3} \n`);
            }
        } else {
            results.push(`${url} -> Invalid or private profile.`);
        }
    }
    document.getElementById("output").value = results.join("\n");
    outputField.style.resize = "none";
}

async function getSteamID(url) {
    const steamIDPattern = /https?:\/\/steamcommunity\.com\/profiles\/(\d+)/;
    const customURLPattern = /https?:\/\/steamcommunity\.com\/id\/([^\/]+)/;
    let match = url.match(steamIDPattern);
    
    if (match) {
        return match[1];
    } else {
        match = url.match(customURLPattern);
        if (match) {
            return await resolveCustomURL(match[1]);
        }
    }
    return null;
}

async function resolveCustomURL(customURL) {
    try {
        let response = await fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${apiKey}&vanityurl=${customURL}`);
        let data = await response.json();
        return data.response.success === 1 ? data.response.steamid : null;
    } catch (error) {
        console.error("Error fetching SteamID:", error);
        return null;
    }
}

function convertToSteamID3(steamID64) {
    let steamID = BigInt(steamID64);
    return `[U:1:${steamID - BigInt(76561197960265728)}]`;
}

function copyToClipboard() {
    const outputField = document.getElementById("output");
    outputField.select();
    outputField.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    alert("Copied to clipboard: " + outputField.value);
}