import useAxiosOnMount from '../hooks/useAxiosOnMount'
import AxiosContainer from '../components/AxiosContainer'
import StringifyJson from '../components/StringifyJSON'
import { useParams } from 'react-router-dom'
import LoaderAndError from '../components/LoaderAndError'
import List from '../components/List'
import Button from '../components/Button'
import { useState } from 'react'
import { Button as SEMButton, Checkbox, Form, Select } from 'semantic-ui-react'
import axios from 'axios'


// get skills.. Better in this case if it is skills users doesn't have, but that is not a req of hmt

// add to db... Grade Create

// update UI (REACT)

const UserShow = (props) => {
  const { id } = useParams()
  const { data, loading, error, getData: getUsers, setData:x } = useAxiosOnMount(`/api/users/${id}`)
  const [show, setShow] = useState(true)
  const [skillID, setSkillID] = useState(null)
  const [grade, setGrade] = useState(101)
  const [createLoading, setCreateLoading] = useState(false)
  const [createError, setCreateError] = useState(null)

  if (loading || error) {
    return <LoaderAndError fullError loading={loading} error={error} loaderMessage={'Loading URL, please wait'} />
  }

  const handleChange = (event, data) => {
    setSkillID(data.value)
  }

  const handleSubmit = async () => {
    setCreateLoading(true)
    try {
      let res = await axios.post(`/api/grades`, { user_id: id, skill_id: skillID, score: grade })
      getUsers()
      x({...data, skills:[res.data, ...data.skills]})
      setCreateLoading(false)
    } catch (err) {
      debugger
      setCreateLoading(false)
      // i could come up with this object here
      // this easier but it not reusable
      // setCreateError({message: err.response.data.error.score.join(', ')})

      // more flexiable and reusable but less customziable
      setCreateError({message: JSON.stringify(err.response.data, null, 2)})
    }
  }
  const getSkillOptions = () => {
    // convert our skill [{name, id}] = > [ { key, value, text: }]
    return data.ungraded_skills.map(d => {
      return { key: d.name, value: d.id, text: d.name }
    })
  }

  const renderForm = () => {
    if (createLoading || createError) {
      return <LoaderAndError loading={createLoading} error={createError} loaderMessage={'Creating Grade, please wait'} />
    }

  }

  return (
    <>
      <div>
        <h1>{data.user.name}</h1>
        <Button onClick={() => setShow(!show)}>Add Skill / withGrade</Button>
        {show &&
          <div>
            <p>want skills Form here</p>
            {renderForm()}
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Grade</label>
                <input value={grade} onChange={(e) => setGrade(e.target.value)} type='number' min='0' placeholder='Grade' />
              </Form.Field>
              <Form.Field>
                <label></label>
                <Select onChange={handleChange} placeholder='Select Skill' options={getSkillOptions()} />
              </Form.Field>

              <SEMButton type='submit'>Submit</SEMButton>
            </Form>



          </div>
        }
        <List
          name='Skills'
          data={data.skills}
        />

      </div>
    </>
  )
}

export default UserShow

// {
//     "user": {
//       "id": 1,
//       "name": "Miss Ozie Marks",
//       "created_at": "2021-03-18T16:31:26.837Z",
//       "updated_at": "2021-03-18T16:31:26.837Z"
//     },
//     "skills": [
//       {
//         "skill": {
//           "id": 1,
//           "name": "ruby",
//           "description": "Syntaz Sugar",
//           "created_at": "2021-03-18T16:31:26.657Z",
//           "updated_at": "2021-03-18T16:31:26.657Z"
//         },
//         "score": 25
//       },
//       {
//         "skill": {
//           "id": 2,
//           "name": "rails",
//           "description": "Stay on the rails...Convention",
//           "created_at": "2021-03-18T16:31:26.662Z",
//           "updated_at": "2021-03-18T16:31:26.662Z"
//         },
//         "score": 61
//       },
//       {
//         "skill": {
//           "id": 3,
//           "name": "react",
//           "description": "make writing UI noooice!!!",
//           "created_at": "2021-03-18T16:31:26.665Z",
//           "updated_at": "2021-03-18T16:31:26.665Z"
//         },
//         "score": 11
//       },
//       {
//         "skill": {
//           "id": 4,
//           "name": "Homework1",
//           "description": "CRUD ACTIONS!!",
//           "created_at": "2021-03-18T16:31:26.668Z",
//           "updated_at": "2021-03-18T16:31:26.668Z"
//         },
//         "score": 26
//       }
//     ]
//   }