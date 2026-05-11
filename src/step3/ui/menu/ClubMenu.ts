import { question } from "readline-sync";
import TravelClub from "../../../step1/entity/TravelClub";
import ClubCoordinator from "../../logic/ClubCoordinator";
import ClubWindow from "../console/ClubWindow";
import MemberMenu from "./MemberMenu";


class ClubMenu {
    clubConsole: ClubWindow;
    memberMenu: MemberMenu;
    currentClub: TravelClub | null = null;

    constructor() {
        const clubCoordinator = new ClubCoordinator();

        this.clubConsole = new ClubWindow(clubCoordinator);
        this.memberMenu = new MemberMenu(clubCoordinator);
    }

    showMenu(): void {
        let inputNumber = 0;

        while (true) {
            this.displayMainMenu();
            inputNumber = this.selectMainMenu();
            switch (inputNumber) {
                case 1:
                    this.currentClub = this.clubConsole.register();
                    break;
                case 2:
                    this.currentClub = this.clubConsole.find();
                    break;
                case 3:
                    this.currentClub = this.clubConsole.modify();
                    break;
                case 4:
                    this.clubConsole.remove();
                    break;
                case 5:
                    this.memberMenu.showMenu(this.currentClub);
                    break;
                case 0:
                    this.exitProgram();
                default:
                    console.log('Choose Again!')
            }
        }
    }

    displayMainMenu(): void {
        console.log('....................');
        console.log('[Travel Club Menu]');
        console.log('.....................')
        console.log('1. Regiter')
        console.log('2. Find')
        console.log('3. Modify')
        console.log('4. Remove')
        console.log('....................')
        console.log('5. Member Menu')
        console.log('.....................')
        console.log('0. Exit Program');
        console.log('......................')
    }

    selectMainMenu(): number {
        const answer = question('Select number : ');
        const menuNumber = parseInt(answer);

        if (menuNumber >= 0 && menuNumber <= 5) {
            return menuNumber;
        } else {
            console.log('It\s a invalid number -> ' + menuNumber);
            return -1;
        }
    }
    exitProgram(): void {
        console.log('Program exit. Bye...');
        process.exit(0);
    }
}

export default ClubMenu;