import { question } from "readline-sync";
import TravelClub from "../../../step1/entity/TravelClub";
import Dateutil from "../../../util/DateUtil";
import ClubCoordinator from "../../logic/ClubCoordinator";

class ClubWindow {
    clubCoordinator: ClubCoordinator;

    constructor(clubCoordinator: ClubCoordinator) {
        this.clubCoordinator = clubCoordinator;
    }

    register(): TravelClub | null {
        let newClub = null;

        while (true) {
            const clubName = question(('\n club name (0.Club Menu): '));

            if (clubName === '0' || !clubName.length) {
                break;
            }

            if (this.clubCoordinator.exist(clubName)) {
                console.log('\n> club name already exist. --> ' + clubName);
                continue;
            }

            const intro = question('club intro (0.Club Menu): ');

            if (intro === '0') {
                break;
            }
            try {
                newClub = new TravelClub(clubName, intro);
                newClub.foundedDate = Dateutil.today();
                this.clubCoordinator.register(newClub);

                console.log('\n> Registered club --> ', newClub);
            } catch (e) {
                console.error(`Error: ${e.message}`);
            }
        }
        return newClub;
    }

    find(): TravelClub | null {
        let clubFound = null;

        if (!this.clubCoordinator.hasClubs()) {
            console.log('\n> No clubs in the storage ')
            return null;
        }

        while (true) {
            const clubName = question('\n club name to find (0.Club Menu): ');

            if (clubName === '0') {
                break;
            }

            if (this.clubCoordinator.exist(clubName)) {
                clubFound = this.clubCoordinator.find(clubName);
                console.log('\n> Found club --> ', clubFound);
            } else {
                console.log('\n> No such club in the storage --> ' + clubName);
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
            const clubName = question('\n> club name to find (0.Club menu): ');

            if (clubName === '0') {
                break;
            }

            if (this.clubCoordinator.exist(clubName)) {
                clubFound = this.clubCoordinator.find(clubName);
                console.log('\n> Found club:', clubName);
                break;
            } else {
                console.log('\n> No such clubs in the storage --> ' + clubName);
            }
            clubFound = null;
        }
        return clubFound;
    }

    modify(): TravelClub | null{
        const targetClub = this.findOne();

        if (!targetClub) {
            return targetClub;
        }

        let newName = null;

        while (true) {
            newName = question('\n new club name (0.Club menu / Enter. no change): ');
            if (newName === '0') {
                break;
            }

            if (!newName.length) {
                newName = targetClub.name;
                break;
            }

            if (this.clubCoordinator.exist(newName)) {
                console.log('\n> Club already exists with name --> ' + newName);
                continue;
            }
            break;
        }

        let newIntro = question('new intro (0.Club menu / Enter. no change): ');

        if (newIntro === '0') {
            return targetClub;
        }
        if (!newIntro.length) {
            newIntro = targetClub.intro;
        }

        try {
            targetClub.name = newName;
            targetClub.intro = newIntro;
            targetClub.foundedDate = Dateutil.today();

            this.clubCoordinator.modify(newName, newIntro, targetClub.foundedDate);
            console.log('\n> Club changed: ', targetClub);
        } catch (e) {
            console.error(`Error: ${e.message}`);
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

            console.log('\n> Removing a club --> ' + targetClub.name);
            this.clubCoordinator.remove(targetClub);
        } else {
            console.log('\n> Remove cancelled, your club is safe. --> ' + targetClub.name);
        }
    }
}

export default ClubWindow;