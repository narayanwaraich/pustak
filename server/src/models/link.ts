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
  Table
} from '@sequelize/core/decorators-legacy';
import Folder from './folder';

@Table({ schema: 'narayan' })
export default class Link extends Model<InferAttributes<Link>, InferCreationAttributes<Link>> {
  
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.DATE)
  @NotNull
  @Default(new Date().toISOString())
  declare addDate: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  declare title: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare url: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare folderId: number;

  /** Defined by {@link Folder.links} */
  declare folder?: NonAttribute<Folder>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  
}