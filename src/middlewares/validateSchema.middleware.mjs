export const validateSchema = (schema, type = "body") => {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req[type]);

      if (!result.success) {
        // 🔍 Format readable Zod validation errors
        const formatted = result.error.issues.map((err) => ({
          path: err.path.join("."),
          message: err.message,
          expected: err.expected,
          received: err.received,
        }));

        return res.status(400).json({
          message: "Zod Validation failed",
          errors: formatted,
        });
      }

      // ✅ Replace raw request data with parsed/clean data
      req[type] = result.data;

      next();
    } catch (error) {
      console.error("Schema validation error:", error);
      res.status(500).json({
        message: "Internal server error during schema validation",
      });
    }
  };
};
