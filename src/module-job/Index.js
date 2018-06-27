import React, { Component } from "react";
import { Divider, Menu } from 'semantic-ui-react';
import { Pagination, Input } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import { observer } from "mobx-react";
import { observable, toJS } from 'mobx';
import { NavLink } from "react-router-dom";
import dummy from '../dummy/jobs.json';

const Search = Input.Search;
// let renders = [] 

export default observer (
  class JobIndex extends Component {

    states = observable({
      isLoading: true,
      renders: [],
      initialRenders: [],
      activeItem: 'home',
      datas: []
    });

    onChangePage = page => {
      console.log('page: ', page);
    };

    handleItemClick = (e, { name }) => {this.states.activeItem = name}

    searchJob = (e) => {
      const filterText = e.target.value
      console.log('valuerrr: ', filterText);
      const { datas } = this.states
     
      if (filterText === '') {
        this.states.renders = datas.map((value, index) => (
          <NavLink to={`/job/${value.id}`} key={index}>
            <JobWrapper>
              <JobTitle>{value.title}</JobTitle>
              <JobCompany>{value.company}</JobCompany>
              <JobType>{value.type}</JobType>
              <JobLocation>{value.location}</JobLocation>
              <JobDescription>{value.description}</JobDescription>
            </JobWrapper>
          </NavLink>
        ))
      } else {
        let filtered = []
        toJS(datas).forEach((value, index) => {
          console.log('value, index: ', value, index);
          if(value.title.toLowerCase().includes(filterText.toString().toLowerCase())) {
            console.log('filterText: ', filterText);
            filtered.push(value)
          }
        })
  
        this.states.renders = filtered.map((value, index) => (
          <NavLink to={`/job/${value.id}`} key={index}>
            <JobWrapper>
              <JobTitle>{value.title}</JobTitle>
              <JobCompany>{value.company}</JobCompany>
              <JobType>{value.type}</JobType>
              <JobLocation>{value.location}</JobLocation>
              <JobDescription>{value.description}</JobDescription>
            </JobWrapper>
          </NavLink>
        ))
      }
      // console.log('this.states.renders: ', this.states.renders);
    }

    componentDidMount() {
      axios.get('http://private-27298f-frontendtestmaukerja.apiary-mock.com/jobs?limit=100')
        .then(res => {
          this.states.isLoading = false
          console.log('res.data', res.data);
          this.states.datas = res.data
          this.states.renders = res.data.map((value, index) => (
            <NavLink to={`/job/${value.id}`} key={index}>
              <JobWrapper>
                <JobTitle>{value.title}</JobTitle>
                <JobCompany>{value.company}</JobCompany>
                <JobType>{value.type}</JobType>
                <JobLocation>{value.location}</JobLocation>
                <JobDescription>{value.description}</JobDescription>
              </JobWrapper>
            </NavLink>
          ))
        })
    }
    render() {
      const { isLoading, renders } = this.states

      let jobList = (
        <JobListContainer>
          { renders }
        </JobListContainer>
      )
      const loading = (
        <LoadingWrapper>
          <ReactLoading type='spin' color='#2980b9'/>
        </LoadingWrapper>
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
          
          <SubTitle>List Kerja</SubTitle>
          <Divider/>
          <Search
            placeholder="Search Job"
            onSearch={value => console.log(value)}
            onChange={this.searchJob}
            
          />
          { isLoading ? loading : jobList }
          <Pagination
              current={1}
              total="3"
              pageSize={10}
              onChange={this.onChangePage}
            />
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

const JobWrapper = styled.div`
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