import * as React from "react";
import {
  Diagram,
  Element,
  IEntity,
  Relationship
} from "../../../archimate-model";
import { entityClickedFunc } from "../../common";
import EntityLink from "../entity-link";

interface IProps {
  entity: IEntity;
  resultClicked: entityClickedFunc;
}

export default class SearchResult extends React.PureComponent<IProps> {
  public render() {
    console.log(this.props.entity.item.id)
    return (
      <li key={this.props.entity.item.id}>
        <EntityLink
          entity={this.props.entity}
          entityClicked={this.props.resultClicked}
          text={`${this.props.entity.item.name} (${this.entityType()})`}
        />
      </li>
    );
  }

  private entityType(): string {
    const entity = this.props.entity.item;
    let entityType = entity.type;
    if (entity instanceof Element) {
      entityType = entity.type || entityType;
    } else if (entity instanceof Relationship) {
      entityType = entity.type || entityType;
    } else if (entity instanceof Diagram) {
      entityType = entity.viewpoint || "Total";
    }
    return entityType;
  }
}
