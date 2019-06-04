import { TestBed, fakeAsync, inject } from '@angular/core/testing';

import { SocialNetworkService } from './social-network.service';

const mockList = [
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

describe('SocialNetworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocialNetworkService = TestBed.get(SocialNetworkService);
    expect(service)
      .toBeTruthy()
  });

  it('should return items list', fakeAsync(inject([SocialNetworkService], (service: SocialNetworkService) => {
    service.getLinksList()
      .subscribe(list => {
      expect(list)
      .toEqual(mockList)
    });
  }))
  );
});
