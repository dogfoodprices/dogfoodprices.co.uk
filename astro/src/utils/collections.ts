import type { PriceListPrice } from "./api/food";

export const sortPriceListPricesByPricePerKilo = (prices: PriceListPrice[]) => {
    return prices.sort((a, b) => a.perKilo - b.perKilo);
}
