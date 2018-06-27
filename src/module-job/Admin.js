import React, { Component } from "react";
import { Button, Divider, Table, Icon, Confirm, Menu, } from 'semantic-ui-react';
import { Input } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import { observer } from "mobx-react";
import { observable } from 'mobx';
import dummy from '../dummy/jobs.json';
import { NavLink } from "react-router-dom";

const Search = Input.Search;

export default observer (
  class AdminPage extends Component {

    states = observable({
      isLoading: true,
      renders: [],
      isModalOpen: false,
      deletedId: 0
    });

    onChangePage = page => {
      console.log('page: ', page);
    };

    deleteAlert = id => () => {
      this.states.isModalOpen = true
      this.states.deletedId = id
    }
    close = () => {
      this.states.isModalOpen = false
    }

    deleteJob = () => {
      this.states.isModalOpen = false
      this.states.isLoading = true
      axios.delete(`http://private-27298f-frontendtestmaukerja.apiary-mock.com/job/${this.states.deletedId}`)
      .then(res => {
        axios.get('http://private-27298f-frontendtestmaukerja.apiary-mock.com/jobs?limit=100')
        .then(res2 => {
          this.states.isLoading = false
          console.log('res.data', res2.data);
          let renders = res2.data.map((value, index) => (
            <Table.Row>
              <Table.Cell>{value.company}</Table.Cell>
              <Table.Cell>{value.title}</Table.Cell>
              <Table.Cell>{value.location}</Table.Cell>
              <Table.Cell>{value.type}</Table.Cell>
              <Table.Cell>{value.description}</Table.Cell>
              <Table.Cell>
                <Button.Group>
                  {/* <Button>Edit</Button> */}
                  <Button color='red' onClick={this.deleteAlert(value.id)}>Delete</Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))
          this.states.renders = renders
        })
      })
    }

    componentDidMount() {
      axios.get('http://private-27298f-frontendtestmaukerja.apiary-mock.com/jobs?limit=100')
        .then(res => {
          this.states.isLoading = false
          console.log('res.data', res.data);
          let renders = res.data.map((value, index) => (
            <Table.Row>
              <Table.Cell>{value.company}</Table.Cell>
              <Table.Cell>{value.title}</Table.Cell>
              <Table.Cell>{value.location}</Table.Cell>
              <Table.Cell>{value.type}</Table.Cell>
              <Table.Cell>{value.description}</Table.Cell>
              <Table.Cell>
                <Button.Group>
                  {/* <Button>Edit</Button> */}
                  <Button color='red' onClick={this.deleteAlert(value.id)}>Delete</Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))
          this.states.renders = renders
        })
    }
    render() {
      const { isModalOpen, isLoading, renders } = this.states
      // renders = dummy.map((value, index) => (
      //   <Table.Row>
      //     <Table.Cell>{value.company}</Table.Cell>
      //     <Table.Cell>{value.title}</Table.Cell>
      //     <Table.Cell>{value.location}</Table.Cell>
      //     <Table.Cell>{value.type}</Table.Cell>
      //     <Table.Cell>{value.description}</Table.Cell>
      //     <Table.Cell>
      //       <Button.Group>
      //         {/* <Button>Edit</Button> */}
      //         <Button color='red' onClick={this.deleteAlert(value.id)}>Delete</Button>
      //       </Button.Group>
      //     </Table.Cell>
      //   </Table.Row>
      // ))
      // const { isLoading, rendres } = this.states
      const table = (
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Company</Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {renders}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='6'>
                  <Menu floated='right' pagination>
                    <Menu.Item as='a' icon>
                      <Icon name='chevron left' />
                    </Menu.Item>
                    <Menu.Item as='a'>1</Menu.Item>
                    <Menu.Item as='a' icon>
                      <Icon name='chevron right' />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
      )
      const loading = (
        <LoadingWrapper>
          <ReactLoading type='spin' color='#2980b9'/>
        </LoadingWrapper>
      )
      return (
        <Container>
          <Title>Mau Kerja - Admin Page</Title>
          <Menu>
            <NavLink to="/">
              <Menu.Item
                name='home'
                active={false}
              >
                Home
              </Menu.Item>
            </NavLink>
            <NavLink to="/admin">
              <Menu.Item name='admin' active={true}>
                Admin Page
              </Menu.Item>
            </NavLink>
          </Menu>
          <SubTitle>List Kerja</SubTitle>
          <Divider/>
          <NavLink to="/create-job">
            <Button style={{marginTop: 20}} primary>Add new job</Button>
          </NavLink>
          { isLoading ? loading : table }
          <Confirm open={isModalOpen} onCancel={this.close} onConfirm={this.deleteJob} />
        </Container>
        
      );
    }
  }
) 

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 50px;
`

const Title = styled.span`
  font-size: 30px;
  color: #2c3e50;
  font-weight: bold;
  margin-bottom: 30px;
  `

const SubTitle = styled.span`
  font-size: 20px;
  color: #34495e;
  margin-bottom: 10px;
  /* font-weight: bold; */
`

const JobListContainer = styled.div`
  width: 100% ;
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 20px;
`

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`