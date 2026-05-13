import { question } from "readline-sync";
import ClubMember from "../../../step1/entity/ClubMember";
import MemberHelper from "../../logic/MemberHelper";
import ClubCoordinator from "../../logic/ClubCoordinator";
import TravelClub from "../../../step1/entity/TravelClub";
import RoleInClub from "../../../step1/entity/RoleInClub";


class MemberWindow {
    currentClub: TravelClub | null = null;
    clubCoordinator: ClubCoordinator;
    memberHelper: MemberHelper;


    constructor(clubCoordinator: ClubCoordinator) {
        this.clubCoordinator = clubCoordinator;
        this.memberHelper = clubCoordinator.memberHelper;
    }

    findAnotherClub(): TravelClub | null {
        let clubFound = null;

        if (!this.clubCoordinator.hasClubs()) {
            console.log('\n> No clubs in the storage.');
            this.currentClub = null;
            return null;
        }

        while (true) {
            const clubName = question('\n club name to find (0.Memeber Menu): ');

            if (clubName === '0') {
                break;
            }
            if (this.clubCoordinator.exist(clubName)) {
                clubFound = this.clubCoordinator.find(clubName);
                console.log('\n> Found club: ', clubFound);
                break;
            } else {
                console.log('\n> No such club in the storage --> ' + clubName);
            }
            clubFound = null;
        }

        this.currentClub = clubFound;
        return clubFound;
    }

    add(): void {
        if (!this.currentClub) {
            console.log('\n> No target club yet. Find target club first.');
            return;
        }

        while (true) {
            const email = question('\n new member\'s email (0.Member menu): ');

            if (email === '0') {
                return;
            }

            if (this.memberHelper.exist(this.currentClub.name, email)) {
                console.log('Member with this email already exists. --> ' + email);
                continue;
            }

            const name = question('name: ');
            const phoneNumber = question('phone number: ');
            const nickName = question('nickname: ');
            const birthDay = question('birthday(yyyy.mm.dd): ');
            const memberRole = question('Presedent|Member: ');

            try {
                const newMember = new ClubMember(email, name, phoneNumber);

                newMember.nickname = nickName;
                newMember.birthDay = birthDay;
                newMember.role = memberRole as RoleInClub;

                if (!this.memberHelper.hasMembers(this.currentClub.name)) {
                    newMember.role = memberRole as RoleInClub;
                }

                this.memberHelper.register(this.currentClub.name, newMember);
                console.log('\n> Registered member: ', newMember);
            } catch (e) {
                console.error(`Error: ${(e as Error).message}`);
            }
        }
    }

    find(): void {
        if (!this.currentClub) {
            console.log('\n> No target club ye. Find target club first.');
            return;
        }

        if (!this.memberHelper.hasMembers(this.currentClub.name)) {
            console.log('\n> No members in the target club --> ' + this.currentClub.name);
        }

        while (true) {
            const email = question('\n member email to find (0.Memeber menu): ');

            if (email === '0' || !email.length) {
                return;
            }

            if (this.memberHelper.exist(this.currentClub.name, email)) {
                const member = this.memberHelper.find(this.currentClub.name, email);

                if (member) {
                    console.log('\n> Found member: ', member);
                }
            } else {
                console.log('\n> No such member in the club storage.')
            }
        }
    }

    modify(): void {
        if (!this.currentClub) {
            console.log('\n> No target club yet. Find target club first.');
            return;
        }

        const memberOfClub = this.memberHelper.hasMembers(this.currentClub.name);

        if (!memberOfClub) {
            console.log('\n> No members in the target club --> ' + this.currentClub.name);
            return;
        }

        while (true) {
            const email = question('\n member email to modify (0.Member menu): ');

            if (email === '0' || !email.length) {
                return;
            }

            const member = this.memberHelper.exist(this.currentClub.name, email);

            if (!member) {
                console.log('\n> No such a member --> ' + email);
                continue;
            }

            const foundMember = this.memberHelper.find(this.currentClub.name, email);

            if (!foundMember) {
                console.log('\n> No such a member ');
            }

            console.log('\n> Found member: ', foundMember);

            const newName = question('\n new name (Enter. no change): ');
            const newPhoneNumber = question(' new phone number (Enter. no chage): ');
            const newNickName = question(' new nickname (Enter. no change): ');
            const newBirthday = question(' new birthday (yyyy.mm.dd) (Enter. no change): ');
            const newRole = question(' new President|Member (Enter. no change): ');

            const newValueMap = new Map<string, string>();

            if (foundMember) {
                newValueMap.set('name', newName || foundMember.name);
                newValueMap.set('phoneNumber', newPhoneNumber || foundMember.phoneNumber);
                newValueMap.set('nickname', newNickName || foundMember.nickname);
                newValueMap.set('birthDay', newBirthday || foundMember.birthDay);
                newValueMap.set('role', newRole || foundMember.role);

                this.memberHelper.modify(foundMember, newValueMap);
                console.log('\n> Modified member: ', foundMember);
            }
            else {
                console.log('\n> No such a member ');
            }
        }
    }

    remove(): void {
        if (!this.currentClub) {
            console.log('\n> No target club yet. Find target club first.');
            return;
        }

        if (!this.memberHelper.hasMembers(this.currentClub.name)) {
            console.log('\n> No members in the target club --> ' + this.currentClub.name);
        }

        while (true) {
            const email = question('\n member email to remove (0.Member menu): ');

            if (email === '0' || !email.length) {
                return;
            }

            if (!this.memberHelper.exist(this.currentClub.name, email)) {
                console.log('\n> No such a member -> ' + email);
                continue;
            }

            const member = this.memberHelper.find(this.currentClub.name, email);    

            if (member) {
                this.memberHelper.remove(this.currentClub.name, email);
            }
            console.log('\n> Removed by email --> ' + email);
            break;
        }
    }
}

export default MemberWindow;