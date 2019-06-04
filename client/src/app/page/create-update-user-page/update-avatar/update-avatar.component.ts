import { Component, OnInit, ViewChild, Output, ElementRef, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
  styleUrls: ['./update-avatar.component.scss']
})
export class UpdateAvatarComponent implements OnInit {
  form: FormGroup;
  @ViewChild('fileInput') inputEl: ElementRef;
  @Output() onUpload = new EventEmitter<string>();
  constructor(private fb: FormBuilder, private readonly userService: UserService) {
    this.form = fb.group({
      avatar: null
    });
  }

  ngOnInit(): void {

  }

  public upload(): void {
    const inputEl: HTMLInputElement = this.inputEl.nativeElement;
    this.userService.postImage(inputEl.files[0])
      .subscribe((data: { url: string }) => {
        this.onUpload.emit(data.url);
        this.userService.getUser()
      })
  }
}
