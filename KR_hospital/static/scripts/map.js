document.getElementById('mapForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const point = document.getElementById('point').value;
    const department = document.getElementById('department').value;

    fetch('/generate_map', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ point: point, department: department }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            window.location.href = data.map_url;
        } else {
            alert('Error generating map');
        }
    })
    .catch(error => console.error('Error:', error));
});
