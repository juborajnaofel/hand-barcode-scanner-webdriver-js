const restrictedKeys =  ['Shift', 'Enter'];
const scanDoneKey = 'Enter';

function handleKeyDown(event) {
    if (!window.scan) {
        window.scan = [];
    }

    if (window.scan.length > 0 && (event.timeStamp - window.scan[window.scan.length - 1].timeStamp) > 1000) {
        window.scan = [];
    }

    if (event.key === scanDoneKey && window.scan.length > 0) {
        let scannedString = window.scan.map(entry => entry.key).join("");
        window.scan = [];
        return document.dispatchEvent(new CustomEvent('scanComplete', { detail: scannedString }));
    }

    if (!restrictedKeys.includes(event.key)) {
        let data = { key: event.key, timeStamp: event.timeStamp };
        data.timeStampDiff = window.scan.length > 0 ? data.timeStamp - window.scan[window.scan.length - 1].timeStamp : 0;
        window.scan.push(data);
    }
}

function dispatched(event) {
    document.getElementById('scanned').value = event.detail;
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('scanComplete', dispatched );
