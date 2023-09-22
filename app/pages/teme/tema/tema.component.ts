import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AppService} from 'src/app/app.service';
import {Tema} from 'src/app/app.models';
import {AppSettings, Settings} from 'src/app/app.settings';
import {TranslateService} from "@ngx-translate/core";
import {TopicService} from "../../../service/topic.service";
import {LoginService} from "../../../service/login.service";

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.scss'],
})
export class TemaComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen: boolean = true;
  public tema: Tema;
  public settings: Settings;
  public agent: any;
  public commentForm: UntypedFormGroup;
  public propertyId: number;
  private sub: any;

  constructor(public appSettings: AppSettings,
              public appService: AppService,
              private activatedRoute: ActivatedRoute,
              public fb: UntypedFormBuilder,
              public translateService: TranslateService, public topicService: TopicService, public loginService: LoginService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.getPropertyById(params['id']);
      this.propertyId = params['id'];
    });

    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
      if (this.sidenav) {
        this.sidenav.close();
      }
    }
    this.commentForm = this.fb.group({
      review: [null, Validators.required],
      propertyId: this.propertyId
    });
  }

  public onCommentFormSubmit(values: any) {
    if (this.commentForm.valid) {
      console.log(values);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  public getPropertyById(id: number) {
    this.topicService.getOne(id).subscribe(data => {
      this.tema = data;
    });
  }


  public subscribeTo() {
    // this.appService.subscribeTo(this.tema, (this.settings.rtl) ? 'rtl' : 'ltr');
  }

  public isSubscribed() {
    //todo fix fav
    return this.appService.Data.pretplate.filter(item => item.id == this.tema.id)[0];
  }


  onOpenedChange() {

  }
}
