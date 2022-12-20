import { Cookies } from "quasar";

function set_user_token(token = "", expires = "") {
  Cookies.set("_yuanshen_dadian_token", token, {
    expires: `${expires}s`,
  });
}

function get_user_token() {
  return Cookies.get("_yuanshen_dadian_token");
}

function set_user_id(user_id = 0) {
  localStorage.setItem("_yuanshen_dadian_user", user_id);
}

function get_user_id() {
  return Number(localStorage.getItem("_yuanshen_dadian_user"));
}

function set_user_roles(roles = [], expires = "") {
  Cookies.set("_yuanshen_dadian_roles", roles.join(","), {
    expires: `${expires}s`,
  });
}

function get_user_roles() {
  const rolesStr = Cookies.get("_yuanshen_dadian_roles");
  const roles = (rolesStr || "").split(",").filter((v) => v);
  return roles;
}

function has_user_role(role = "") {
  const roles = get_user_roles();
  return roles.indexOf(role) !== -1;
}

function is_neigui() {
  return has_user_role("MAP_NEIGUI");
}

export {
  set_user_token,
  get_user_token,
  set_user_id,
  get_user_id,
  set_user_roles,
  get_user_roles,
  has_user_role,
  is_neigui,
};
