import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(
    'postgres://postgres:123456@localhost:5432/ejercicios',
    {
        define: { freezeTableName: true }
    }
);

try {
    await sequelize.authenticate();
    console.log('Conexion exitosa');
    await iniTabla();
} catch (err) {
    console.error('No se pudo conectar a la BD', err);
}

async function iniTabla() {
    const Prueba = sequelize.define('prueba', {
        nombre: { type: DataTypes.STRING, allowNull: false },
        apellido: { type: DataTypes.STRING },
    });
    
    await Prueba.sync({ force: true });

    const francisco = await Prueba.create({ nombre: "Francisco" });
    francisco.apellido = "Nefelin";

    await francisco.save();

    const getUsuarios = await Prueba.findAll();
    console.log(getUsuarios);
};

