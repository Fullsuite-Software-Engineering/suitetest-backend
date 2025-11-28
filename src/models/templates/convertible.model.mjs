import { DataTypes } from "sequelize";

//this is the initial sequelize model for convertible (not final) (changed accordingly)
export default (sequelize) =>
  sequelize.define(
    "Convertible",
    {
      Convertible_Security_Name: {
        type: DataTypes.ENUM(), // empty enum to be filled
        allowNull: false,
      },
      Convertible_Security_Name_Other: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      Purchaser: {
        type: DataTypes.ENUM(), // empty enum to be filled
        allowNull: false,
      },
      Purchaser_As_Written: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      Issuer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Issuer_As_Written: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      Purchase_Amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      Purchase_Amount_Currency: {
        type: DataTypes.ENUM(), // empty enum to be filled
        allowNull: false,
      },

      Issuance_Date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Issuance_Date_Incomplete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Overview_Notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      Interest_Rate_Percentage_Per_Annum: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      Interest_Rate_Reference_Rate: {
        type: DataTypes.ENUM(), // empty enum to be filled
        allowNull: true,
      },
      Interest_Rate_Compounding_Frequency: {
        type: DataTypes.ENUM(), // empty enum to be filled
        allowNull: true,
      },
      Interest_Rate_Tiered: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },

      Maturity_Date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Maturity_Date_Excerpt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Interest_And_Maturity_Notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      Most_Favored_Nation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      Information_Rights: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      Inspection_Rights: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      ROFO: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      Pro_Rata_Rights: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Major_Investor_Status_Assignment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      Investor_Rights_Notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Related_Documents: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      Qualified_Financing_Distinction: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      Qualified_Financing_Valuation_Threshold: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      Qualified_Financing_Valuation_Threshold_Currency: {
        type: DataTypes.ENUM(), // empty enum to be filled
        allowNull: true,
      },

      Liquidation_Payout: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      Qualified_Financing_Conversion: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      Qualified_Financing_Conversion_Mandatory_Conversion: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Qualified_Financing_Conversion_Shadow_Preferred_Stock: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Qualified_Financing_Conversion_Valuation_Cap_Type: {
        type: DataTypes.ENUM(), // empty enum to be filled
        allowNull: true,
      },
      Qualified_Financing_Conversion_Valuation_Cap_Amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      Qualified_Financing_Conversion_Valuation_Cap_Amount_Currency: {
        type: DataTypes.ENUM(), // empty enum to be filled
        allowNull: true,
      },
      Qualified_Financing_Conversion_Discount_Rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      Non_Qualified_Financing_Conversion: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Non_Qualified_Financing_Conversion_Mandatory_Conversion: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Non_Qualified_Financing_Conversion_Shadow_Preferred_Stock: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Non_Qualified_Financing_Conversion_Valuation_Cap_Type: {
        type: DataTypes.ENUM(), // empty enum to be filled
        allowNull: true,
      },
      Non_Qualified_Financing_Conversion_Valuation_Cap_Amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      Non_Qualified_Financing_Conversion_Valuation_Cap_Amount_Currency: {
        type: DataTypes.ENUM(), // empty enum to be filled
        allowNull: true,
      },
      Non_Qualified_Financing_Conversion_Discount_Rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      Liquidation_Conversion: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      Liquidation_Conversion_Mandatory_Conversion: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Liquidation_Conversion_Shadow_Preferred_Stock: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Liquidation_Conversion_Valuation_Cap_Type: {
        type: DataTypes.ENUM(), // empty enum to be filled
        allowNull: true,
      },
      Liquidation_Conversion_Valuation_Cap_Amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      Liquidation_Conversion_Valuation_Cap_Amount_Currency: {
        type: DataTypes.ENUM(), // empty enum to be filled
        allowNull: true,
      },
      Liquidation_Conversion_Discount_Rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      Maturity_Date_Conversion: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      Maturity_Conversion_Mandatory_Conversion: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Maturity_Conversion_Shadow_Preferred_Stock: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Maturity_Conversion_Valuation_Cap_Type: {
        type: DataTypes.ENUM(), // empty enum to be filled
        allowNull: true,
      },
      Maturity_Conversion_Valuation_Cap_Amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      Maturity_Conversion_Valuation_Cap_Amount_Currency: {
        type: DataTypes.ENUM(), // empty enum to be filled
        allowNull: true,
      },
      Maturity_Conversion_Discount_Rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      Other_Conversion_Events: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      Conversion_Mechanics_Notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "convertibles",
      timestamps: true,
    }
  );
