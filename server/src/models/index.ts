import Note from './note';
import User from './user';
import Team from './team';
import Membership from './membership';
import Folder from './folder';
import Link from './link';

User.hasMany(Note);
Note.belongsTo(User);

User.belongsToMany(Team, {through: Membership});
Team.belongsToMany(User, {through: Membership});

Folder.hasMany(Link);
Link.belongsTo(Folder);

Folder.hasMany(Folder, {as: 'Children', foreignKey: 'parentId'});
Folder.belongsTo(Folder, {as: 'Parent', foreignKey: 'parentId'});

export {
  Note, User, Team, Membership, Folder, Link
};