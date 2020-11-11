import { Component, OnInit } from '@angular/core';
import { Job } from './Job';
import { JobsService } from './jobs.service';
import { Router, NavigationExtras } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: Job[];
  markers: any[] =new Array();;
  constructor(private service: JobsService, private router: Router) { }

  title = 'My first AGM project';
  lat = 20.5624305;
  lng = -103.3902983;

  ngOnInit() {
    this.getAll();
  }

  getAll() {this.service.getAll().subscribe(
    data => {
      this.content = data;
      if(this.content.length){
        this.lng = Number.parseFloat(this.content[0].long);
        this.lat = Number.parseFloat(this.content[0].lat);
      }
      this.content.map(item => {

        this.markers.push({
          position: {
            lat: Number.parseFloat(item.lat),
            lng: Number.parseFloat(item.long),
          },
          label: {
            color: 'red',
            text: 'Marker label ' + (item.task_name),
          },
          title: 'Marker title ' + (item.desc),
          alpha:1,
          options: { animation: google.maps.Animation.BOUNCE },
        });

        return item;
      });
    },
    err => {
      this.content = JSON.parse(err.error).message;
    }
  )};

  getMarkers = (jobs: Job[]) => {

    jobs.forEach(item => {
      this.markers.push({
        position: {
          lat: Number.parseInt(item.lat),
          lng: Number.parseInt(item.long),
        },
        label: {
          color: 'red',
          text: 'Marker label ' + (item.task_name),
        },
        title: 'Marker title ' + (item.desc)
      });
    });

  }

  delete(job:Job) {
    this.service.deleteById(job).subscribe(res=>{
      swal.fire('Job deleted succesfuly', `Success`, 'success').then(res=>{
        location.reload();
      });
    });
  }

  onMapReady(map:any) {
    map.addListener('dblclick', (e) => {
      console.log(e.latLng.lat());
      console.log(e.latLng.lng());
      let obj:Job = new Job();
      obj.task_name="New task";
      obj.long=e.latLng.lng();
      obj.lat =e.latLng.lat();
      obj.desc = "New desc";
      let navigationExtras: NavigationExtras = {
            queryParams:{
              obj:JSON.stringify(obj)
            }
        };
      this.router.navigate(['/home/jobs/form'],navigationExtras);
    });
  }


}
