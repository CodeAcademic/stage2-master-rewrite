import { question } from "readline-sync";
import TravelClub from "../../../step1/entity/TravelClub";
import ClubCoordinator from "../../logic/ClubCoordinator";

class ClubWindow {
    clubCoordinator: ClubCoordinator;

    constructor(clubCoordinator: ClubCoordinator) {
        this.clubCoordinator = clubCoordinator;
    }

    register(): TravelClub | null {
        let newClub = null;

        while (true) {
            const clubName = question('\n club name (0.Club Menu): ');

            if (clubName === '0' || !clubName) {
                break
            }

            if (this.clubCoordinator.exist(clubName)) {
                console.log('\n> Club name already exists. --> ' + clubName);
                continue;
            }

            const intro = question('club intro (0.Club Menu): ');

            if (intro === '0') {
                break;
            }

            try {
                newClub = new TravelClub(clubName, intro);
                this.clubCoordinator.register(newClub);

                console.log('\n> Registered club --> ', newClub);
            } catch (e) {
                console.error(`Error: ${(e as Error).message}`)
            }
        }
        return newClub;
    }

    find(): TravelClub | null {
        let clubFound = null;

        if (!this.clubCoordinator.hasClubs()) {
            console.log('\n> No clubs in the storage');
            return null;
        }

        while (true) {
            const clubName = question('\n club name to find (0.Club Menu): ');

            if (clubName === '0') {
                break;
            }

            if (this.clubCoordinator.exist(clubName)) {
                clubFound = this.clubCoordinator.find(clubName);
                console.log('\n > Found club --> ', clubFound);
            } else {
                console.log('\n > No such club in the storage --> ' + clubName);
            }
        }
        return clubFound;
    }

    findOne(): TravelClub | null {
        let clubFound = null;

        if (!this.clubCoordinator.hasClubs()) {
            console.log('\n> No clubs in the storage');
            return null;
        }

        while (true) {
            const clubName = question('\n club name to find (0.Club Menu): ');

            if (clubName === '0') {
                break;
            }

            if (this.clubCoordinator.exist(clubName)) {
                clubFound = this.clubCoordinator.find(clubName);
                console.log('\n> Found club: ', clubName);
                break;
            } else {
                console.log('\n> No such club in the storage --> ' + clubName);
            }
            clubFound = null;
        }
        return clubFound;
    }

    modify(): TravelClub | null {
        const targetClub = this.findOne();

        if (!targetClub) {
            return targetClub;
        }

        let newIntro = question('new intro (0.Club Menu / Enter. no change): ');

        if (newIntro === '0') {
            return targetClub;
        }

        if (!newIntro) {
            newIntro = targetClub.intro;
        }

        try {
            this.clubCoordinator.modify(targetClub.name, newIntro);
            console.log('\n> Club changed: ', targetClub);
        } catch (e) {
            console.error(`Error: ${(e as Error).message}`);
        }
        return targetClub;
    }

    remove(): void {
        const targetClub = this.findOne();

        if (!targetClub) {
            return;
        }

        const confirmStr = question('Remove this club? (Y:yes, N:no): ');

        if (confirmStr.toLowerCase() === 'y' || confirmStr.toLowerCase() === 'Yes') {
            console.log('\n> Remove a club --> ' + targetClub.name);
            this.clubCoordinator.remove(targetClub.name);
        } else {
            console.log('\n> Remove cancelled, your club is safe. --> ' + targetClub.name);
        }
    }
}

export default ClubWindow;