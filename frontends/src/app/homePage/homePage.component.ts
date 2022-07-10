import { Component, OnInit  } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector : "app-homePage",
    templateUrl : "homePage.component.html",
    styleUrls  : ["homePage.component.css"]
})

export class HomePageComponent implements OnInit{

constructor(private route : ActivatedRoute){}

    ngOnInit(): void {
        console.log(this.route.params)
    }
}