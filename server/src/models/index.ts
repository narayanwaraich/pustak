import Folder from "./folder";
import Bookmark from "./bookmark";
import User from "./user";

Folder.hasMany(Bookmark, {
  foreignKey: {
    name: "parentId",
    allowNull: true,
  },
});
Bookmark.belongsTo(Folder, {
  foreignKey: {
    name: "parentId",
  },
});

Folder.hasMany(Folder, {
  as: "Children",
  foreignKey: "parentId",
  onDelete: "SET NULL", //	This behaviour should be removed in ideal production scenario, or changed to a paranoid model.
});
Folder.belongsTo(Folder, { as: "Parent", foreignKey: "parentId" });

User.hasMany(Folder, {
  foreignKey: "userId",
});
Folder.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Bookmark, {
  foreignKey: "userId",
});
Bookmark.belongsTo(User, {
  foreignKey: "userId",
});

// Folder.sync({ alter: true });
// Bookmark.sync({ alter: true });
// User.sync({ alter: true });

export { Folder, Bookmark, User };
