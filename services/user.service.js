const User = require("../models/user");

const create = async (uid, data) => {
  try {
    const existingUser = await User.findOne({ uid });

    if (existingUser) {
      return {
        error: true,
        statusCode: 400,
        message: "Usuario encontrado",
      };
    }

    const user = new User({ ...data });
    await user.save();

    return {
      error: false,
      statusCode: 201,
      message: "Usuario creado",
    };
  } catch (error) {
    return {
      error: true,
      statusCode: 500,
      message: "Ocurrió un error inesperado en el servidor",
      errorMessage: error.message,
    };
  }
};

const getByUid = async (uid) => {
  try {
    const user = await User.findOne({ uid });

    if (!user) {
      return {
        error: true,
        statusCode: 404,
        message: "Usuario no encontrado",
      };
    }

    return {
      error: false,
      statusCode: 200,
      message: "Usuario encontrado",
      user: {
        hasProfile: user.hasProfile,
      },
    };
  } catch (error) {
    return {
      error: true,
      statusCode: 500,
      message: "Ocurrió un error inesperado en el servidor",
      errorMessage: error.message,
    };
  }
};

module.exports = {
  create,
  getByUid,
};
