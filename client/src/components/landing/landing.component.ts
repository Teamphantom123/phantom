import { Component } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { NgxLoaderSpinnerService } from 'ngx-loader-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PathwayService } from 'src/services/pathways.service';
declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  constructor(
    private feedbackService: FeedbackService,
    private spinnerService: NgxLoaderSpinnerService,
    private pathwayService: PathwayService
  ) {}

  questionsList: any = [];
  pathways: any = [];
  message: any = null;
  header: any = null;
  onComponentLoad: boolean = true;
  className: string = '';
  feedbackForm = new FormGroup({});

  ngOnInit() {
    this.getFeedbackByQuery();
    this.getPathwaysByQuery();
  }

  getFeedbackByQuery() {
    this.feedbackForm.reset();
    this.spinnerService.show();
    try {
      this.feedbackService.getFeedbackbyQuery(``).subscribe(
        (response: any) => {
          console.log(`Feedback Data: ${JSON.stringify(response)}`);
          this.questionsList = response.body;

          //FormGroup
          this.questionsList.forEach((element: any, idx: any) => {
            this.feedbackForm.addControl(
              'haveComments' + idx,
              new FormControl(null, Validators.required)
            );
            if (!element.generalFeedback)
              this.feedbackForm.addControl(
                'pathway' + idx,
                new FormControl('null')
              );
            this.feedbackForm.addControl(
              'feedback' + idx,
              new FormControl(null)
            );
          });

          console.log('Form Builder :', this.feedbackForm.value);
          this.spinnerService.hide();
        },
        (err: any) => {
          console.error(`Error [getFeedback]:  , ${JSON.stringify(err.error)}`);
          this.spinnerService.hide();
        }
      );
    } catch (err: any) {
      console.error(`Error [getFeedback]:  , ${JSON.stringify(err)}`);
      this.spinnerService.hide();
    }
  }

  haveComments(i: any) {
    return this.feedbackForm.get('haveComments' + i)?.value;
  }

  onClickComments(generalFeedback: boolean, i: number, val: boolean) {
    this.feedbackForm.get('feedback' + i)?.reset();
    this.feedbackForm.get('pathway' + i)?.reset();

    if (val)
      this.feedbackForm
        .get('feedback' + i)
        ?.setValidators([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200),
        ]);
    else this.feedbackForm.get('feedback' + i)?.clearValidators();

    if (!generalFeedback && val)
      this.feedbackForm
        .get('pathway' + i)
        ?.setValidators([Validators.required]);
    else this.feedbackForm.get('pathway' + i)?.clearValidators();

    this.feedbackForm.get('feedback' + i)?.updateValueAndValidity();
    this.feedbackForm.get('pathway' + i)?.updateValueAndValidity();
  }

  getPathwaysByQuery() {
    this.spinnerService.show();
    try {
      this.pathwayService.getPathwaybyQuery(`visible=true`).subscribe(
        (response: any) => {
          console.log(`Pathway Data: ${JSON.stringify(response)}`);
          this.pathways = response.body;
          this.spinnerService.hide();
        },
        (err: any) => {
          console.error(`Error [getPathway]:  , ${JSON.stringify(err.error)}`);
          this.spinnerService.hide();
        }
      );
    } catch (err: any) {
      console.error(`Error [getPathway]:  , ${JSON.stringify(err)}`);
      this.spinnerService.hide();
    }
  }

  postComments() {
    this.spinnerService.show();
    try {
      let feedBackObj: any = this.prepareCommentsObj();
      this.feedbackService.postComments(feedBackObj).subscribe(
        (response: any) => {
          this.onComponentLoad = false;
          this.className = 'alert alert-success';
          this.header = 'Success';
          this.message = response.message;

          setTimeout(() => {
            this.className = '';
            this.onComponentLoad = true;
            this.header = null;
            this.message = null;
            $('#feedbackModal').modal('hide');
          }, 1500);
          console.log(`Feedback Data: ${JSON.stringify(response)}`);
          this.ngOnInit();
          this.spinnerService.hide();
        },
        (err: any) => {
          console.error(
            `Error [postFeedback]:  , ${JSON.stringify(err.error)}`
          );
          this.onComponentLoad = false;
          this.className = 'alert alert-danger';
          this.header = 'Error';
          this.message = err.error.body;
          this.spinnerService.hide();
        }
      );
    } catch (err: any) {
      console.error(`Error [postFeedback]:  , ${JSON.stringify(err)}`);
      this.onComponentLoad = false;
      this.className = 'alert alert-danger';
      this.header = 'Error';
      this.message = err.error.body;
      this.spinnerService.hide();
    }
  }

  prepareCommentsObj() {
    let array: any = [];
    this.questionsList.forEach((element: any) => {
      array.push({ question: element.question, feedback: {} });
    });

    Object.keys(this.feedbackForm.value).forEach((key: any) => {
      let idx = key.charAt(key.length - 1);
      if (
        this.feedbackForm.get(key)?.value !== null &&
        this.feedbackForm.get(key)?.value !== '' &&
        this.feedbackForm.get(key)?.value !== undefined
      )
        array[idx].feedback[key.substr(0, key.length - 1)] =
          this.feedbackForm.get(key)?.value;
    });
    console.log(`Array , ${JSON.stringify(array)}`);
    return array;
  }

  resetModal() {
    this.ngOnInit();
  }
}
