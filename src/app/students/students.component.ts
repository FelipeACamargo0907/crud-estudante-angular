import { Component, OnInit } from '@angular/core';
import { Students } from '../students';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Students[] = [];
  formGroupStudents: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  constructor(private studentsService: StudentsService,
    private formBuilder: FormBuilder) {
    this.formGroupStudents = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      idade: [''],
      email: [''],
      telefone: ['']
    });
  }


  clear() {
    this.formGroupStudents.reset();
    this.isEditing = false;
    this.submitted = false;
  }


  save() {
    this.submitted = true;

    if (this.formGroupStudents.valid) {
      if (this.isEditing) {
        this.studentsService.edit(this.formGroupStudents.value).subscribe({
          next: () => {
            this.loadStudents();
            this.formGroupStudents.reset();
            this.isEditing = false;
            this.submitted = false;
          }
        })
      }
      else {
        this.studentsService.save(this.formGroupStudents.value).subscribe({
          next: data => {
            this.students.push(data);
            this.formGroupStudents.reset();
            this.submitted = false;
          }
        }
        );
      }
    }
  }


  edit(student: Students) {
    this.formGroupStudents.setValue(student);
    this.isEditing = true;
  }


  delete(student: Students) {
    this.studentsService.delete(student).subscribe({
      next: () => this.loadStudents()
    })
  }


  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentsService.getStudent().subscribe({
      next: data => this.students = data
    })
  }

}
