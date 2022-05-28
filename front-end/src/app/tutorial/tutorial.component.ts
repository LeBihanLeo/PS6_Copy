import { Component, OnInit } from '@angular/core';
import {Tutoriel} from "../../models/tutoriel.model";
import {Router} from "@angular/router";
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {


  public tutoList: Tutoriel[] = [];

  constructor(private router: Router, public quizService: QuizService) {
  }

  ngOnInit(): void {
    this.createTutoriel();
  }

  createTutoriel(): void {
    this.tutoList[0]={
      question: "Comment ajouter un résident ?",
      reponse: "Depuis la page d'acceuil, cliquez sur \"Choisir un résident\" (ou sur \"Résidents\" dans l'en-tête)" +
        "\t> cliquez sur \"+ Ajouter un résident\"" +
        "\t> remplissez les champs et cliquez sur \"Valider\""
    }
    this.tutoList[1]={
      question: "Comment modifier ou supprimer un résident ?",
      reponse: "Depuis la page d'acceuil, cliquez sur \"Choisir un résident\" (ou sur \"Résidents\" dans l'en-tête)" +
        "\t> cliquez sur le résident à modifier" +
        "\t> cliquez le bouton bleu \"Modifier\"" +
        "\t> modifiez les champs et cliquez sur \"Valider\" sinon cliquez sur \"Supprimer\" si vous souhaitez supprimer un résident"
    }
    this.tutoList[2]={
      question: "Comment ajouter un quiz ?",
      reponse: "Depuis la page d'acceuil, cliquer sur \"+ Créer un quiz\"" +
        "\t> pour chaque question que vous voulez ajouter : remplissez les champs à gauche et cliquez sur \"Ajouter une question\"" +
        "\t> une fois toutes les questions ajoutées, cliquez sur \"Ajouter mon quiz\"" +
        "\t" +
        "\t|| Autre méthode : depuis la page d'acceuil cliquez sur \"Quiz\" dans l'en-tête" +
        "\t> cliquez sur \"+ Ajouter un nouveau quiz\"" +
        "\t> remplissez les champs comme expliqué précédemment"
    }
    this.tutoList[3]={
      question: "Comment modifier un quiz ?",
      reponse: "Depuis la page d'acceuil, cliquez sur \"Gérer les quiz\" (ou sur \"Quiz\" dans l'en-tête)" +
        "\t> cliquez sur le quiz à modifier" +
        "\t> effectuez les modifications en éditant de la même façon que lors de l'ajout d'un quiz"
    }
    this.tutoList[4]={
      question: "Comment lancer un quiz ?",
      reponse: "Depuis la page d'acceuil, cliquez sur \"Choisir un résident\"" +
        "\t> cliquez sur le résident souhaité" +
        "\t> cliquez sur le bouton vert \"Lancer un quiz\"" +
        "\t> cliquez sur le quiz souhaité" +
        "\t> laissez place au résident"
    }
    this.tutoList[5]={
      question: "Pour les résidents, il existe 3 modes d'utilisations pour naviguer dans les quiz et sélectionner les réponses :",
      reponse: "Tremblement d'attitude : Mode marge d'erreurs -" +
        "\t\tle résident doit déplacer sa souris vers le bouton souhaité et cliquer, s'il clique légèrement à côté le choix est compris et pris en compte. ||" +
        "\tTremblement intentionnel : Mode cliques de souris -" +
        "\t\tle résident utilise les cliques de souris pour passer d'un bouton à l'autre et il utilise n'importe quelle touche du clavier pour valider son choix. ||" +
        "\tTremblement essentiel : Mode chargement -" +
        "\t\tle résident doit déplacer sa souris vers le bouton souhaité et conserver au mieux cette position jusqu'au remplissage de la barre."
    }

    console.log(this.tutoList)
  }

  display(divName:number): void{
    if (document.getElementById(String(divName)).style.display!="none")
      document.getElementById(String(divName)).style.display="none";
    else
      document.getElementById(String(divName)).style.display="block";
  }
}

