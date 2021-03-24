import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-reapprov',
  templateUrl: './reapprov.component.html',
  styleUrls: ['./reapprov.component.css']
})
export class ReapprovComponent implements OnInit {

  produits: any[];
  produitsFilter: any[];
  produitEdit;
  produitsSubscription: Subscription;
  produitsFilterSubscription: Subscription;
  @Input() name;
  @Input() quantite;
  @Input() securite;
  @Input() alerte;
  @Input() id;
  @Input() e;
  @Input() index;
  p: Boolean;

  constructor(private produitsService: ProduitsService) { }

  ngOnInit(): void {
    this.produits = this.produitsService.produits;
    this.produitsFilter = this.produits;
  }

  infoProduits(produits, index){
    this.index = index;
    this.id = produits.id;
    this.name = produits.name;
    this.quantite = produits.quantite;
    this.securite = produits.securite;
    this.alerte = produits.alerte;
  }

  updateProduits(form: NgForm){
    this.name = (form.value.name) ? form.value.name : this.name;
    this.quantite = (form.value.quantite) ? form.value.quantite : this.quantite;
    this.securite = (form.value.securite) ? form.value.securite : this.securite;
    this.alerte = (form.value.alerte) ? form.value.alerte : this.alerte;
    
    this.produitEdit = {
      id: this.id,
      name: this.name,
      quantite: this.quantite,
      securite: this.securite,
      alerte: this.alerte
    };

    this.produitsService.updateProduits(this.produitEdit, this.index);
    this.produitsService.emitProduitsSubject();

  }

  deleteProduits(id){
    this.produitsService.deleteProduits(id);
  }

  addProduits(form: NgForm){
    let produits = {
      name: form.value.name,
      quantite: form.value.quantite,
      securite: form.value.securite,
      alerte: form.value.alerte
    };
    this.produitsService.addProduits(produits);
  }

  searchProduit(){
    this.produitsFilter = [];
    if(!this.e){this.e="";}
    p: RegExp("  ","g");
    this.e=this.e.replace(this.p," ");
    this.e=this.e.toLowerCase();
    for(let produit of this.produits){
      this.p=false;
      if(String(produit.name).toLowerCase().search(this.e)!=-1){
        this.p=true;
      }
      if(this.p){
        this.produitsFilter.push(produit);
      }
    }    
    this.produitsService.emitProduitsFilterSubject();
  }

  ngOnDestroy(){
    this.produitsSubscription.unsubscribe();
  }

}
