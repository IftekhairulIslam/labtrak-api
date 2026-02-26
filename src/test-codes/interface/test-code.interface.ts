export interface TestCode {
  code: string;
  name: string;
  depName: string;
  synonym: string;
}

export interface TestCodeWithId extends TestCode {
  id: string;
}
