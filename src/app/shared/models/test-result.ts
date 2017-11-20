export class TestResult {
  message_key: string;
  local: string;
  db: string;
  status: ResultStatus;
}

export enum ResultStatus {
  CONFLICT = "is-conflict",
  LOCAL = "is-local",
  DB = "is-db",
}
