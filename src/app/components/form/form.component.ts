import { Component, OnInit } from "@angular/core";
import { Person } from "src/app/models/person";
import { FormBuilder, FormArray, FormGroup } from "@angular/forms";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  public toiletPaperForm;
  public numberOfDays: number;
  personGroup: FormArray;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.toiletPaperForm = this.formBuilder.group({
      numberRolls: 5,
      numberSheets: 150,
      personGroup: this.formBuilder.array([this.createpersonGroup()])
    });
    this.personGroup = this.toiletPaperForm.get("personGroup") as FormArray;
    this.formChange();
  }

  createpersonGroup(): FormGroup {
    return this.formBuilder.group({
      sheetsPerWipe: 2,
      pooPerDay: 1,
      wipesPerPoo: 5,
      peePerDay: 5,
      wipesPerPee: 1
    });
  }
  addPerson(): void {
    this.personGroup.push(this.createpersonGroup());
    this.formChange();
  }

  formChange() {
    const totalNumberOfSheets =
      this.toiletPaperForm.value.numberRolls *
      this.toiletPaperForm.value.numberSheets;
    let pooSheets = 0;
    let peeSheets = 0;

    this.personGroup.controls.forEach(person => {
      pooSheets +=
        person.value.sheetsPerWipe *
        person.value.wipesPerPoo *
        person.value.pooPerDay;
      peeSheets +=
        person.value.sheetsPerWipe *
        person.value.wipesPerPee *
        person.value.peePerDay;
    });
    const totalNumberUsedSheetsPerDay = pooSheets + peeSheets;
    console.log(totalNumberUsedSheetsPerDay);
    console.log(totalNumberOfSheets);
    this.numberOfDays = Math.round(
      totalNumberOfSheets / totalNumberUsedSheetsPerDay
    );
  }
}
