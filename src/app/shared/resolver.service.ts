import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recepie } from "./recepie.model";
import { Observable } from "rxjs";
import { StorageService } from "./storage.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ResolverService implements Resolve<Recepie[]>{

    constructor(private storageService:StorageService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recepie[]> | Promise<Recepie[]> | Recepie[] {
        return this.storageService.onFetch()
    }
}