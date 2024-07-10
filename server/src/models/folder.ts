/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from '@sequelize/core';
import { 
  Attribute, 
  PrimaryKey, 
  AutoIncrement, 
  NotNull, 
  Default,
  HasMany,
  Table,
  // BelongsTo,
} from '@sequelize/core/decorators-legacy';
import Link from './link';

@Table({ schema: 'narayan' })
export default class Folder extends Model<InferAttributes<Folder>, InferCreationAttributes<Folder>> {
  
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.DATE)
  @NotNull
  @Default(new Date().toISOString())
  declare addDate: CreationOptional<string>;

  @Attribute(DataTypes.DATE)
  @Default(new Date().toISOString())
  declare lastModified: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare title: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  
  @HasMany(() => Link, 'folderId')
  declare links?: NonAttribute<Link[]>;

}