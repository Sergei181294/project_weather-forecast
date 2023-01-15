export const getDay = (value: number | undefined) => {
       const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
       const date = new Date(value!*1000);
       return weekday[date.getDay()]
   }
