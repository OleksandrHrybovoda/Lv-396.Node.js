import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, throwError, of } from 'rxjs';
// import 'rxjs/add/observable/of';
import { SocialNetworksComponent } from './social-networks.component';

describe('SocialNetworksComponent', () => {
  let component: SocialNetworksComponent;
  let fixture: ComponentFixture<SocialNetworksComponent>;
  const mockLinksList = [
    {
      id: '0',
      title: 'instagram',
      link: 'https://www.instagram.com/softserve_career/?hl=uk',
      icon: 'assets/img/instagram.svg'
    },
    {
      id: '1',
      title: 'twitter',
      link: 'https://twitter.com/softserveinc',
      icon: 'assets/img/twitter.svg'
    },
    {
      id: '2',
      title: 'facebook',
      link: 'https://www.facebook.com/SoftServeInc',
      icon: 'assets/img/facebook.svg'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SocialNetworksComponent]
    })
      .compileComponents()
      .catch(err => throwError(new Error(err)));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialNetworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy()
      .catch(err => throwError(new Error(err)));
  });

  it(`should be inject service, shouldn't get links list if note async`, () => {
    jasmine.createSpy('getLinksList').and
      .returnValue(Observable.of(mockLinksList));
    expect(component.links)
      .toEqual(mockLinksList)
      .catch(err => throwError(new Error(err)));
    fixture.detectChanges();
  });

  it(`should return item id`, () => {
    expect(component.trackById(mockLinksList[1]))
      .toEqual('1')
      .catch(err => throwError(new Error(err)));
  });
});
