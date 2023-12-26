import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { GroupCategory } from 'src/app/interfaces/group-category';
import { GroupCategoryService } from 'src/app/services/group-category.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    groupCategories: GroupCategory[] = [];

    groupName: string = '';
    groupNameError: string = '';

    faXmark = faXmark;


    constructor(private router: Router, private groupCategoryService: GroupCategoryService) {
        const userid: string | null = sessionStorage.getItem('userid');

        if (userid == null) {
            router.navigate(['/login']);
        }

        this.groupCategoryService.getAllGroupCategory().subscribe(res => {
            for (let i = 0; i < 12; i++) {
                this.groupCategories.push(res[0]);
            }
        })
    }


    toggleForm(actionType: string): void {
        document.getElementById('createForm')?.classList.toggle('show');
    }

    createGroup(): void {
        if(this.groupName == ''){
            this.groupNameError = 'Group Name cannot be blank';
        }
    }
}
