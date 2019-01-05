import { ProspectModel } from '../../../shared/models/prospect.model';
import { ContactPreferencesModel } from './contact-preferences.model';

export interface SignUpUserStateModel {
  id: string;
  prospect: ProspectModel;
  accountCreated: boolean;
  termsAndConditionsAccepted: boolean;
  contactChoicesConfirmed: boolean;
  contactPreferences: ContactPreferencesModel;
  identityChecked: boolean;
  identity: { emailAddress: string };
}
