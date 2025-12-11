import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totaladmin: number = 0;
  totalclient: number = 0;
  totalcoach: number = 0;
  totalesalledesport: number = 0;

  // Flag pour savoir si les données sont chargées
  dataLoaded: boolean = false;

  public pieChartOptions: ChartOptions = { responsive: true };
  public pieChartLabels: string[] = ['Clients', 'Coachs', 'Salles de sport'];
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Clients', 'Coachs', 'Salles de sport'],
    datasets: []
  };
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {
    // Récupérer le nombre d'admins
    this.service.getAdmin().subscribe(admin => {
      this.totaladmin = admin.length;
    });

    // Récupérer clients, coachs et salles en parallèle
    forkJoin({
      clients: this.service.getClient(),
      coachs: this.service.getCoach(),
      salles: this.service.getSalleDeSport()
    }).subscribe(({ clients, coachs, salles }) => {
      this.totalclient = clients.length;
      this.totalcoach = coachs.length;
      this.totalesalledesport = salles.length;

      // Mettre à jour le graphique
      this.pieChartData.datasets = [
        { data: [this.totalclient, this.totalcoach, this.totalesalledesport] }
      ];

      // Indiquer que les données sont prêtes
      this.dataLoaded = true;
    });
  }
}
