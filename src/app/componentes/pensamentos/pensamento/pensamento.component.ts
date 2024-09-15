import { Component, Input } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent {

  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  };
  @Input() listaFavoritos: Pensamento[] = [];

  constructor(private service: PensamentoService) { }

  larguraPensamento(): string {
    return this.pensamento.conteudo.length >= 256 ? 'pensamento-g' : 'pensamento-p';
  }

  mudarIconeFavorito(): string {
    return this.pensamento.favorito ? 'ativo' : 'inativo';
  }

  atualizarFavoritos() {
    this.pensamento.favorito = !this.pensamento.favorito;
    this.service.editar(this.pensamento).subscribe(() => {
      if (this.pensamento.favorito) {
        this.listaFavoritos.push(this.pensamento);
      } else {
        const index = this.listaFavoritos.indexOf(this.pensamento);
        if (index > -1) {
          this.listaFavoritos.splice(index, 1);
        }
      }
    });
  }
}
