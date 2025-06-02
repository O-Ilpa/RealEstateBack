import xlsx from "xlsx";

// Function to convert Excel serial date to a readable date
const excelDateToJSDate = (serial) => {
  const utc_days = Math.floor(serial - 25569); // 25569 is the number of days between 1/1/1900 and 1/1/1970
  const utc_value = utc_days * 86400; // convert days to seconds
  const date = new Date(utc_value * 1000); // convert seconds to milliseconds
  return date.toISOString().split('T')[0]; // Return date as "YYYY-MM-DD"
};

const workbook = xlsx.readFile("./properties_2025.xlsx");

const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const data = xlsx.utils.sheet_to_json(worksheet);

const mappedData = data.map((row) => {
  return {
    propertyId: row["كود"],   
    createdAt: row["تاريخ"] ? excelDateToJSDate(row["تاريخ"]) : "غير متوفر",  // Convert the date if available, else set to "غير متوفر"
    category: row["التصنيف"],  
    agent: row["الوكيل"],  
    area: row["المنطقة"],  
    size: isNaN(row["المساحة"]) ? 'غير متوفر' : row["المساحة"],  // Handle non-numeric values, set to "غير متوفر" if not a valid number
    floor: isNaN(row["الدور"]) ? 'غير متوفر' : row["الدور"],  // Handle non-numeric values, set to "غير متوفر" if not a valid number
    isLastFloor: row["الاخير"] === "نعم",  // If "نعم", set to true, else false
    price: isNaN(row["السعر"]) ? 'غير متوفر' : row["السعر"],  // Handle non-numeric values
    finishing: row["التشطيب"],  
    rooms: isNaN(row["الغرف"]) ? 'غير متوفر' : row["الغرف"],  // Handle non-numeric values
    reception: isNaN(row["الريسبشن"]) ? 'غير متوفر' : row["الريسبشن"],  // Handle non-numeric values
    bathrooms: isNaN(row["الحمامات"]) ? 'غير متوفر' : row["الحمامات"],  // Handle non-numeric values
    yearBuilt: row["عام البناء"] || "غير متوفر",  // If null or undefined, set to "غير متوفر"
    elevators: isNaN(row["المصعد"]) ? 'غير متوفر' : row["المصعد"],  // Handle non-numeric values
    meters: row["العدادات"] ? row["العدادات"].split("+") : [],  // Split meter values if available
    notes: row["الملاحظات"] || "لا توجد ملاحظات",  // Default to "لا توجد ملاحظات" if empty
    type: row["النوع"], 
    images: []  // Assuming images are handled separately
  };
});

console.log(mappedData[0]);
export default mappedData;
