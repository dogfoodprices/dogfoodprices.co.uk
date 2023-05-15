const formatCurrency = (value: number): string => {
  return value.toLocaleString("en-GB", { style: "currency", currency: "GBP" });
};

const formatWeight = (weight: number): string => {
  return `${weight.toLocaleString("en-GB", { maximumSignificantDigits: 3 })}kg`;
};

const formatTotalWeight = (quantity: number, weight: number): string => {
  if (quantity > 1) {
    return `${formatWeight(quantity * weight)} (${quantity} × ${formatWeight(
      weight
    )})`;
  }

  return formatWeight(weight);
};

const formatNotes = (notes: string | undefined | null): string | undefined | null => {
    return notes
};

export { formatCurrency, formatNotes, formatTotalWeight, formatWeight };
