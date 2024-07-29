import { DataTypes } from "sequelize";
import db from "../config/db.js";
import bcrypt from "bcrypt";

//difine la tabla y los datos que se van a cosntruir

const Usuario = db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN,
}, {
    hooks:{
        beforeCreate: async function(usuario) {
            //cuando se oprime el boton crear en el formularion de registro, pasa por este proceso
            const salt = await bcrypt.genSalt(10)
            //reescribe el valor antes de cargarlo a la BD
            usuario.password = await bcrypt.hash(usuario.password, salt);
        }
    },

    scopes: {
        eliminarPassword: {
            atributes: {
                exclude: ['password', 'token', 'confirmado', 'createdAt', 'updatedAt']
            }
        }
    }
});

//metodos personalizados
Usuario.prototype.verificarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

export default Usuario;