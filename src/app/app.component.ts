import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Form, FormGroup } from '@angular/forms';

interface Student {
  id: string;
  name: string;
  surname: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  studCollection: AngularFirestoreCollection<Student>;
  students: Observable<Student[]>;

  constructor(private db: AngularFirestore) {
    this.studCollection = db.collection('students');
    this.students = this.studCollection.valueChanges();
  }

  submitStudent(form: FormGroup) {
    const id = this.db.createId();
    const student: Student = {
      id,
      name: form.value.name,
      surname: form.value.surname,
    };
    this.studCollection.doc(id).set(student); // will be created with an auto ID field
    // this.studCollection.add(student); // will add a different auto ID into field
    form.reset();
  }

}
