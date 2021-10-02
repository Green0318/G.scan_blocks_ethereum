import React, {useState, useEffect} from 'react';
import './App.css';
import web3 from './web3';
import 'semantic-ui-css/semantic.min.css';
import { Container, Button, Icon, Menu, Table } from 'semantic-ui-react'

function App() {
  const [isLoading, setLoading] = useState(false);
  const [isPaused, setPause] = useState(false);
  const [_count] = useState(10);
  const [_blocks, setBlocks] = useState([]);

  useEffect(() => {    
    setTimeout(() => {            
      onTimer();    
    }, 500); 
  }, []);

  async function onTimer() {
    if (!isPaused) {
      setLoading(true);
      const latest = await web3.eth.getBlockNumber();
      var blocks = [];
      for (var i = latest; i > latest - _count; i--) {       
        const _block = await web3.eth.getBlock(i);
        if (_block != null) {
          blocks.push(_block);
        }          
      }      
      console.log(blocks);
      setBlocks(blocks);
      setLoading(false);  
    }

    setTimeout(() => {            
      onTimer();    
    }, 2000);  
  }

  async function onPauseResume(event) {
    event.preventDefault();
    setPause(!isPaused);
  }

  return (
    <Container style={{ marginTop: "20px" }} textAlign="center">
      <h2>Full Stack Web Challenge on <a target="_blank" href="https://etherscan.io/blocks">Ethereum</a> Network (Anou Phimmasy)</h2>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Block Number</Table.HeaderCell>
            <Table.HeaderCell>Number Of Transactions</Table.HeaderCell>
            <Table.HeaderCell>Miner</Table.HeaderCell>
            <Table.HeaderCell>Total Difficulty</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {_blocks.map((_block) => (
            <Table.Row key={_block.number}>
            <Table.Cell>{_block.number}</Table.Cell>
            <Table.Cell>{_block.transactions.length}</Table.Cell>
            <Table.Cell>{_block.miner}</Table.Cell>
            <Table.Cell>{_block.totalDifficulty}</Table.Cell>
          </Table.Row>
          ))}          
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='4'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
            
      <Button basic loading={!isPaused && isLoading} onClick={onPauseResume}>{!isPaused ? "Pause" : "Resume"}</Button>            
    </Container>
  );
}

export default App;
