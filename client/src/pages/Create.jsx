import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/Auth.context";

const Create = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [link, setLink] = useState()

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async e => {
    if (e.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST',
          {from: link}, {Authorization: `Bearer ${auth.token}`})
        history.push(`/detail/${data.link._id}`)
      } catch (e) {

      }
    }
  }
  return (
    <div className='row'>
      <div className="col s8 offset-s2">
        <div className="input-field">
          <input placeholder="Введите ссылку..."
                 id="link"
                 value={link}
                 onChange={e => setLink(e.target.value)}
                 onKeyPress={pressHandler}
                 type='text'/>

          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  );
};

export default Create;