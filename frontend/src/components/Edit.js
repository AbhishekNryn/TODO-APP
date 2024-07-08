import React,{Fragment,useState} from 'react'

function Edit({ todo }) {

    const updateDescription = async e => {
        e.preventDefault();
        try {
            const body = { description }
            const response = await fetch(`http://localhost:5000/todo/${todo.tid}`,
                {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(body)
                }
            )

            window.location = "/";
        } catch (error) {
            console.error(error.message)
        }
    }

    const[description,setDescription] = useState(todo.description)
    return (
      <Fragment>
        <button type="button" class="btn btn-info btn-md" data-toggle="modal" data-target={`#id${todo.tid}`} >Edit</button>


            <div id={`id${todo.tid}`} class="modal fade" role="dialog">
  <div class="modal-dialog">


    <div class="modal-content">
      <div class="modal-header">
        
        <h4 class="modal-title">Edit Todo</h4>
      </div>
      <div class="modal-body">
        <input type='text' className='form-control' value={description} onChange={e=>setDescription(e.target.value)}/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={e=>updateDescription(e)}>Edit</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
      </Fragment>
    )
}

export default Edit