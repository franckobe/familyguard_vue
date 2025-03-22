export default class Child {
    constructor(
        public id: number,
        public firstname: string,
        public lastname: string,
        public birthdate: Date,
        public parents: Array<any>) {
    }
}
