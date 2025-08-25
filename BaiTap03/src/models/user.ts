import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  gender: boolean;
  image: string;
  roleId: string;
  positionId: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public address!: string;
  public phoneNumber!: string;
  public gender!: boolean;
  public image!: string;
  public roleId!: string;
  public positionId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // định nghĩa quan hệ ở đây
  }
}
export default (
  sequelize: Sequelize,
  DataTypes: typeof import("sequelize").DataTypes
) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      firstName: { type: DataTypes.STRING, allowNull: true },
      lastName: { type: DataTypes.STRING, allowNull: true },
      address: { type: DataTypes.STRING, allowNull: true },
      phoneNumber: { type: DataTypes.STRING, allowNull: true },
      gender: { type: DataTypes.BOOLEAN, allowNull: true },
      image: { type: DataTypes.STRING, allowNull: true },
      roleId: { type: DataTypes.STRING, allowNull: true },
      positionId: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
    }
  );
  return User; // 👈 phải return model
};
