document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.querySelector('.back-button');
    backBtn.addEventListener('click', function() {
        window.location.href = '/';
    });

    const productId = getProductIdFromURL(); // Função para recuperar o ID do produto da URL
    getProductDetails(productId); // Função para carregar as informações detalhadas do produto

    // Outras lógicas e manipulações de DOM relevantes para a página de detalhes
});

function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function getProductDetails(productId) {
    const productDetailsElement = document.querySelector('.product-details'); // Elemento onde as informações serão exibidas

    fetch(`http://diwserver.vps.webdock.cloud:8765/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            const productNameElement = document.querySelector('.product-name');
            const productDescriptionElement = document.querySelector('.product-description');
            const productPriceElement = document.querySelector('.product-price');
            const productImageElement = document.querySelector('.product-image');

            productNameElement.textContent = product.title;
            productDescriptionElement.innerHTML = cleanDescription(product.description);
            productPriceElement.textContent = `Valor: R$ ${product.price.toFixed(2)}`;
            productImageElement.src = product.image;
        })
        .catch(error => {
            console.error('Erro ao obter os detalhes do produto:', error);
        });
}

function cleanDescription(description) {
    // Remove as quebras de linha e outras marcações indesejadas
    const cleanedDescription = description.replace(/<br\s*[\/]?>/gi, '');

    // Remove as tags <span> e seu conteúdo
    const finalDescription = cleanedDescription.replace(/<span.*?>/gi, '').replace(/<\/span>/gi, '');

    return finalDescription;
}
