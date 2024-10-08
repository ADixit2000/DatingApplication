import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {

  // private memberService = inject(MembersService)

  members : Member[] =[];
  constructor(private memberService: MembersService) { }

  ngOnInit(): void {      
    this.loadMembers();
  }

  loadMembers(){    
    this.memberService.getMembers().subscribe({
      next: (members: Member[]) => this.members = members
    })
  }

}
