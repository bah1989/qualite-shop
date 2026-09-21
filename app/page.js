import { supabase } from '../lib/supabaseClient';
import ProductGrid from './components/ProductGrid';

export const revalidate = 0;

export default async function HomePage() {
  const { data: products, error } = await supabase
    .from('kasaprix_products')
    .select('*')
    .eq('in_stock', true)
    .order('created_at', { ascending: false });

  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <div className="brand">
            Qualité <span>shop</span>
          </div>
          <div style={{ fontSize: 13, color: '#B9C7BE' }}>
            Partenaire Kasaprix
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="wrap">
          <h1>
            Qualité shop &amp; Kasaprix : le meilleur des bons plans sur
            toute l&rsquo;étendue du territoire
          </h1>
          <p>
            Des produits utiles au quotidien, à prix réduits, livrés partout
            en Côte d&rsquo;Ivoire. Comparé et validé par Kasaprix.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <b>{products?.length ?? 0}</b>
              <span>Produits en promotion</span>
            </div>
            <div className="hero-stat">
              <b>100%</b>
              <span>Territoire national</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Nos bons plans du moment</h2>
            <p>Prix mis à jour en continu</p>
          </div>
          {error ? (
            <p>Une erreur est survenue lors du chargement des produits.</p>
          ) : (
            <ProductGrid products={products ?? []} />
          )}
        </div>
      </section>

      <footer className="site-footer">
        <div className="wrap">
          Qualité shop — Boutique partenaire de Kasaprix, le comparateur de
          prix national.
        </div>
      </footer>
    </>
  );
    }
