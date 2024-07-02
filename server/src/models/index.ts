import Folder from './folder';
import Link from './link';

Folder.hasMany(Link);
Link.belongsTo(Folder);

Folder.hasMany(Folder, {as: 'Children', foreignKey: 'parentId'});
Folder.belongsTo(Folder, {as: 'Parent', foreignKey: 'parentId'});

export {
  Folder, Link
};