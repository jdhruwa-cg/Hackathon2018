import { Component } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

/**
 * @title Table with expandable rows
 */
@Component({
  selector: "table-basic-example",
  styleUrls: ["./table.component.css"],
  templateUrl: "./table.component.html",
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class TableComponent {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ["serialNumber", "name"];
  expandedElement: PeriodicElement;
}

export interface PeriodicElement {
  name: string;
  serialNumber: number;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    serialNumber: 1,
    name: "Pump",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Vestibulum luctus, erat id porta maximus, diam tortor rutrum risus,
     in laoreet sem metus in nisi.`
  },
  {
    serialNumber: 2,
    name: "Tractor",
    description: `Integer at porttitor nunc, ac vehicula dui. Aenean sit 
    amet magna id libero sollicitudin lobortis. Ut ultricies tellus sit 
    amet purus porttitor, sed efficitur ligula imperdiet. `
  }
];
