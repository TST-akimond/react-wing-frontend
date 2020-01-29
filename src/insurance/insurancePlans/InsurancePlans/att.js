import { compose } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import insurancePlanDecorator from 'insurance/insurancePlans/decorator';
import subscriptionDecorator from 'subscriptions/decorator';
import { getInsurancePlansForValue } from 'reducers';
import { fetchValue as fetchInsurancePlans } from 'insurance/insurancePlans/actions';
import PlanCard from 'insurance/insurancePlans/PlanCard/att';
import styles from './InsurancePlans.module.css';

class InsurancePlans extends Component {
  componentDidMount() {
    this.fetchPlans();
  }

  componentDidUpdate(oldProps) {
    const { value } = this.props;
    if (value !== oldProps.value) {
      this.fetchPlans();
    } 
  }

  fetchPlans = () => {
    const { value, fetchInsurancePlans } = this.props;
    value && fetchInsurancePlans({ value });
  }

  render() {
    const {insurancePlans, subId, sku } = this.props;
    if (!insurancePlans || insurancePlans.length == 0) { return null; }

    return (
      <div className={styles.layout}>
        <div className={styles.card}>
          <PlanCard attSubId={subId} sku={sku} insurancePlan={insurancePlans[1]}/>
        </div>
        <div className={styles.middlecard}>
          <PlanCard attSubId={subId} sku={sku} insurancePlan={insurancePlans[0]}/>
        </div>
        <div className={styles.card}>
          <PlanCard attSubId={subId} sku={sku} insurancePlan={insurancePlans[2]}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const value = ownProps.value && parseFloat(ownProps.value);
  const subId = ownProps.subId && parseFloat(ownProps.subId);
  const sku = ownProps.sku;
  const insurancePlans = getInsurancePlansForValue(state, value);
  return {
    insurancePlans,
    subId,
    sku,
  }
};

const mapDispatchToProps = {
  fetchInsurancePlans
}

// this order is really important
export default compose(
  subscriptionDecorator,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  insurancePlanDecorator
)(InsurancePlans);
