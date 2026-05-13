import ClubMember from "../../step1/entity/ClubMember";
import RoleInClub from "../../step1/entity/RoleInClub";
import TravelClub from "../../step1/entity/TravelClub";
import MapStorage from "./MapStorage";


class ClubMemberStore {
    clubMap: Map<string, TravelClub>;

    constructor() {
        this.clubMap = MapStorage.getInstance().clubMap;
    }

    hasMembers(clubName: string): boolean | undefined {
        const club = this.clubMap.get(clubName);

        if (club !== undefined) {
            return club.members.length !== 0;
        }
    }

    modify(member: ClubMember, newValueMap: Map<string, string>): void {
        const keyIter = newValueMap.keys();
        let keyIterResult = keyIter.next();

        while (keyIterResult.value) {
            const key = keyIterResult.value;
            const value = newValueMap.get(key) || '';

            switch (key) {
                case 'name':
                    member.name = value;
                    break;
                case 'nickname':
                    member.nickname = value;
                    break;
                case 'phoneNumber':
                    member.phoneNumber = value;
                    break;
                case 'birthday':
                    member.birthDay = value;
                    break;
                case 'role':
                    member.role = value as RoleInClub;
                    break;
            }

            keyIterResult = keyIter.next();
        }
    }

    exist(clubName: string, email: string): boolean {
        const club = this.clubMap.get(clubName);

        if (club !== undefined) {
            for (const member of club.members) {
                if (member.email === email) {
                    return true;
                }
            }
        }
        return false;
    }

    register(clubName: string, newMember: ClubMember): string{
        const club = this.clubMap.get(clubName);

        if (club !== undefined) {
            const hasMembers = this.exist(club.name, newMember.email);

            if (hasMembers) {
                return '';
            }
            club.members.push(newMember);
        }
        return newMember.email;
    }

    find(clubName: string, email: string): ClubMember | null {
        const club = this.clubMap.get(clubName);

        if (club !== undefined) {
            for (const member of club.members) {
                if (member.email === email) {
                    return member;
                }
            }
        }
        return null;
    }

    remove(clubName: string, memberEmail: string): void{
        const club = this.clubMap.get(clubName);

        let targetMember = null;

        if (club !== undefined) {
            for (const member of club.members) {
                if (member.email === memberEmail) {
                    targetMember = member;
                    break;
                }
            }

            if (targetMember) {
                const index = club.members.indexOf(targetMember);

                club.members.splice(index, 1);
            }
        }
    }
}

export default ClubMemberStore;