import {UserRole} from "../enums.ts";

export default class User {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public roles: UserRole[] = [],
    ) {}

    isParent(): boolean {
        return this.roles.includes(UserRole.PARENT);
    }

    isSitter(): boolean {
        return this.roles.includes(UserRole.SITTER);
    }

    static fromJson(json: any): User {
        return new User(
            json.id,
            json.firstName,
            json.lastName,
            json.email,
            json.roles ?? []
        );
    }
}
