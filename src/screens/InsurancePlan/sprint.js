import React from 'react';
import styles from './InsurancePlan.module.css';
import * as routes from 'app/routes';
import Back from 'common/Back';

import InsurancePlans from 'insurance/insurancePlans/InsurancePlans/sprint';

const SprintInsurancePlan = ({subId, sku}) => (
  <div>
    <div className={styles.Back}>
      <Back to={routes.sprintSubscription(subId)} />
    </div>
    <h1>
      Select an insurance plan
    </h1>
    <InsurancePlans sprintSubId={subId} sku={sku} value={10.0}/>
  </div>
)

export default SprintInsurancePlan;
