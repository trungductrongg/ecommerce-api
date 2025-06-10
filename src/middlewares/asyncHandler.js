const asyncHandler = (fun) => {
  return async (req, res, next) => {
    try {
      await fun(req, res, next);
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.errors[0]?.message,
        // error: process.env.NODE_ENV === "development" ? error : "",
      });
    }
  };
};

export default asyncHandler;
