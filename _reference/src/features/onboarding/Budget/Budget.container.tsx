import * as React from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router';
import { BudgetRoutes } from './budget.routes';
import { BudgetPauseComponent } from './Budget-Pause/Budget-pause.component';
import { BudgetIncomeContainer } from './Income/Budget-Income.container';
import { BudgetIncomeTest } from './Income-test/Income-Test';

class BudgetContainer extends React.Component<RouteComponentProps> {
  render() {
    return (
      <Switch>
        <Route exact path={BudgetRoutes.BudgetPause} render={() => <BudgetPauseComponent />} />
        <Route exact path={BudgetRoutes.BudgetIncome} render={() => <BudgetIncomeContainer />} />
        <Route exact path={BudgetRoutes.BudgetIncomeTest} render={() => <BudgetIncomeTest />} />
      </Switch>
    );
  }
}

export default withRouter(BudgetContainer);
