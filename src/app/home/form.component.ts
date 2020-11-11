import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Job } from './Job';
import { JobsService } from './jobs.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  titulo: string = "Formulario jobs";
  job: Job;
  constructor(private service: JobsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(data=>{
      this.job=JSON.parse(data['obj']);
    });
   }

  ngOnInit(): void {

  }

  public create(): void {
    this.service.save(this.job).subscribe(response => {
      this.router.navigate(['/home'])
      swal.fire('Job created succesfuly', `Job ${response.task_name}`, 'success')
    });
  }

  public update(): void {
    this.service.update(this.job).subscribe(response => {
      this.router.navigate(['/home'])
        swal.fire('Job created succesfuly', `Job ${response.task_name}`, 'success')
    });
  }
/*
  public getjob(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.service.getById(id).subscribe(job => this.job = job);
      }
    });
  }*/

}
