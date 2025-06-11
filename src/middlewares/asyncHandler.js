const asyncHandler = (fun) => {
  return async (req, res, next) => {
    try {
      await fun(req, res, next);
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error:
          process.env.NODE_ENV === "development"
            ? error.errors[0]?.message
            : "",
      });
    }
  };
};

export default asyncHandler;
