import { ContactPreferencesModel } from '../../models';

export interface CompleteSignUpRequestModel {
  email: string;
  password: string;
  termsAccepted: boolean;
  contactPreferences: ContactPreferencesModel;
  dateOfBirth: string;
}
