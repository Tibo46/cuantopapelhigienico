import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FormComponent } from "./components/form/form.component";
import { FormsModule, FormBuilder, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, FormComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule {}
