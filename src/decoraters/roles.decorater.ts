import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roles"

export const roles = {admin:"admin", user:"user"}

export const Roles = (...roles: string[])=> SetMetadata(ROLES_KEY, roles)