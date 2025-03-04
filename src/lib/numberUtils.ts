export function toPersianNumber(num: number | string) {
  if (num === null || num === undefined) return "";

  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return num.toString().replace(/\d/g, function (d) {
    return persianDigits[parseInt(d)];
  });
}

export function toPersianNumberWithComma(num: number | string) {
  if (num === null || num === undefined) return "";

  const formattedWithComma = num
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return toPersianNumber(formattedWithComma);
}

export const addSeparator = (number: number) => {
  if (!number) return "0";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function formatPersianNumber(num, decimalPlaces = 0) {
  if (num === null || num === undefined) return '';
  
  const isNegative = num < 0;
  
  const absNum = Math.abs(num);
  const numStr = String(absNum);
  
  const [integerPart, decimalPart] = numStr.split('.');
  
  const integerWithSeparators = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  let result = integerWithSeparators;
  
  if (decimalPlaces > 0 && decimalPart) {
    const formattedDecimal = (decimalPart + '0'.repeat(decimalPlaces)).slice(0, decimalPlaces);
    result += '.' + formattedDecimal;
  }
  
  const persianDigits = result.replace(/[0-9]/g, function(d) {
    return ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'][parseInt(d)];
  });
  
  return isNegative ?  persianDigits + '-' : persianDigits;
}
