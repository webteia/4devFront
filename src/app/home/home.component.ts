import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';
import { FormControl, FormGroup } from '@angular/forms';
import { PesquisaService } from '@app/_services/pesquisa.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users?: User[];
    ocultarPesquisa = false;

    constructor(private userService: UserService, private pesquisaService: PesquisaService) { }

    formPesquisa: FormGroup = new FormGroup({
        notaSuporte: new FormControl(''),
        notaVelocidade: new FormControl(''),
        notaIndicacao: new FormControl(''),
        notaAtendeMercado: new FormControl(''),
        sugestao: new FormControl(''),
    });

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });

    }

    enviar(): void {
        let pesquisa = {
            notaSuporte: this.formPesquisa.controls.notaSuporte.value,
            notaVelocidade:this.formPesquisa.controls.notaVelocidade.value,
            notaIndicacao: Boolean(this.formPesquisa.controls.notaIndicacao.value),
            notaAtendeMercado: Boolean(this.formPesquisa.controls.notaAtendeMercado.value),
            sugestao:this.formPesquisa.controls.sugestao.value,
            dataResponde: ""
        };
        
        console.log(pesquisa);
        if(pesquisa.notaSuporte === ""){
            alert("O campo de nota de suporte não foi preenchido!");
            return;
        }
        if(pesquisa.notaVelocidade === ""){
            alert("O campo de nota sobre nossa velocidade não foi preenchido!");
            return;
        }
        if(pesquisa.sugestao === ""){
            alert("O campo de sugestão não foi preenchido!");
            return;
        }
        if(pesquisa.sugestao.length < 10){
            alert("O campo de sugestão deve ao menos possuir 10 caracteres!");
            return;
        }

        this.pesquisaService.enviar(pesquisa).subscribe(
            (sucesso:any)=>{
                alert("Perquisa enviada, obrigado!");
            },
            (error:any)=>{
                alert("Houve um erro, comunique ao suporte");
            }
        );
    }
    
}