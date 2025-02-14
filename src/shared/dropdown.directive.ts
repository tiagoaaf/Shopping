import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef,
} from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective {
  //This option only closes the drop on the click
  //   @HostBinding("class.open") isOpen: boolean = false;
  //   @HostListener("click") toggleOpen() {
  //     this.isOpen = !this.isOpen;
  //   }

  //This option closes if click anywhere
  @HostBinding("class.open") isOpen = false;
  @HostListener("document:click", ["$event"]) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
  constructor(private elRef: ElementRef) {}
}
