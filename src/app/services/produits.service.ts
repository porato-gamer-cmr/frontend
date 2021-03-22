import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  url="http://172.16.16.195:8000/stock/";
  p: Boolean;

  constructor(private httpClient: HttpClient) { }

  produitsSubject = new Subject<any[]>();
  produitsFilterSubject = new Subject<any[]>();

  produits;
  produitsFilter;

  emitProduitsSubject(){
    this.produitsSubject.next(this.produits.slice());
  }

  emitProduitsFilterSubject(){
    this.produitsFilterSubject.next(this.produitsFilter.slice());
  }

  listProduits(){
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

  }
}
