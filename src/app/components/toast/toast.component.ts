import { ToastService } from './../../services/toast/toast.service';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.model';
import { Store } from '@ngrx/store';
import { getToastDataState } from './../../modules/home/store/home.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  msg: string = '';
  type: string = '';
  show: boolean = false;
  msgType: string = '';
  ToastValue: any = [];

  public getToasterData$ = this.store.select(getToastDataState);
  public toasterDataSub$: Subscription | any;

  constructor(private ToastService: ToastService, private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.ToastService._toastData$.subscribe((val) => {
    //   val !== undefined || null ? this.toastGenerator(val) : ''

    // });
    this.toasterDataSub$ = this.getToasterData$.subscribe(data => {
      if (data) {
        this.toastGenerator(data);
      }
    });
  }

  toastGenerator(val: any) {
    console.log("🚀 ~ file: toast.component.ts ~ line 27 ~ ToastComponent ~ toastGenerator ~ val", val)
    this.msg = val?.massage;
    this.type = val?.toastType;
    this.show = true;
    this.msgType = val?.toastHeading;
    setTimeout(() => {
      this.show = false;
      this.msg = '';
      this.type = '';
      this.msgType = '';
    }, 3000);
  }

  ngOnDestroy() {
    if (this.toasterDataSub$) {
      this.toasterDataSub$.unsubscribe();
    }
  }

}
