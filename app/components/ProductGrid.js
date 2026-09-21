function formatPrice(value) {
  return new Intl.NumberFormat('fr-FR').format(value) + ' FCFA';
}

export default function ProductGrid({ products }) {
  if (!products.length) {
    return <p>Aucun produit disponible pour le moment.</p>;
  }

  return (
    <div className="grid">
      {products.map((product) => {
        const regular = Number(product.regular_price);
        const kasaprix = Number(product.kasaprix_price);
        const savingsPct = regular > 0
          ? Math.round(((regular - kasaprix) / regular) * 100)
          : 0;

        return (
          <a
            key={product.id}
            className="card"
            href={product.product_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card-media">
              {product.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.image_url} alt={product.title} />
              ) : null}
            </div>
            <div className="card-body">
              {product.category ? (
                <div className="card-cat">{product.category}</div>
              ) : null}
              <div className="card-title">{product.title}</div>
              <div className="price-row">
                <span className="price-old">{formatPrice(regular)}</span>
                <span className="price-new">{formatPrice(kasaprix)}</span>
              </div>
              {savingsPct > 0 ? (
                <span className="savings">-{savingsPct}%</span>
              ) : null}
            </div>
          </a>
        );
      })}
    </div>
  );
      }
