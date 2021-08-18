import { RandomService } from '../../domain/service/random.service';
import makeColor from 'randomcolor';

export class RandomServiceImpl extends RandomService {
  makeColor(): string {
    return makeColor();
  }
}
