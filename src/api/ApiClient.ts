import {ClassRegistry} from "../utils/objects/ClassRegistry.ts";

export default class ApiClient {
    private _defaultHeader = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    async get<T>(url: string, className?: string): Promise<T> {
        const response = await fetch(url, {
            method: "GET",
            headers: this._defaultHeader,
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de l'appel API GET ${url}`);
        }

        const json = await response.json();

        // Si pas de classe, on retourne tel quel
        if (!className) return json;

        const fromJson = ClassRegistry.get<T>(className);
        if (!fromJson) throw new Error(`Classe non enregistrée: ${className}`);

        // tableau ou objet
        if (Array.isArray(json)) {
            return json.map(fromJson) as T;
        }

        return fromJson(json) as T;
    }

    async post<T>(url: string, data: any, className?: string): Promise<T> {
        const response = await fetch(url, {
            method: "POST",
            headers: this._defaultHeader,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de l'appel API POST ${url}`);
        }

        const json = await response.json();

        if (!className) return json;

        const fromJson = ClassRegistry.get<T>(className);
        if (!fromJson) throw new Error(`Classe non enregistrée: ${className}`);

        return fromJson(json) as T;
    }
}
