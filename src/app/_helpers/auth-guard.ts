import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
    providedIn: 'root'
})

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

    constructor(private authService: TokenStorageService, private router: Router) { }
    
    canActivate():boolean {
        // If the user is not logged in we'll send them back to the home page
        if (!this.authService.isAuthenticated()) {
            console.log('Not logged in');
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}