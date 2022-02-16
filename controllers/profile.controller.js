const profileService = require("../services/profile.service");

const create = async (req, res) => {
  try {
    const data = req.body;
    const uid = req.body.user;
    const response = await profileService.create(uid, data);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Ocurrió un error inesperado en el servidor",
      errorMessage: err.message,
    });
  }
};

const getOne = async () => {
  try {
    const { uid } = req.params;
    const response = await profileService.getOne(uid);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Ocurrió un error inesperado en el servidor",
      errorMessage: err.message,
    });
  }
};

const update = async () => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const response = await profileService.update(uid, data);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Ocurrió un error inesperado en el servidor",
      errorMessage: err.message,
    });
  }
};

module.exports = {
  create,
  getOne,
  update,
};
