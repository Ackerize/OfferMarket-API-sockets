const User = require("../models/user");
const Profile = require("../models/profile");
const req = require("express/lib/request");

const create = async (uid, data) => {
  try {
    const newProfile = new Profile({ ...data });
    await newProfile.save();

    await User.findOneAndUpdate({ uid }, { hasProfile: true });

    return {
      error: false,
      statusCode: 201,
      message: "Perfil creado",
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

const getOne = async (uid) => {
  try {
    const existingProfile = await Profile.findOne({ user: uid });
    if (existingProfile) {
      return {
        error: false,
        status: 200,
        message: "Perfil encontrado",
      };
    } else {
      return {
        error: true,
        status: 404,
        message: "No se encontró el perfil",
      };
    }
  } catch (error) {
    return {
      error: true,
      statusCode: 500,
      message: "Ocurrió un error inesperado en el servidor",
      errorMessage: error.message,
    };
  }
};

const update = async (uid, data) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate({ user: uid }, data);
    if (!updatedProfile) {
      return {
        error: true,
        statusCode: 404,
        message: "No se encontró el perfil a actualizar",
      };
    }

    return {
      error: false,
      statusCode: 200,
      message: "Perfil actualizado con éxito",
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
  getOne,
  update
};
