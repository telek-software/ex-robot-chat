export type Action = { type: string; payload?: string };

export type ContactForm = {
  email?: string;
  firstname?: string;
  lastname?: string;
  company?: string;
};

export const contactForm = {
  email: "",
  firstname: "",
  lastname: "",
  company: "",
};

export const contactActions = {
  EMAIL: "email",
  LASTNAME: "lastname",
  COMPANY: "company",
  FIRSTNAME: "firstname",
} as const;

export type ContactActionKey = keyof typeof contactActions;

export function contactReducer(state: ContactForm, action: Action) {
  if (action.type === contactActions.EMAIL) {
    return { ...state, email: action.payload };
  }
  if (action.type === contactActions.LASTNAME) {
    return { ...state, lastname: action.payload };
  }
  if (action.type === contactActions.COMPANY) {
    return { ...state, company: action.payload };
  }
  if (action.type === contactActions.FIRSTNAME) {
    return { ...state, firstname: action.payload };
  }
  throw Error("Unknown action.");
}
