import Note from './note';
import User from './user';
import Team from './team';
import Membership from './membership';

User.hasMany(Note);
Note.belongsTo(User);

User.belongsToMany(Team, {through: Membership});
Team.belongsToMany(User, {through: Membership});

export {
  Note, User, Team, Membership
};