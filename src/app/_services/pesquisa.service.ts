import { HttpClient } from "@angular/common/http";
import {Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PesquisaService{
    constructor(private http: HttpClient){}


enviar(pesquisa:any): Observable<any> {
    return this.http.post('http://localhost:4000/api/pesquisa', pesquisa).pipe(map((res: any) => res));
}

}