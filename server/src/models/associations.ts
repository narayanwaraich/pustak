/* import Folder from './folder';

Folder.hasMany(Folder, {
  as: 'children',
  foreignKey: 'parentId',
  inverse: {
    as: 'parent'
  },
}); */

/* 
  @Attribute(DataTypes.INTEGER)
  declare parentId: number;

  @HasMany(() => Folder, {
    as: 'children',
    foreignKey: 'parentId',
    inverse: {
      as: 'parent'
    },
  })
  declare children?: NonAttribute<Folder[]>;
  
  @BelongsTo(() => Folder, {
    foreignKey: 'parentId',
    inverse: {
      as: 'children',
      type: 'hasMany',
    },
  })
  declare parent?: NonAttribute<Folder>;

 */