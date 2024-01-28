import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should create the app', () => {
    const fixture = TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).createComponent(AppComponent);

    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'loginApp' title`, () => {
    const fixture = TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).createComponent(AppComponent);

    const app = fixture.componentInstance;
    expect(app.title).toEqual('loginApp');
  });

  it('should render title', () => {
    const fixture = TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).createComponent(AppComponent);

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, loginApp');
  });
});
