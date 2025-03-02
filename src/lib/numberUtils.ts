
export function toPersianNumber(num: number | string) {
    if (num === null || num === undefined) return '';
    
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    
    return num.toString().replace(/\d/g, function(d) {
      return persianDigits[parseInt(d)];
    });
  }
  
  export function toPersianNumberWithComma(num: number | string) {
    if (num === null || num === undefined) return '';

    const formattedWithComma = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return toPersianNumber(formattedWithComma);
  }