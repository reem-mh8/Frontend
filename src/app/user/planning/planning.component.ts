import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import { SavePlanning } from '../Entity/SavePlanning.Entity';
import Swal from 'sweetalert2';

import { CalendarOptions, EventClickArg, DateSelectArg, FullCalendarComponent } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html'
})
export class PlanningComponent implements OnInit {

  PlanningCForm: FormGroup;
  viewDate: Date = new Date();

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: frLocale,
    events: [],
    editable: false,
    selectable: true,
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(private fb: FormBuilder, private service: CrudService) {
    this.PlanningCForm = this.fb.group({
      nom: ['', Validators.required],
      date: ['', Validators.required],
      debut: ['', Validators.required],
      fin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchAndDisplayPlanningData();
  }

  addNewPlanningC() {
    if (this.PlanningCForm.invalid) {
      Swal.fire('Erreur', 'Tous les champs sont obligatoires.', 'error');
      return;
    }

    const data = this.PlanningCForm.value;
    const coachInfo = this.service.getCoachInfo();

    const model: SavePlanning = {
      id: null,
      nom: data.nom,
      date: data.date,
      debut: data.debut,
      fin: data.fin,
      idUser: coachInfo?.id
    };

    this.service.addPlanning(model).subscribe(() => {
      Swal.fire('Succès !', 'Planning ajouté avec succès.', 'success');
      this.PlanningCForm.reset();
      this.fetchAndDisplayPlanningData();
    }, (error) => {
      Swal.fire('Erreur', error.error?.message || 'Problème de serveur.', 'error');
    });
  }

  fetchAndDisplayPlanningData() {
    const coachInfo = this.service.getCoachInfo();

    this.service.getPlanning(coachInfo.id).subscribe((planningData: any[]) => {
      this.calendarOptions.events = planningData.map(p => ({
        title: p.nom,
        start: `${p.date}T${p.debut}`,
        end: `${p.date}T${p.fin}`
      }));
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    Swal.fire('Événement', clickInfo.event.title, 'info');
  }

  // Calendar navigation
  previous() {
    const calendarApi = document.querySelector('full-calendar') as any;
    calendarApi.getApi().prev();
  }

  next() {
    const calendarApi = document.querySelector('full-calendar') as any;
    calendarApi.getApi().next();
  }

  today() {
    const calendarApi = document.querySelector('full-calendar') as any;
    calendarApi.getApi().today();
  }

  setView(view: string) {
    this.calendarOptions.initialView = view;
  }

}
