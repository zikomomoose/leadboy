import ExcelJS from "exceljs";
import type { RegistrationLead } from "../types.js";

export async function readLeads(path: string): Promise<RegistrationLead[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(path);

  const worksheet = workbook.worksheets[0];
  if (!worksheet) {
    throw new Error(`No worksheet found in ${path}`);
  }

  const headers: string[] = [];
  worksheet.getRow(1).eachCell((cell, columnNumber) => {
    headers[columnNumber - 1] = String(cell.value ?? "").trim();
  });

  const leads: RegistrationLead[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;

    const lead: RegistrationLead = {};
    row.eachCell((cell, columnNumber) => {
      const key = headers[columnNumber - 1];
      if (key) lead[key] = cell.value ?? "";
    });

    if (Object.values(lead).some((value) => String(value).trim() !== "")) {
      leads.push(lead);
    }
  });

  return leads;
}
