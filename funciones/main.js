// Función para cargar usuarios desde el endpoint
async function loadUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        const userList = document.getElementById('user-list');
        userList.innerHTML = '';

        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a class="dropdown-item" href="#" data-user-id="${user.id}">${user.name}</a>`;
            userList.appendChild(listItem);
        });

        // Agregar un evento para cargar detalles del usuario al hacer clic en un usuario
        const userLinks = userList.querySelectorAll('a');
        userLinks.forEach(link => {
            link.addEventListener('click', () => loadUserDetails(link.dataset.userId));
        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

// Función para cargar detalles de un usuario y sus comentarios desde los endpoints
async function loadUserDetails(userId) {
    try {
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await userResponse.json();

        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        const posts = await postResponse.json();

        const userDetails = document.getElementById('user-details');
        userDetails.innerHTML = '';

        userDetails.innerHTML = `
            <div class="col text-white">
                    <span class="fw-bold text-white fw-bold" >${user.name}</span>
                    <p class="card-text">${user.email}</p>
                    <ul id="post-list">
                        <!-- Lista de publicaciones se cargará aquí -->
                    </ul>
                    

            </div>
        `;

        const postList = userDetails.querySelector('#post-list');
        posts.forEach(post => {
            const postItem = document.createElement('li');
           post

            postItem.innerHTML = `
                <h6>${post.title}</h6>
                <p>${post.body}</p>

                <div class="row pt-0 pb-4">
                               <div class="col">
                                                <div class="d-flex align-items-center">
                <i class="bi-solid bi-chat" data-post-id="${post.id}"></i>
                                                    <span class="ps-2">1</span>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="d-flex align-items-center">
                                                    <i class="bi bi-repeat bi-share-fill"></i>
                                                    <span class="ps-2">1</span>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="d-flex align-items-center">
                                                    <i class="bi-solid bi-heart"></i>
                                                    <span class="ps-2">7</span>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="d-flex align-items-center">
                                                    <i class="bi bi-reception-2 bi-align-bottom"></i>
                                                    <span class="ps-2">1.794</span>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <div class="d-flex align-items-center">
                                                    <i class="bi bi-upload bi-align-bottom"></i>

                                                </div>
                                            </div>
                                        </div>
                                                        <ul id="comments-${post.id}">
                    <!-- Comentarios se cargarán aquí -->
                </ul>
            `;

            postItem.querySelector('i').addEventListener('click', () => loadComments(post.id));
            postList.appendChild(postItem);
        });

        
    } catch (error) {
        console.error('Error al cargar detalles de usuario:', error);
    }
}

// Función para cargar comentarios desde el endpoint
async function loadComments(postId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const comments = await response.json();

        const commentsList = document.getElementById(`comments-${postId}`);
        commentsList.innerHTML = '';

        comments.forEach(comment => {
            const commentItem = document.createElement('li');
            commentItem.innerHTML = `
                <p>${comment.name}</p>
                <p>${comment.email}</p>
                <p>${comment.body}</p>
            `;
            commentsList.appendChild(commentItem);
        });
    } catch (error) {
        console.error('Error al cargar comentarios:', error);
    }
}

// Cargar usuarios al cargar la página
loadUsers();
