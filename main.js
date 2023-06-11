$(document).ready(function () {
  $.get('https://diwserver.vps.webdock.cloud/products/category/Accessories - Watches', function (data) {
    var products = data.products;
    var productCards = $('.card');

    productCards.each(function (index) {
      var product = products[index];
      var card = $(this);

      card.find('.card-img-top').attr('src', product.image);

      card.find('.card-title').text(product.title);

      card.find('.card-text').text(product.price);
      card.find('.price').text('R$' + product.price.toFixed(2));

      card
        .find('.review-rate')
        .text('★★★★☆ (' + product.rating.rate.toFixed(1) + ')');

      var productId = product.id;
      card
        .find('.card-title')
        .wrap('<a href="detalhes.html?id=' + productId + '"></a>');
    });
  });

  $(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    $.get(
      `https://diwserver.vps.webdock.cloud/products/${productId}`,
      function (product) {
        $('#product-title').text(product.title);
        $('#product-description').html(product.description);
        $('#product-price').text('Price: R$' + product.price.toFixed(2));
        $('#product-rating').text(
          'Rating: ' +
            product.rating.rate.toFixed(1) +
            ' (' +
            product.rating.count +
            ' ratings)'
        );
        $('#product-image').attr('src', product.image);
      }
    );
  });
});

$(document).ready(function () {
  // Handle form submission
  $('.search-form').submit(function (event) {
    event.preventDefault();
    const query = $('.form-control-input').val();
    const url = `pesquisa.html?search=${query}`;
    window.open(url, '_blank');
  });
});

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');

  $.get('https://diwserver.vps.webdock.cloud/products/category/Accessories - Watches', function (data) {
    const searchResults = data.products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery)
    );

    const cardsContainer = $('#cards');

    if (searchResults.length === 0) {
      cardsContainer.html('<p>No products found.</p>');
    } else {
      const cardsHTML = searchResults.map(
        (product) => `
        <div class=" col-8 col-md-6 col-sm-6 mb-3 col-lg-3">
          <div class="product-card-search card">
            <img src="${
              product.image
            }" class="card-img-top product-card-search-image" alt="${
          product.title
        }" />
            <div class="card-body">
              <a href="detalhes.html?id=${product.id}">
                <h6 class="card-title">${product.title}</h6>
              </a>
              <div class="description-container">
                <p class="card-text">${product.description}</p>
              </div>
              <div class="price">R$ ${product.price.toFixed(2)}</div>
              <div class="review-rate">★★★★☆ (${product.rating.rate})</div>
            </div>
          </div>
        </div>
      `
      );

      cardsContainer.html(cardsHTML.join(''));
    }
  }).fail(function (error) {
    console.error('Error:', error);
  });
});

$(document).ready(function () {
  var categorySelect = $('#brand');
  var categoryTwo = $('#type');
  $.ajax({
    url: 'https://diwserver.vps.webdock.cloud/products/category/Accessories - Watches',
    method: 'GET',
    success: function (response) {
      response.forEach(function (category) {
        categorySelect.append(
          $('<option>', {
            value: category,
            text: category,
          })
        );

        categoryTwo.append(
          $('<option>', {
            value: category,
            text: category,
          })
        );
      });
    },
    error: function (xhr, status, error) {
      console.log('Error fetching categories:', error);
    },
  });
});

$(document).ready(function () {
  var listGroup = $('.list-group');
  $.ajax({
    url: 'https://diwserver.vps.webdock.cloud/products/category/Accessories - Watches?page=10',
    method: 'GET',
    success: function (response) {
      var products = response.products;
      products.forEach(function (product) {
        var listItem = $('<div>', {
          class:
            'list-group-item d-flex justify-content-between align-items-center',
          text: product.title,
        });

        var reviewRate = $('<span>', {
          class: 'review-rate',
          text: `(${product.rating.rate})`,
        });

        listItem.append(reviewRate);
        listGroup.append(listItem);
      });
    },
    error: function (xhr, status, error) {
      console.log('Error fetching products:', error);
    },
  });
});
