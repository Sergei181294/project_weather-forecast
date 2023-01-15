export const getTime = (value: number | undefined) => {
       return new Date(value!*1000).toString().split(" ")[4]
   }
