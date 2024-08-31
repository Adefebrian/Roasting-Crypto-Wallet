document.getElementById('roastingForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const walletAddress = document.getElementById('walletAddress').value;
    const language = document.getElementById('language').value;

    const response = await fetch('/generate-roast', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ walletAddress, language })
    });

    const data = await response.json();
    document.getElementById('roastOutput').textContent = data.roast;
});
