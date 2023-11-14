import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; // default export
import isSatSun from "./isWeekend.js";

// const today = dayjs();
// const editableDate = dayjs().add(3,'day').format('dddd');
// const editableDate = dayjs().add(5,'day').format('dddd');
const editableDate = dayjs().add(9,'day').format('dddd');

//  const day5 = today.add(1,'month');
//  const subtract1Month = today.subtract(1,'month');
//  const subtract1MonthFormat = subtract1Month.format('MMMM D')
//  const day5Format = day5.format('MMMM D')
// console.log(day5Format);
// console.log(subtract1MonthFormat);

// const todayInWeekDay = today.format('dddd');
// console.log(todayInWeekDay)


// function isWeekend(date){
//   if(date === 'Saturday' || date === 'Sunday' ){
//     return date;

//   }else{
//     return 'Not Weekend';
//   }

// }

const weekDay = isSatSun(editableDate);
console.log(weekDay);
