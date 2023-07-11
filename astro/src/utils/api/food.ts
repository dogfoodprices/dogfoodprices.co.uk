import { useSanityClient, groq } from "astro-sanity";
import type { TypedObject } from "@portabletext/types";

interface SellerPrice {
  weight: number;
  quantity: number;
  type: string;
  price: number;
  url: string;
}

interface Seller {
  seller: {
    name: string;
  };
  prices: SellerPrice[];
}

export interface SanityImage {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
}

export interface Food {
  id: string;
  name: string;
  slug: string;
  brand: {
    name: string;
  };
  description: TypedObject | TypedObject[] | undefined;
  images: {
    front: SanityImage | undefined;
    back: SanityImage | undefined;
  } | null;
  sellers: Seller[];
  prices: PriceListPrice[];
}

export interface PriceListPrice {
  weight: number;
  quantity: number;
  notes: string | null | undefined;
  price: number;
  perKilo: number;
  shop: string;
  url: string;
}

export interface FoodWithPriceList extends Food {
  prices: PriceListPrice[];
}

interface AlgoliaFoodRecord {
  brand: string;
  name: string;
  priceFrom: string;
}

export async function allFood(): Promise<FoodWithPriceList[]> {
  const filter = groq`*[_type == "food" && !(_id in path("drafts.**"))]`;
  const order = groq``;
  const projection = groq`{
    "id": _id,
    brand-> {
      name
    },
    name,
    description,
    "slug": slug.current,
    images,
    sellers[sellerDetails->include == true] {
      "seller": sellerDetails-> {
          name
      },
      prices[] {
        weight,
        type,
        url,
        quantity,
        price
      }
    }
}`;
  const query = [filter, order, projection].join("\n");
  const allFood: Food[] = await useSanityClient().fetch(query);

  return allFood.map((food) => {
    let prices: PriceListPrice[] = [];

    food.sellers.forEach((seller) => {
      seller.prices.forEach((price) => {
        const pricePerKilo =
          Math.ceil((price.price / (price.weight * price.quantity)) * 100) /
          100;
        prices.push({
          weight: price.weight,
          quantity: price.quantity,
          notes: price.type,
          price: price.price,
          perKilo: pricePerKilo,
          shop: seller.seller.name,
          url: price.url,
        });
      });
    });

    food.prices = prices;

    return food;
  });
}
