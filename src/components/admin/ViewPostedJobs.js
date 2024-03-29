import { Typography } from '@mui/material'
import {Button} from '@mui/material';
import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditJob from './EditJob';
import ViewResponses from './ViewResponses';
class ViewPostedJobs extends Component {
    constructor()
    {
        super();
        this.state={
            jobs:[],
            showResp:false,
            showEditJob:false,
            editjob:{},
            respid:123456
        }
    }
    //have to fetch all jobs data from jobs schema on component rendering
    componentDidMount()
    {
        this.fetchJobs();
       
    }

    //Get All Jobs
    fetchJobs()
    {
        axios.get('http://localhost:8000/api/displayjobs/jobs')  ///api/displayjobs/jobs
        .then((res)=>{
            const jobs=res.data.map((j)=>({
                ...j,
            }));
            console.log(jobs);
            this.setState({jobs});
        })
        .catch((err)=>{
                console.log(err);
        })
    }


    //Delete Job
    handleDelete(ind)
    {
        // console.log("hi"+this.state.jobs[ind].jobid)
        const jid=this.state.jobs[ind].jobid
        axios.delete(`http://localhost:8000/api/jobdelete/${jid}`)   ///api/jobdelete/:jobid
        .then((res)=>{
            this.fetchJobs();
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    handleEdit=(ind)=>{
      
         this.setState(state=>({
           showEditJob:!state.showEditJob,
           editjob:this.state.jobs[ind]
         }))
       }

       
    handleViewResponses(ind) {
        // Check if the clicked job ID matches the current respid
        // If yes, toggle the showResp value
        // If not, set showResp to false for all job rows
        if (this.state.respid === this.state.jobs[ind].jobid) {
          this.setState((state) => ({
            showResp: !state.showResp,
            respid: state.jobs[ind].jobid,
          }));
        } else {
          this.setState({
            showResp: true,
            respid: this.state.jobs[ind].jobid,
          });
        }
      }
      
      
    render()
    {
        const jbs=this.state.jobs
        return (
          <>
          <Typography sx={{color:"white"}}>
        { this.state.showEditJob&& <EditJob showEdit={this.state.showEditJob} jb={this.state.editjob}/>}
         {this.state.showResp && <ViewResponses showResp={this.state.showResp} jbid={this.state.respid} />}
          <Typography variant="h5" sx={{color:"white",mb:2}}>View Posted Jobs</Typography>
              <table cellSpacing={10} >
                  <thead>
                  <tr>
                      <th style={{color:"#b3e5fc"}}>JobId</th>
                      <th style={{color:"#b3e5fc"}}>Job Role</th>
                      <th style={{color:"#b3e5fc"}}>Company</th>
                      <th style={{color:"#b3e5fc"}}>Job Description</th>
                      <th style={{color:"#b3e5fc"}}>Salary</th>
                      <th style={{color:"#b3e5fc"}}>End Date</th>
                      <th style={{color:"#b3e5fc"}}>No of Responses</th>
                      <th style={{color:"#b3e5fc"}} colSpan={2}>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                      {jbs.map((j,ind)=>
                      
                          <tr>
                              <td style={{textAlign:'center',maxWidth:'100px'}}>{j.jobid}</td>
                              <td style={{textAlign:'center',maxWidth:'150px'}}>{j.jobrole}</td>
                              <td style={{textAlign:'center',padding:'10px'}}>{j.company}</td>
                              <td style={{textAlign:'justified',maxWidth:'300px'}}>{j.description}</td>
                              <td style={{textAlign:'center',padding:'10px'}}>{j.salary}</td>
                              <td style={{textAlign:'center',padding:'10px'}}>{j.enddate}</td>
                              <td style={{textAlign:'center',padding:'10px'}}><Button variant="contained" sx={{p:"1"}} onClick={()=>this.handleViewResponses(ind)}  >Responses</Button></td>
                              {console.log(this.state.respid)}
                            <td><Button variant="contained" sx={{p:"1"}} onClick={()=>this.handleEdit(ind)}>Edit</Button></td>
                              <td><Button variant="contained" sx={{p:"1"}} onClick={()=>this.handleDelete(ind)}  >Delete</Button></td>
                          </tr>)}
                  </tbody>
                  <tfoot>
      
                  </tfoot>
      
      </table>
      </Typography>
          </>
    
  


        )
    }
}

export default ViewPostedJobs