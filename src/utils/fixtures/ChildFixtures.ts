import Child from "../objects/Child.ts";
import Parent from "../objects/Parent.ts";
import ParentFixtures from "./ParentFixtures.ts";

export default class ChildFixtures {
    private static children: Array<Child> = [
        new Child(1, "Camille", "Gados", new Date("2015-09-28"), []),
        new Child(2, "Louisa", "Minot", new Date("2018-06-25"), []),
        new Child(3, "Eve", "Minot", new Date("2019-07-03"), []),
        new Child(4, "Zoé", "Gados", new Date("2020-08-05"), []),
        new Child(5, "Emma", "Gados", new Date("2022-02-20"), []),
    ];

    static getOneChild(): Child {
        return this.children[0];
    }

    static getChildren(): Child[] {
        const parents: Parent[] = ParentFixtures.getParents();
        const dispatch: { [index: string]: number[] } = {
            "1": [3, 4],
            "4": [3, 4],
            "2": [5, 6],
            "3": [5, 6],
            "5": [1, 2],
        };
        this.children.forEach((child) => {
            child.parents = parents.filter((parent) => {
                return dispatch[child.id.toString()].includes(parent.id);
            });
        });
        return this.children;
    }
}
