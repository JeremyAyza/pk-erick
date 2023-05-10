const { DataTypes } = require('sequelize');


module.exports = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	image: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue:"https://cdn.pixabay.com/photo/2020/07/21/16/10/pokemon-5426712_640.png"
	},
	vida: {
		type: DataTypes.INTEGER,
		allowNull: false,	
	},
	ataque: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	defensa: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	velocidad: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	altura: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	peso: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	
};
