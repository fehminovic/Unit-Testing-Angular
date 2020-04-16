import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { UserComponent } from "./user.component";
import { UserService } from "./user.service";
import { DataService } from "../shared/data.service";

describe("UserComponent", () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
    }).compileComponents();
  }));

  it("should create", () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it("should use the user name from the service", () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userService.user.name).toEqual(component.user.name);
  });

  it("should display the user name if user is logged in", () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.isLoggedIn = true;
    fixture.detectChanges();
    let compiled = fixture.nativeElement;
    expect(compiled.querySelector("p").textContent).toContain(
      component.user.name
    );
  });

  it("should not display the user name if user is not logged in", () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let compiled = fixture.nativeElement;
    expect(compiled.querySelector("p").textContent).not.toContain(
      component.user.name
    );
  });

  it("should not fetch data successfully if not called asynchronously", () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, "getDetails").and.returnValue(
      Promise.resolve("Data")
    );
    fixture.detectChanges();
    expect(component.data).toBe(undefined);
  });

  it("should fetch data successfully if called asynchronously", async(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, "getDetails").and.returnValue(
      Promise.resolve("Data")
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      //react to all asynchronous tasks are finished.
      expect(component.data).toBe("Data");
    });
  }));

  it("should fetch data successfully if called asynchronously", fakeAsync(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, "getDetails").and.returnValue(
      Promise.resolve("Data")
    );
    fixture.detectChanges();
    tick(); //finish asynchrounous task immediately
    expect(component.data).toBe("Data");
  }));
});
