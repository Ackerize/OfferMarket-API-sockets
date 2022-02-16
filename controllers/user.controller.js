const userService = require("../services/user.service");

const create = async (req, res) => {
  try {
    const { uid } = req.body;
    const response = await userService.create(uid, req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Ocurrió un error inesperado en el servidor",
      errorMessage: error.message,
    });
  }
};

const getOne = async (req, res) => {
  try {
    const { uid } = req.params;
    const response = await userService.getByUid(uid);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Ocurrió un error inesperado en el servidor",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  create,
  getOne
};
