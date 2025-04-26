import User from './User';

export default class Child {
    constructor(
        public id: number,
        public firstname: string,
        public lastname: string,
        public birthdate: Date,
        public parents: User[] = [],
    ) {}

    get age(): number {
        const today = new Date();
        const birth = new Date(this.birthdate);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }

    static fromJson(json: any): Child {
        return new Child(
            json.id,
            json.firstname,
            json.lastname,
            new Date(json.birthdate),
            json.parents?.map(User.fromJson) ?? []
        );
    }
}
