export class TestResult {
  messageKey: string;
  local: string;
  db: string;
  status: ResultStatus;
}

export enum ResultStatus {
  CONFLICT,
  LOCAL,
  DB
}
