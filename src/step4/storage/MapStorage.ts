import TravelClub from "../../step1/entity/TravelClub";

class MapStorage {
    private static uniqueInstance: MapStorage;

    clubMap: Map<string, TravelClub>;

    private constructor() {
        this.clubMap = new Map<string, TravelClub>();
    }

    static getInstance(): MapStorage {
        if (!this.uniqueInstance) {
            this.uniqueInstance = new MapStorage();
        }
        return this.uniqueInstance;
    }
}

export default MapStorage;