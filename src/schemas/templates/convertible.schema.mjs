import { z } from "zod";

//this is the initial convertible model schema (not final) (change accordingly)
export const convertibleSchema = z.object({
  Convertible_Security_Name: z.enum([]),
  Convertible_Security_Name_Other: z.string().optional(),
  Purchaser: z.enum([]),
  Purchaser_As_Written: z.string(),
  Issuer: z.string(),
  Issuer_As_Written: z.string(),
  Purchase_Amount: z
    .string()
    .regex(/^\d+\.\d{2}$/, { message: "2 decimal places" })
    .transform(Number),
  Purchase_Amount_Currency: z.enum([]),
  Issuance_Date: z.date().optional(),
  Issuance_Date_Incomplete: z.boolean().optional(),
  Overview_Notes: z.string().optional(),
  Interest_Rate_Percentage_Per_Annum: z
    .string()
    .regex(/^\d+\.\d{2}$/, { message: "2 decimal places" })
    .transform(Number)
    .optional(),
  Interest_Rate_Reference_Rate: z.enum().optional(),
  Interest_Rate_Compounding_Frequency: z.enum().optional(),
  Interest_Rate_Tiered: z.boolean().optional(),
  Maturity_Date: z.date().optional(),
  Maturity_Date_Excerpt: z.string().optional(),
  Interest_And_Maturity_Notes: z.string().optional(),
  Most_Favored_Nation: z.boolean(),
  Information_Rights: z.boolean(),
  Inspection_Rights: z.boolean(),
  ROFO: z.boolean(),
  Pro_Rata_Rights: z.boolean().optional(),
  Major_Investor_Status_Assignment: z.boolean(),
  Investor_Rights_Notes: z.string().optional(),
  Related_Documents: z.string().optional(),
  Qualified_Financing_Distinction: z.boolean(),
  Qualified_Financing_Valuation_Threshold: z.number().optional(),
  Qualified_Financing_Valuation_Threshold_Currency: z.enum([]).optional(),
  Liquidation_Payout: z
    .string()
    .regex(/^\d+\.\d{2}$/, { message: "2 decimal places" })
    .transform(Number),
  Qualified_Financing_Conversion: z.boolean(),
  Qualified_Financing_Conversion_Mandatory_Conversion: z.boolean().optional(),
  Qualified_Financing_Conversion_Shadow_Preferred_Stock: z.boolean().optional(),
  Qualified_Financing_Conversion_Valuation_Cap_Type: z.enum([]).optional(),
  Qualified_Financing_Conversion_Valuation_Cap_Amount: z.number().optional(),
  Qualified_Financing_Conversion_Valuation_Cap_Amount_Currency: z
    .enum([])
    .optional(),
  Qualified_Financing_Conversion_Discount_Rate: z
    .string()
    .regex(/^\d+\.\d{2}$/, { message: "2 decimal places" })
    .transform(Number)
    .optional(),
  Non_Qualified_Financing_Conversion: z.boolean().optional(),
  Non_Qualified_Financing_Conversion_Mandatory_Conversion: z
    .boolean()
    .optional(),
  Non_Qualified_Financing_Conversion_Shadow_Preferred_Stock: z
    .boolean()
    .optional(),
  Non_Qualified_Financing_Conversion_Valuation_Cap_Type: z.enum([]).optional(),
  Non_Qualified_Financing_Conversion_Valuation_Cap_Amount: z
    .number()
    .optional(),
  Non_Qualified_Financing_Conversion_Valuation_Cap_Amount_Currency: z
    .enum([])
    .optional(),
  Non_Qualified_Financing_Conversion_Discount_Rate: z
    .string()
    .regex(/^\d+\.\d{2}$/, { message: "2 decimal places" })
    .transform(Number)
    .optional(),
  Liquidation_Conversion: z.boolean(),
  Liquidation_Conversion_Mandatory_Conversion: z.boolean().optional(),
  Liquidation_Conversion_Shadow_Preferred_Stock: z.boolean().optional(),
  Liquidation_Conversion_Valuation_Cap_Type: z.enum([]).optional(),
  Liquidation_Conversion_Valuation_Cap_Amount: z
    .number()
    .regex(/^\d+\.\d{2}$/, { message: "2 decimal places" })
    .transform(Number)
    .optional(),
  Liquidation_Conversion_Valuation_Cap_Amount_Currency: z.enum([]).optional(),
  Liquidation_Conversion_Discount_Rate: z
    .string()
    .regex(/^\d+\.\d{2}$/, { message: "2 decimal places" })
    .transform(Number)
    .optional(),
  Maturity_Date_Conversion: z.boolean(),
  Maturity_Conversion_Mandatory_Conversion: z.boolean().optional(),
  Maturity_Conversion_Shadow_Preferred_Stock: z.boolean().optional(),
  Maturity_Conversion_Valuation_Cap_Type: z.enum([]).optional(),
  Maturity_Conversion_Valuation_Cap_Amount: z.number().optional(),
  Maturity_Conversion_Valuation_Cap_Amount_Currency: z.enum([]).optional(),
  Maturity_Conversion_Discount_Rate: z
    .string()
    .regex(/^\d+\.\d{2}$/, { message: "2 decimal places" })
    .transform(Number)
    .optional(),
  Other_Conversion_Events: z.boolean(),
  Conversion_Mechanics_Notes: z.string().optional(),
});
