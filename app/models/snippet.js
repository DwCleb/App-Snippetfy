module.exports = (sequelize, DataTypes) => {
  const Snippet = sequelize.define('Snippet', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    getterMethods: {
      excerpt() {
        return this.content.length > 80
          ? `${this.content.substring(0, this.content.lastIndexOf(' ', 80))} ... `
          : this.content;
      },
    },
  });

  Snippet.associate = (models) => {
    Snippet.belongsTo(models.Category);
  };

  return Snippet;
};
