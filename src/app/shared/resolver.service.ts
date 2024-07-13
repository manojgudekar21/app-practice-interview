import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recepie } from "./recepie.model";
import { Observable } from "rxjs";
import { StorageService } from "./storage.service";
import { Injectable } from "@angular/core";
import { RecepieService } from "../recepies/recepie.service";

@Injectable({
    providedIn: 'root'
})
export class ResolverService implements Resolve<Recepie[]>{

    constructor(private storageService:StorageService, private recepieService:RecepieService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recepie[]> | Promise<Recepie[]> | Recepie[] {
        const recepies = this.recepieService.getRecepies();
        if(recepies.length ===0){
            return this.storageService.onFetch()
        }else{
            return recepies
        }
    }
}