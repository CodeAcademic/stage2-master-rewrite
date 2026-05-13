import TravelClub from "../../step1/entity/TravelClub";
import MapStorage from "./MapStorage";


class TravelClubStore {
    clubMap: Map<string, TravelClub>;

    constructor() {
        this.clubMap = MapStorage.getInstance().clubMap;
    }

    count(): number {
        return this.clubMap.size;
    }

    exist(name: string): boolean {
        return this.clubMap.get(name) !== undefined;
    }

    store(club: TravelClub): string | null{
        if (this.exist(club.name)) {
            return null;
        }

        this.clubMap.set(club.name, club);

        return club.name;
    }

    retrieve(name: string): TravelClub{
        const travelClub = this.clubMap.get(name);

        if (travelClub !== undefined) {
            return travelClub;
        }

        throw new Error('No such club name : ' + name);
    }

    update(club: TravelClub): void {
        if (!this.exist(club.name)) {
            return;
        }
        this.clubMap.set(club.name, club);
    }

    delete(name: string): void {
        const club = this.retrieve(name);

        if (club !== undefined) {
            this.clubMap.delete(club.name);
        }
    }
}

export default TravelClubStore;