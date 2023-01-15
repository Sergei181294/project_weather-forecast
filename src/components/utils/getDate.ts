export const getDate = (value: number | undefined) => {
       const dateTime = new Date(value!*1000).toString().split(" ");
       return dateTime[1] + " " + dateTime[2] + " " + dateTime[3];
   }
