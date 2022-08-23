import knex from "./database";
import UserModel from "../models/userModel";
import GroupModel from "../models/groupModel";
import { clipFileds } from "../service/common";

export async function queryUserByUnameAndPwd(
  username: string,
  password: string
): Promise<Array<UserModel>> {
  return knex<UserModel>("users")
    .where({
      username,
      password
    })
    .select();
}

export async function updateUser(
  data: UserModel,
  clause: UserModel,
  excludes?: Array<string>
): Promise<number> {
  return knex("users").where(clause).update(clipFileds(data, excludes));
}

export async function queryFriends(data: UserModel) {
  return knex("users as u")
    .where({
      "u.id": data.id
    })
    .join("friends as f", function () {
      this.on("u.id", "=", "f.user_id");
    })
    .join("users as u2", function () {
      this.on("u2.id", "=", "f.id");
    })
    .select("u2.*");
}

export async function queryGroups(data: UserModel): Promise<Array<GroupModel>> {
  return knex("chatroom.groups as g")
    .where({ "u.id": data.id })
    .join("user_groups as ug", function () {
      this.on("ug.group_id", "=", "g.id");
    })
    .join("users as u", function () {
      this.on("u.id", "=", "ug.user_id");
    })
    .select("g.*");
}