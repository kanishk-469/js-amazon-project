function isWeekend(date){
  if(date === 'Saturday' || date === 'Sunday' ){
    return date;

  }else{
    return 'Not Weekend';
  }

}

export default isWeekend;