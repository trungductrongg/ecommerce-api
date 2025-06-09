export async function getBrands(req, res) {
  res.status(200).json({
    message: "Get brands successfully",
  });
}

export async function getBrandById(req, res) {
  res.status(200).json({
    message: "Get brand successfully",
  });
}

export async function insertBrand(req, res) {
  res.status(200).json({
    message: "Insert brand successfully",
  });
}

export async function updateBrand(req, res) {
  res.status(200).json({
    message: "Update brand successfully",
  });
}

export async function deleteBrand(req, res) {
  res.status(200).json({
    message: "Delete brand successfully",
  });
}
