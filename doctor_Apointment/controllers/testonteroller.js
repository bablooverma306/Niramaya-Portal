export const getTestController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "API is working 🚀"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in API"
    });
  }
};