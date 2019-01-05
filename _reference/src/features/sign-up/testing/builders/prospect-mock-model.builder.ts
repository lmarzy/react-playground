import { BuilderFactory, Builder } from '../../../../shared/builder';
import { ProspectModel, ReferrerModel } from '../../../../shared/models';
import { Any } from '../../../../shared/testing/any';

export class ProspectMockModelTestBuilder implements BuilderFactory<ProspectModel> {
  private model: ProspectModel = {
    id: Any.randomString(),
    email: Any.randomString(),
    firstName: Any.randomString(),
    lastName: Any.randomString(),
    telephoneNumber: Any.randomString(),
    referrer: {
      name: Any.randomString(),
      redirectUri: Any.randomString(),
    } as ReferrerModel,
  } as ProspectModel;

  create = (): Builder<ProspectModel> => new Builder<ProspectModel>(this.model);
}
