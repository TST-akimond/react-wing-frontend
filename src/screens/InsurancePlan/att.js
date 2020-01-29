import React from 'react';
import styles from './InsurancePlan.module.css';
import Back from 'common/Back';
import * as routes from 'app/routes';

import InsurancePlans from 'insurance/insurancePlans/InsurancePlans/att';

const AttInsurancePlan = ({subId, sku}) => (
  <div>
    <div className={styles.Back}>
      <Back to={routes.attSubscription(subId)} />
    </div>
    <h1>
      Select an insurance plan
    </h1>
    <InsurancePlans attSubId={subId} sku={sku} value={10.0}/>
  </div>
)

export default AttInsurancePlan;

