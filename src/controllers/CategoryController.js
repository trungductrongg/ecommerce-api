export async function getCategories(req, res) {
  res.status(200).json({
    message: "Get categories successfully",
  });
}

export async function getCategoryById(req, res) {
  res.status(200).json({
    message: "Get category successfully",
  });
}

export async function insertCategory(req, res) {
  res.status(200).json({
    message: "Insert category successfully",
  });
}

export async function updateCategory(req, res) {
  res.status(200).json({
    message: "Update category successfully",
  });
}

export async function deleteCategory(req, res) {
  res.status(200).json({
    message: "Delete category successfully",
  });
}
