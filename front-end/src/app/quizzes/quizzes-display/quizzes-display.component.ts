import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-quizzes-display',
  templateUrl: './quizzes-display.component.html',
  styleUrls: ['./quizzes-display.component.scss']
})
export class QuizzesDisplayComponent implements OnInit {

  public quizList: Quiz[] = [];
  public id:string;

  constructor(private route: ActivatedRoute,private router: Router, public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('residentid');
  }

  quizSelected(selected: boolean): void {
    console.log('event received from child:', selected);
  }

  editQuiz(quiz: Quiz): void {
    this.router.navigate(['/edit-quiz/' + quiz.name]);
  }

  deleteQuiz(quiz: Quiz): void {
    this.quizService.deleteQuiz(quiz);
  }

  defineSelectedQuiz(quiz: Quiz,id :string, quizId : string): void{
    this.quizService.setCurrentQuiz(quiz);
    window.location.href = "/quiz/"+ id +"/" + quizId;
  }
}
