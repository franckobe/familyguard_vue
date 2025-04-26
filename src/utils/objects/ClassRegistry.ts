type FromJsonFunction<T> = (data: any) => T;

export class ClassRegistry {
    private static registry = new Map<string, FromJsonFunction<any>>();

    static register<T>(typeName: string, fromJson: FromJsonFunction<T>) {
        this.registry.set(typeName, fromJson);
    }

    static get<T>(typeName: string): FromJsonFunction<T> | undefined {
        return this.registry.get(typeName);
    }
}
