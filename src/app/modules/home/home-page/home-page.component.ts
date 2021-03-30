import {CountryStateCityService} from './../../../services/countryStateCityApi/country-state-city.service';
import {ToastService} from './../../../services/toast/toast.service';
import {IUserInformation} from './../../../interface/check-inter';
import {UserInformationService} from './../../../services/dataStorage/user-information.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {v4 as uuidv4} from 'uuid';
import {AppState} from './../../../app.model';
import {Store} from '@ngrx/store';
import {getAppDataState, getToastDataState} from '../store/home.selector';
import {SetApplicationData, SetToastData} from '../store/home.action';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  form: any;
  ispersonalInfoFormEnable: boolean = false;
  trailFormFlag: boolean = false;
  personalInfoFormFlag: boolean = false;
  type: any;
  allCountrys: any;


  public getToasterData$ = this.store.select(getToastDataState);
  public getAppData$ = this.store.select(getAppDataState);
  public submitApplication$: any;
  getAppDataSub$: any;
  review: any=[];

  constructor(
    private fb: FormBuilder,
    private userInformationService: UserInformationService,
    private toastService: ToastService,
    private countryStateCityService: CountryStateCityService,
    private store: Store<AppState>
  ) {
    this.allCountrys = this.countryStateCityService.getCountry();

    this.review.length=3
  }

  ngOnInit() {
    this.form = this.fb.group({
      trailForm: this.fb.group({
        adsConverts: ['', Validators.required],
        monthlyAdBudget: ['', Validators.required],
      }),
      personalInfoForm: this.fb.group({
        id: [uuidv4(), Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ),
          ],
        ],
        monthlyAdBudget: ['', Validators.required],
        countryCode: ['', Validators.required],
        mobileNo: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{10}$')],
        ],
      }),
    });
  }

  updateLastForm() {
    this.getAppDataSub$ = this.getAppData$.subscribe(data => {
      if (data) {
        this.form.patchValue(data);
      }
    });
  }

  get trailFormControls() {
    return this.form.controls.trailForm;
  }

  get personalInfoFormControls() {
    return this.form.controls.personalInfoForm;
  }

  trailFormSubmit() {
    this.trailFormFlag = true;
    this.trailFormControls.valid && this.trailFormFlag
      ? (this.ispersonalInfoFormEnable = true)
      : (this.ispersonalInfoFormEnable = false);
  }

  personalInfoFormSubmit() {
    this.personalInfoFormFlag = true;
    const data: IUserInformation[] = {
      ...this.form.value,
    };
    if (this.personalInfoFormControls.valid && this.personalInfoFormFlag) {
      this.submitUserData(this.form.value);
    } else {
      this.toastGenerator(
        'Please Full fill your form',
        'bg-danger');
    }
  }

  public submitUserData(value: any) {
    this.userInformationService.setUserInformation(
      value
    );
    this.submitApplication$ = this.userInformationService.submitApplication(value).subscribe(data => {
      if (data) {
        this.toastGenerator(
          'Successful Registration',
          'bg-success'
        );
        this.store.dispatch(new SetApplicationData(value));
        this.form.reset();
        this.ispersonalInfoFormEnable = false;
        this.personalInfoFormFlag = false;
        this.trailFormFlag=false;
      }
    });
  }

  toastGenerator(val: string, val2: string, val3?: string) {
    const data = {
      massage: val,
      toastType: val2,
      toastHeading: val3,
      show: true,
    };
    this.store.dispatch(new SetToastData(data));
  }

  mobileNoLength(val: any) {
    if (val.target.value.length == 10) {
      // return false
    }
  }

  ngOnDestroy() {
    if (this.submitApplication$) {
      this.submitApplication$.unsubscribe();
    }
    if (this.getAppDataSub$) {
      this.getAppDataSub$.unsubscribe();
    }
  }
}
