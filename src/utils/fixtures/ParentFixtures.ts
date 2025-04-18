import Parent from "../objects/Parent.ts";

export default class ParentFixtures {
    private static parents: Array<Parent> = [
        new Parent(1, "Franck", "Gados", "test@gmail.com", []),
        new Parent(2, "Aude", "Kerdeven", "test@gmail.com", []),
        new Parent(3, "Julien", "Gados", "test@gmail.com", []),
        new Parent(4, "Sarah", "Gados", "test@gmail.com", []),
        new Parent(5, "Julie", "Minot", "test@gmail.com", []),
        new Parent(6, "Florent", "Minot", "test@gmail.com", []),
        /*
            new Parent(7, 'Sabrina', 'Gados', 'test@gmail.com', ChildFixtures.getChildrenOfParent(7)),
            new Parent(8, 'Georges', 'Gados', 'test@gmail.com', ChildFixtures.getChildrenOfParent(8)),
            new Parent(9, 'Michel', 'Kerdeven', 'test@gmail.com', ChildFixtures.getChildrenOfParent(9)),
            new Parent(10, 'Louis', 'Kerdeven', 'test@gmail.com', ChildFixtures.getChildrenOfParent(10)),
             */
    ];

    static getOneParent() {
        return this.parents[0];
    }

    static getParents() {
        return this.parents;
    }

    static getParentsOfChild(ids: number[]) {
        return this.parents.filter((user) => ids.includes(user.id));
    }
}
