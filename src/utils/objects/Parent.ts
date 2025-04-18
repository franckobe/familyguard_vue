import User from "./User.ts";
import Child from "./Child.ts";

export default class Parent extends User {
    constructor(
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        public children: Array<Child> = [],
    ) {
        super(id, firstName, lastName, email);
    }
}
