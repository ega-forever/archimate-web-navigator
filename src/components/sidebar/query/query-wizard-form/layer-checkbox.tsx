import * as React from "react";
import { InputGroup } from 'react-bootstrap';
import { Layer } from "../../../../archimate-model";

interface IProps {
  layer: Layer;
  checked: boolean;
  onChange: (layer: Layer, checked: boolean) => void;
}

export default class LayerCheckbox extends React.PureComponent<IProps> {
  public render() {
    return (
      <InputGroup.Checkbox
        checked={this.props.checked}
        onClick={this.onChange}
      >
        {this.props.layer}
      </InputGroup.Checkbox>
    );
  }

  private onChange = (event: React.FormEvent<any>) => {
    this.props.onChange(this.props.layer, !this.props.checked);
  };
}
