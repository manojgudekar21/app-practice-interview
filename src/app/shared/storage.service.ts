import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { map, tap } from "rxjs";
import { RecepieService } from "../recepies/recepie.service";
import { Recepie } from "./recepie.model";

@Injectable({
    providedIn: 'root'
})
export class StorageService implements OnInit {

    constructor(private http: HttpClient, private recepieService: RecepieService) { }

    ngOnInit(): void {

    }

    onSave() {
        const recepies = this.recepieService.getRecepies()
        this.http.put('https://practice-de6f3-default-rtdb.firebaseio.com/recepies.json', recepies)
            .subscribe((responseData) => {
                console.log(responseData)
            })
    }

    onFetch() {
        return this.http.get<Recepie[]>('https://practice-de6f3-default-rtdb.firebaseio.com/recepies.json')
            .pipe(map(recepies => {
                return recepies.map(recepie => {
                    return { ...recepie, ingridents: recepie.ingridents ? recepie.ingridents : [] }
                })
            }), tap(recepies => {
                this.recepieService.addRecepiesformDB(recepies)
            }))
    }
}