import Folder from "./folder";
import Link from "./link";

Folder.hasMany(Link);
Link.belongsTo(Folder);

Folder.hasMany(Folder, {
	as: 'Children', 
	foreignKey: 'parentId',
	onDelete: 'SET NULL'	//	This behaviour should be removed in ideal production scenario, or changed to a paranoid model.
});
Folder.belongsTo(Folder, {as: 'Parent', foreignKey: 'parentId'});

export {	Folder,	Link	};