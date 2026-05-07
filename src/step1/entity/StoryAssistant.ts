import ClubMember from "./ClubMemeber";
import TravelClub from "./TravelClub";


const name = 'namoosori club';
const intro = 'Welcome to namoosori club';
const club = new TravelClub(name, intro);


club.members.push(new ClubMember('leaderhone@nextree.co.kr', 'gil dong Hong', '010-0001-0001').inviteLeader());
club.members.push(new ClubMember('memberlee@nextree.co.kr', 'nare Lee', '010-0001-0002').inviteLeader());


console.log(club)