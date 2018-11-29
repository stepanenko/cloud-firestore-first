import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

interface Student {
  id: string;
  name: string;
  surname: string;
  group?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  studCollection: AngularFirestoreCollection<Student>;
  students: Observable<Student[]>;
  studDoc: AngularFirestoreDocument<Student>;
  student: Observable<Student>;

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.studCollection = this.db.collection('students');
    this.students = this.studCollection.valueChanges();
    this.snap();
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

  snap() {
    this.studCollection.snapshotChanges()
      .subscribe(data => console.log(data));
  }

  show(student) {
    console.log(student);
    this.studDoc = this.db.doc<Student>(`students/${student.id}`);
    this.student = this.studDoc.valueChanges();
  }

}
