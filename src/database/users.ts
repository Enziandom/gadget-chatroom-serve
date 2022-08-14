import knex from "./config";

/**
 * 查询用户列表的所有字段
 */
export async function queryUsersAll() {
  return knex("users").select();
}

/**
 * 通过用户名查询用户所有字段
 * @param uname 用户名
 */
export async function queryUserAllByUname(uname) {
  return knex("users").select().where("username", uname);
}