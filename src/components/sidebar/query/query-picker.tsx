import { List } from "immutable";
import * as React from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Card, Collapse
} from 'react-bootstrap';
import { Query } from "../../../archimate-model";

interface IProps {
  onNewQuery: () => void;
  onQuerySelected: (query: Query) => void;
  queries: List<Query>;
  selectedQuery: Query;
}

export default class QueryTab extends React.PureComponent<IProps> {
  public render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title className="h3">
            Queries
          </Card.Title>
        </Card.Header>
        <Collapse>
          <Card.Body>
            <Form>
              <FormGroup controlId="queryDiagramSelector">
                <InputGroup>
                  <Form.Select
                    aria-placeholder="Select Query"
                    defaultValue={this.props.selectedQuery.name}
                    onChange={this.onQuerySelected}
                  >
                    {this.props.queries.map(
                      q =>
                        q ? (
                          <option key={q.id} value={q.id}>
                            {q.name}
                          </option>
                        ) : (
                          undefined
                        )
                    )}
                  </Form.Select>
                  <FormControl.Feedback />
                  <InputGroup onClick={this.props.onNewQuery}>
                    <Button>New</Button>
                  </InputGroup>
                </InputGroup>
                <Form.Text>
                  Select an existing query, or create a new one.
                </Form.Text>
              </FormGroup>
            </Form>
          </Card.Body>
        </Collapse>
      </Card>
    );
  }

  private onQuerySelected = (event: any) => {
    const queryId = event.target.value;
    const query = this.props.queries.find(q => (q ? q.id === queryId : false));
    this.props.onQuerySelected(query as any);
  };
}
