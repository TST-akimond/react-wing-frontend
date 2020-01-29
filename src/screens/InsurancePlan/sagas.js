import { put, call } from 'redux-saga/effects';
import { authenticateUser } from 'auth/sagas';
import { setRedirect } from 'auth/actions';
import { sprintInsurancePlan, attInsurancePlan } from 'app/routes';

export function* sprintInsurancePlanNavigate({subId, sku}) {
  yield put(setRedirect(sprintInsurancePlan(subId, sku)));
  yield call(authenticateUser);
};

export function* attInsurancePlanNavigate({subId, sku}) {
  yield put(setRedirect(attInsurancePlan(subId, sku)));
  yield call(authenticateUser);
};

