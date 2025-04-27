export const sortDates = ({ dates, order = 1, field } = {}) => {
    if ((order !== 1 && order !== -1) || !Array.isArray(dates)) return dates;
  
    return dates.sort((a, b) => {
      const dateA = a[field] instanceof Date ? a[field] : new Date(a[field]);
      const dateB = b[field] instanceof Date ? b[field] : new Date(b[field]);
  
      if (isNaN(dateA) || isNaN(dateB)) {
        throw new Error("Una o más fechas no son válidas.");
      }
  
      return order * (dateA - dateB);
    });
  };
  
  export const getRandomDate = ({ start, end } = {}) => {
    if (!(start instanceof Date) || !(end instanceof Date)) return null;
  
    const startTime = start.getTime();
    const endTime = end.getTime();
  
    if (startTime > endTime) return null;
    const randomTime = Math.random() * (endTime - startTime) + startTime;
  
    return new Date(randomTime);
  };
  
  export const getErrorMsg = (error) => {
    if (typeof error == "string") return error;
  
    return (
      error?.response?.data?.message ||
      error?.Message ||
      error?.data?.Message ||
      error?.message ||
      error?.data?.message ||
      ""
    );
  };
  

  