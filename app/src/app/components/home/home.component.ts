import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Group } from 'src/app/interfaces/group';
import { GroupCategory } from 'src/app/interfaces/group-category';
import { GroupCategoryService } from 'src/app/services/group-category.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    groupCategories: GroupCategory[] = [];
    selectedCategoryId!: number;

    groupName: string = '';
    errorMessage: string = '';

    isPrivate: boolean = false;
    password: string = '';

    faXmark = faXmark;


    constructor(private router: Router, private groupCategoryService: GroupCategoryService, private groupService: GroupService) {
        const userid: string | null = sessionStorage.getItem('userid');

        if (userid == null) {
            router.navigate(['/login']);
        }

        this.groupCategoryService.getAllGroupCategory().subscribe(res => {
            for (let i = 0; i < 12; i++) {
                this.groupCategories.push(res[0]);
            }

            this.groupCategories = res;
        })
    }


    toggleForm(actionType: string): void {
        document.getElementById('createForm')?.classList.toggle('show');
        document.getElementById('navbar')?.classList.toggle('disable');
        document.getElementById('main')?.classList.toggle('disable');
    }

    selectGroupCategory(id: number): void {
        this.selectedCategoryId = id;
    }

    changeGroupType(e: any): void {
        if (e.target.value == 'public') {
            this.isPrivate = false;
        } else {
            this.isPrivate = true;
        }
    }

    createGroup(): void {
        if (this.groupName == '' && this.password == '' && this.isPrivate) {
            this.errorMessage = 'Group Name and Password cannot be blank';
        } else if (this.groupName == '') {
            this.errorMessage = 'Group Name cannot be blank';
        } else if (this.password == '' && this.isPrivate) {
            this.errorMessage = 'Password cannot be blank';
        } else {
            const newGroup: Group = {
                groupName: this.groupName,
                isPrivate: this.isPrivate,
                password: this.password,
                categoryId: this.selectedCategoryId,
                leaderId: Number(sessionStorage.getItem('userid'))
            }

            console.log(newGroup);

            this.groupService.createNewGroup(newGroup).subscribe(res => {
                if (res.result == 'Success') {
                    console.log('Successfully create new group');
                } else {
                    console.log('Error: ' + res.message);
                }
            })
        }
    }
}
