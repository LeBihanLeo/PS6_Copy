import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewEncapsulation
} from '@angular/core';
import { Question } from 'src/models/question.model';
import {Resident} from "../../../models/resident.model";
import {Quiz} from "../../../models/quiz.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ResidentService} from "../../../services/resident.service";
import {HandicapService} from "../../../services/handicap.service";


@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StartQuizComponent implements OnInit, AfterViewInit {

  @Input() indexOfQuestion: number;
  @Input() currentQuestion: Question;
  @Input() currentResident: Resident;
  @Input() nextQuestionFunction: Function;
  @Input() quiz: Quiz;

  public currentQuestionIndex: number;
  public responseIndex: number;
  public label: string;
  public mouseControlModeActivated: Boolean;
  public missClickModeActivated: Boolean;
  public loadingModeActivated: Boolean;
  public animationAsBeenInterupt: Boolean;
  public answerisCurrentlyLoading: Boolean;
  public mouseIn: Boolean;
  public mouseOut: Boolean;
  public listOfAllElementToNavigateIn:  Map<HTMLElement, Function>;
  public resident: Resident;
  public residentId: string;


  constructor(private route: ActivatedRoute, public router : Router, private residentService: ResidentService, private handicapService: HandicapService, private statsHandicapService : HandicapService) {
    this.responseIndex = 0;
    this.mouseControlModeActivated = false;
    this.missClickModeActivated = false;
    this.loadingModeActivated = false;
    this.animationAsBeenInterupt = false;
    this.answerisCurrentlyLoading = false;
    this.mouseIn = false;
    this.mouseOut = false;
    this.currentQuestionIndex = this.indexOfQuestion;
  }

  ngOnInit() {
    this.residentId = this.route.snapshot.paramMap.get('residentid');
    this.residentService.setSelectedResident(this.residentId);
  }


  ngAfterViewInit(): void{
    //this.listOfAllElementToNavigateIn = this.getMapAnswersrevealAnswer();
    //this.handicapMode = new HandicapMode(this.currentResident, this.getMapAnswersrevealAnswer())
    this.residentService.residentSelected$.subscribe((resident) =>{
      this.resident = resident
      this.listOfAllElementToNavigateIn = this.getMapAnswersrevealAnswer();
      this.handicapService.initHandicap(this.resident, this.getMapAnswersrevealAnswer());
    });

  }

  nextQuiz(){
    if(document.getElementsByClassName("hide").length==0){
      this.handicapService.sendNbClickForCurrentQuestion();
      if(this.indexOfQuestion >= this.quiz.questions.length-1){
        this.handicapService.removeAllEventListener();
        this.router.navigate(['./end-quiz/'+this.currentResident.id+'/'+this.quiz.id]);
      }
      else{
        this.indexOfQuestion++;
        this.currentQuestion = this.quiz.questions[this.indexOfQuestion];
      }
      this.hideAnswer();
    }
  }

  private getMapAnswersrevealAnswer() {
    let allAnswer = document.getElementsByClassName("answer");
    let map = new Map();
    let nextQuestionElement = document.getElementById("nextQuestion") as HTMLElement;
    map.set(nextQuestionElement, ()=> this.nextQuiz());
    for(let i = 0 ; i < allAnswer.length ; i++ ){
      map.set(allAnswer[i], ()=> this.revealAnswer(allAnswer[i]));
    }
    return map;
  }


  chooseAnswer(event: Event): void {
    const eventTarget: Element = event.target as Element;
    if(eventTarget.classList.contains("missClickRange"))
      this.revealAnswer(eventTarget.firstChild);
    else
      this.revealAnswer(eventTarget);
  }

  revealAnswer(answer){
    const isAnswer: boolean = answer.classList.contains("true");
    const resultAnswer: Element = document.getElementById("resultAnswer");
    //this.showAnswer();
    const answerList = document.getElementsByClassName("answer");
    for(let i = 0 ; i < answerList.length ; i++){
      answerList[i].classList.remove("hide");
    }
    if(isAnswer){
      this.handicapService.increaseGoodAnswer();
      resultAnswer.innerHTML = "Félicitation! Tu as trouvé la bonne réponse !";
    }
    else{
      this.handicapService.increaseBadAnswer();
      resultAnswer.innerHTML = "Dommage! Ce n'était pas la bonne réponse ! "
    }
  }

  showAnswer(){
    const answerList = document.getElementsByClassName("answer");
    for(let i = 0 ; i < answerList.length ; i++){
      answerList[i].classList.remove("hide");
    }
  }

  hideAnswer(){
    const answerList = document.getElementsByClassName("answer");
    const resultAnswer: Element = document.getElementById("resultAnswer");
    resultAnswer.innerHTML = "";
    for(let i = 0 ; i < answerList.length ; i++){
      answerList[i].classList.add("hide");
    }
  }


}

