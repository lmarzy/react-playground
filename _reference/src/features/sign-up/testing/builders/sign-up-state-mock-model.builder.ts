import { BuilderFactory, Builder } from '../../../../shared/builder';
import { ProspectModel, ReferrerModel } from '../../../../shared/models';
import { Any } from '../../../../shared/testing/any';
import { SignUpUserStateModel, ContactPreferencesModel } from '../../models';

export class SignUpUserStateMockModelBuilder implements BuilderFactory<SignUpUserStateModel> {
  private model: SignUpUserStateModel = {
    id: Any.randomString(),
    accountCreated: false,
    contactChoicesConfirmed: false,
    termsAndConditionsAccepted: false,
    identityChecked: false,
    contactPreferences: {
      emailAddress: Any.randomString(),
      optInToMarketing: false,
      telephoneNumber: Any.randomString(),
    } as ContactPreferencesModel,
    prospect: {
      id: Any.randomString(),
      email: Any.randomString(),
      firstName: Any.randomString(),
      lastName: Any.randomString(),
      telephoneNumber: Any.randomString(),
      referrer: {
        name: Any.randomString(),
        redirectUri: Any.randomString(),
      } as ReferrerModel,
    } as ProspectModel,
    identity: {
      emailAddress: Any.randomString(),
    },
  };

  create = (): Builder<SignUpUserStateModel> => new Builder<SignUpUserStateModel>(this.model);
}
