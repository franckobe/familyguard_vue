import ApiClient from "./ApiClient.ts";
import type Child from "../utils/objects/Child.ts";
import type User from "../utils/objects/User.ts";
import {useAuthStore} from "../utils/store/AuthStore.ts";

export default class ChildApi extends ApiClient {
    async getMyChildren(): Promise<Child[]> {
        const authStore = useAuthStore();
        const currentUserId = authStore.userId;

        const children = await this.get<Child[]>('/fixtures/childFixture.json', 'Child');

        return children.filter(child =>
            child.parents.some((parent: User) => parent.id === currentUserId));
    }
}
