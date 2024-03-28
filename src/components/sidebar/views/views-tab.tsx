import * as React from "react";
import { Card } from "react-bootstrap";
import { IEntity, Organization } from "../../../archimate-model";
import "../../archimate-navigator.css";
import { entityClickedFunc } from "../../common";
import OrganizationContent from "./organization-content";

interface IProps {
  organizations: Organization[];
  items: IEntity[];
  entityClicked: entityClickedFunc;
  selectedEntity: IEntity | undefined;
}

export default class ViewsTab extends React.PureComponent<IProps> {
  public render() {
    return (
      <Card>
        <Card.Body>
          {this.props.organizations ? (
            <OrganizationContent
              organizations={this.props.organizations}
              items={this.props.items}
              entityClicked={this.props.entityClicked}
              selectedEntity={this.props.selectedEntity}
            />
          ) : (
            undefined
          )}
        </Card.Body>
      </Card>
    );
  }
}
