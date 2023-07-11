module.exports = (sequelize, dataTypes) => {
    let alias = "Treatment";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: dataTypes.STRING(255) },
        description: { type: dataTypes.TEXT },
        specialties_id: { type: dataTypes.INTEGER },
        specialties_services_id: { type: dataTypes.INTEGER },
        price: { type: dataTypes.DECIMAL(10, 2) },
        cash_price: { type: dataTypes.DECIMAL(10, 2) },
        
    }

    let config = {
        tableName: 'treatments',
        timestamps: false
    }

    const Treatment = sequelize.define(alias, cols, config);

    Treatment.associate = (models) => {
        Treatment.belongsTo(models.Specialty, {
            as: 'specialty',
            foreignKey: 'specialties_id',
        })
        Treatment.belongsTo(models.SpecialtyService, {
            as: 'specialtyService',
            foreignKey: 'specialties_services_id',
        })
    };

    return Treatment;
}