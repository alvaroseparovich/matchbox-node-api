MatchBox test app
----------

All the routes and pathern to the API are above:


Handle candidates
--

```
/candidates/
    |-/             -GET    -Get All
    |-/register/    -POST   -Create new         @body = JSON of candidate
    |-/candidate/   -GET    -Get a candidate    @param= ID of candidate
    |-/candidate/   -PUT    -Update candidate   @param= ID @body = JSON of candidate
    |-/candidate/      -DELETE -Delete candidate   @param= ID
    |
```
Handle jobs
---
```
/jobs/
    |-/             -GET    -Get All
    |-/register/    -POST   -Create new         @body = JSON of job
    |-/job/         -GET    -Get a job          @param= ID of job
    |-/job/         -PUT    -Update job         @param= ID @body = JSON of job
    |-/job/         -DELETE -Delete job         @param= ID 
    |
```
Handle connections
---
```
/connections/
    |-/attatchcandidates/   -PUT    @param= Id of Job @body = List of candidates Obj
    |   |
    |   # Atattch many candidates to one Job
    |   |
    |   # Example of Body = [{"_id":"123"},{"_id":"321"}]
    |
    |
    |-/unattatchcandidates/ -PUT    @param= Id of Job @body = List of candidates Obj
    |   |
    |   # Unattatch many candidates from one Job
    |   |
    |   # Example of Body = [{"_id":"123"},{"_id":"321"}]
    |
    |
    |-/attatchjobs/         -PUT    @param= Id of Candidate @body = List of job Obj
    |   |
    |   # Attatch many Jobs from one candidate
    |   |
    |   # Example of Body = [{"_id":"123"},{"_id":"321"}]
    |
    |
    |-/unattatchjobs/       -PUT    @param= Id of Candidate @body = List of job Obj
    |   |
    |   # Unattatch many Jobs from one candidate
    |   |
    |   # Example of Body = [{"_id":"123"},{"_id":"321"}]
    |
```