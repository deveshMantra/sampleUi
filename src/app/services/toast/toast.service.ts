import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }


 readonly _toastData$ = new BehaviorSubject(undefined);

setToastData(data:any){
this._toastData$.next(data)
}


}
