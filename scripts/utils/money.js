 function formatCurrency(priceCents){
  return Number((Math.round(priceCents)/100).toFixed(2));

}
export default formatCurrency;