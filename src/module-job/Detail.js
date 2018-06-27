import React, { Component } from "react";
import { Divider, Menu } from 'semantic-ui-react';
import { Pagination, Input } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import { observer } from "mobx-react";
import { observable } from 'mobx';
import { NavLink } from "react-router-dom";
import dummy from '../dummy/jobs.json';

const Search = Input.Search;
let renders = [] 

export default observer (
  class DetailJob extends Component {

    states = observable({
      isLoading: true,
      rendres: [],
      data: {
        title: '',
        company: '',
        location: '',
        type: '',
        description: '',
        employer_contact: {
          phone: '',
          whatsapp: '',
          email: ''
        },
        requirements: {
          language: [],
          items: []
        },
        responsibilites: [],
        benefit: [],
        nationality: '',
        views: 190
      }
    });


    componentDidMount() {
      const id = this.props.match.params.jobId
      axios.get(`http://private-27298f-frontendtestmaukerja.apiary-mock.com/job/${id}}`)
        .then(res => {
          this.states.isLoading = false
          this.states.data = res.data
          console.log('res.data', res.data);
        })
    }
    render() {
      console.log('this.props', this.props);

      const {isLoading} = this.states
      const value = this.states.data
      
      const loading = (
        <LoadingWrapper>
          <ReactLoading type='spin' color='#2980b9'/>
        </LoadingWrapper>
      )

      const jobDetail = (
        <JobDetailWrapper>
          <JobTitle>{value.title}</JobTitle>
          <JobCompany>Company: {value.company}</JobCompany>
          <JobType>Type: {value.type}</JobType>
          <JobLocation>Location: {value.location}</JobLocation>
          <JobDescription>Description: {value.description}</JobDescription>
          <span>Phone: {value.employer_contact.phone}</span>
          <span>WhatsApp: {value.employer_contact.whatsapp}</span>
          <span>Email: {value.employer_contact.email}</span>
          <span>Nationality: {value.nationality}</span>
          <span>Benefits: {value.benefit}</span>
        </JobDetailWrapper>
      )
      return (
        <Container>
          <Title>Mau Kerja</Title>
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
              <Menu.Item name='admin' active={false}>
                Admin Page
              </Menu.Item>
            </NavLink>
          </Menu>
          
          <SubTitle>Detail Kerja</SubTitle>
          <Divider/>
          
          { isLoading ? loading : jobDetail }
          
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

const JobDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 10px;
  border-bottom: solid 1px black;
`

const JobTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
`
const JobCompany = styled.span`
  font-size: 15px;
`
const JobLocation = styled.span`
  font-size: 15px;
`
const JobDescription = styled.span`
  font-size: 15px;
`
const JobType = styled.span`
  font-size: 15px;
`