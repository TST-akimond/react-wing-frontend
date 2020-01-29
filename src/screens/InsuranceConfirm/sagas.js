import { put, call } from 'redux-saga/effects';
import { authenticateUser } from 'auth/sagas';
import { setRedirect } from 'auth/actions';
import { sprintInsuranceConfirm, attInsuranceConfirm } from 'app/routes';

export function* sprintInsuranceConfirmNavigate({subId, sku, insPlanId}) {
  yield put(setRedirect(sprintInsuranceConfirm(subId, sku, insPlanId)));
  yield call(authenticateUser);
};

export function* attInsuranceConfirmNavigate({subId, sku, insPlanId}) {
  yield put(setRedirect(attInsuranceConfirm(subId, sku, insPlanId)));
  yield call(authenticateUser);
};

