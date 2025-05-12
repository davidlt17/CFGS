document.getElementById('fetch-data').addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => {
            const container = document.getElementById('data-container');
            container.innerHTML = `
                <p><strong>ID:</strong> ${json.id}</p>
                <p><strong>Título:</strong> ${json.title}</p>
                <p><strong>Completado:</strong> ${json.completed ? 'Sí' : 'No'}</p>
            `;
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            document.getElementById('data-container').innerHTML = '<p>Error al obtener los datos.</p>';
        });
});