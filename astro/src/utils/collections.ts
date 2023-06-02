import type { PriceListPrice } from "./api/food";

export const sortPriceListPricesByPricePerKilo = (prices: PriceListPrice[]) => {
    // Any out of stock items should be sorted at the bottom of the list
    return prices.sort((a, b) => (a.perKilo || 999) - (b.perKilo || 999));
}
