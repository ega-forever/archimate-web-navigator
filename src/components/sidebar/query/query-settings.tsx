import * as React from "react";
import { Form, InputGroup, Card, Accordion } from 'react-bootstrap';

interface IProps {
  autoLayout: boolean;
  onAutoLayoutToggled: (autoLayout: boolean) => void;
}

export default class QuerySettings extends React.PureComponent<IProps> {
  public render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title className="h3">
            Query Settings
          </Card.Title>
        </Card.Header>
        <Accordion>
          <Accordion.Body>
            <Form>
              <InputGroup.Checkbox
                defaultChecked={this.props.autoLayout}
                onChange={this.autoLayoutToggled}
              >
                {" Auto Layout "}
              </InputGroup.Checkbox>
            </Form>
          </Accordion.Body>
        </Accordion>
      </Card>
    );
  }

  private autoLayoutToggled = (event: React.FormEvent<any>) => {
    this.props.onAutoLayoutToggled(!this.props.autoLayout);
  };
}
