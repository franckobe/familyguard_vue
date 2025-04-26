import ApiClient from "./ApiClient.ts";
import type Child from "../utils/objects/Child.ts";
import type User from "../utils/objects/User.ts";

export default class ChildApi extends ApiClient {
    async getMyChildren(): Promise<Child[]> {
        const currentUserId = 1; // ← à remplacer plus tard par un vrai user loggé

        const children = await this.get<Child[]>('/fixtures/childFixture.json', 'Child');

        return children.filter(child =>
            child.parents.some((parent: User) => parent.id === currentUserId));
    }
}
