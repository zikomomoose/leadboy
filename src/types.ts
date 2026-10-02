export interface RegistrationLead {
  email?: string;
  mobile?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: unknown;
}

export interface FormField {
  tag: string;
  type?: string | undefined;
  id?: string | undefined;
  name?: string | undefined;
  placeholder?: string | undefined;
  ariaLabel?: string | undefined;
}

export interface RegistrationRecon {
  url: string;
  title: string;
  inputs: FormField[];
  buttons: Array<{ text: string; ariaLabel?: string | undefined }>;
  selects: FormField[];
  captchaSignals: string[];
}
