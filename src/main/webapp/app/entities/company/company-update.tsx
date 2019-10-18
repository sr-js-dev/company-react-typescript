import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICompanyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICompanyUpdateState {
  isNew: boolean;
}

export class CompanyUpdate extends React.Component<ICompanyUpdateProps, ICompanyUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { companyEntity } = this.props;
      const entity = {
        ...companyEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/company');
  };

  render() {
    const { companyEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ibsApp.company.home.createOrEditLabel">Create or edit a Company</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : companyEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="company-id">ID</Label>
                    <AvInput id="company-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="usertypeLabel" for="company-usertype">
                    Usertype
                  </Label>
                  <AvInput
                    id="company-usertype"
                    type="select"
                    className="form-control"
                    name="usertype"
                    value={(!isNew && companyEntity.usertype) || 'COMPANY'}
                  >
                    <option value="COMPANY">COMPANY</option>
                    <option value="INDIVIDUAL">INDIVIDUAL</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="firstNameLabel" for="company-firstName">
                    First Name
                  </Label>
                  <AvField id="company-firstName" type="text" name="firstName" />
                </AvGroup>
                <AvGroup>
                  <Label id="middleNameLabel" for="company-middleName">
                    Middle Name
                  </Label>
                  <AvField id="company-middleName" type="text" name="middleName" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="company-lastName">
                    Last Name
                  </Label>
                  <AvField id="company-lastName" type="text" name="lastName" />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="company-name">
                    Name
                  </Label>
                  <AvField id="company-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="company-email">
                    Email
                  </Label>
                  <AvField id="company-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="displayNameLabel" for="company-displayName">
                    Display Name
                  </Label>
                  <AvField id="company-displayName" type="text" name="displayName" />
                </AvGroup>
                <AvGroup>
                  <Label id="logoLabel" for="company-logo">
                    Logo
                  </Label>
                  <AvField id="company-logo" type="text" name="logo" />
                </AvGroup>
                <AvGroup>
                  <Label id="telephoneLabel" for="company-telephone">
                    Telephone
                  </Label>
                  <AvField id="company-telephone" type="text" name="telephone" />
                </AvGroup>
                <AvGroup>
                  <Label id="contactPersionLabel" for="company-contactPersion">
                    Contact Persion
                  </Label>
                  <AvField id="company-contactPersion" type="text" name="contactPersion" />
                </AvGroup>
                <AvGroup>
                  <Label id="mobileLabel" for="company-mobile">
                    Mobile
                  </Label>
                  <AvField id="company-mobile" type="text" name="mobile" />
                </AvGroup>
                <AvGroup>
                  <Label id="addressLabel" for="company-address">
                    Address
                  </Label>
                  <AvField id="company-address" type="text" name="address" />
                </AvGroup>
                <AvGroup>
                  <Label id="streetAddressLabel" for="company-streetAddress">
                    Street Address
                  </Label>
                  <AvField id="company-streetAddress" type="text" name="streetAddress" />
                </AvGroup>
                <AvGroup>
                  <Label id="countyLabel" for="company-county">
                    County
                  </Label>
                  <AvField id="company-county" type="text" name="county" />
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="company-country">
                    Country
                  </Label>
                  <AvField id="company-country" type="text" name="country" />
                </AvGroup>
                <AvGroup>
                  <Label id="pinNumberLabel" for="company-pinNumber">
                    Pin Number
                  </Label>
                  <AvField id="company-pinNumber" type="string" className="form-control" name="pinNumber" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/company" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  companyEntity: storeState.company.entity,
  loading: storeState.company.loading,
  updating: storeState.company.updating,
  updateSuccess: storeState.company.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyUpdate);
