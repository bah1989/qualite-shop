# Qualité shop

Mini-boutique nationale (Côte d'Ivoire) alimentant le comparateur de prix **Kasaprix**.

## Stack
- Next.js 14 (App Router)
- Supabase (table `kasaprix_products`)
- Déployé sur Vercel : https://qualite-shop.vercel.app

## API
`GET /api/kasaprix-feed` — retourne le flux JSON des produits pour intégration dans Kasaprix.

## Variables d'environnement
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
