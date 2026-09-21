import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(supabaseUrl, supabaseKey);
}

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();

    const { data: products, error } = await supabase
      .from('kasaprix_products')
      .select(
        'id, title, description, regular_price, kasaprix_price, category, image_url, in_stock, shop_name, product_url'
      )
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    const feed = {
      shop_info: {
        name: 'Qualité shop',
        scope: 'national',
        country: 'Côte d\'Ivoire',
        partner: 'Kasaprix',
      },
      generated_at: new Date().toISOString(),
      product_count: products?.length ?? 0,
      products: (products ?? []).map((p) => {
        const regular = Number(p.regular_price);
        const kasaprix = Number(p.kasaprix_price);
        const savings_percent =
          regular > 0 ? Math.round(((regular - kasaprix) / regular) * 100) : 0;

        return {
          id: p.id,
          title: p.title,
          description: p.description,
          regular_price: regular,
          kasaprix_price: kasaprix,
          savings_percent,
          category: p.category,
          image_url: p.image_url,
          in_stock: p.in_stock,
          shop_name: p.shop_name,
          product_url: p.product_url,
        };
      }),
    };

    return NextResponse.json(feed, {
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
