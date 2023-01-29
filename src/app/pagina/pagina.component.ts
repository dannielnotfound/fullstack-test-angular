import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss'],
})
export class PaginaComponent implements OnInit {
  time: any;
  error: string;
  date: any;
  public data: FormGroup;
  public apiText = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //Formulario input text
    this.data = this.fb.group({
      text: ['', Validators.required],
    });

    // Retorna a cada 60 segundos a data e o horário 
    this.apiService.getData().pipe(
      catchError((err) => {
        this.error = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      this.time = response.time;
      this.date = response.date;
      this.cd.detectChanges();
    });


    // Enviar texto com a tecla Enter
    document
      .getElementById('inptText')
      .addEventListener('keyup', function (event) {
        event.preventDefault();
        if (event.which === 13) {
          document.getElementById('btn').click();
        }
      });

  }

  public createText() {
    this.apiService.getText(this.data.value).pipe(
      catchError((err) => {
        this.apiText = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      this.apiText = response.text;
    });
    this.data.reset();
  }
}
