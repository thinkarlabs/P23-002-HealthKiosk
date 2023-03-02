import { TestBed } from '@angular/core/testing';

import { BotOpenAiService } from './bot-open-ai.service';

describe('BotOpenAiService', () => {
  let service: BotOpenAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotOpenAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
