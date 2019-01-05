import * as React from 'react';
import * as styles from './styles.scss';
import {
  PageHeader,
  AccordionContainer,
  AccordionItem,
  HelpTooltip,
  InputRadio,
  InputButton,
} from '../../../../shared/components';

export const BudgetIncomeTest = () => (
  <div className="l-container">
    <PageHeader type="main" text={`First up, let's get the right income for your personal budget.`} />
    <main>
      <AccordionContainer>
        <AccordionItem title="Transaction 1" status={{ isActive: true, isComplete: false }}>
          <form>
            <fieldset>
              <legend className="u-col-forrest u-mb-m u-bold">What best describes this transaction?</legend>
              <ul className={styles.answerList}>
                <li>
                  <HelpTooltip>
                    <p>...</p>
                  </HelpTooltip>
                  <InputRadio
                    label="Former/Past income"
                    id="123"
                    name="income"
                    value="income"
                    checked={false}
                    onChange={() => 'yay'}
                  />
                </li>
                <li>
                  <HelpTooltip>
                    <p>...</p>
                  </HelpTooltip>
                  <InputRadio
                    label="My current income"
                    id="124"
                    name="income"
                    value="income-my"
                    checked={true}
                    onChange={() => 'yay'}
                  />
                  <ul>
                    <li>
                      <HelpTooltip>
                        <p>...</p>
                      </HelpTooltip>
                      <InputButton
                        type="radio"
                        label="Salary or earnings"
                        id="salary-or-earnings"
                        name="salary-or-earnings"
                        value="salary-or-earnings"
                        checked={false}
                        icon="income-generic"
                        onChange={() => 'yay'}
                      />
                    </li>
                    <li>
                      <HelpTooltip>
                        <p>...</p>
                      </HelpTooltip>
                      <InputButton
                        type="radio"
                        label="Benefits or earnings"
                        id="Benefits or earnings"
                        name="Benefits or earnings"
                        value="Benefits or earnings"
                        checked={false}
                        icon="income-generic"
                        onChange={() => 'yay'}
                      />
                    </li>
                  </ul>
                </li>
                <li>
                  <HelpTooltip>
                    <p>...</p>
                  </HelpTooltip>
                  <InputRadio
                    label="My partners current income"
                    id="126"
                    name="income"
                    value="income"
                    checked={true}
                    onChange={() => 'yay'}
                  />
                  <ul>
                    <li>
                      <HelpTooltip>
                        <p>...</p>
                      </HelpTooltip>
                      <InputButton
                        type="radio"
                        label="Salary or earnings"
                        id="salary-or-earnings"
                        name="salary-or-earnings"
                        value="salary-or-earnings"
                        checked={false}
                        icon="income-generic"
                        onChange={() => 'yay'}
                      />
                    </li>
                    <li>
                      <HelpTooltip>
                        <p>...</p>
                      </HelpTooltip>
                      <InputButton
                        type="radio"
                        label="Benefits or earnings"
                        id="Benefits or earnings"
                        name="Benefits or earnings"
                        value="Benefits or earnings"
                        checked={false}
                        icon="income-generic"
                        onChange={() => 'yay'}
                      />
                    </li>
                  </ul>
                </li>
                <li>
                  <HelpTooltip>
                    <p>...</p>
                  </HelpTooltip>
                  <InputRadio
                    label="Money for bills or household costs"
                    id="128"
                    name="income"
                    value="income"
                    checked={false}
                    onChange={() => 'yay'}
                  />
                </li>
              </ul>
            </fieldset>
          </form>
        </AccordionItem>
      </AccordionContainer>
    </main>
  </div>
);
