import { Component, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnDestroy {
  isVisible: boolean;

  @Input() set visible(value: boolean) {
    this.isVisible = value;
  }
  @Input() title: string;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  closeModal(event: Event) {
    this.isVisible = false;
    this.visibleChange.emit(false);
    this.close.emit(false);
  }

  ngOnDestroy(): void {}
}
