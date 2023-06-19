async function getProducts() {
    try {
        const response = await fetch('http://diwserver.vps.webdock.cloud:8765/products');
        const data = await response.json();

        const productListElement = document.getElementById('product-list');

        data.products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');

            const productName = document.createElement('h2');
            productName.textContent = product.title;

            const productImage = document.createElement('img');
            productImage.src = product.image;

            const productDescription = document.createElement('p');
            const releaseSeason = product.season; // Acessa o valor "season" para representar a data de liberação
            productDescription.textContent = `Data de liberação: ${releaseSeason}`;

            const productRating = document.createElement('p');
            const ratingRate = product.rating.rate;
            const ratingCount = product.rating.count;
            productRating.textContent = `Rating: ${ratingRate} (${ratingCount} avaliações)`;

            const productPrice = document.createElement('p'); // Cria o elemento para exibir o preço do produto
            productPrice.textContent = `Preço: ${product.price}`; // Define o texto do preço do produto

            const productLink = document.createElement('a');
            productLink.href = `detalhes.html?id=${product.id}`; // Adiciona o id do produto como parâmetro na URL da página de detalhes
            productLink.textContent = 'Detalhes';

            // Adiciona o evento de clique ao elemento do produto para redirecionar para a página de detalhes
            productElement.addEventListener('click', () => {
                window.location.href = productLink.href;
            });

            productElement.appendChild(productName);
            productElement.appendChild(productImage);
            productElement.appendChild(productDescription);
            productElement.appendChild(productRating);
            productElement.appendChild(productPrice); // Adiciona o preço como filho do elemento do produto
            productElement.appendChild(productLink); // Adiciona o link como filho do elemento do produto

            productListElement.appendChild(productElement);
        });
    } catch (error) {
        console.error('Erro ao obter os produtos:', error);
    }
}

function filterProducts(searchText) {
    const productListElement = document.getElementById('product-list');
    const products = Array.from(productListElement.getElementsByClassName('product'));

    products.forEach(product => {
        const productName = product.getElementsByTagName('h2')[0].textContent.toLowerCase();
        if (productName.includes(searchText.toLowerCase())) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

document.getElementById('search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value.trim();
    filterProducts(searchText);
});

// Chama a função para exibir todos os produtos inicialmente
getProducts();