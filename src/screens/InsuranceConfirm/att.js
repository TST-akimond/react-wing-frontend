import { compose } from 'redux';
import { connect } from 'react-redux';
import insurancePlanDecorator from 'insurance/insurancePlans/decorator';
import { getFilteredInsuranceContracts } from 'reducers';
import { fetchFiltered as fetchFilteredInsuranceContracts } from 'insurance/insuranceContracts/actions';
import Link from 'common/Link';

import React, { Component } from 'react';
import Button from 'forms/Button';
import Back from 'common/Back';
import Box from 'common/Box';
import PlanInfo from 'insurance/insurancePlans/PlanInfo';
import styles from './InsuranceConfirm.module.css';
import * as routes from 'app/routes';
import {create as CreateContract, activate as ActivateContract} from 'insurance/insuranceContracts/api';
import {create as CreateDevice} from 'insurance/insuredDevices/api';
import { info as InfoNotification } from 'notifications/actions';

class AttrInsuranceConfirm extends Component {
  constructor(props) {
    super(props)
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    this.fetchContract();
  }

  componentDidUpdate(oldProps) {
    const { subId, contractId } = this.props;
    if (subId !== oldProps.subId) {
      this.fetchContract();
    } 
  }

  fetchContract = () => {
    const { subId, fetchFilteredInsuranceContracts, filter } = this.props;
    subId && fetchFilteredInsuranceContracts({ [filter]: subId });
  }

  async onConfirm() {
    const { subId, sku, insPlanId } = this.props;
    let contractId = null;
    await CreateContract({att_subscription: subId}).then(async (res)=>{
      contractId = res.data.id;
      await CreateDevice({contract: contractId, device_specs: sku, plan_type: insPlanId})
      await ActivateContract(contractId)
      });
    InfoNotification("Confirm plan success", "Success");
  }

  render() {
    const { insurancePlan, subId } = this.props;
    if (!insurancePlan) { return null; }
    return (
      <div>
        <div className={styles.Back}>
          <Back to={routes.attSubscription(subId)} />
        </div>
        <Box className={styles.makeClaim}>
          <PlanInfo insurancePlan={insurancePlan} />
          <Link to={routes.attSubscription(subId)}>
            <Button onClick={this.onConfirm}>Confirm Plan Selection</Button>
          </Link>
        </Box>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const subId = ownProps.subId && parseInt(ownProps.subId);
  const filter = 'attSubscription';
  const contracts = getFilteredInsuranceContracts(state, { [filter]: subId });
  const contract = contracts && contracts.length > 0 && contracts[0];
  const insurancePlanId = ownProps.insPlanId && parseInt(ownProps.insPlanId);
  return {
    insurancePlanId,
    filter,
    contract,
    contractId: contract && contract.id,
  }
};

const mapDispatchToProps = {
  fetchFilteredInsuranceContracts,
  InfoNotification
}

// this order is really important
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  insurancePlanDecorator
)(AttrInsuranceConfirm);
