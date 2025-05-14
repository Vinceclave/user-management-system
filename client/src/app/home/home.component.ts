import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Account } from '@app/_models';
import { AccountService } from '@app/_services';
import { DepartmentService } from '@app/_services/department.service';
import { EmployeeService } from '@app/_services/employee.service';
import { WorkflowService } from '@app/_services/workflow.service';
import { RequestService } from '@app/_services/request.service';
import { Department } from '@app/_models/department.model';
import { Employee } from '@app/_models/employee.model';
import { Workflow } from '@app/_models/workflow.model';
import { Request } from '@app/_models/request.model';
import { RequestStatus } from '@app/_models/request.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
    account: Account;
    departments: Department[] = [];
    employees: Employee[] = [];
    workflows: Workflow[] = [];
    requests: Request[] = [];
    recentRequests: Request[] = [];
    pendingRequests: Request[] = [];
    isSidebarCollapsed = false;
    isSidebarVisible = false;

    constructor(
        private accountService: AccountService,
        private departmentService: DepartmentService,
        private employeeService: EmployeeService,
        private workflowService: WorkflowService,
        private requestService: RequestService
    ) {
        this.account = this.accountService.accountValue;
    }

    ngOnInit() {
        this.loadData();
        this.checkScreenSize();
        window.addEventListener('resize', () => this.checkScreenSize());
    }

    loadData() {
        // Load departments
        this.departmentService.getAll().subscribe(departments => {
            this.departments = departments;
        });

        // Load employees
        this.employeeService.getAll().subscribe(employees => {
            this.employees = employees;
        });

        // Load workflows
        this.workflowService.getAll().subscribe(workflows => {
            this.workflows = workflows;
        });

        // Load requests
        this.requestService.getAll().subscribe(requests => {
            this.requests = requests;
            this.pendingRequests = requests.filter(r => r.status === RequestStatus.PENDING);
            this.recentRequests = requests
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5);
        });
    }

    getEmployeeName(employeeId: number): string {
        const employee = this.employees.find(e => e.id === employeeId);
        return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown Employee';
    }

    getEmployeeCount(departmentId: number): number {
        return this.employees.filter(e => e.departmentId === departmentId).length;
    }

    getStatusClass(status: string): string {
        switch (status) {
            case RequestStatus.PENDING:
                return 'text-warning';
            case RequestStatus.APPROVED:
                return 'text-success';
            case RequestStatus.REJECTED:
                return 'text-danger';
            case RequestStatus.CANCELLED:
                return 'text-secondary';
            default:
                return 'text-primary';
        }
    }

    private checkScreenSize() {
        if (window.innerWidth <= 767.98) {
            this.isSidebarCollapsed = true;
            this.isSidebarVisible = false;
        } else {
            this.isSidebarCollapsed = false;
            this.isSidebarVisible = true;
        }
    }

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
        if (window.innerWidth <= 767.98) {
            this.isSidebarVisible = !this.isSidebarVisible;
        }
    }
}
