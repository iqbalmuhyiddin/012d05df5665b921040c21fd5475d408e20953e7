import React, { Component } from "react";
import { Button, Divider, TextArea, Menu, Input } from 'semantic-ui-react';
import axios from 'axios';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import { observer } from "mobx-react";
import { observable, toJS } from 'mobx';
import TagsInput from 'react-tagsinput'
import dummy from '../dummy/jobs.json';
import { NavLink, Redirect } from "react-router-dom";

let renders = [] 

export default observer (
  class EditJob extends Component {

    states = observable({
      isLoading: true,
      id: 0,
      data: {
        id: 0,
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

    onChangePage = page => {
      console.log('page: ', page);
    };

    onChange = value => {
      console.log('value: ', value);
    }

    handleTitle = e => { 
      this.states.data.title = e.target.value
      console.log('this.states.data: ', this.states.data);
     }
    handleCompany = e => { 
      this.states.data.company = e.target.value
      console.log('this.states.data: ', this.states.data);
     }
    handleLocation = e => { 
      this.states.data.location = e.target.value
      console.log('this.states.data: ', this.states.data);
     }
    handleType = e => { 
      this.states.data.type = e.target.value
      console.log('this.states.data: ', this.states.data);
     }
    handleDescription = e => { 
      this.states.data.description = e.target.value
      console.log('this.states.data: ', this.states.data);
     }
    handlePhone = e => { 
      this.states.data.employer_contact.phone = e.target.value
      console.log('this.states.data: ', this.states.data);
     }
    handleWhatsapp = e => { 
      this.states.data.employer_contact.whatsapp = e.target.value
      console.log('this.states.data: ', this.states.data);
     }
    handleEmail = e => { 
      this.states.data.employer_contact.email = e.target.value
      console.log('this.states.data: ', this.states.data);
     }
    handleLanguage = (tags) => { 
      this.states.data.requirements.language = tags
      console.log('this.states.data: ', this.states.data);
     }
    handleRequirements = (tags) => { 
      this.states.data.requirements.items = tags
      console.log('this.states.data: ', this.states.data);
     }
    handleResponsibilities = (tags) => { 
      this.states.data.responsibilites = tags
      console.log('this.states.data: ', this.states.data);
     }
    handleBenefit = (tags) =>{ 
      this.states.data.benefit = tags
      console.log('this.states.data: ', this.states.data);
     }
    handleNationality = e => { 
      this.states.data.nationality = e.target.value
      console.log('this.states.data: ', this.states.data);
     }

    saveData = () => {
      this.states.isLoading = false
      console.log(toJS(this.states.data));
      const {data, id} = this.states
      axios.put(`http://private-27298f-frontendtestmaukerja.apiary-mock.com/job/${id}`, { data }, {headers: {"Content-Type": "application/json"}})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.states.redirect = true
          
        })
        .catch(error => {
          console.log(error)
        });
    }

    componentDidMount() {
      const id = this.props.match.params.jobId
      this.states.id = id
      axios.get(`http://private-27298f-frontendtestmaukerja.apiary-mock.com/job/${id}}`)
        .then(res => {
          this.states.isLoading = false
          this.states.data = res.data
        })
        .catch(error => {
          console.log(error)
        });
    }
    render() {
      const {data, isLoading, redirect} = this.states
      if (redirect) {
        return <Redirect to="/admin" push />
      }
      const loading = (
        <LoadingWrapper>
          <ReactLoading type='spin' color='#2980b9'/>
        </LoadingWrapper>
      )

      const form = (
        <FormWrapper>
          <FormLabel>Title</FormLabel>
          <Input placeholder='Job Title' value={data.title} onChange={this.handleTitle} />
          <FormLabel>Company</FormLabel>
          <Input placeholder='Company' value={data.company} onChange={this.handleCompany} />
          <FormLabel>Location</FormLabel>
          <Input placeholder='Location' value={data.location} onChange={this.handleLocation} />
          <FormLabel>Description</FormLabel>
          <TextArea placeholder='Description' value={data.description} onChange={this.handleDescription} />
          <FormLabel>Nationality</FormLabel>
          <Input placeholder='Nationality' value={data.nationality} onChange={this.handleNationality} />
          <FormLabel>Type</FormLabel>
          <Input placeholder='Type' value={data.type} onChange={this.handleType} />
          <FormLabel>Phone</FormLabel>
          <Input placeholder='Phone' value={data.employer_contact.phone} onChange={this.handlePhone} />
          <FormLabel>WhatsApp</FormLabel>
          <Input placeholder='Whatsapp' value={data.employer_contact.whatsapp} onChange={this.handleWhatsapp} />
          <FormLabel>Email</FormLabel>
          <Input placeholder='E-mail' value={data.employer_contact.email} onChange={this.handleEmail} />
          <FormLabel>Requirements</FormLabel>
          <TagsInput value={data.requirements.items} onChange={this.handleRequirements} />
          <FormLabel>Language</FormLabel>
          <TagsInput value={data.requirements.language} onChange={this.handleLanguage} />
          <FormLabel>Responsibilites</FormLabel>
          <TagsInput value={data.responsibilites} onChange={this.handleResponsibilities} />
          <FormLabel>Benefit</FormLabel>
          <TagsInput value={data.benefit} onChange={this.handleBenefit} />
          <Button onClick={this.saveData}>Save</Button>
        </FormWrapper>
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
          <SubTitle>Add new Job</SubTitle>
          <Divider/>
            { isLoading ? loading : form }
        </Container>
      );
    }
  }
) 

const Container = styled.div`
  width: 100%;
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

const FormWrapper = styled.div`
  width: 100% ;
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 20px;
`

const FormLabel = styled.span`
  font-size: 14px;
`

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`