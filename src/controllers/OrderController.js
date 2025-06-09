export async function getOrders(req, res) {
  res.status(200).json({
    message: "Get orders successfully",
  });
}

export async function getOrderById(req, res) {
  res.status(200).json({
    message: "Get order successfully",
  });
}

export async function insertOrder(req, res) {
  res.status(200).json({
    message: "Insert order successfully",
  });
}

export async function updateOrder(req, res) {
  res.status(200).json({
    message: "Update order successfully",
  });
}

export async function deleteOrder(req, res) {
  res.status(200).json({
    message: "Delete order successfully",
  });
}
