let startTime;
let running = false;
let laps = [];

function start() {
    if (!running) {
        startTime = Date.now();
        running = true;
        update();
    }
}

function pause() {
    running = false;
}

function reset() {
    running = false;
    document.getElementById("display").textContent = "00:00:00.000";
    laps = [];
    updateLaps();
}

function lap() {
    if (running) {
        let lapTime = Date.now() - startTime;
        laps.push(formatTime(lapTime));
        updateLaps();
    }
}

function update() {
    if (running) {
        let elapsedTime = Date.now() - startTime;
        document.getElementById("display").textContent = formatTime(elapsedTime);
        setTimeout(update, 10); // Update display every 10 milliseconds
    }
}

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = time % 1000;

    return (
        pad(hours, 2) + ":" +
        pad(minutes, 2) + ":" +
        pad(seconds, 2) + "." +
        pad(milliseconds, 3)
    );
}

function pad(num, size) {
    return ("000" + num).slice(-size);
}

function updateLaps() {
    let lapsList = document.getElementById("laps");
    lapsList.innerHTML = "";
    laps.forEach(function(lapTime, index) {
        let li = document.createElement("li");
        li.textContent = "Lap " + (index + 1) + ": " + lapTime;
        lapsList.appendChild(li);
    });
}
