import React from 'react';
import styles from './PlanCard.module.css';
import Button from 'forms/Button';
import Link from 'common/Link';
import * as routes from 'app/routes';

const first = ["Accidental damage", "Loss and theft", "Malfunction", "Water damage", "Broken screens"];
const second = ["Malfunction (after the original manufacturere's warranty expires)"];
const third = ["Accidental damage", "Loss and theft", "Malfunction", "Water damage", "Broken screens"];

const DeviceService = ({services}) => {
  return (
    <div>
      {
        services.map((cur) => (
          <div className={styles.service} key={cur}>
            <div className={styles.tick}>T</div>
            <div className={styles.sentence}>{cur}</div>
          </div>
        ))
      }
    </div>
  )
}

const PlanCard = ({ attSubId: subId, sku, insurancePlan: plan }) => {
  if (!plan) { return null; }

  let services = first;
  if (plan.id == 6) services = second;
  if (plan.id == 10) services = third;

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <h4 className={styles.header}>
          {plan.name}
        </h4>
        <h5 className={styles.startingat}>Starting at</h5>
        <h4 className={styles.price}>${plan.price}</h4>
        <h6 className={styles.termtext}>Terms, fees, and more info</h6>
        <Link to={routes.attInsuranceConfirm(subId, sku, plan.id)}>
          <Button>Select</Button>
        </Link>
      </div>
      <div className={styles.middle}>
        <h5>Protects your device against</h5>
        <DeviceService services={services}/>
      </div>
      <div className={styles.bottom}>
        <div className={styles.info}>
          Repair Deductible: ${plan.repair_deductible}
        </div>
        <div className={styles.info}>
          Replacement Deductible: ${plan.replacement_deductible}
        </div>
      </div>
    </div>
  )
}

export default PlanCard;
