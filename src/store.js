import { action, configure, flow, observable, reaction, computed } from 'mobx';
import Validate from 'validate.js';
import { checkUser, enrollUser } from './service';

configure({ enforceActions: 'always' });

Validate.validators.checkUser = async function(value) {
  try {
    await checkUser(value);
    return null;
  } catch (err) {
    return 'Email already in use';
  }
};

const rules = {
  firstName: {
    presence: { allowEmpty: false },
  },
  lastName: {
    presence: { allowEmpty: false },
  },
  password: {
    presence: { allowEmpty: false },
    length: { minimum: 6 },
  },
  email: {
    presence: { allowEmpty: false },
    email: true,
    checkUser: true,
  },
};

export class UserEnrollmentData {
  @observable
  email = '';

  @observable
  password = '';

  @observable
  firstName = '';

  @observable
  lastName = '';

  @observable
  validating = false;

  @observable.ref
  errors = null;

  @observable
  enrollmentStatus = 'none'; // none | pending | completed | failed

  disposeValidation = null;

  constructor() {
    this.setupValidation();
  }

  validateFields = flow(function*(fields) {
    this.validating = true;
    this.errors = null;
    try {
      yield Validate.async(fields, rules);
    } catch (err) {
      this.errors = err;
    } finally {
      this.validating = false;
    }
  });

  setupValidation = () => {
    this.disposeValidation = reaction(
      () => {
        const { firstName, lastName, password, email } = this;
        return { firstName, lastName, password, email };
      },
      fields => {
        this.validateFields(fields);
      }
    );
  };

  @action
  setField(fieldName, value) {
    this[fieldName] = value;
  }

  @computed
  get fields() {
    const { firstName, lastName, password, email } = this;
    return { firstName, lastName, password, email };
  }

  enroll = flow(function*() {
    this.enrollmentStatus = 'pending';
    try {
      // validation
      const fields = this.fields;
      yield this.validateFields(fields);
      if (this.errors) {
        throw new Error('Invalid fields');
      }
      // enrollment
      yield enrollUser(fields);
      this.enrollmentStatus = 'completed';
    } catch (err) {
      this.enrollmentStatus = 'failed';
    }
  });

  @action
  reset = () => {
    this.enrollmentStatus = 'none';
  }

  cleanup = () => {
    this.disposeValidation();
  }
}
