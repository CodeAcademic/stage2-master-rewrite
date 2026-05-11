import TravelClub from "../../step1/entity/TravelClub";
import MemberHelper from "./MemberHelper";

class ClubCoordinator {
    memberHelper: MemberHelper;
    clubList: TravelClub[];

    constructor() {
        this.memberHelper = new MemberHelper();
        this.clubList = [];
    }

    hasClubs(): boolean {
        return this.clubList.length !== 0;
    }

    exist(name: string): boolean {
        for (const club of this.clubList) {
            if (club.name === name) {
                return true;
            }
        }
        return false;
    }

    register(newClub: TravelClub): string {
        if (this.exist(newClub.name)) {
            throw new Error('\n> club already exist --> ' + newClub.name);
        }

        this.clubList.push(newClub);

        return newClub.name;
    }

    find(name: string): TravelClub{
        for (const club of this.clubList) {
            if (club.name === name) {
                return club;
            }
        }
        throw new Error('\n> No such travel club: ' + name);
    }

    modify(name: string, intro: string, foundedDate: string): void {
        if (!this.exist(name)) {
            return;
        }

        const club = this.find(name);

        club.foundedDate = foundedDate;
        club.setIntro(intro)
    }

    remove(club: TravelClub): void {
        const clubName = club.name;
        const travelClub = this.find(clubName)

        if (travelClub) {
            const index = this.clubList.indexOf(travelClub)

            this.clubList.splice(index, 1)
        }
    }
}


export default ClubCoordinator;