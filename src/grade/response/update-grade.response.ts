import { CreateGradeResponse } from './create-grade.response';

export class UpdateGradeResponse extends CreateGradeResponse {
  constructor(partial: Partial<UpdateGradeResponse>) {
    super(partial);
  }
}
