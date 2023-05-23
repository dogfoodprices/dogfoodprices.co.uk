import { createClient } from "@sanity/client";
import type { Food, FoodWithPriceList, PriceListPrice } from "../api/food.js";
import { sortPriceListPricesByPricePerKilo } from "../collections.js";
import { formatCurrency } from "../formatting.js";
import imageUrlBuilder from '@sanity/image-url'
import fs from "node:fs/promises";
import 'dotenv/config'

const client = createClient({
  projectId: "9vyslszl",
  dataset: "production",
  apiVersion: "2023-05-01",
  useCdn: false,
  token: process.env.SANITY_READ_TOKEN,
})

const imageBuilder = imageUrlBuilder(client)

// Temporarily(?) compied from food.ts because the Sanity client is only
// initialised when running via Astro.
async function allFood(): Promise<FoodWithPriceList[]> {
  const filter = `*[_type == "food" && !(_id in path("drafts.**"))]`;
  const order = ``;
  const projection = `{
    "id": _id,
    brand-> {
      name
    },
    name,
    "slug": slug.current,
    images,
    sellers[] {
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
  const allFood: Food[] = await client.fetch(query);

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

async function allFoodForAlgolia() {
  const foods = await allFood();

  const records = foods.map((food) => {
    const bestPricePerKilo = sortPriceListPricesByPricePerKilo(food.prices)[0]
      .perKilo;

    return {
      objectID: food.id,
      brand: food.brand.name,
      name: food.name,
      priceFrom: `From ${formatCurrency(bestPricePerKilo)} per kg`,
      slug: `/food/${food.slug}/`,
      image: food.images?.front
        ? imageBuilder
            .image(food.images.front)
            .size(80, 80)
            .ignoreImageParams()
            .url()
        : "",
    };
  });

  fs.writeFile("./algolia.json", JSON.stringify(records));
}

await allFoodForAlgolia()
