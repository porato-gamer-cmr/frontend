import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApprovService {

  url="http://172.16.16.195:8000/stock/";
  p: Boolean;

  constructor(private httpClient: HttpClient) { }

  approvsSubject = new Subject<any[]>();
  approvsFilterSubject = new Subject<any[]>();

  approvs=[{
    name: "Formats",
    quantite: 15,
  }];
  approvsFilter;

  emitApprovsSubject(){
    this.approvsSubject.next(this.approvs.slice());
  }

  emitApprovsFilterSubject(){
    this.approvsFilterSubject.next(this.approvsFilter.slice());
  }


  addApprov(produits){
    this.approvs.push(produits);
  }

  updateProduits(produits, index){
    this.approvs.splice(index,1,produits);
  }

  deleteProduits(id){
    this.p = confirm("Voulez-vous vraiment supprimer ?");
    if(this.p){
      this.approvs.splice(id,1);

  }
}

  /** listProduits(){
    this.httpClient.get(this.url + "listproduits")
      .subscribe(
        (data)=>{
          this.produits = data;
          this.emitProduitsSubject
        },
        (error)=>{
          alert("probleme lors de la récuperation des produits" + error);
        }
      );
  }

  addProduits(produits){
    this.httpClient.post<any[]>(this.url + "addproduits", produits)
      .subscribe(
        (data)=>{

          this.listProduits();
        },
        (error)=>{
          console.log("Erreur lors de l ajout de produit"+ error);
        }
      );
  }

  updateProduits(produits){
    this.httpClient.post<any[]>(this.url + "updateproduits" + produits.id, produits)
      .subscribe(
        (data)=>{
          this.listProduits();
        },
        (error)=>{
          console.log("Erreur lors de la modification" + error);
        }
      );
  }

  deleteProduits(id){
    this.p = confirm("Voulez-vous vraiment supprimer ?");
    if(this.p){
      this.httpClient.post<any[]>(this.url + "deleteproduits",{index: id})
        .subscribe(
          (data)=>{
            this.listProduits();
          },
          (error)=>{
            console.log("Erreur lors de la suppression" +error);
          }
        )
    }

  } **/
}
