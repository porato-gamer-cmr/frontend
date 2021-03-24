import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApprovService } from '../services/approv.service';
import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-approv',
  templateUrl: './approv.component.html',
  styleUrls: ['./approv.component.css']
})
export class ApprovComponent implements OnInit {

  produits: any[];
  approvs: any[];
  approvsFilter: any[];
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
  @Input() nbr=1;
  

  constructor(private approvService: ApprovService, private produitsService: ProduitsService) { }

  ngOnInit(): void {
    this.produits = this.produitsService.produits;
    this.approvs = this.approvService.approvs;
    this.approvsFilter = this.approvs;
  }

  infoApprov(approv, index){
    this.index = index;
    this.name = approv.name;
    this.quantite = approv.quantite;
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

    this.produitsService.updateProduits(this.produitEdit);
    this.produitsService.emitProduitsSubject();

  }

  deleteProduits(id){
    this.produitsService.deleteProduits(id);
  }

  addApprov(form: NgForm){
    let produits = {
      name: form.value.name,
      quantite: form.value.quantite
    };
    this.approvService.addApprov(produits);
  }

  searchApprov(){
    this.approvsFilter = [];
    if(!this.e){this.e="";}
    p: RegExp("  ","g");
    this.e=this.e.replace(this.p," ");
    this.e=this.e.toLowerCase();
    for(let approv of this.approvs){
      this.p=false;
      if(String(approv.name).toLowerCase().search(this.e)!=-1){
        this.p=true;
      }
      if(this.p){
        this.approvsFilter.push(approv);
      }
    }    
    this.approvService.emitApprovsFilterSubject();
  }

  updatenbr(){
    this.nbr++;
  }
  
  reset(){
    this.nbr=1;
  }

  ngOnDestroy(){
    this.produitsSubscription.unsubscribe();
  }

}
