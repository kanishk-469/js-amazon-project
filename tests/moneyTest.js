import formatCurrency  from "../scripts/utils/money.js";



console.log('Test suite : formatCurrency'); // it's called group of related tests together including below 3 test cases.
// Basic Test cases - Check if the code is working
//Test case 1
console.log('Converts cents into $dollars');
if(formatCurrency(2095) === "20.95"){
  console.log("passed");
}else{
  console.log('Failed');
}


// Edge Test cases - Test with the values that are tricky
//Test case 2
console.log('Works with zero');
if(formatCurrency(0) === '0.00'){
console.log('passed');
}else{
  console.log('Failed');
}

//Test case 3
console.log('Round up to the nearest cent');
if(formatCurrency(2000.5)=== '20.01'){
console.log('passed');
}else{
  console.log('Failed');
}