export async function getOrderDetails(req, res) {
  res.status(200).json({
    message: "Get order details successfully",
  });
}

export async function getOrderDetailById(req, res) {
  res.status(200).json({
    message: "Get order detail successfully",
  });
}

export async function insertOrderDetail(req, res) {
  res.status(200).json({
    message: "Insert order detail successfully",
  });
}

export async function updateOrderDetail(req, res) {
  res.status(200).json({
    message: "Update order detail successfully",
  });
}

export async function deleteOrderDetail(req, res) {
  res.status(200).json({
    message: "Delete order detail successfully",
  });
}
