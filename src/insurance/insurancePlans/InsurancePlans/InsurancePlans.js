import React, { Component } from 'react';
import PlanCard from 'insurance/insurancePlans/PlanCard';
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
          <PlanCard subId={subId} sku={sku} insurancePlan={insurancePlans[1]}/>
        </div>
        <div className={styles.middlecard}>
          <PlanCard subId={subId} sku={sku} insurancePlan={insurancePlans[0]}/>
        </div>
        <div className={styles.card}>
          <PlanCard subId={subId} sku={sku} insurancePlan={insurancePlans[2]}/>
        </div>
      </div>
    )
  }
}

export default InsurancePlans;
