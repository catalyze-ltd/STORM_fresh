import * as XLSX from "xlsx";

async function excel_import() {

    const workbook = XLSX.readFile("C:/Users/WillSharrock/OneDrive - Catalyze Consulting/Desktop/STORM-main/database/Excel_Data/STORM_input_data.xlsx", { type: "binary" });
    for (let i=0; i<workbook.SheetNames.length; i++) {
        (workbook.SheetNames[i] === "Properties >>>" || workbook.SheetNames[i] === "Scenario data >>>" || workbook.SheetNames[i] === "Outputs >>>") || await Deno.writeTextFile("database/JSON_Data/" + workbook.SheetNames[i] + ".json", JSON.stringify(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[i]], { raw: true })));
    }
    console.log('\x1b[32m%s\x1b[0m', "Data successfully imported.");
}

export default excel_import;