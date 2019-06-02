import {EventEmitter, Injectable, Output} from "@angular/core";

@Injectable()
export class HeaderService {

  @Output() change: EventEmitter<any> = new EventEmitter();

  setToken(token) {
    this.change.emit(token);
  }

}
