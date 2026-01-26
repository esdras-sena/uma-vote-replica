export function formatCurrency(value: string | undefined): string {
  if (!value || value === "undefined") return "0";
  
  try {
    // Convert from wei (18 decimals) to ETH/STRK
    const bigValue = BigInt(value);
    const decimals = 18n;
    const divisor = 10n ** decimals;
    
    const integerPart = bigValue / divisor;
    const fractionalPart = bigValue % divisor;
    
    // Format fractional part with leading zeros
    const fractionalStr = fractionalPart.toString().padStart(Number(decimals), '0');
    
    // Take first 6 decimal places for display
    const displayDecimals = fractionalStr.slice(0, 6);
    
    return `${integerPart}.${displayDecimals}`;
  } catch {
    return "0";
  }
}
