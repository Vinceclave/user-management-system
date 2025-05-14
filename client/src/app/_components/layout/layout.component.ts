import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
    isSidebarCollapsed = false;
    isSidebarVisible = false;

    ngOnInit() {
        this.checkScreenSize();
        window.addEventListener('resize', () => this.checkScreenSize());
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