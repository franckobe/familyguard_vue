import ChildFixtures from "../utils/fixtures/ChildFixtures.ts";

export default class ChildApi {
    static getMyChildren() {
        return ChildFixtures.getChildren().filter((child) =>
            [1, 4].includes(child.id),
        );
    }
}
