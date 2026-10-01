import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import {
  getProductBySlug,
  getProductVariations,
  getRelatedProducts,
} from "@/lib/woocommerce/products";
import { stripHtml } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const cleanDescription = stripHtml(product.short_description || product.description);

  return {
    title: product.name,
    description: cleanDescription.slice(0, 160),
    openGraph: {
      title: product.name,
      description: cleanDescription.slice(0, 160),
      images: product.images.length > 0 ? [{ url: product.images[0].src }] : [],
    },
  };
}

export const revalidate = 60;

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const [variations, related] = await Promise.all([
    product.type === "variable" ? getProductVariations(product.id) : Promise.resolve([]),
    getRelatedProducts(product, 4),
  ]);

  return (
    <div className="min-h-screen bg-white py-8">
      <Container>
        {/* Main 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Gallery Left (6 cols) */}
          <div className="md:col-span-6 lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Info Right (6 cols) */}
          <div className="md:col-span-6 lg:col-span-5">
            <ProductInfo product={product} variations={variations} />
          </div>
        </div>

        {/* DESCRIPTION Tab / Section */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="inline-block border-b-2 border-red-600 pb-2 mb-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-gray-900">
              DESCRIPTION
            </h3>
          </div>

          <div
            className="prose prose-sm max-w-none text-gray-800 leading-relaxed font-medium space-y-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:py-1"
            dangerouslySetInnerHTML={{
              __html:
                product.description ||
                `<p>${product.short_description || "High quality gadget with official guarantee."}</p>`,
            }}
          />
        </div>

        {/* Related Products Grid */}
        <div className="mt-12">
          <RelatedProducts products={related} />
        </div>
      </Container>
    </div>
  );
}
